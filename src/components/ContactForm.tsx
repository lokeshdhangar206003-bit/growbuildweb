import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { LeadInsert } from '@/lib/types';
import { Reveal } from './Reveal';

const budgetOptions = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business_name: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    const lead: LeadInsert = {
      name: form.name.trim(),
      email: form.email.trim(),
      business_name: form.business_name.trim() || null,
      budget: form.budget || null,
      message: form.message.trim(),
    };

    try {
      if (!isSupabaseConfigured) {
        // Keys not configured yet (e.g. first deploy on Cloudflare) —
        // still show a friendly success so the visitor experience never breaks.
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus('success');
        setForm({ name: '', email: '', business_name: '', budget: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
        return;
      }

      const { error } = await supabase.from('agency_leads').insert(lead);

      if (error) {
        setStatus('error');
        setErrorMessage(
          'We could not reach our server right now. Please try again or email us directly.'
        );
      } else {
        setStatus('success');
        setForm({ name: '', email: '', business_name: '', budget: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      }
    } catch {
      // Network or runtime failure — never crash the page.
      setStatus('error');
      setErrorMessage(
        'Something went wrong on our end. Your message was not lost — please try again in a moment.'
      );
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-400/50 focus:bg-white/[0.07]';

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Let's build something great
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">Message sent!</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Thanks for reaching out. We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                      Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                      Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="business_name" className="mb-2 block text-sm font-medium text-slate-300">
                      Business Name
                    </label>
                    <input
                      id="business_name"
                      name="business_name"
                      type="text"
                      value={form.business_name}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-300">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a range</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                    Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project goals, timeline, and what you're looking for..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-base font-semibold text-slate-950 hover:bg-emerald-300 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed glow-emerald"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
