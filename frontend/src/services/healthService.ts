import { api } from './api';

export interface ApiHealth {
  service: string;
  version: string;
  status: string;
  environment: string;
  timestamp: string;
  uptime: number;
}

export function getApiHealth(): Promise<ApiHealth> {
  return api.get<ApiHealth>('/health');
}