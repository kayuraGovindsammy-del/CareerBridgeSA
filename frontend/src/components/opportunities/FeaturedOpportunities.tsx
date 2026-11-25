import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import OpportunityCard from './OpportunityCard';

import { getFeaturedOpportunities } from '../../services/opportunityService';
import type { Opportunity } from '../../types/opportunity';

export default function FeaturedOpportunities() {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    getFeaturedOpportunities()
      .then((data) => {
        if (active) setOpportunities(data.slice(0, 3));
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="border-y border-slate-200 bg-slate-100/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Discover your future
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Featured opportunities
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Explore opportunities designed to help you take the
              next step in your professional journey.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="flex items-center gap-2 rounded-lg border border-brand-600 px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white"
          >
            View all opportunities
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">
            Loading opportunities...
          </p>
        ) : error ? (
          <p className="text-sm text-slate-500">
            Featured opportunities are currently unavailable.
          </p>
        ) : opportunities.length === 0 ? (
          <p className="text-sm text-slate-500">
            No featured opportunities available.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}