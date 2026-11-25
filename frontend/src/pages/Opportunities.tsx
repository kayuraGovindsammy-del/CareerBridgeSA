import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Search,
  MapPin,
  SlidersHorizontal,
  Bookmark,
  SearchX,
  LoaderCircle,
} from 'lucide-react';

import OpportunityCard from '../components/opportunities/OpportunityCard';
import OpportunityFilters from '../components/opportunities/OpportunityFilters';

import {
  defaultFilters,
  getOpportunities,
  getOpportunitySectors,
} from '../services/opportunityService';

import { useSavedOpportunities } from '../hooks/useSavedOpportunities';

import type {
  Opportunity,
  OpportunityFilter,
  OpportunitySort,
} from '../types/opportunity';

export default function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] =
    useState<OpportunityFilter>(defaultFilters);

  const [results, setResults] = useState<Opportunity[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [sort, setSort] = useState<OpportunitySort>('latest');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  const { savedIds } = useSavedOpportunities();

  const urlSearch = searchParams.get('search') ?? '';
  const urlLocation = searchParams.get('location') ?? '';
  const urlType = searchParams.get('type');

  const [keyword, setKeyword] = useState(urlSearch);
  const [location, setLocation] = useState(urlLocation);

  useEffect(() => {
    setKeyword(urlSearch);
    setLocation(urlLocation);

    setFilters((previous) => ({
      ...previous,
      search: urlSearch,
      location: urlLocation,
      types:
        urlType === 'learnership' ||
        urlType === 'internship' ||
        urlType === 'apprenticeship'
          ? [urlType]
          : previous.types.length > 1
            ? previous.types
            : [],
    }));
  }, [urlSearch, urlLocation, urlType]);

  useEffect(() => {
    let active = true;

    getOpportunitySectors()
      .then((data) => {
        if (active) setSectors(data);
      })
      .catch(() => {
        if (active) setError('Unable to load sectors.');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    getOpportunities(filters, sort)
      .then((data) => {
        if (active) setResults(data);
      })
      .catch(() => {
        if (active) {
          setError('Unable to load opportunities. Please try again.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filters, sort]);

  const visibleResults = savedOnly
    ? results.filter((item) => savedIds.includes(item.id))
    : results;

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set('search', keyword.trim());
    }

    if (location.trim()) {
      params.set('location', location.trim());
    }

    if (filters.types.length === 1) {
      params.set('type', filters.types[0]);
    }

    setSearchParams(params);

    setFilters((previous) => ({
      ...previous,
      search: keyword.trim(),
      location: location.trim(),
    }));
  }

  function handleFilterChange(updated: OpportunityFilter) {
    setFilters(updated);

    const params = new URLSearchParams(searchParams);

    if (updated.types.length === 1) {
      params.set('type', updated.types[0]);
    } else {
      params.delete('type');
    }

    setSearchParams(params, { replace: true });
  }

  function resetFilters() {
    setKeyword('');
    setLocation('');
    setFilters(defaultFilters);
    setSavedOnly(false);
    setSearchParams({});
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Search Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="mb-3 text-sm font-semibold text-teal-400">
            YOUR NEXT CHAPTER STARTS HERE
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Discover your next opportunity
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore learnerships, internships and apprenticeships
            that match your skills and career ambitions.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-4xl flex-col gap-2 rounded-xl bg-white p-2 sm:flex-row"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Job title, company or skill"
                aria-label="Search opportunities"
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-3 border-t border-slate-200 px-4 py-3 sm:border-l sm:border-t-0">
              <MapPin size={20} className="shrink-0 text-slate-400" />

              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or province"
                aria-label="Search location"
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Search opportunities
            </button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="mb-6 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          You are viewing demonstration opportunities.
          Live listings will be available once the backend is connected.
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Filters */}
          <div className={showFilters ? 'block' : 'hidden lg:block'}>
            <OpportunityFilters
              filters={filters}
              sectors={sectors}
              onChange={handleFilterChange}
            />
          </div>

          {/* Results */}
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {savedOnly ? 'Saved opportunities' : 'All opportunities'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {visibleResults.length} opportunities found
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  {showFilters ? 'Hide filters' : 'Filters'}
                </button>

                <button
                  type="button"
                  aria-pressed={savedOnly}
                  onClick={() => setSavedOnly(!savedOnly)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                    savedOnly
                      ? 'border-brand-500 bg-brand-50 text-brand-600'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <Bookmark size={16} />
                  Saved ({savedIds.length})
                </button>

                <select
                  aria-label="Sort opportunities"
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value as OpportunitySort)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-brand-500"
                >
                  <option value="latest">Latest first</option>
                  <option value="closing-soon">Closing soon</option>
                  <option value="stipend-high">Highest stipend</option>
                  <option value="stipend-low">Lowest stipend</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-64 items-center justify-center">
                <LoaderCircle
                  size={32}
                  className="animate-spin text-brand-600"
                />
              </div>
            ) : error ? (
              <div role="alert" className="rounded-xl bg-red-50 p-6 text-red-700">
                {error}
              </div>
            ) : visibleResults.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="rounded-full bg-slate-100 p-5 text-slate-400">
                  <SearchX size={36} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No opportunities found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Try changing your search terms or adjusting your filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {visibleResults.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}