'use client';

import { ArrowRight, BadgeCheck, CalendarDays, Clock, Flame, MapPin, MonitorPlay, TrendingDown, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/button';
import { formatMoney } from '@/components/checkout/types';
import { BATCH_LABELS, checkoutHref, deliveryLabel, discountPercent, scheduleTiming } from './format';
import type { Schedule } from './types';

interface ScheduleCardProps {
  schedule: Schedule;
  /** Show the course name (lists that mix courses). */
  showCourse?: boolean;
  onDetails: (schedule: Schedule, view: 'details' | 'plans') => void;
  onQuote: (schedule: Schedule) => void;
}

/** Buttons share their row (or column) equally and never wrap the label. */
const ACTION = 'flex-1 whitespace-nowrap px-3 @5xl:flex-none';

/**
 * One batch: dates & time, format, trainer, price and enrol actions.
 * Layout follows the card's own width (container queries), not the viewport: the list
 * sits beside a sidebar, so a wide screen can still mean a narrow card.
 *   < @xl  stacked
 *   @xl    timing | batch, then price + actions side by side
 *   @3xl   timing | batch | price over actions
 *   @5xl   timing | batch | price | actions (one row)
 */
export default function ScheduleCard({ schedule, showCourse, onDetails, onQuote }: ScheduleCardProps) {
  const timing = scheduleTiming(schedule);
  const batch = schedule.batchType ? BATCH_LABELS[schedule.batchType] : undefined;
  const price = schedule.price;
  const off = discountPercent(price);
  const trainer = schedule.trainers[0];
  const PeriodIcon = timing.period?.icon ?? Clock;
  const hasPlans = !!schedule.pricingTemplateId;
  const hasHeader = showCourse || schedule.fillingFast || schedule.scheduleType || schedule.jobGuaranteed || schedule.jobAssistance;

  return (
    <div className="@container">
      <article className="relative grid gap-4 rounded-2xl border border-border-muted bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 @xl:grid-cols-2 @3xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_17rem] @3xl:items-center @5xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_auto]">
        {hasHeader && (
          <header className="col-span-full flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {showCourse && <h3 className="font-heading text-base font-bold text-prime-dark sm:text-lg">{schedule.courseName}</h3>}
              {schedule.fillingFast && (
                <span className="inline-flex items-center gap-1 rounded-full bg-prime-yellow/15 px-2.5 py-0.5 text-xs font-bold text-prime-yellow">
                  <Flame aria-hidden className="size-3.5" /> Filling fast
                </span>
              )}
              {schedule.scheduleType && (
                <span className="rounded-full bg-light px-2.5 py-0.5 text-xs font-semibold text-prime">{schedule.scheduleType}</span>
              )}
            </div>
            {(schedule.jobGuaranteed || schedule.jobAssistance) && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                <BadgeCheck aria-hidden className="size-4" />
                {schedule.jobGuaranteed ? 'Job guarantee included' : 'Job assistance included'}
              </span>
            )}
          </header>
        )}

        {/* Dates & time */}
        <div className="rounded-xl border border-dashed border-prime/30 bg-light/60 p-3">
          <p className="flex items-start gap-2 text-sm font-bold text-prime-dark">
            <CalendarDays aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" />
            <span>
              {timing.dates}
              {schedule.totalSessions && <span className="ml-1.5 font-medium text-text-muted">· {schedule.totalSessions} sessions</span>}
            </span>
          </p>
          <p className="mt-1.5 flex items-start gap-2 text-sm text-text-muted">
            <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" />
            <span>
              <span className="font-semibold text-text-body">{timing.time}</span>
              {timing.zone && <span className="ml-1">({timing.zone})</span>}
              {schedule.sessionMinutes && <span className="block text-xs">{schedule.sessionMinutes} min per session</span>}
            </span>
          </p>
        </div>

        {/* Batch, format & trainer */}
        <div className="flex flex-wrap items-center gap-2 @xl:flex-col @xl:flex-nowrap @xl:items-start">
          {timing.period && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-prime-yellow">
              <PeriodIcon aria-hidden className="size-4" /> {timing.period.label}
            </span>
          )}
          {batch && (
            <span className="text-sm font-bold text-prime-dark">
              {batch.label} <span className="font-medium text-text-muted">({batch.days})</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            <MonitorPlay aria-hidden className="size-3.5" /> {deliveryLabel(schedule.deliveryType)}
          </span>
          {schedule.deliveryType !== 'online' && schedule.venue && (
            <span className="flex basis-full items-start gap-1 text-xs @xl:basis-auto text-text-muted">
              <MapPin aria-hidden className="mt-px size-3.5 shrink-0 text-prime-yellow" /> {schedule.venue}
            </span>
          )}
          {trainer && (
            <span className="flex basis-full items-center gap-2 pt-1 @xl:basis-auto">
              {trainer.photo ? (
                <Image src={trainer.photo} alt="" width={32} height={32} unoptimized className="size-8 rounded-full object-cover" />
              ) : (
                <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-light text-prime">
                  <UserRound className="size-4" />
                </span>
              )}
              <span className="text-xs text-text-muted">
                Trainer <span className="font-semibold text-prime-dark">{trainer.name}</span>
                {trainer.experience && <span> · {trainer.experience} yrs</span>}
              </span>
            </span>
          )}
        </div>

        {/* Price & actions */}
        <div className="flex flex-col gap-3 @xl:col-span-full @xl:flex-row @3xl:col-span-1 @3xl:flex-col @5xl:flex-row @5xl:items-center">
          <div className="flex flex-col justify-center rounded-xl border border-border-muted p-3 text-center @xl:flex-1 @3xl:flex-none @5xl:min-w-48">
            {price ? (
              <div className="flex items-center justify-center gap-2">
                {off > 0 && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-success px-1.5 py-0.5 text-xs font-bold text-on-dark">
                    {off}% <TrendingDown aria-hidden className="size-3.5" />
                  </span>
                )}
                <div className="shrink-0 text-left">
                  {price.listAmount && (
                    <p className="text-xs text-text-muted line-through">{formatMoney(price.listAmount, price.currency, price.symbol)}</p>
                  )}
                  <p className="text-lg font-bold whitespace-nowrap text-prime-dark">
                    {hasPlans && <span className="mr-1 text-xs font-medium text-text-muted">from</span>}
                    {formatMoney(price.amount, price.currency, price.symbol)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm font-semibold text-prime-dark">Price on request</p>
            )}
            <button
              type="button"
              onClick={() => onQuote(schedule)}
              className="mt-1 cursor-pointer text-xs font-semibold text-prime underline-offset-2 hover:underline"
            >
              Get a custom quote
            </button>
          </div>

          <div className="flex gap-2 @xl:flex-1 @xl:flex-col @xl:justify-center @3xl:flex-none @3xl:flex-row @5xl:w-36 @5xl:flex-col">
            {price && !hasPlans ? (
              <Link href={checkoutHref(schedule)} className={buttonClass('accent', 'md', ACTION)}>
                Enroll Now <ArrowRight aria-hidden className="size-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => (price ? onDetails(schedule, 'plans') : onQuote(schedule))}
                className={buttonClass('accent', 'md', ACTION)}
              >
                {price ? 'Choose Plan' : 'Enquire'} <ArrowRight aria-hidden className="size-4" />
              </button>
            )}
            <button type="button" onClick={() => onDetails(schedule, 'details')} className={buttonClass('outline', 'md', ACTION)}>
              Details
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
