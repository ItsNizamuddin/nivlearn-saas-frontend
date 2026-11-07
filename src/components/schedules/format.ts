import { CloudSun, Moon, Sun, Sunrise, type LucideIcon } from 'lucide-react';
import {
  dayPeriod,
  formatDay,
  formatShortDay,
  formatTime,
  hourIn,
  scheduleWindow,
  zoneAbbreviation,
  type DayPeriod,
} from '@/lib/scheduleTime';
import type { Money, PricingPlan, Schedule } from './types';

export const DELIVERY_LABELS: Record<string, string> = {
  online: 'Live Online',
  classroom: 'Classroom',
  blended: 'Classroom + Online',
};

export const BATCH_LABELS: Record<string, { label: string; days: string }> = {
  weekday: { label: 'Weekday batch', days: 'Mon – Fri' },
  weekend: { label: 'Weekend batch', days: 'Sat & Sun' },
  daily: { label: 'Daily batch', days: 'Every day' },
};

export const PERIODS: Record<DayPeriod, { label: string; icon: LucideIcon }> = {
  'early-morning': { label: 'Early morning', icon: Sunrise },
  morning: { label: 'Morning', icon: Sun },
  afternoon: { label: 'Afternoon', icon: CloudSun },
  evening: { label: 'Evening', icon: Moon },
};

export const deliveryLabel = (type?: string) => (type && DELIVERY_LABELS[type]) || 'Live training';

/** Dates, daily time and period of a batch, as the viewer sees them (times are already in `schedule.timeZone`). */
export function scheduleTiming(schedule: Schedule) {
  const zone = schedule.timeZone ?? 'UTC';
  const window = schedule.flexible ? null : scheduleWindow(schedule);
  if (!window) {
    return { flexible: true as const, dates: 'Flexible start date', time: 'Timing as per your choice', zone: null, period: null };
  }
  const { start, lastDay, sessionEnd } = window;
  const sameDay = formatDay(start, zone) === formatDay(lastDay, zone);
  return {
    flexible: false as const,
    dates: sameDay ? formatDay(start, zone) : `${formatShortDay(start, zone)} – ${formatDay(lastDay, zone)}`,
    startDate: formatDay(start, zone),
    endDate: formatDay(lastDay, zone),
    time: sessionEnd ? `${formatTime(start, zone)} – ${formatTime(sessionEnd, zone)}` : formatTime(start, zone),
    zone: zoneAbbreviation(start, zone),
    period: PERIODS[dayPeriod(hourIn(start, zone))],
  };
}

/** A plan's price in `currency`, falling back to its first price. */
export function planPrice(plan: PricingPlan, currency?: string) {
  return plan.prices.find((p) => p.currency === currency) ?? plan.prices[0];
}

export function discountPercent(price?: Money) {
  if (!price?.listAmount) return 0;
  return Math.round((1 - price.amount / price.listAmount) * 100);
}

export function checkoutHref(schedule: Schedule, options: { currency?: string; plan?: string; timezone?: string } = {}) {
  const params = new URLSearchParams({ schedule: schedule.code });
  const currency = options.currency ?? schedule.price?.currency;
  if (currency) params.set('currency', currency);
  if (options.plan) params.set('plan', options.plan);
  if (options.timezone ?? schedule.timeZone) params.set('tz', (options.timezone ?? schedule.timeZone)!);
  return `/checkout?${params}`;
}
