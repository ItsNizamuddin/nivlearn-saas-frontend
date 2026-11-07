'use client';

import { ArrowLeft, ArrowRight, CalendarX2, Headset } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import InlineLeadForm from '@/components/forms/InlineLeadForm';
import { buttonClass } from '@/components/ui/button';
import { useLeadModal } from '@/context/LeadModalContext';
import { LEAD_FORMS } from '@/lib/leadForms';
import { cn } from '@/lib/utils';
import ScheduleCard from './ScheduleCard';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import ScheduleFilters from './ScheduleFilters';
import type { Schedule } from './types';
import { useSchedules } from './useSchedules';

/** A help strip shown after every few batches. */
const CTA_EVERY = 4;

function CardSkeleton() {
  return (
    <div aria-hidden className="animate-pulse rounded-2xl border border-border-muted bg-surface p-5 xl:grid xl:grid-cols-[1.3fr_1fr_0.8fr_1fr_8rem] xl:gap-5">
      <div className="h-20 rounded-xl bg-sec-prime" />
      <div className="mt-4 h-14 rounded-lg bg-sec-prime xl:mt-0" />
      <div className="mt-4 h-14 rounded-lg bg-sec-prime xl:mt-0" />
      <div className="mt-4 h-20 rounded-xl bg-sec-prime xl:mt-0" />
      <div className="mt-4 h-20 rounded-lg bg-sec-prime xl:mt-0" />
    </div>
  );
}

function HelpStrip({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl bg-prime-dark p-5 text-on-dark sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-on-dark/10 text-prime-yellow">
          <Headset className="size-5" />
        </span>
        <div>
          <p className="font-heading text-lg font-bold">Not sure which batch suits you?</p>
          <p className="text-sm text-on-dark/75">Talk to an advisor about timings, plans and group pricing.</p>
        </div>
      </div>
      <button type="button" onClick={onClick} className={buttonClass('accent', 'md', 'shrink-0')}>
        Talk to an Advisor
      </button>
    </div>
  );
}

/** Filters + batch list for one course (`courseSlug`) or all courses. */
export default function ScheduleBrowser({ courseSlug }: { courseSlug?: string }) {
  const { list, loading, error } = useSchedules(courseSlug);
  const { openModal } = useLeadModal();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Schedule | null>(null);
  const [view, setView] = useState<'details' | 'plans'>('details');

  const openDetails = (schedule: Schedule, nextView: 'details' | 'plans') => {
    setView(nextView);
    setSelected(schedule);
  };

  const openQuote = (schedule?: Schedule) =>
    openModal({
      ...LEAD_FORMS.schedule,
      ...(schedule && {
        formTitle: `Get a Quote for ${schedule.courseName}`,
        defaultValues: { ...LEAD_FORMS.schedule.defaultValues, courseSlug: schedule.courseSlug },
      }),
    });

  const pageHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) params.set('page', String(page));
    else params.delete('page');
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const schedules = list?.schedules ?? [];
  const page = list?.page ?? 1;

  return (
    <div className="space-y-5">
      <ScheduleFilters />

      <div aria-live="polite" aria-busy={loading} className="space-y-4">
        {loading ? (
          <>
            <span className="sr-only">Loading batches…</span>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : error ? (
          <p role="alert" className="rounded-2xl border border-border-muted bg-surface p-8 text-center text-sm text-text-muted">
            Couldn&apos;t load the batches right now. Please refresh the page or try again later.
          </p>
        ) : schedules.length === 0 ? (
          <div className="grid overflow-hidden rounded-2xl border border-border-muted bg-surface lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-center bg-prime-dark p-6 text-on-dark sm:p-10">
              <CalendarX2 aria-hidden className="size-10 text-prime-yellow" />
              <h2 className="mt-5 font-heading text-2xl font-bold">No batches match right now</h2>
              <p className="mt-3 text-sm leading-relaxed text-on-dark/80">
                New batches open often. Leave your details and we&apos;ll tell you when the next one starts, or set up dates that suit you.
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <InlineLeadForm form="schedule" />
            </div>
          </div>
        ) : (
          schedules.map((schedule, i) => (
            <Fragment key={schedule.code}>
              <ScheduleCard schedule={schedule} showCourse={!courseSlug} onDetails={openDetails} onQuote={openQuote} />
              {(i + 1) % CTA_EVERY === 0 && i !== schedules.length - 1 && <HelpStrip onClick={() => openModal(LEAD_FORMS.advisor)} />}
            </Fragment>
          ))
        )}
      </div>

      {!loading && (page > 1 || list?.hasMore) && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-3 pt-2">
          <Link
            href={pageHref(page - 1)}
            scroll={false}
            aria-disabled={page <= 1}
            className={cn(buttonClass('outline', 'md'), page <= 1 && 'pointer-events-none opacity-40')}
          >
            <ArrowLeft aria-hidden className="size-4" /> Previous
          </Link>
          <span className="text-sm font-medium text-text-muted">Page {page}</span>
          <Link
            href={pageHref(page + 1)}
            scroll={false}
            aria-disabled={!list?.hasMore}
            className={cn(buttonClass('primary', 'md'), !list?.hasMore && 'pointer-events-none opacity-40')}
          >
            Next <ArrowRight aria-hidden className="size-4" />
          </Link>
        </nav>
      )}

      <ScheduleDetailsDialog schedule={selected} view={view} onViewChange={setView} onClose={() => setSelected(null)} />
    </div>
  );
}
