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

export interface AuthSignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthLoginPayload {
  login: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
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
  subtitle: string;
  description: string;
  features: string[];
}

export interface FoundationPillar {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export interface FoundationContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  pillars: FoundationPillar[];
}

export interface GovernLayersContent {
  title: string;
  subtitle: string;
  layers: GovernLayer[];
}

export interface IntroVideoContent {
  label: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  fallbackText: string;
}

export interface TrustedByLogo {
  name: string;
  text: string;
}

export interface TrustedByContent {
  label: string;
  logos: TrustedByLogo[];
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

export interface ComparisonRow {
  feature: string;
  us: boolean;
  them: boolean;
}

export interface ComparisonTableContent {
  ourFeatures: string[];
  legacyFeatures: string[];
  rows: ComparisonRow[];
}

export interface CmsContentItem {
  section: string;
  data: string | null;
}

export interface CmsUpdatePayload {
  section: string;
  data: unknown;
}
