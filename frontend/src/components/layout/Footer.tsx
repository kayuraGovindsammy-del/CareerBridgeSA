
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-brand-600 p-2 text-white">
                <GraduationCap size={25} />
              </div>

              <span className="text-xl font-bold text-white">
                CareerBridge<span className="text-teal-400"> SA</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed">
              Connecting South African talent with meaningful
              opportunities to learn, grow and succeed.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              Opportunities
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/opportunities?type=learnership" className="hover:text-teal-400">
                Learnerships
              </Link>
              <Link to="/opportunities?type=internship" className="hover:text-teal-400">
                Internships
              </Link>
              <Link to="/opportunities?type=apprenticeship" className="hover:text-teal-400">
                Apprenticeships
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              For Providers
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/providers" className="hover:text-teal-400">
                Become a Provider
              </Link>
              <Link to="/register?role=provider" className="hover:text-teal-400">
                Create an Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/about" className="hover:text-teal-400">
                About Us
              </Link>
              <Link to="/privacy" className="hover:text-teal-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-teal-400">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-slate-800 pt-6 text-xs">
          <p>
            © {new Date().getFullYear()} CareerBridge SA.
            All rights reserved.
          </p>

          <p>Built for South Africa 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
}
