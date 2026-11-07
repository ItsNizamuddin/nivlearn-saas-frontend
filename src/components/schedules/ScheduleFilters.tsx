'use client';

import { CalendarDays, Clock, FilterX } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Dropdown from '@/components/ui/Dropdown';
import { FILTER_KEYS } from './types';

const TIMINGS = [
  { value: 'earlymorning', label: 'Early morning' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

const PILLS = [
  { key: 'batchType', value: 'weekday', label: 'Weekdays' },
  { key: 'batchType', value: 'weekend', label: 'Weekends' },
  { key: 'deliveryType', value: 'online', label: 'Online' },
  { key: 'deliveryType', value: 'classroom', label: 'Classroom' },
  { key: 'deliveryType', value: 'blended', label: 'Blended' },
] as const;

/** The next 12 months as "month-year" options. */
function upcomingMonths() {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    return {
      value: `${date.getMonth() + 1}-${date.getFullYear()}`,
      label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
  });
}

/** Filter bar for the schedules list; every choice lives in the URL. */
export default function ScheduleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [months] = useState(upcomingMonths);

  const update = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete('page');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const month =
    searchParams.get('month') && searchParams.get('year')
      ? `${searchParams.get('month')}-${searchParams.get('year')}`
      : '';
  const hasFilters = FILTER_KEYS.some((key) => searchParams.get(key));

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-muted bg-surface p-3 shadow-sm sm:p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {/* ── Month picker ── */}
        <Dropdown
          label="Month"
          icon={<CalendarDays className="size-4" />}
          placeholder="Any month"
          value={month}
          options={months}
          onChange={(value) => {
            const [m, y] = value ? value.split('-') : [null, null];
            update({ month: m, year: y });
          }}
        />

        {/* ── Timing picker ── */}
        <Dropdown
          label="Timing"
          icon={<Clock className="size-4" />}
          placeholder="Any time"
          value={searchParams.get('timings') ?? ''}
          options={TIMINGS}
          onChange={(value) => update({ timings: value })}
        />

        {/* ── Batch / delivery type pills ── */}
        <div role="group" aria-label="Batch type and delivery" className="flex flex-wrap gap-2">
          {PILLS.map((pill) => {
            const active = searchParams.get(pill.key) === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                aria-pressed={active}
                onClick={() => update({ [pill.key]: active ? null : pill.value })}
                className={cn(
                  'min-h-10 cursor-pointer rounded-lg border px-4 text-sm font-medium transition-colors',
                  active
                    ? 'border-prime bg-light font-semibold text-prime'
                    : 'border-border-muted bg-surface text-text-muted hover:border-prime/50 hover:text-prime-dark',
                )}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Clear all ── */}
      {hasFilters && (
        <button
          type="button"
          onClick={() => update({ month: null, year: null, timings: null, batchType: null, deliveryType: null })}
          className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-1.5 self-start rounded-lg px-3 text-sm font-medium text-danger hover:bg-danger/5 lg:self-auto"
        >
          <FilterX aria-hidden className="size-4" /> Clear filters
        </button>
      )}
    </div>
  );
}
