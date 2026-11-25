export type OpportunityType =
  | 'learnership'
  | 'internship'
  | 'apprenticeship';

export type Province =
  | 'Gauteng'
  | 'Western Cape'
  | 'Eastern Cape'
  | 'KwaZulu-Natal'
  | 'Free State'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Northern Cape';

export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  sector: string;
  description: string;
  city: string;
  province: Province;
  workMode: WorkMode;
  stipend: number;
  duration: number;
  nqfLevel: number;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  closingDate: string;
  postedDate: string;
  featured: boolean;
  isDemo: boolean;
}

export interface OpportunityFilter {
  search: string;
  location: string;
  types: OpportunityType[];
  provinces: Province[];
  sectors: string[];
  nqfLevels: number[];
  minStipend: number;
}

export type OpportunitySort =
  | 'latest'
  | 'closing-soon'
  | 'stipend-high'
  | 'stipend-low';