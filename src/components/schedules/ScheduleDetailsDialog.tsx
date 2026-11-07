'use client';

import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, Globe, Layers, LoaderCircle, MonitorPlay, Users, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { buttonClass } from '@/components/ui/button';
import BottomDrawer from '@/components/ui/BottomDrawer';
import { formatMoney } from '@/components/checkout/types';
import { cn } from '@/lib/utils';
import { BATCH_LABELS, checkoutHref, deliveryLabel, discountPercent, planPrice, scheduleTiming } from './format';
import type { PricingTemplate, Schedule } from './types';

interface ScheduleDetailsDialogProps {
  schedule: Schedule | null;
  view: 'details' | 'plans';
  onViewChange: (view: 'details' | 'plans') => void;
  onClose: () => void;
}

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-light/70 p-3">
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface text-prime">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">{label}</p>
        <p className="text-sm font-bold text-prime-dark">{children}</p>
      </div>
    </div>
  );
}

function TagList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wide text-text-muted uppercase">{title}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-sec-prime px-3 py-1 text-xs font-medium text-text-body">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Plan picker for batches sold in several plans (pricing template). */
function Plans({ schedule }: { schedule: Schedule }) {
  const [template, setTemplate] = useState<PricingTemplate | null>(null);
  const [failed, setFailed] = useState(false);
  const currency = schedule.price?.currency;

  useEffect(() => {
    if (!schedule.pricingTemplateId) return;
    const controller = new AbortController();
    fetch(`/api/schedules/pricing-templates/${schedule.pricingTemplateId}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then(setTemplate)
      .catch(() => !controller.signal.aborted && setFailed(true));
    return () => controller.abort();
  }, [schedule.pricingTemplateId]);

  if (failed) return <p className="py-10 text-center text-sm text-text-muted">Couldn&apos;t load the plans. Please try again.</p>;
  if (!template) {
    return (
      <p className="flex items-center justify-center gap-2 py-16 text-sm text-text-muted">
        <LoaderCircle aria-hidden className="size-5 animate-spin text-prime" /> Loading plans…
      </p>
    );
  }

  return (
    <div>
      {template.description && <p className="text-sm text-text-muted">{template.description}</p>}
      <ul className="mt-4 flex gap-4 overflow-x-auto pt-4 pb-2 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
        {template.plans.map((plan, i) => {
          const price = planPrice(plan, currency);
          const popular = template.plans.length > 2 && i === 1;
          return (
            <li
              key={plan.name}
              className={cn('relative flex w-72 shrink-0 flex-col rounded-2xl border p-4 md:w-auto', popular ? 'border-prime shadow-md' : 'border-border-muted')}
            >
              {popular && (
                <span className="absolute -top-3 left-4 rounded-full bg-prime px-2.5 py-0.5 text-xs font-bold text-on-dark">Most popular</span>
              )}
              <h3 className="font-heading text-base font-bold text-prime-dark">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-prime-dark">{formatMoney(price.amount, price.currency, price.symbol)}</p>
              {price.listAmount && (
                <p className="text-xs text-text-muted">
                  <span className="line-through">{formatMoney(price.listAmount, price.currency, price.symbol)}</span>
                  <span className="ml-1.5 font-semibold text-success">{discountPercent(price)}% off</span>
                </p>
              )}
              <ul className="mt-4 flex-1 space-y-2">
                {template.features.map((feature) => {
                  const included = feature.plans.includes(plan.name);
                  return (
                    <li key={feature.label} className={cn('flex items-start gap-2 text-xs', included ? 'text-text-body' : 'text-text-muted/60 line-through')}>
                      {included ? (
                        <Check aria-hidden className="mt-px size-3.5 shrink-0 text-success" />
                      ) : (
                        <X aria-hidden className="mt-px size-3.5 shrink-0" />
                      )}
                      <span className="min-w-0 break-words">
                        {feature.label}
                        {!included && <span className="sr-only"> (not included)</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={checkoutHref(schedule, { plan: plan.name, currency: price.currency })}
                className={buttonClass(popular ? 'accent' : 'outline', 'md', 'mt-5 w-full')}
              >
                Choose {plan.name.split(' ')[0]} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Batch details and plan picker, rendered inside a BottomDrawer. */
export default function ScheduleDetailsDialog({ schedule, view, onViewChange, onClose }: ScheduleDetailsDialogProps) {
  const timing = schedule ? scheduleTiming(schedule) : null;
  const batch = schedule?.batchType ? BATCH_LABELS[schedule.batchType] : undefined;
  const price = schedule?.price;
  const plans = view === 'plans' && !!schedule?.pricingTemplateId;

  return (
    <BottomDrawer
      open={!!schedule}
      onClose={onClose}
      labelledBy="schedule-dialog-title"
      maxWidthClassName={plans ? 'sm:max-w-4xl' : 'sm:max-w-2xl'}
    >
      {schedule && timing && (
        <div className="space-y-6">
          {/* Page / view heading */}
          <div>
            {plans && (
              <button
                type="button"
                onClick={() => onViewChange('details')}
                className="mb-2 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-prime hover:underline"
              >
                <ArrowLeft aria-hidden className="size-4" /> Batch details
              </button>
            )}
            <p className="text-xs font-semibold tracking-wide text-prime-yellow uppercase">
              {plans ? 'Choose your plan' : 'Batch details'}
            </p>
            <h2 id="schedule-dialog-title" className="mt-1 font-heading text-xl font-bold text-prime-dark sm:text-2xl">
              {schedule.courseName}
            </h2>
          </div>

          {/* Body: plans picker or batch details */}
          {plans ? (
            <Plans schedule={schedule} />
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <Fact icon={<CalendarDays className="size-5" />} label={timing.flexible ? 'Start' : 'Dates'}>
                  {timing.dates}
                </Fact>
                <Fact icon={<Clock className="size-5" />} label="Daily timing">
                  {timing.time} {timing.zone && <span className="font-medium text-text-muted">({timing.zone})</span>}
                </Fact>
                <Fact icon={<Layers className="size-5" />} label="Sessions">
                  {schedule.totalSessions ? `${schedule.totalSessions} sessions` : 'As per plan'}
                  {schedule.sessionMinutes && <span className="font-medium text-text-muted"> · {schedule.sessionMinutes} min each</span>}
                </Fact>
                <Fact icon={<MonitorPlay className="size-5" />} label="Format">
                  {deliveryLabel(schedule.deliveryType)}
                </Fact>
                {batch && (
                  <Fact icon={<Users className="size-5" />} label="Batch">
                    {batch.label} <span className="font-medium text-text-muted">({batch.days})</span>
                  </Fact>
                )}
                {(schedule.venue || schedule.countryName) && (
                  <Fact icon={<Globe className="size-5" />} label={schedule.deliveryType === 'online' ? 'Region' : 'Venue'}>
                    {schedule.deliveryType === 'online' ? schedule.countryName : schedule.venue ?? schedule.countryName}
                  </Fact>
                )}
              </div>

              {schedule.description && <p className="text-sm leading-relaxed text-text-muted">{schedule.description}</p>}
              <TagList title="Modules" items={schedule.modules} />
              <TagList title="Projects" items={schedule.projects} />
              <TagList title="Skill level" items={schedule.skillLevels} />

              <div className="flex flex-col gap-4 border-t border-border-muted pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {price ? (
                    <>
                      {price.listAmount && (
                        <p className="text-sm text-text-muted line-through">{formatMoney(price.listAmount, price.currency, price.symbol)}</p>
                      )}
                      <p className="text-2xl font-bold text-prime-dark">
                        {schedule.pricingTemplateId && <span className="mr-1 text-sm font-medium text-text-muted">from</span>}
                        {formatMoney(price.amount, price.currency, price.symbol)}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-prime-dark">Price on request</p>
                  )}
                  <p className="mt-1 text-xs text-text-muted">Batch code: {schedule.code}</p>
                </div>
                {price &&
                  (schedule.pricingTemplateId ? (
                    <button type="button" onClick={() => onViewChange('plans')} className={buttonClass('accent', 'lg')}>
                      See Plans <ArrowRight aria-hidden className="size-4" />
                    </button>
                  ) : (
                    <Link href={checkoutHref(schedule)} className={buttonClass('accent', 'lg')}>
                      Enroll Now <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </BottomDrawer>
  );
}
