import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Bookmark,
  MapPin,
  Wallet,
  Clock,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
} from 'lucide-react';

import type { Opportunity } from '../types/opportunity';

import { getOpportunityById } from '../services/opportunityService';
import { useSavedOpportunities } from '../hooks/useSavedOpportunities';

function DetailSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="border-t border-slate-100 pt-8">
      <h2 className="mb-5 text-xl font-bold text-slate-900">
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-brand-600"
            />

            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();

  const [opportunity, setOpportunity] =
    useState<Opportunity | undefined>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isSaved, toggleSaved } = useSavedOpportunities();

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    window.scrollTo(0, 0);

    getOpportunityById(id ?? '')
      .then((data) => {
        if (active) setOpportunity(data);
      })
      .catch(() => {
        if (active) setError('Unable to load this opportunity.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle
          size={36}
          className="animate-spin text-brand-600"
        />
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {error || 'Opportunity not found'}
        </h1>

        <Link
          to="/opportunities"
          className="mt-6 text-brand-600 hover:underline"
        >
          Browse all opportunities
        </Link>
      </div>
    );
  }

  const saved = isSaved(opportunity.id);

  const closed =
    new Date(opportunity.closingDate).getTime() <= Date.now();

  const closingDate = new Date(
    opportunity.closingDate,
  ).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const details = [
    {
      icon: MapPin,
      label: 'Location',
      value: `${opportunity.city}, ${opportunity.province}`,
    },
    {
      icon: Wallet,
      label: 'Monthly stipend',
      value: `R${opportunity.stipend.toLocaleString('en-ZA')}`,
    },
    {
      icon: Clock,
      label: 'Duration',
      value: `${opportunity.duration} months`,
    },
    {
      icon: GraduationCap,
      label: 'Qualification level',
      value: `NQF Level ${opportunity.nqfLevel}`,
    },
    {
      icon: Building2,
      label: 'Work arrangement',
      value: opportunity.workMode,
    },
    {
      icon: CalendarDays,
      label: 'Closing date',
      value: closingDate,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Opportunity Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Link
            to="/opportunities"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to opportunities
          </Link>

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-400">
              <Building2 size={40} />
            </div>

            <div className="flex-1">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold capitalize text-teal-300">
                  {opportunity.type}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                  {opportunity.sector}
                </span>

                {opportunity.isDemo && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                    Demo listing
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {opportunity.title}
              </h1>

              <p className="mt-3 text-slate-400">
                {opportunity.company}
              </p>
            </div>

            <button
              type="button"
              aria-pressed={saved}
              onClick={() => toggleSaved(opportunity.id)}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm hover:border-teal-400 hover:text-teal-400"
            >
              <Bookmark
                size={18}
                fill={saved ? 'currentColor' : 'none'}
              />

              {saved ? 'Saved' : 'Save opportunity'}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">

        {/* Main Description */}
        <article className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              About this opportunity
            </h2>

            <p className="leading-relaxed text-slate-600">
              {opportunity.description}
            </p>
          </section>

          <DetailSection
            title="Requirements"
            items={opportunity.requirements}
          />

          <DetailSection
            title="Key responsibilities"
            items={opportunity.responsibilities}
          />

          <DetailSection
            title="What you will gain"
            items={opportunity.benefits}
          />

          <section className="border-t border-slate-100 pt-8">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Relevant skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </article>

        {/* Opportunity Summary */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-bold text-slate-900">
            Opportunity overview
          </h2>

          <div className="mt-6 space-y-5">
            {details.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                  <item.icon size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-slate-100 pt-6">
            {closed || opportunity.isDemo ? (
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-slate-200 px-5 py-4 text-sm font-semibold text-slate-500"
              >
                {closed ? 'Applications closed' : 'Demo opportunity'}
              </button>
            ) : (
              <Link
                to={`/login?redirect=${encodeURIComponent(
                  `/opportunities/${opportunity.id}`,
                )}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-4 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Apply now
                <ArrowRight size={18} />
              </Link>
            )}

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
              {opportunity.isDemo
                ? 'This is a fictional listing for development purposes.'
                : 'Sign in to your CareerBridgeSA account to apply.'}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}