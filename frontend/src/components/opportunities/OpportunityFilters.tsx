import { SlidersHorizontal } from 'lucide-react';

import type {
  OpportunityFilter,
  OpportunityType,
  Province,
} from '../../types/opportunity';

import { defaultFilters } from '../../services/opportunityService';

interface Props {
  filters: OpportunityFilter;
  sectors: string[];
  onChange: (filters: OpportunityFilter) => void;
}

const types: OpportunityType[] = [
  'learnership',
  'internship',
  'apprenticeship',
];

const provinces: Province[] = [
  'Gauteng',
  'Western Cape',
  'Eastern Cape',
  'KwaZulu-Natal',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
];

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

interface FilterGroupProps<T extends string | number> {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
  formatLabel?: (value: T) => string;
}

function FilterGroup<T extends string | number>({
  title,
  options,
  selected,
  onToggle,
  formatLabel,
}: FilterGroupProps<T>) {
  return (
    <fieldset className="border-t border-slate-100 py-5">
      <legend className="sr-only">{title}</legend>

      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 hover:text-brand-600"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 rounded accent-teal-600"
            />

            <span className="capitalize">
              {formatLabel ? formatLabel(option) : option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function OpportunityFilters({
  filters,
  sectors,
  onChange,
}: Props) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={19} className="text-brand-600" />

          <h2 className="font-bold text-slate-900">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              ...defaultFilters,
              search: filters.search,
              location: filters.location,
            })
          }
          className="text-xs font-semibold text-brand-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <FilterGroup
        title="Opportunity type"
        options={types}
        selected={filters.types}
        onToggle={(value) =>
          onChange({
            ...filters,
            types: toggleValue(filters.types, value),
          })
        }
      />

      <FilterGroup
        title="Province"
        options={provinces}
        selected={filters.provinces}
        onToggle={(value) =>
          onChange({
            ...filters,
            provinces: toggleValue(filters.provinces, value),
          })
        }
      />

      <FilterGroup
        title="Industry sector"
        options={sectors}
        selected={filters.sectors}
        onToggle={(value) =>
          onChange({
            ...filters,
            sectors: toggleValue(filters.sectors, value),
          })
        }
      />

      <FilterGroup
        title="NQF level (demo)"
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        selected={filters.nqfLevels}
        formatLabel={(value) => `Level ${value}`}
        onToggle={(value) =>
          onChange({
            ...filters,
            nqfLevels: toggleValue(filters.nqfLevels, value),
          })
        }
      />

      <div className="border-t border-slate-100 pt-5">
        <label
          htmlFor="stipend-filter"
          className="text-sm font-semibold text-slate-900"
        >
          Minimum monthly stipend
        </label>

        <p className="mt-3 text-lg font-bold text-brand-600">
          R{filters.minStipend.toLocaleString('en-ZA')}
        </p>

        <input
          id="stipend-filter"
          type="range"
          min={0}
          max={10000}
          step={500}
          value={filters.minStipend}
          onChange={(event) =>
            onChange({
              ...filters,
              minStipend: Number(event.target.value),
            })
          }
          className="mt-4 w-full accent-teal-600"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>R0</span>
          <span>R10,000</span>
        </div>
      </div>
    </aside>
  );
}