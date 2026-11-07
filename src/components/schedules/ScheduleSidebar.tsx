import { Headset, TicketPercent } from 'lucide-react';
import LeadCta from '@/components/forms/LeadCta';
import CheckList from '@/components/ui/CheckList';
import { buttonClass } from '@/components/ui/button';
import type { Coupon } from './types';
import CouponCode from './CouponCode';

// Keep these true for every batch (edit if the offer changes).
const WHY = [
  'Instructor-led live sessions',
  'Weekday and weekend options',
  'Hands-on, practical training',
  'Help from learning advisors',
];

const couponValue = (c: Coupon) => (c.discountType === 'percentage' ? `${c.discountValue}% off` : `${c.discountValue} off`);

/** Offers, highlights and help, beside the schedules list. */
export default function ScheduleSidebar({ coupons }: { coupons: Coupon[] }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-12">
      {coupons.length > 0 && (
        <section aria-labelledby="offers-title" className="rounded-2xl border border-prime-yellow/40 bg-surface p-5 shadow-sm sm:p-6">
          <h2 id="offers-title" className="flex items-center gap-2 font-heading text-lg font-bold text-prime-dark">
            <TicketPercent aria-hidden className="size-5.5 text-prime-yellow shrink-0" /> Offers for you
          </h2>
          <ul className="mt-4 divide-y divide-border-muted/50">
            {coupons.slice(0, 3).map((coupon) => (
              <li key={coupon.code} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-bold whitespace-nowrap text-prime-dark sm:text-lg">
                    {couponValue(coupon)}
                  </span>
                  <CouponCode code={coupon.code} />
                </div>
                {coupon.description && (
                  <p className="text-sm text-text-muted leading-relaxed">
                    {coupon.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-text-muted">Apply the code at checkout.</p>
        </section>
      )}

      <section aria-labelledby="why-title" className="rounded-2xl border border-border-muted bg-surface p-5 shadow-sm sm:p-6">
        <h2 id="why-title" className="font-heading text-base font-bold text-prime-dark sm:text-lg">
          Every batch includes
        </h2>
        <CheckList items={WHY} className="mt-4 [&_span:last-child]:text-sm sm:[&_span:last-child]:text-base" />
      </section>

      <section aria-labelledby="help-title" className="rounded-2xl bg-light p-5 text-center sm:p-6">
        <span aria-hidden className="mx-auto flex size-12 items-center justify-center rounded-xl bg-surface text-prime shadow-sm">
          <Headset className="size-6" />
        </span>
        <h2 id="help-title" className="mt-3 font-heading text-base font-bold text-prime-dark sm:text-lg">
          Need help choosing?
        </h2>
        <p className="mt-1 text-sm text-text-muted">Our advisors can help with batches, plans and group pricing.</p>
        <LeadCta form="advisor" className={buttonClass('primary', 'md', 'mt-4 w-full')}>
          Talk to an Advisor
        </LeadCta>
      </section>
    </aside>
  );
}
