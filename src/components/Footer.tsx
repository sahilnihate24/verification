interface FooterProps {
  onNavigate: (section: 'verification' | 'process' | 'about' | 'contact') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8 no-print">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="w-6 h-6 rounded bg-[#0B1221] text-white flex items-center justify-center font-serif font-bold text-xs"
          >
            Q
          </span>
          <span className="font-medium text-slate-700">
            Qythera Verification Portal
          </span>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} Qythera. All rights reserved.</span>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6">
          <a
            href="#verification"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('verification');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Verification
          </a>
          <a
            href="#process"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('process');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Process
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
