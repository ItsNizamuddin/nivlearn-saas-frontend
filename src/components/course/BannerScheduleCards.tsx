'use client';

import React from 'react';
import { Calendar, Clock, Wifi, Laptop, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIpLocation } from '@/hooks/useIpLocation';
import { useSchedules } from '@/hooks/useSchedules';
import { viewerTimeZone } from '@/lib/scheduleTime';
import { useLeadModal } from '@/context/LeadModalContext';
import type { ScheduleData } from '@/types/schedules';
import LeadForm from '@/components/forms/LeadForm';

interface BannerScheduleCardsProps {
  courseSlug: string;
  courseTitle: string;
}

function formatSingleDate(dateString?: string): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatScheduleDate(startsAt: string, endsAt?: string): string {
  if (!startsAt) return 'Flexible Batches Available';
  const start = new Date(startsAt);
  if (isNaN(start.getTime())) return startsAt;
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (!endsAt) return startFormatted;
  const end = new Date(endsAt);
  if (isNaN(end.getTime())) return startFormatted;
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return startFormatted === endFormatted ? startFormatted : `${startFormatted} – ${endFormatted}`;
}

function formatScheduleTime(startsAt: string, endsAt?: string, timezone?: string): string {
  if (!startsAt) return '';
  const start = new Date(startsAt);
  if (isNaN(start.getTime())) return '';
  const tz = timezone || 'Asia/Kolkata';

  try {
    const opts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: tz,
    };
    const startFormatted = start.toLocaleTimeString('en-US', opts);
    if (!endsAt) return `${startFormatted} (${tz})`;
    const end = new Date(endsAt);
    if (isNaN(end.getTime())) return `${startFormatted} (${tz})`;
    const endFormatted = end.toLocaleTimeString('en-US', opts);
    return `${startFormatted} – ${endFormatted} (${tz})`;
  } catch {
    const startFormatted = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${startFormatted} (${tz})`;
  }
}

export default function BannerScheduleCards({ courseSlug, courseTitle }: BannerScheduleCardsProps) {
  const { schedules, pagination, loadingSchedules } = useSchedules(courseSlug, { limit: 50 });
  const { openModal } = useLeadModal();
  const router = useRouter();
  const { data: geo } = useIpLocation();

  const handleEnrollClick = (schedule?: ScheduleData) => {
    // Priced batch → checkout (multi-plan batches → plan picker on the schedules page).
    const pricing = schedule?.filteredPricing?.[0];
    if (schedule?.code && pricing) {
      if (schedule.pricingTemplateId) {
        router.push(`/schedules/${courseSlug}`);
        return;
      }
      const params = new URLSearchParams({ schedule: schedule.code });
      if (pricing.currency?.code) params.set('currency', pricing.currency.code);
      params.set('tz', viewerTimeZone(geo?.timezone));
      router.push(`/checkout?${params}`);
      return;
    }

    const rawCommence =
      schedule?.commenceDate ||
      schedule?.commencedDate ||
      schedule?.commencementDate ||
      schedule?.commencedAt ||
      schedule?.commence_date;
    const commenceFormatted = formatSingleDate(rawCommence);

    const dateLabel = schedule?.isFlexibleSchedule
      ? `Flexible Dates / Student's Choice${commenceFormatted ? ` (Starts from ${commenceFormatted})` : ''}`
      : formatScheduleDate(schedule?.startsAt || '', schedule?.endsAt);

    const batchInfo = schedule
      ? `${schedule.batchType ? `${schedule.batchType.toUpperCase()} ` : ''}${dateLabel} (${schedule.code || 'BATCH'})`
      : 'Upcoming Batch';

    openModal({
      formTitle: `Enroll in ${courseTitle}`,
      formDescription: `Reserve your seat for the upcoming ${batchInfo}. Complete the form below to secure your spot.`,
      defaultValues: {
        leadSource: `course-banner-schedule-${courseSlug}`,
        courseSlug,
        purpose: `Enroll: ${batchInfo}`,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  const handleEnquireCustom = () => {
    openModal({
      formTitle: `Custom Batch Enquiry: ${courseTitle}`,
      formDescription: 'Speak with our academic advisors to request tailored timings, weekend fast-track cohorts, or corporate group batches.',
      defaultValues: {
        leadSource: `course-banner-custom-batch-${courseSlug}`,
        courseSlug,
        purpose: 'Custom Batch Enquiry',
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  if (loadingSchedules) {
    return (
      <div className="w-full bg-white/80 backdrop-blur-sm border-2 border-prime/20 rounded-lg p-5 shadow-sm space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-5 w-36 bg-slate-200 rounded-md" />
          <div className="h-4 w-20 bg-slate-100 rounded-md" />
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 w-20 bg-slate-200 rounded" />
              <div className="h-8 w-24 bg-slate-300 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const activeSchedules = (schedules || []).filter((s) => s.status !== 'draft');
  const moreBatches = (pagination?.total || activeSchedules.length) - 2;

  if (activeSchedules.length === 0) {
    return (
      <div className="w-full bg-white/95 backdrop-blur-sm border-2 border-prime/20 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-prime/10 flex items-center justify-center text-prime shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-prime-dark font-bold text-sm sm:text-base leading-tight">Upcoming Batches</h3>
              <p className="text-[11px] text-slate-500">New cohorts starting every week</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Admissions Open
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Flexible weekday &amp; weekend cohorts are enrolling now. Share your details below to request custom timings or scholarship options.
        </p>

        <div className="pt-1">
          <LeadForm
            layout="compact"
            formTitle={null}
            formDescription={null}
            config={{
              showCourse: false,
              showMessage: false,
              purpose: false,
            }}
            defaultValues={{
              leadSource: `hero-schedules-enquiry-${courseSlug}`,
              courseSlug: courseSlug,
              selectedCourse: courseTitle,
              purpose: 'Upcoming Batch & Schedule Request',
            }}
            submitButtonText="Enquire Next Batch"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-2 border-prime/25 rounded-lg p-4 sm:p-5 shadow-sm space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-prime/10 flex items-center justify-center text-prime shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-prime-dark font-bold text-sm sm:text-base leading-tight">Upcoming Batches</h3>
            <span className="text-[11px] text-slate-500">Live Interactive Mentorship</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-prime bg-prime/10 px-2 py-0.5 rounded-full">
          {pagination?.total || activeSchedules.length} Available
        </span>
      </div>

      <div className="space-y-3">
        {activeSchedules.slice(0, 2).map((schedule, idx) => {
          const pricing = schedule.filteredPricing?.[0];
          // The CMS has no fixed meaning for the two prices: checkout charges the lower one,
          // so show that and strike through the higher (same as the schedules page).
          const prices = [pricing?.comparedPrice, pricing?.actualPrice].filter((p): p is number => typeof p === 'number' && p > 0);
          const finalPrice = prices.length ? Math.min(...prices) : undefined;
          const actualPrice = prices.length ? Math.max(...prices) : undefined;
          const currencySymbol = pricing?.currency?.symbol || '₹';
          const isDiscounted = !!finalPrice && !!actualPrice && finalPrice < actualPrice;

          const tz = schedule.country?.timeZone || 'Asia/Kolkata';
          const dateRange = formatScheduleDate(schedule.startsAt, schedule.endsAt);
          const timeRange = formatScheduleTime(schedule.startsAt, schedule.endsAt, tz);

          const rawCommence =
            schedule.commenceDate ||
            schedule.commencedDate ||
            schedule.commencementDate ||
            schedule.commencedAt ||
            schedule.commence_date;
          const commenceDateFormatted = formatSingleDate(rawCommence);

          const isFast = schedule.enableRecommend || schedule.fillingFast || idx === 0;

          return (
            <div
              key={schedule._id || schedule.code || idx}
              className="relative rounded-lg border border-prime/20 bg-teal-400/[3%] hover:bg-teal-400/[6%] transition-all p-3.5 space-y-2.5 overflow-hidden"
            >
              {/* Badge if filling fast */}
              {isFast && (
                <div className="absolute top-0 right-0 bg-prime-yellow text-white text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  <span>Filling Fast</span>
                </div>
              )}

              {/* Delivery mode & Batch type row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 pr-24">
                {schedule.batchType && (
                  <span className="text-[11px] font-bold text-prime-dark bg-white border border-slate-200 px-2 py-0.5 rounded-md capitalize shadow-2xs">
                    {schedule.batchType} Batch
                  </span>
                )}
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md capitalize inline-flex items-center gap-1">
                  {schedule.deliveryType === 'classroom' ? (
                    <MapPin className="w-3 h-3 text-emerald-600" />
                  ) : schedule.deliveryType === 'blended' ? (
                    <Laptop className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Wifi className="w-3 h-3 text-emerald-600" />
                  )}
                  {schedule.deliveryType || 'Online Virtual'}
                </span>
              </div>

              {/* Date & Time details */}
              <div className="border border-dashed border-prime/30 p-2.5 rounded-lg bg-white/90 space-y-1">
                <div className="flex items-start gap-2">
                  <Calendar className="w-3.5 h-3.5 text-prime shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    {schedule.isFlexibleSchedule ? (
                      <div>
                        <p className="text-xs font-bold text-prime-dark">
                          Flexible Dates / Student&apos;s Choice
                        </p>
                        {commenceDateFormatted && (
                          <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                            Starts from: {commenceDateFormatted}
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-prime-dark truncate">{dateRange}</p>
                    )}
                    {schedule.totalSessions && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {schedule.totalSessions} Sessions
                        {schedule.duration ? ` • ${schedule.duration} Mins/Day` : ''}
                      </span>
                    )}
                  </div>
                </div>

                {!schedule.isFlexibleSchedule && timeRange && (
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{timeRange}</span>
                  </div>
                )}
              </div>

              {/* Pricing & CTA */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  {finalPrice ? (
                    <div>
                      {isDiscounted && actualPrice && (
                        <span className="text-[11px] text-slate-400 line-through mr-1.5 font-medium">
                          {currencySymbol}{actualPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-extrabold text-prime-dark">
                        {currencySymbol}{finalPrice.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-prime">Scholarship Available</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleEnrollClick(schedule)}
                  className="inline-flex items-center gap-1 bg-prime-yellow hover:bg-amber-400 active:scale-95 text-prime-dark font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {/* Multi-plan batches pick a plan on the schedules page first */}
                  <span>{finalPrice && schedule.pricingTemplateId ? 'Choose Plan' : 'Enroll Now'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-1 space-y-1">
        {/* Every batch (with filters and plans) is on the schedules page. */}
        <Link
          href={`/schedules/${courseSlug}`}
          className="w-full text-center text-xs font-bold text-prime hover:text-prime-dark transition-colors flex items-center justify-center gap-1 py-0.5"
        >
          <span>
            {moreBatches > 0
              ? `+${moreBatches} more upcoming ${moreBatches === 1 ? 'batch' : 'batches'} available`
              : 'View all batches'}
          </span>
          <ChevronRight aria-hidden className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleEnquireCustom}
          className="w-full text-center text-xs text-slate-500 hover:text-prime transition-colors cursor-pointer"
        >
          Need weekend fast-track or custom dates? Request cohort &rarr;
        </button>
      </div>
    </div>
  );
}

