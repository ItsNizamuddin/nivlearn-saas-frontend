import type { Metadata } from 'next';
import { CalendarX2 } from 'lucide-react';
import Link from 'next/link';
import CheckoutView from '@/components/checkout/CheckoutView';
import type { CheckoutData } from '@/components/checkout/types';
import Container from '@/components/layout/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buttonClass } from '@/components/ui/button';
import { isValidTimeZone } from '@/lib/scheduleTime';
import { checkoutTax, getAvailableGateways, resolveCheckoutItem } from '@/services/payment.service';
import { isLmsCohortSchedule } from '@/services/catalog.service';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

const one = (value: string | string[] | undefined) => (typeof value === 'string' ? value : undefined);

/** /checkout?schedule=<code>&currency=<ISO>&plan=<plan name>&tz=<IANA zone> */
export default async function CheckoutPage({ searchParams }: PageProps<'/checkout'>) {
  const params = await searchParams;
  const tz = one(params.tz);
  const timezone = isValidTimeZone(tz) ? tz : undefined;
  const ref = {
    scheduleCode: one(params.schedule)?.slice(0, 40) ?? '',
    currency: one(params.currency)?.toUpperCase().slice(0, 3) ?? '',
    plan: one(params.plan)?.slice(0, 120),
    timezone,
  };

  const isCohortParam = Boolean(
    one(params.cohort) === 'true' ||
    one(params.type) === 'cohort' ||
    one(params.lms) === 'true'
  );

  // Batch, gateways and LMS cohort status are verified on the server.
  const [item, gateways, isLms] = await Promise.all([
    resolveCheckoutItem(ref),
    getAvailableGateways(),
    isCohortParam || (ref.scheduleCode ? isLmsCohortSchedule(ref.scheduleCode) : Promise.resolve(false)),
  ]);
  const tax = item ? await checkoutTax(item) : null;

  return (
    <section className="min-h-[70vh] bg-surface-muted py-8 md:py-12">
      <Container>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Schedules', href: '/schedules' }, { label: 'Checkout' }]}
          className="mb-4"
        />
        <h1 className="mb-6 font-heading text-2xl font-bold text-prime-dark sm:text-3xl">Checkout</h1>

        {item && tax ? (
          <CheckoutView
            data={
              {
                ref: { ...ref, currency: item.price.currency, plan: item.planName },
                schedule: item.schedule,
                planName: item.planName,
                price: item.price,
                tax,
                gateways,
                isCohort: isLms,
              } satisfies CheckoutData
            }
          />
        ) : (
          <div className="mx-auto max-w-lg rounded-2xl border border-border-muted bg-surface p-8 text-center shadow-sm">
            <CalendarX2 aria-hidden className="mx-auto size-12 text-prime-yellow" />
            <h2 className="mt-4 font-heading text-xl font-bold text-prime-dark">This batch isn&apos;t available</h2>
            <p className="mt-2 text-sm text-text-muted">
              The batch may be full or no longer open for enrolment. Pick another batch to continue.
            </p>
            <Link href="/schedules" className={buttonClass('accent', 'md', 'mt-6')}>
              View Upcoming Batches
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
