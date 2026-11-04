import { Link } from 'react-router-dom';

const LOGO = '/logo.png';

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/sources', label: 'Sources' },
  { to: '/cv-checker', label: 'CV Checker' },
];

/**
 * Shared header + footer chrome for the public, non-app pages ported from
 * the career.studentcompanionai.rw static site (About, Sources, Privacy,
 * Terms, CV Checker). Deliberately lighter than the authenticated app's
 * Chrome (no tab bar, no MiniChatbot) — these pages are reachable without
 * signing in, matching the original site's open-access pattern.
 */
export function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans flex flex-col">
      <header className="border-b border-[#E8DDB0] bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Student Companion AI home">
            <img src={LOGO} alt="" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-semibold text-sm tracking-tight">
              Student Companion <span className="text-[#D4AF37]">AI</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#1A1A1A] text-white hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
            >
              Log In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#E8DDB0] bg-[#FBF7E9]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={LOGO} alt="" className="w-6 h-6 rounded object-cover" />
              <span className="font-semibold text-sm">Student Companion AI</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/50">Opportunities that match your journey.</p>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold mb-2 text-[#1A1A1A]/80">Platform</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">Home</Link></li>
              <li><Link to="/about" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">About</Link></li>
              <li><Link to="/sources" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">Sources</Link></li>
              <li><Link to="/cv-checker" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">CV Checker</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold mb-2 text-[#1A1A1A]/80">Legal</h4>
            <ul className="space-y-1.5">
              <li><Link to="/privacy" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">Privacy</Link></li>
              <li><Link to="/terms" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">Terms</Link></li>
              <li><a href="mailto:africa@studentcompanionai.xyz" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A]">Email us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E8DDB0]">
          <p className="max-w-5xl mx-auto px-5 sm:px-8 py-4 text-xs text-[#1A1A1A]/40">
            © {new Date().getFullYear()} Student Companion AI. Opportunities that match your journey.
          </p>
        </div>
      </footer>
    </div>
  );
}
