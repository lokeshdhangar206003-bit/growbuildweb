import { useEffect, useState } from 'react';
import { ArrowUpRight, Loader2, Star } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { PortfolioItem } from '@/lib/types';
import { Reveal } from './Reveal';

const fallbackPortfolio: PortfolioItem[] = [
  {
    id: 'fallback-1',
    title: 'SaaS Analytics Platform',
    category: 'Web App',
    description:
      'A real-time analytics dashboard for SaaS companies to track MRR, churn, and user growth with interactive charts and exportable reports.',
    image_url: null,
    client: 'MetricFlow',
    tags: ['React', 'PostgreSQL', 'Tailwind'],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    title: 'D2C Skincare Launch',
    category: 'Landing Page',
    description:
      'High-converting product launch page with animated hero, testimonial carousel, and integrated checkout that drove a 3x ROAS.',
    image_url: null,
    client: 'Lumina Skin',
    tags: ['Next.js', 'Stripe', 'Framer Motion'],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    title: 'B2B Lead Gen Engine',
    category: 'Web App',
    description:
      'Automated lead generation and qualification pipeline with CRM sync, email sequences, and a custom scoring algorithm.',
    image_url: null,
    client: 'PipelinePro',
    tags: ['React', 'Supabase', 'TypeScript'],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-4',
    title: 'Restaurant Ordering System',
    category: 'E-commerce',
    description:
      'Full-stack online ordering platform with real-time kitchen tickets, table reservations, and contactless payments.',
    image_url: null,
    client: 'Tavola',
    tags: ['React', 'PostgreSQL', 'Stripe'],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-5',
    title: 'Fitness App Redesign',
    category: 'Web App',
    description:
      'Complete UX overhaul and progressive web app rebuild for a fitness coaching platform, improving session completion by 40%.',
    image_url: null,
    client: 'FitForge',
    tags: ['React', 'Tailwind', 'PWA'],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-6',
    title: 'Corporate Portfolio',
    category: 'Landing Page',
    description:
      'A sleek corporate website for a consulting firm with case studies, team bios, and a blog CMS.',
    image_url: null,
    client: 'Northwind Consulting',
    tags: ['Next.js', 'Sanity', 'Tailwind'],
    featured: false,
    created_at: new Date().toISOString(),
  },
];

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!isSupabaseConfigured) {
        setItems(fallbackPortfolio);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('agency_portfolio')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          setItems(fallbackPortfolio);
        } else {
          setItems(data);
        }
      } catch {
        setItems(fallbackPortfolio);
      }
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Our Work
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Live portfolio
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Real projects we've shipped for real clients. Browse our latest work below.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-16 flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.03] p-12 text-center text-slate-400">
            No projects to display yet.
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all hover:border-emerald-400/20 hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white/5 tracking-tight">
                        {item.client?.slice(0, 2).toUpperCase() ?? item.title.slice(0, 2)}
                      </span>
                    </div>
                    {item.featured && (
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-400/90 px-2.5 py-1 text-xs font-semibold text-slate-950">
                        <Star className="h-3 w-3 fill-slate-950" />
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3 rounded-full bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-slate-200">
                      {item.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-slate-500 transition-colors group-hover:text-emerald-400" />
                    </div>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.client && (
                      <p className="mt-4 text-xs text-slate-500">
                        Client: <span className="text-slate-300">{item.client}</span>
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
