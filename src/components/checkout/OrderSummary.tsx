'use client';

import { BadgeCheck, CalendarDays, Clock, LoaderCircle, MonitorPlay, TicketPercent, UserRound, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { controlClass } from '@/components/ui/form/FormField';
import { BATCH_LABELS, deliveryLabel, scheduleTiming } from '@/components/schedules/format';
import { formatMoney, type CheckoutData } from './types';
import type { CheckoutState } from './useCheckout';

function Row({ label, value, strong, tone }: { label: ReactNode; value: string; strong?: boolean; tone?: 'success' }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${strong ? 'text-base font-bold text-prime-dark' : 'text-sm text-text-muted'} ${tone === 'success' ? 'text-success' : ''}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}

/** Batch, coupon and totals, beside the checkout steps. */
export default function OrderSummary({ data, checkout }: { data: CheckoutData; checkout: CheckoutState }) {
  const { schedule, planName, price, tax } = data;
  const { pricing, couponCode, setCouponCode, appliedCoupon, applyCoupon, removeCoupon, couponBusy, couponError, step } = checkout;
  const timing = scheduleTiming(schedule);
  const batch = schedule.batchType ? BATCH_LABELS[schedule.batchType] : undefined;
  const money = (n: number) => formatMoney(n, price.currency, price.symbol);
  const locked = step !== 'details';

  return (
    <aside aria-labelledby="summary-title" className="rounded-2xl border border-border-muted bg-surface p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <h2 id="summary-title" className="text-xs font-semibold tracking-wide text-text-muted uppercase">
        Order summary
      </h2>
      <p className="mt-2 font-heading text-lg font-bold text-prime-dark">{schedule.courseName}</p>
      {planName && <p className="text-sm font-semibold text-prime">{planName}</p>}

      <ul className="mt-4 space-y-2 text-sm text-text-body">
        <li className="flex items-start gap-2">
          <CalendarDays aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" /> {timing.dates}
        </li>
        <li className="flex items-start gap-2">
          <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" />
          <span>
            {timing.time} {timing.zone && <span className="text-text-muted">({timing.zone})</span>}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <MonitorPlay aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" />
          <span>
            {deliveryLabel(schedule.deliveryType)}
            {batch && <span className="text-text-muted"> · {batch.label}</span>}
          </span>
        </li>
        {schedule.trainers[0] && (
          <li className="flex items-start gap-2">
            <UserRound aria-hidden className="mt-0.5 size-4 shrink-0 text-prime" /> Trainer: {schedule.trainers[0].name}
          </li>
        )}
      </ul>

      {/* Coupon */}
      <div className="mt-5 border-t border-border-muted pt-5">
        {appliedCoupon ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-success/10 px-3 py-2.5 text-sm text-success">
            <span className="flex items-center gap-2 font-semibold">
              <BadgeCheck aria-hidden className="size-4" /> {appliedCoupon} applied
            </span>
            {!locked && (
              <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="cursor-pointer rounded p-1 hover:bg-success/10">
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void applyCoupon();
            }}
          >
            <label htmlFor="coupon" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-prime-dark">
              <TicketPercent aria-hidden className="size-4 text-prime-yellow" /> Have a coupon?
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={locked}
                maxLength={40}
                autoComplete="off"
                aria-invalid={!!couponError}
                aria-describedby={couponError ? 'coupon-error' : undefined}
                className={controlClass(!!couponError, 'w-full px-3', 'uppercase disabled:opacity-60')}
              />
              <button
                type="submit"
                disabled={locked || couponBusy || !couponCode.trim()}
                className="min-h-11 shrink-0 cursor-pointer rounded-lg bg-prime-dark px-4 text-sm font-semibold text-on-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {couponBusy ? <LoaderCircle aria-label="Applying" className="size-4 animate-spin" /> : 'Apply'}
              </button>
            </div>
            {couponError && (
              <p id="coupon-error" role="alert" className="mt-1.5 text-sm text-danger">
                {couponError}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Totals */}
      <dl className="mt-5 space-y-2 border-t border-border-muted pt-5">
        <Row label="Course fee" value={money(pricing.originalAmount)} />
        {price.listAmount && !appliedCoupon && (
          <p className="text-right text-xs text-text-muted">
            <span className="line-through">{money(price.listAmount)}</span> list price
          </p>
        )}
        {pricing.discountAmount > 0 && <Row label="Coupon discount" value={`− ${money(pricing.discountAmount)}`} tone="success" />}
        {tax.percentage > 0 && (
          <Row
            label={`${tax.label} (${tax.percentage}%${tax.isInclusive ? ', included' : ''})`}
            value={`${tax.isInclusive ? '' : '+ '}${money(pricing.taxAmount)}`}
          />
        )}
        <div className="border-t border-border-muted pt-3">
          <Row label="Total payable" value={money(pricing.totalPayable)} strong />
        </div>
      </dl>
    </aside>
  );
}
