import { ArrowDown, Sparkles, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '3x', label: 'Avg. ROAS Lift' },
  { value: '40+', label: 'Happy Clients' },
];

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300 animate-fade-in-up">
            <Sparkles className="h-4 w-4" />
            Premium web development agency
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            We build websites that
            <br />
            <span className="text-gradient">scale your revenue</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            From high-converting landing pages to full-stack web platforms, we design
            and ship digital products that drive measurable growth for your business.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-base font-semibold text-slate-950 hover:bg-emerald-300 transition-all hover:scale-105 glow-emerald"
            >
              Start Your Project
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 max-w-3xl grid grid-cols-3 gap-4 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating accent icons */}
        <div className="pointer-events-none absolute left-[8%] top-1/2 hidden lg:block animate-float">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
        </div>
        <div className="pointer-events-none absolute right-[10%] top-1/3 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Zap className="h-6 w-6 text-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
