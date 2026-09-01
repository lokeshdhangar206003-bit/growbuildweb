import { Code2, Database, Layout, Search, ShoppingCart, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    description: 'Custom web applications built with React, TypeScript, and modern APIs — fast, scalable, and built to last.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Designed-for-growth database schemas with Supabase & PostgreSQL — secure, performant, and maintainable.',
  },
  {
    icon: Layout,
    title: 'Premium Landing Pages',
    description: 'High-converting, pixel-perfect landing pages with smooth animations that turn visitors into customers.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Complete online stores with Stripe checkout, inventory management, and optimized checkout flows.',
  },
  {
    icon: Search,
    title: 'SEO & Performance',
    description: 'Technical SEO, Core Web Vitals optimization, and structured data to rank higher and load faster.',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'From idea to MVP in weeks — validate your concept with a polished, functional prototype fast.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              What We Do
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Services built to grow your business
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              We cover the full spectrum of web development — from strategy and design
              to deployment and optimization.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="group relative h-full rounded-2xl border border-white/5 bg-white/[0.03] p-7 transition-all hover:border-emerald-400/20 hover:bg-white/[0.06] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-400/10 transition-transform group-hover:scale-110">
                  <service.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
