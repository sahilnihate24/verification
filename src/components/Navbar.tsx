import { ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeSection: 'verification' | 'process' | 'about' | 'contact';
  onNavigate: (section: 'verification' | 'process' | 'about' | 'contact') => void;
  onVerifyClick: () => void;
}

export function Navbar({ activeSection, onNavigate, onVerifyClick }: NavbarProps) {
  const navItems: Array<{
    id: 'verification' | 'process' | 'about' | 'contact';
    label: string;
    href: string;
  }> = [
    { id: 'verification', label: 'Verification', href: '#verification' },
    { id: 'process', label: 'Process', href: '#process' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand mark */}
        <a
          href="#verification"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('verification');
          }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 rounded-sm"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-md bg-[#0B1221] text-white flex items-center justify-center font-serif font-bold text-base tracking-tight"
          >
            Q
          </span>
          <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#0B1221]">
            QYTHERA
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 ${
                  isActive
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-slate-900"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onVerifyClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 hover:bg-slate-100 hover:border-slate-400 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
            <span>Verify Certificate</span>
          </button>
        </div>
      </div>
    </header>
  );
}
