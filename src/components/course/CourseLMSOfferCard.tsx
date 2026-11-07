'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Laptop,
  Wifi,
  MapPin,
  ChevronRight,
  Sparkles,
  Video,
  PhoneCall,
  Check
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import { useLmsOffers } from '@/hooks/useLmsOffers';
import type { CourseDetail } from '@/services/catalog.service';
import type { LMSClass, LMSProgram } from '@/types/lms';

interface CourseLMSOfferCardProps {
  course: CourseDetail;
  isMobile?: boolean;
}

function formatSingleDate(dateString?: string): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatScheduleDate(startsAt?: string, endsAt?: string): string {
  if (!startsAt) return 'Flexible Batches';
  const start = new Date(startsAt);
  if (isNaN(start.getTime())) return startsAt;
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (!endsAt) return startFormatted;
  const end = new Date(endsAt);
  if (isNaN(end.getTime())) return startFormatted;
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return startFormatted === endFormatted ? startFormatted : `${startFormatted} – ${endFormatted}`;
}

export default function CourseLMSOfferCard({ course, isMobile = false }: CourseLMSOfferCardProps) {
  const { openModal } = useLeadModal();
  const { classes, programs, loading } = useLmsOffers(course.slug);

  const hasClasses = classes.length > 0;
  const hasPrograms = programs.length > 0;

  // Mobile active tab ('cohort' | 'program')
  const [mobileTab, setMobileTab] = useState<'cohort' | 'program'>('cohort');

  // Selected cohort index if multiple classes exist
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const selectedClass = classes[selectedClassIndex] || classes[0];

  // Selected program index if multiple programs exist
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
  const selectedProgram = programs[selectedProgramIndex] || programs[0];

  // Auto sync mobile tab if only one track exists
  React.useEffect(() => {
    if (hasClasses && !hasPrograms) {
      setMobileTab('cohort');
    } else if (!hasClasses && hasPrograms) {
      setMobileTab('program');
    }
  }, [hasClasses, hasPrograms]);

  const brochureUrl =
    course.leadmagnet?.[0]?.broucher?.url ||
    (course.leadmagnet?.[0] as unknown as { brochure?: { url?: string } })?.brochure?.url;

  const handleEnrollCohort = (cohort: LMSClass) => {
    const isFlex = cohort.schedule?.isFlexibleSchedule;
    const rawCommence =
      cohort.schedule?.commenceDate ||
      cohort.schedule?.commencementDate ||
      cohort.schedule?.commencedAt;
    const commenceFormatted = formatSingleDate(rawCommence);

    const dateLabel = isFlex
      ? `Flexible Dates${commenceFormatted ? ` (Starts ${commenceFormatted})` : ''}`
      : formatScheduleDate(cohort.startDate, cohort.endDate);

    const batchInfo = `${cohort.schedule?.batchType ? `${cohort.schedule.batchType.toUpperCase()} ` : ''}${dateLabel} (${cohort.cohortCode || 'COHORT'})`;

    openModal({
      formTitle: `Enroll in Live Cohort: ${cohort.title || course.course_title}`,
      formDescription: `Secure your seat for the upcoming ${batchInfo}. Complete the form below to confirm your admission.`,
      downloadUrl: brochureUrl,
      defaultValues: {
        leadSource: `lms-cohort-${cohort.cohortCode || course.slug}`,
        courseSlug: course.slug,
        purpose: `Enroll: ${batchInfo}`,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  const handleEnrollProgram = (program: LMSProgram) => {
    const priceStr = program.pricing?.actualPrice
      ? ` (${program.pricing.symbol || '₹'}${program.pricing.actualPrice.toLocaleString()})`
      : '';

    openModal({
      formTitle: `Get Self-Paced Access: ${program.title}`,
      formDescription: `Get immediate lifetime access to all ${program.stats?.lessonCount || 'video'} lessons, resources, and certification exercises${priceStr}.`,
      downloadUrl: brochureUrl,
      defaultValues: {
        leadSource: `lms-program-${program.slug || course.slug}`,
        courseSlug: course.slug,
        purpose: `Self-Paced Program: ${program.title}`,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  const handleAdvisor = () => {
    openModal({
      formTitle: 'Speak with a Learning Advisor',
      formDescription: `Get personalized 1-on-1 guidance comparing Live Mentorship cohorts vs Self-Paced learning for ${course.course_title}.`,
      downloadUrl: brochureUrl,
      defaultValues: {
        leadSource: `lms-advisor-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  // Loading skeleton matching the realistic compact cards
  if (loading) {
    if (isMobile) {
      return (
        <div className="block lg:hidden my-4 space-y-2 animate-pulse">
          {/* Mobile Segmented Toggle Skeleton */}
          <div className="p-1 rounded-xl bg-light border border-border-muted flex gap-1">
            <div className="h-7 flex-1 rounded-lg bg-slate-200" />
            <div className="h-7 flex-1 rounded-lg bg-slate-100" />
          </div>
          {/* Mobile Single Card Skeleton */}
          <div className="rounded-xl overflow-hidden bg-surface border border-border-muted/80 p-3.5 space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 rounded-full bg-slate-200" />
              <div className="h-4 w-16 rounded bg-slate-100" />
            </div>
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="flex gap-1.5">
              <div className="h-3.5 w-16 rounded bg-slate-100" />
              <div className="h-3.5 w-20 rounded bg-slate-100" />
            </div>
            <div className="h-7 w-full rounded-lg bg-slate-100" />
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
              <div className="h-5 w-20 rounded bg-slate-200" />
              <div className="h-7 w-20 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      );
    }

    // Desktop: 2 Compact Stacked Skeleton Cards
    return (
      <div className="hidden lg:block space-y-3 animate-pulse">
        {/* Card 1 Skeleton: Cohort */}
        <div className="rounded-xl overflow-hidden bg-surface border border-border-muted/80 p-3.5 space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 rounded-full bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-100" />
          </div>
          <div className="h-4 w-3/4 rounded bg-slate-200" />
          <div className="flex gap-1.5">
            <div className="h-3.5 w-16 rounded bg-slate-100" />
            <div className="h-3.5 w-20 rounded bg-slate-100" />
          </div>
          <div className="h-7 w-full rounded-lg bg-slate-100" />
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <div className="h-5 w-20 rounded bg-slate-200" />
            <div className="h-7 w-20 rounded-lg bg-slate-200" />
          </div>
        </div>

        {/* Card 2 Skeleton: Self-Paced */}
        <div className="rounded-xl overflow-hidden bg-surface border border-border-muted/80 p-3.5 space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 rounded-full bg-slate-200" />
            <div className="h-4 w-14 rounded bg-slate-100" />
          </div>
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="flex gap-1.5">
            <div className="h-3.5 w-20 rounded bg-slate-100" />
            <div className="h-3.5 w-16 rounded bg-slate-100" />
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <div className="h-5 w-20 rounded bg-slate-200" />
            <div className="h-7 w-20 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // Fallback Live Cohort / Admissions Card when no classes are scheduled yet
  const renderCohortFallbackCard = () => {
    return (
      <div className="rounded-lg overflow-hidden bg-surface border border-border-muted/80 shadow-xs hover:border-prime/40 transition-all p-3 sm:p-3.5 space-y-2.5">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Interactive Mentorship</span>
          </span>
          <span className="text-[10px] font-bold text-prime bg-prime/10 px-2 py-0.5 rounded">
            Admissions Open
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-heading text-xs sm:text-sm font-bold text-prime-dark leading-snug line-clamp-1">
            {course.course_title}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            New mentor-led cohorts launch every 2 weeks with 1-on-1 guidance, live projects, and placement support.
          </p>
        </div>

        {/* Batch Options / Highlights Box */}
        <div className="p-2.5 rounded-lg border border-dashed border-prime/30 bg-light/50 space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-prime shrink-0" />
            <span>Weekday & Weekend Batches Available</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Flexible Timing (Morning & Evening Slots)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleAdvisor}
            className="w-full bg-prime hover:bg-prime-dark active:scale-95 text-white font-extrabold text-xs py-2.5 px-3.5 rounded-lg transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 group"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Advisor for Batch Details</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-1">
            Get custom dates, syllabus breakdown & scholarship fee details
          </p>
        </div>
      </div>
    );
  };

  // If neither classes nor programs exist for this course in LMS
  if (!hasClasses && !hasPrograms) {
    return (
      <div className={isMobile ? 'block lg:hidden my-4' : 'hidden lg:block'}>
        {renderCohortFallbackCard()}
      </div>
    );
  }

  // COMPACT LIVE COHORT CARD
  const renderCohortCard = (compact: boolean = true) => {
    if (!selectedClass) return null;
    return (
      <div className="rounded-lg overflow-hidden bg-surface border border-border-muted/80 shadow-xs hover:border-prime/40 transition-all p-3 sm:p-3.5 space-y-2.5">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Mentorship</span>
          </span>

          <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
            {selectedClass.seatsLeft ? `${selectedClass.seatsLeft} Seats Left` : 'Filling Fast'}
          </span>
        </div>

        {/* Batch Pills (if multiple classes) */}
        {classes.length > 1 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {classes.map((cls, idx) => (
              <button
                key={cls.id || idx}
                type="button"
                onClick={() => setSelectedClassIndex(idx)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer shrink-0 ${idx === selectedClassIndex
                    ? 'bg-prime text-white border-prime font-bold shadow-2xs'
                    : 'bg-light hover:bg-slate-100 text-slate-600 border-border-muted/70'
                  }`}
              >
                Batch {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Title & Delivery Info */}
        <div>
          <h3 className="font-heading text-xs sm:text-sm font-bold text-prime-dark leading-snug line-clamp-1">
            {selectedClass.title || course.course_title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px]">
            {selectedClass.schedule?.batchType && (
              <span className="font-semibold text-prime-dark bg-light px-1.5 py-0.2 rounded border border-border-muted/60 capitalize">
                {selectedClass.schedule.batchType}
              </span>
            )}
            <span className="font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/50 capitalize inline-flex items-center gap-1">
              {selectedClass.schedule?.deliveryType === 'classroom' ? (
                <MapPin className="w-2.5 h-2.5 text-emerald-600" />
              ) : (
                <Laptop className="w-2.5 h-2.5 text-emerald-600" />
              )}
              <span>{selectedClass.schedule?.deliveryType || 'Live Online'}</span>
            </span>
            {selectedClass.schedule?.totalSessions && (
              <span className="text-slate-400 font-medium">
                • {selectedClass.schedule.totalSessions} Sessions
              </span>
            )}
          </div>
        </div>

        {/* Date / Schedule info strip */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-light/70 px-2 py-1.5 rounded-lg border border-border-muted/50">
          <Calendar className="w-3 h-3 text-prime shrink-0" />
          <span className="font-semibold truncate">
            {selectedClass.schedule?.isFlexibleSchedule
              ? 'Flexible Dates / Student Choice'
              : formatScheduleDate(selectedClass.startDate, selectedClass.endDate)}
          </span>
        </div>

        {/* Price & CTA in aligned bottom row */}
        <div className="pt-2 border-t border-border-muted/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              Cohort Fee
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-prime-dark">
                {selectedClass.pricing?.currency?.symbol || '₹'}
                {selectedClass.pricing?.payAmount?.toLocaleString() || '19,999'}
              </span>
              {selectedClass.pricing?.listAmount &&
                selectedClass.pricing.listAmount > (selectedClass.pricing.payAmount || 0) && (
                  <span className="text-[10px] text-slate-400 line-through">
                    {selectedClass.pricing.currency?.symbol || '₹'}
                    {selectedClass.pricing.listAmount.toLocaleString()}
                  </span>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleEnrollCohort(selectedClass)}
            className="bg-prime hover:bg-prime-dark active:scale-95 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1 shrink-0"
          >
            <span>Enroll Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  // COMPACT SELF-PACED CARD (NO BIG THUMBNAIL, COMPACT STATS)
  const renderProgramCard = (compact: boolean = true) => {
    if (!selectedProgram) return null;
    return (
      <div className="rounded-xl overflow-hidden bg-surface border border-border-muted/80 shadow-xs hover:border-amber-400/50 transition-all p-3 sm:p-3.5 space-y-2.5">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <Video className="w-3 h-3 text-amber-600" />
            <span>Self-Paced</span>
          </span>

          {selectedProgram.pricing?.discountPercent ? (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {selectedProgram.pricing.discountPercent}% OFF
            </span>
          ) : (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-500/10 px-1.5 py-0.5 rounded">
              On-Demand
            </span>
          )}
        </div>

        {/* Program Pills (if multiple programs) */}
        {programs.length > 1 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {programs.map((prg, idx) => (
              <button
                key={prg.id || idx}
                type="button"
                onClick={() => setSelectedProgramIndex(idx)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer shrink-0 truncate max-w-[140px] ${idx === selectedProgramIndex
                    ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-2xs'
                    : 'bg-light hover:bg-slate-100 text-slate-600 border-border-muted/70'
                  }`}
              >
                {prg.title}
              </button>
            ))}
          </div>
        )}

        {/* Title & Inline Compact Stats */}
        <div>
          <h3 className="font-heading text-xs sm:text-sm font-bold text-prime-dark leading-snug line-clamp-1">
            {selectedProgram.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
            <span>{selectedProgram.stats?.lessonCount || 14} Videos</span>
            <span className="text-slate-300">•</span>
            <span>{selectedProgram.stats?.sectionCount || 1} Modules</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700 font-semibold">Lifetime Access</span>
          </div>
        </div>

        {/* Price & CTA in aligned bottom row */}
        <div className="pt-2 border-t border-border-muted/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              One-Time Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-prime-dark">
                {selectedProgram.pricing?.symbol || '₹'}
                {selectedProgram.pricing?.actualPrice?.toLocaleString() || '4,999'}
              </span>
              {selectedProgram.pricing?.comparedPrice &&
                selectedProgram.pricing.comparedPrice > (selectedProgram.pricing.actualPrice || 0) && (
                  <span className="text-[10px] text-slate-400 line-through">
                    {selectedProgram.pricing.symbol || '₹'}
                    {selectedProgram.pricing.comparedPrice.toLocaleString()}
                  </span>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleEnrollProgram(selectedProgram)}
            className="bg-prime-yellow hover:bg-amber-400 active:scale-95 text-prime-dark font-extrabold text-xs py-2 px-3.5 rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1 shrink-0"
          >
            <span>Buy Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  /* =========================================================================
   * MOBILE VIEW (Rendered only on < lg screens)
   * Uses a sleek segmented toggle bar with prices so it takes almost NO vertical
   * screen height and lets learners switch effortlessly between Live & Self-Paced.
   * ========================================================================= */
  if (isMobile) {
    return (
      <div className="block lg:hidden my-4 space-y-2">
        {/* Mobile Segmented Toggle (Shown when programs exist alongside cohorts/fallback) */}
        {hasPrograms && (
          <div className="bg-light p-1 rounded-xl flex border border-border-muted gap-1">
            <button
              type="button"
              onClick={() => setMobileTab('cohort')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${mobileTab === 'cohort'
                  ? 'bg-surface text-prime-dark shadow-xs border border-border-muted/80'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">Live Batch</span>
              {selectedClass?.pricing?.payAmount ? (
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded shrink-0">
                  {selectedClass.pricing.currency?.symbol || '₹'}
                  {selectedClass.pricing.payAmount.toLocaleString()}
                </span>
              ) : (
                <span className="text-[10px] font-bold text-prime bg-prime/10 px-1.5 py-0.2 rounded shrink-0">
                  Advising
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('program')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${mobileTab === 'program'
                  ? 'bg-surface text-prime-dark shadow-xs border border-border-muted/80'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <Video className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">Self-Paced</span>
              {selectedProgram?.pricing?.actualPrice && (
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded shrink-0">
                  {selectedProgram.pricing.symbol || '₹'}
                  {selectedProgram.pricing.actualPrice.toLocaleString()}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Display selected card on mobile */}
        {mobileTab === 'cohort' && (hasClasses ? renderCohortCard(true) : renderCohortFallbackCard())}
        {mobileTab === 'program' && renderProgramCard(true)}

        {/* Subtle Advisor link */}
        <button
          type="button"
          onClick={handleAdvisor}
          className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-prime py-1 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <PhoneCall className="w-3 h-3 text-prime" />
          <span>Need guidance? Speak with a Learning Advisor</span>
        </button>
      </div>
    );
  }

  /* =========================================================================
   * DESKTOP VIEW (Rendered in the sticky right column)
   * Displays BOTH Live Cohort (or Advisor Fallback) and Self-Paced stacked vertically,
   * in a compact layout without oversized elements.
   * ========================================================================= */
  return (
    <div className="hidden lg:block space-y-3">
      {/* 1. Live Cohort Card (or Rich Cohort Advisor Card if no classes scheduled yet) */}
      {hasClasses ? renderCohortCard(true) : renderCohortFallbackCard()}

      {/* 2. Self-Paced Track Card (Stacked below) */}
      {hasPrograms && renderProgramCard(true)}

      {/* Subtle Learning Advisor Link underneath both */}
      <button
        type="button"
        onClick={handleAdvisor}
        className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-prime py-1 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <PhoneCall className="w-3 h-3 text-prime" />
        <span>Need guidance? Speak with a Learning Advisor</span>
      </button>
    </div>
  );
}

