
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowUpRight } from 'lucide-react';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Find Opportunities', path: '/opportunities' },
  { label: 'For Providers', path: '/providers' },
  { label: 'About Us', path: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
            <GraduationCap size={26} />
          </div>

          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CareerBridge<span className="text-brand-600"> SA</span>
            </span>
            <p className="text-[10px] font-medium tracking-wide text-slate-500">
              YOUR FUTURE STARTS HERE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? 'text-brand-600'
                    : 'text-slate-600 hover:text-brand-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-brand-600"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Get Started
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-6 py-5 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </NavLink>
            ))}

            <hr className="border-slate-200" />

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
