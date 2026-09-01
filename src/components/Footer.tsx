import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 font-bold">
              g
            </span>
            <span className="text-base font-bold tracking-tight">
              grow<span className="text-emerald-400">build</span>web
            </span>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} growbuildweb. Built to scale.
          </p>

          <div className="flex items-center gap-4">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/20 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
