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
        <section aria-labelledby="offers-title" className="rounded-2xl border border-prime-yellow/40 bg-surface p-5 shadow-sm">
          <h2 id="offers-title" className="flex items-center gap-2 font-heading text-base font-bold text-prime-dark">
            <TicketPercent aria-hidden className="size-5 text-prime-yellow" /> Offers for you
          </h2>
          <ul className="mt-4 space-y-4">
            {coupons.slice(0, 3).map((coupon) => (
              <li key={coupon.code}>
                <p className="text-sm font-semibold text-prime-dark">{couponValue(coupon)}</p>
                {coupon.description && <p className="text-xs text-text-muted">{coupon.description}</p>}
                <div className="mt-2">
                  <CouponCode code={coupon.code} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-muted">Apply the code at checkout.</p>
        </section>
      )}

      <section aria-labelledby="why-title" className="rounded-2xl border border-border-muted bg-surface p-5 shadow-sm">
        <h2 id="why-title" className="font-heading text-base font-bold text-prime-dark">
          Every batch includes
        </h2>
        <CheckList items={WHY} className="mt-4 [&_span:last-child]:text-sm" />
      </section>

      <section aria-labelledby="help-title" className="rounded-2xl bg-light p-5 text-center">
        <span aria-hidden className="mx-auto flex size-12 items-center justify-center rounded-xl bg-surface text-prime shadow-sm">
          <Headset className="size-6" />
        </span>
        <h2 id="help-title" className="mt-3 font-heading text-base font-bold text-prime-dark">
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
