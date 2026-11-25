import { Link } from 'react-router-dom';

import {
  Bookmark,
  MapPin,
  Wallet,
  Clock,
  GraduationCap,
  ArrowRight,
  Building2,
  CalendarDays,
} from 'lucide-react';

import type { Opportunity } from '../../types/opportunity';
import { useSavedOpportunities } from '../../hooks/useSavedOpportunities';

interface Props {
  opportunity: Opportunity;
}

const typeStyles = {
  learnership: 'bg-teal-50 text-teal-700',
  internship: 'bg-blue-50 text-blue-700',
  apprenticeship: 'bg-amber-50 text-amber-700',
};

export default function OpportunityCard({ opportunity }: Props) {
  const { isSaved, toggleSaved } = useSavedOpportunities();

  const saved = isSaved(opportunity.id);

  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(opportunity.closingDate).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-500 hover:shadow-lg">

      {/* Company and title */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Building2 size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="font-bold leading-snug text-slate-900 hover:text-brand-600"
          >
            {opportunity.title}
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            {opportunity.company}
          </p>
        </div>

        <button
          type="button"
          aria-label={saved ? 'Remove bookmark' : 'Save opportunity'}
          aria-pressed={saved}
          onClick={() => toggleSaved(opportunity.id)}
          className={`rounded-lg p-2 ${
            saved
              ? 'bg-brand-50 text-brand-600'
              : 'text-slate-400 hover:bg-slate-100'
          }`}
        >
          <Bookmark
            size={21}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            typeStyles[opportunity.type]
          }`}
        >
          {opportunity.type}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {opportunity.workMode}
        </span>

        {opportunity.isDemo && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            Demo listing
          </span>
        )}
      </div>

      {/* Information */}
      <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="shrink-0 text-slate-400" />
          {opportunity.city}, {opportunity.province}
        </div>

        <div className="flex items-center gap-2">
          <Wallet size={16} className="shrink-0 text-slate-400" />
          R{opportunity.stipend.toLocaleString('en-ZA')} / month
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          {opportunity.duration} months
        </div>

        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-slate-400" />
          NQF Level {opportunity.nqfLevel}
        </div>
      </div>

      <p className="mt-5 line-clamp-2 text-sm leading-relaxed text-slate-500">
        {opportunity.description}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {opportunity.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div
            className={`flex items-center gap-2 text-xs ${
              daysRemaining <= 7
                ? 'font-semibold text-red-600'
                : 'text-slate-500'
            }`}
          >
            <CalendarDays size={15} />
            {daysRemaining === 0
              ? 'Closed'
              : `Closes in ${daysRemaining} days`}
          </div>

          <Link
            to={`/opportunities/${opportunity.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View details
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}