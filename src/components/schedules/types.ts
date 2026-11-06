/** A price in one currency. `amount` is what the learner pays; `listAmount` is the struck-through price. */
export interface Money {
  amount: number;
  listAmount?: number;
  currency: string;
  symbol: string;
}

export interface ScheduleTrainer {
  name: string;
  photo?: string;
  experience?: string;
}

/** A training batch, cleaned up from the CMS `/schedules` payload. */
export interface Schedule {
  code: string;
  courseId?: string;
  courseName: string;
  courseSlug?: string;
  description?: string;
  /** online | classroom | blended */
  deliveryType?: string;
  /** weekday | weekend | daily */
  batchType?: string;
  scheduleType?: string;
  venue?: string;
  countryName?: string;
  /** The batch country's own zone (set in the CMS); used for tax, never the viewer's zone. */
  countryTimeZone?: string;
  /** Zone the start / end wall times are written in. */
  timeZone?: string;
  /** No fixed dates: the learner picks a start date with the team. */
  flexible: boolean;
  /** Wall time in `timeZone`, e.g. "2026-10-05T10:00" (absent when flexible). */
  startsAt?: string;
  endsAt?: string;
  totalSessions?: number;
  /** Minutes per session. */
  sessionMinutes?: number;
  trainers: ScheduleTrainer[];
  fillingFast: boolean;
  recommended: boolean;
  jobAssistance: boolean;
  jobGuaranteed: boolean;
  skillLevels: string[];
  modules: string[];
  projects: string[];
  /** Set when the batch is sold in several plans (see PricingTemplate). */
  pricingTemplateId?: string;
  price?: Money;
}

export interface ScheduleList {
  schedules: Schedule[];
  page: number;
  hasMore: boolean;
}

export interface PricingPlan {
  name: string;
  prices: Money[];
}

export interface PricingFeature {
  label: string;
  /** Plan names that include this feature. */
  plans: string[];
}

export interface PricingTemplate {
  id: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  features: PricingFeature[];
}

export interface Coupon {
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  validTo?: string;
}

/** Filters the schedules list understands (all optional, kept in the URL). */
export interface ScheduleQuery {
  slug?: string;
  page?: number;
  limit?: number;
  currency?: string;
  timezone?: string;
  /** 1-12 */
  month?: string;
  year?: string;
  timings?: string;
  deliveryType?: string;
  batchType?: string;
}

export const SCHEDULE_PAGE_SIZE = 10;

/** URL keys the filter bar writes (and the list reads). */
export const FILTER_KEYS = ['month', 'year', 'timings', 'deliveryType', 'batchType'] as const;

const EURO_COUNTRIES = ['AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK'];

/**
 * Visitor country (from their IP) → currency to price batches in. Covers the
 * currencies the CMS supports; other countries get the API's USD fallback.
 */
export const COUNTRY_CURRENCY: Record<string, string> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
  SA: 'SAR',
  QA: 'QAR',
  SG: 'SGD',
  MY: 'MYR',
  AU: 'AUD',
  NZ: 'NZD',
  CA: 'CAD',
  CH: 'CHF',
  ZA: 'ZAR',
  PH: 'PHP',
  MV: 'MVR',
  VN: 'VND',
  ID: 'IDR',
  TH: 'THB',
  AF: 'AFN',
  LK: 'LKR',
  ET: 'ETB',
  ...Object.fromEntries(EURO_COUNTRIES.map((code) => [code, 'EUR'])),
};

/** Currency for a two-letter country code, if the CMS prices in it. */
export const currencyForCountry = (country?: string | null) => (country ? COUNTRY_CURRENCY[country.toUpperCase()] : undefined);
