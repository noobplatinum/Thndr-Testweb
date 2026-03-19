export interface PlatformStat {
  id: number;
  label: string;
  value: string;
  icon: string | null;
  sortOrder: number;
}

export interface CustomerStory {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  metricLabel: string | null;
  metricValue: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface DemoRequestPayload {
  name: string;
  email: string;
  company: string;
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
  details?: Array<{ field: string; message: string }>;
}

export interface PainPoint {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface GovernLayer {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
}

export interface ServiceStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface ComparisonFeature {
  feature: string;
  thndr: string;
  vendorLocked: boolean;
}
