import { opportunities } from '../data/opportunities';

import type {
  Opportunity,
  OpportunityFilter,
  OpportunitySort,
} from '../types/opportunity';

export const defaultFilters: OpportunityFilter = {
  search: '',
  location: '',
  types: [],
  provinces: [],
  sectors: [],
  nqfLevels: [],
  minStipend: 0,
};

export async function getOpportunities(
  filters: OpportunityFilter = defaultFilters,
  sort: OpportunitySort = 'latest',
): Promise<Opportunity[]> {
  const search = filters.search.trim().toLowerCase();
  const location = filters.location.trim().toLowerCase();

  const results = opportunities.filter((opportunity) => {
    const searchableText = [
      opportunity.title,
      opportunity.company,
      opportunity.description,
      opportunity.sector,
      ...opportunity.skills,
    ]
      .join(' ')
      .toLowerCase();

    const locationText = [
      opportunity.city,
      opportunity.province,
      opportunity.workMode,
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!search || searchableText.includes(search)) &&
      (!location || locationText.includes(location)) &&
      (
        filters.types.length === 0 ||
        filters.types.includes(opportunity.type)
      ) &&
      (
        filters.provinces.length === 0 ||
        filters.provinces.includes(opportunity.province)
      ) &&
      (
        filters.sectors.length === 0 ||
        filters.sectors.includes(opportunity.sector)
      ) &&
      (
        filters.nqfLevels.length === 0 ||
        filters.nqfLevels.includes(opportunity.nqfLevel)
      ) &&
      opportunity.stipend >= filters.minStipend &&
      new Date(opportunity.closingDate).getTime() > Date.now()
    );
  });

  return results.sort((a, b) => {
    switch (sort) {
      case 'stipend-high':
        return b.stipend - a.stipend;

      case 'stipend-low':
        return a.stipend - b.stipend;

      case 'closing-soon':
        return (
          new Date(a.closingDate).getTime() -
          new Date(b.closingDate).getTime()
        );

      default:
        return (
          new Date(b.postedDate).getTime() -
          new Date(a.postedDate).getTime()
        );
    }
  });
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | undefined> {
  return opportunities.find((opportunity) => opportunity.id === id);
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  const results = await getOpportunities();

  return results.filter((opportunity) => opportunity.featured);
}

export async function getOpportunitySectors(): Promise<string[]> {
  return [...new Set(opportunities.map((item) => item.sector))].sort();
}