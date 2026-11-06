import 'server-only';
import { fetchFromBackend } from '@/lib/apiProxy';
import { isValidTimeZone } from '@/lib/scheduleTime';
import {
  SCHEDULE_PAGE_SIZE,
  type Coupon,
  type Money,
  type PricingTemplate,
  type Schedule,
  type ScheduleList,
  type ScheduleQuery,
} from '@/components/schedules/types';

/*
 * Content API `/schedules` (+ pricing templates, coupons, taxes).
 * Payloads are tenant-entered CMS data, so every field is checked here once and the
 * components get clean, typed objects.
 */

type Raw = Record<string, unknown>;

const isRecord = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const num = (v: unknown) => {
  const n = typeof v === 'string' && v.trim() ? Number(v) : v;
  return typeof n === 'number' && Number.isFinite(n) ? n : undefined;
};
const positive = (v: unknown) => {
  const n = num(v);
  return n !== undefined && n > 0 ? n : undefined;
};
const strings = (v: unknown) =>
  Array.isArray(v) ? v.map((item) => str(isRecord(item) ? item.title ?? item.name : item)).filter((s): s is string => !!s) : [];
const validDate = (v: unknown) => {
  const s = str(v);
  return s && !Number.isNaN(new Date(s).getTime()) ? s : undefined;
};
const safeUrl = (v: unknown) => {
  const s = str(v);
  if (!s) return undefined;
  if (s.startsWith('/') && !s.startsWith('//')) return s;
  try {
    return ['https:', 'http:'].includes(new URL(s).protocol) ? s : undefined;
  } catch {
    return undefined;
  }
};

/**
 * The CMS stores two prices without a fixed meaning (`comparedPrice` is sometimes the
 * sale price, sometimes the list price): the lower one is charged, the higher one is struck through.
 */
function toMoney(raw: unknown): Money | undefined {
  if (!isRecord(raw)) return undefined;
  const values = [positive(raw.comparedPrice), positive(raw.actualPrice)].filter((n): n is number => n !== undefined);
  if (!values.length) return undefined;
  const amount = Math.min(...values);
  const high = Math.max(...values);
  const currency = isRecord(raw.currency) ? raw.currency : {};
  return {
    amount,
    listAmount: high > amount ? high : undefined,
    currency: str(currency.code) ?? 'USD',
    symbol: str(currency.symbol) ?? '',
  };
}

function toSchedule(raw: unknown, viewerZone?: string): Schedule | null {
  if (!isRecord(raw)) return null;
  const code = str(raw.code);
  const product = isRecord(raw.product) ? raw.product : {};
  if (!code) return null;
  const country = isRecord(raw.country) ? raw.country : {};
  const flexible = raw.isFlexibleSchedule === true || raw.isFlexibleSchedule === 'true';
  const countryZone = str(country.timeZone);
  const countryTimeZone = isValidTimeZone(countryZone) ? countryZone : undefined;
  // With `timezone` the API converts dates into that zone.
  const timeZone = viewerZone ?? countryTimeZone;
  const trainers = (Array.isArray(raw.trainer) ? raw.trainer : isRecord(raw.trainer) ? [raw.trainer] : [])
    .filter(isRecord)
    .map((t) => ({
      name: str(t.name) ?? '',
      photo: safeUrl(isRecord(t.photo) ? t.photo.url : t.photo),
      experience: str(t.experience),
    }))
    .filter((t) => t.name);

  return {
    code,
    courseId: str(product._id),
    courseName: str(product.name) ?? 'Training Program',
    courseSlug: str(product.slug),
    description: str(raw.description),
    deliveryType: str(raw.deliveryType)?.toLowerCase(),
    batchType: str(raw.batchType)?.toLowerCase(),
    scheduleType: str(raw.scheduleType),
    venue: str(raw.venu) ?? str(raw.venue),
    countryName: str(country.name),
    countryTimeZone,
    timeZone,
    flexible,
    // A flexible batch keeps stale dates from before it was made flexible.
    startsAt: flexible ? undefined : validDate(raw.startsAt),
    endsAt: flexible ? undefined : validDate(raw.endsAt),
    totalSessions: positive(raw.totalSessions),
    sessionMinutes: positive(raw.duration),
    trainers,
    fillingFast: raw.enableFastfilling === true,
    recommended: raw.enableRecommend === true,
    jobAssistance: raw.jobAssistance === true,
    jobGuaranteed: raw.jobGuaranteed === true,
    skillLevels: strings(raw.skillLevels),
    modules: strings(raw.modules),
    projects: strings(raw.projects),
    pricingTemplateId: str(raw.pricingTemplateId),
    price: Array.isArray(raw.filteredPricing) ? toMoney(raw.filteredPricing[0]) : undefined,
  };
}

const CURRENCY = /^[A-Z]{3}$/;
const ENUMS: Partial<Record<keyof ScheduleQuery, readonly string[]>> = {
  deliveryType: ['classroom', 'online', 'blended'],
  batchType: ['weekend', 'weekday', 'daily'],
  timings: ['earlymorning', 'morning', 'afternoon', 'evening'],
};

/** Only known filters with valid values reach the backend. */
export function cleanQuery(input: Record<string, string | undefined>): ScheduleQuery {
  const query: ScheduleQuery = {};
  const slug = input.slug?.trim();
  if (slug && /^[a-z0-9-]{1,120}$/i.test(slug)) query.slug = slug;
  const page = Number.parseInt(input.page ?? '', 10);
  if (page > 1 && page < 500) query.page = page;
  const limit = Number.parseInt(input.limit ?? '', 10);
  if (limit > 0 && limit <= 50) query.limit = limit;
  const currency = input.currency?.toUpperCase();
  if (currency && CURRENCY.test(currency)) query.currency = currency;
  if (isValidTimeZone(input.timezone)) query.timezone = input.timezone;
  const month = Number.parseInt(input.month ?? '', 10);
  if (month >= 1 && month <= 12) query.month = String(month);
  const year = Number.parseInt(input.year ?? '', 10);
  if (year >= 2000 && year <= 2100) query.year = String(year);
  for (const key of ['deliveryType', 'batchType', 'timings'] as const) {
    const value = input[key]?.toLowerCase();
    if (value && ENUMS[key]?.includes(value)) query[key] = value;
  }
  return query;
}

/** Backend `/schedules` search params for a cleaned query. */
export function scheduleParams(query: ScheduleQuery) {
  const params = new URLSearchParams({ page: String(query.page ?? 1), limit: String(query.limit ?? SCHEDULE_PAGE_SIZE), sort: 'startsAt' });
  for (const key of ['slug', 'currency', 'timezone', 'month', 'year', 'timings', 'deliveryType', 'batchType'] as const) {
    const value = query[key];
    if (value) params.set(key, String(value));
  }
  return params;
}

export async function getSchedules(query: ScheduleQuery): Promise<ScheduleList> {
  const page = query.page ?? 1;
  try {
    const res = await fetchFromBackend('/schedules', { queryParams: scheduleParams(query), next: { revalidate: 300, tags: ['schedules'] } });
    if (!res.ok) throw new Error(`Schedules failed: ${res.status}`);
    const data: unknown = await res.json();
    const raw = isRecord(data) && Array.isArray(data.schedules) ? data.schedules : [];
    const pagination = isRecord(data) && isRecord(data.pagination) ? data.pagination : {};
    return {
      schedules: raw.map((s) => toSchedule(s, query.timezone)).filter((s): s is Schedule => s !== null),
      page,
      hasMore: pagination.hasMore === true,
    };
  } catch (error) {
    console.error('[schedules]', error);
    return { schedules: [], page, hasMore: false };
  }
}

/** One batch by its code, priced in `currency` (the API falls back to USD). */
export async function getScheduleByCode(code: string, currency?: string, timezone?: string): Promise<Schedule | null> {
  if (!/^[A-Za-z0-9-]{3,40}$/.test(code)) return null;
  const params = new URLSearchParams({ code, limit: '1' });
  if (currency && CURRENCY.test(currency)) params.set('currency', currency);
  if (isValidTimeZone(timezone)) params.set('timezone', timezone);
  try {
    const res = await fetchFromBackend('/schedules', { queryParams: params, cache: 'no-store' });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const first = isRecord(data) && Array.isArray(data.schedules) ? data.schedules[0] : null;
    const schedule = toSchedule(first, isValidTimeZone(timezone) ? timezone : undefined);
    return schedule?.code === code ? schedule : null;
  } catch (error) {
    console.error('[schedules] by code', error);
    return null;
  }
}

/** Course name for a slug (from its first batch), for page titles. */
export async function getScheduleCourseName(slug: string) {
  const { schedules } = await getSchedules({ slug, limit: 1 });
  return schedules[0]?.courseName;
}

export async function getPricingTemplate(id: string): Promise<PricingTemplate | null> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;
  try {
    const res = await fetchFromBackend(`/schedules/pricing-templates/${id}`, { next: { revalidate: 300, tags: ['schedules'] } });
    if (!res.ok) return null;
    const raw: unknown = await res.json();
    if (!isRecord(raw)) return null;
    const plans = (Array.isArray(raw.plans) ? raw.plans : []).filter(isRecord).map((plan) => ({
      name: str(plan.planName) ?? 'Standard',
      prices: (Array.isArray(plan.pricing) ? plan.pricing : []).map(toMoney).filter((m): m is Money => !!m),
    })).filter((plan) => plan.prices.length);
    const features = (Array.isArray(raw.features) ? raw.features : []).filter(isRecord).map((feature) => ({
      label: str(feature.label) ?? '',
      plans: (Array.isArray(feature.perPlan) ? feature.perPlan : [])
        .filter((p): p is Raw => isRecord(p) && p.enabled === true)
        .map((p) => str(p.planName))
        .filter((name): name is string => !!name),
    })).filter((feature) => feature.label);
    return { id, title: str(raw.title) ?? str(raw.name) ?? 'Pricing plans', description: str(raw.description), plans, features };
  } catch (error) {
    console.error('[schedules] pricing template', error);
    return null;
  }
}

export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    const res = await fetchFromBackend('/coupons/active', { next: { revalidate: 300, tags: ['coupons'] } });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const raw = isRecord(data) && Array.isArray(data.coupons) ? data.coupons : [];
    return raw.filter(isRecord).flatMap((c) => {
      const code = str(c.code);
      const discountValue = positive(c.discountValue);
      if (!code || !discountValue) return [];
      return [{ code, description: str(c.description), discountType: str(c.discountType) ?? 'percentage', discountValue, validTo: validDate(c.validTo) }];
    });
  } catch {
    return [];
  }
}

export interface TaxConfig {
  percentage: number;
  label: string;
  isInclusive: boolean;
}

export async function getTaxConfig(currency: string, timezone: string): Promise<TaxConfig> {
  const fallback = { percentage: 0, label: 'Tax', isInclusive: false };
  if (!CURRENCY.test(currency) || !isValidTimeZone(timezone)) return fallback;
  try {
    const params = new URLSearchParams({ currency, timezone });
    const res = await fetchFromBackend('/schedules/helpers/country-taxes', { queryParams: params, next: { revalidate: 3600, tags: ['schedules', 'country-taxes'] } });
    if (!res.ok) return fallback;
    const data: unknown = await res.json();
    const first = isRecord(data) && Array.isArray(data.data) ? data.data[0] : null;
    const tax = isRecord(first) && isRecord(first.tax) ? first.tax : null;
    if (!tax) return fallback;
    const percentage = num(tax.percentage);
    return {
      percentage: percentage !== undefined && percentage >= 0 && percentage <= 100 ? percentage : 0,
      label: str(tax.label) ?? 'Tax',
      isInclusive: tax.isInclusive === true,
    };
  } catch {
    return fallback;
  }
}
