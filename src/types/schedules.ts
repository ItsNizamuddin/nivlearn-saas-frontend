export interface CurrencyInfo {
  code?: string;
  symbol?: string;
}

export interface SchedulePricing {
  comparedPrice?: number;
  actualPrice?: number;
  currency?: CurrencyInfo;
}

export interface ScheduleCountry {
  name?: string;
  code?: string;
  timeZone?: string;
}

export interface ScheduleProduct {
  _id?: string;
  name?: string;
  slug?: string;
}

export interface ScheduleModule {
  title?: string;
}

export interface ScheduleData {
  _id?: string;
  id?: string;
  code?: string;
  status?: string;
  pricingTemplateId?: string | null;
  startsAt: string;
  endsAt?: string;
  isFlexibleSchedule?: boolean;
  commenceDate?: string;
  commencedAt?: string;
  commencedDate?: string;
  commencementDate?: string;
  commence_date?: string;
  duration?: string;
  deliveryType?: 'online' | 'virtual' | 'classroom' | 'blended' | string;
  batchType?: 'weekend' | 'weekday' | string;
  categorySlug?: string;
  enableRecommend?: boolean;
  fillingFast?: string | boolean;
  totalSessions?: number;
  sessionsDates?: string[];
  product?: ScheduleProduct;
  marketplaceProduct?: ScheduleProduct;
  country?: ScheduleCountry;
  currency?: CurrencyInfo;
  filteredPricing?: SchedulePricing[];
  projects?: string[];
  modules?: ScheduleModule[];
  venu?: string;
  description?: string;
}

export interface SchedulePagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasMore: boolean;
  count?: number;
}

export interface SchedulesResponse {
  schedules?: ScheduleData[];
  pagination?: Partial<SchedulePagination>;
  count?: number;
}

