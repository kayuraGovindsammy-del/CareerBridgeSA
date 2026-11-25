
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  Building2,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

const categories = [
  {
    title: 'Learnerships',
    description: 'Gain practical experience and recognised qualifications.',
    icon: GraduationCap,
    color: 'bg-teal-50 text-teal-600',
    type: 'learnership',
  },
  {
    title: 'Internships',
    description: 'Take the first step towards your professional career.',
    icon: BriefcaseBusiness,
    color: 'bg-blue-50 text-blue-600',
    type: 'internship',
  },
  {
    title: 'Apprenticeships',
    description: 'Develop specialised skills through hands-on training.',
    icon: Building2,
    color: 'bg-amber-50 text-amber-600',
    type: 'apprenticeship',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set('search', keyword.trim());
    }

    if (location.trim()) {
      params.set('location', location.trim());
    }

    navigate(`/opportunities?${params.toString()}`);
  }

  return (
    <main>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">

        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-teal-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

          {/* Hero Content */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-medium text-teal-300">
              <Sparkles size={15} />
              Empowering South Africa's next generation
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl">
              Your potential.
              <br />
              Your future.
              <br />
              <span className="text-teal-400">
                Your opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Discover learnerships, internships and skills development
              opportunities across South Africa. Build your skills,
              connect with employers and take the next step in your career.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-9 flex flex-col gap-2 rounded-xl bg-white p-2 shadow-2xl sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                <Search size={20} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Job title or skill"
                  aria-label="Job title or skill"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                />
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-3 border-t border-slate-200 px-3 py-3 sm:border-l sm:border-t-0">
                <MapPin size={20} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Location"
                  aria-label="Location"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-6 py-4 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Search
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500">Popular:</span>

              {['IT', 'Engineering', 'Finance', 'Healthcare'].map((item) => (
                <Link
                  key={item}
                  to={`/opportunities?search=${encodeURIComponent(item)}`}
                  className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300 hover:border-teal-400 hover:text-teal-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Application Preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Your career journey
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    Application Overview
                  </h2>
                </div>

                <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
                  <TrendingUp size={24} />
                </div>
              </div>

              <p className="mb-4 text-xs text-slate-400">
                Example dashboard preview
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '08', label: 'Applied' },
                  { value: '03', label: 'Shortlisted' },
                  { value: '02', label: 'Offers' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-slate-900/80 p-4"
                  >
                    <p className="text-2xl font-bold text-teal-400">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'Software Development Learnership',
                    subtitle: 'Information Technology',
                    status: 'Shortlisted',
                    style: 'bg-teal-400/10 text-teal-300',
                  },
                  {
                    title: 'Business Administration Internship',
                    subtitle: 'Business & Management',
                    status: 'Received',
                    style: 'bg-blue-400/10 text-blue-300',
                  },
                  {
                    title: 'Engineering Apprenticeship',
                    subtitle: 'Engineering & Manufacturing',
                    status: 'Offered',
                    style: 'bg-amber-400/10 text-amber-300',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-4"
                  >
                    <div className="rounded-lg bg-white/5 p-3 text-teal-400">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white sm:text-sm">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-[10px] font-medium ${item.style}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={16} className="text-teal-400" />
                Track every step of your application journey
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-9 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: MapPin,
              title: 'Nationwide opportunities',
              description: 'Discover opportunities across South Africa.',
            },
            {
              icon: GraduationCap,
              title: 'NQF-aligned qualifications',
              description: 'Find opportunities suited to your education.',
            },
            {
              icon: Users,
              title: 'Built for your future',
              description: 'Connect with employers and training providers.',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="rounded-xl bg-brand-50 p-3 text-brand-600">
                <item.icon size={25} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opportunity Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Explore your options
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Find the right path for you
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Whether you're entering the workforce or developing new
            skills, discover opportunities that match your ambitions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={`/opportunities?type=${category.type}`}
              className="group rounded-2xl border border-slate-200 bg-white p-8 hover:-translate-y-1 hover:border-brand-500 hover:shadow-xl"
            >
              <div className={`mb-6 inline-flex rounded-xl p-4 ${category.color}`}>
                <category.icon size={30} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {category.description}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-brand-600">
                Explore opportunities
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
