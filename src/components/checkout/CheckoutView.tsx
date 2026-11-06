'use client';

import { Check, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomerForm from './CustomerForm';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentOptions';
import { formatMoney, type CheckoutData } from './types';
import { useCheckout, type CheckoutStep } from './useCheckout';

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'details', label: 'Your details' },
  { id: 'payment', label: 'Payment' },
  { id: 'success', label: 'Confirmation' },
];

function Steps({ current }: { current: CheckoutStep }) {
  const index = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Checkout progress">
      {STEPS.map((step, i) => {
        const done = i < index;
        const active = i === index;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3" aria-current={active ? 'step' : undefined}>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                done ? 'bg-success text-on-dark' : active ? 'bg-prime text-on-dark' : 'bg-sec-prime text-text-muted',
              )}
            >
              {done ? <Check aria-hidden className="size-4" /> : i + 1}
            </span>
            <span className={cn('hidden text-sm font-semibold sm:inline', active ? 'text-prime-dark' : 'text-text-muted')}>{step.label}</span>
            {i < STEPS.length - 1 && <span aria-hidden className={cn('h-0.5 flex-1 rounded-full', done ? 'bg-success' : 'bg-border-muted')} />}
          </li>
        );
      })}
    </ol>
  );
}

/** Checkout: details → payment → confirmation, with the order summary alongside. */
export default function CheckoutView({ data }: { data: CheckoutData }) {
  const checkout = useCheckout(data);
  const { step, error, receipt, pricing, customer } = checkout;

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border-muted bg-surface p-6 text-center shadow-sm sm:p-10">
        <CircleCheckBig aria-hidden className="mx-auto size-16 text-success" />
        <h2 className="mt-5 font-heading text-2xl font-bold text-prime-dark">You&apos;re enrolled!</h2>
        <p className="mt-3 text-text-muted">
          We received your payment of{' '}
          <span className="font-semibold text-prime-dark">{formatMoney(pricing.totalPayable, data.price.currency, data.price.symbol)}</span> for{' '}
          <span className="font-semibold text-prime-dark">{data.schedule.courseName}</span>. A confirmation is on its way to {customer.email}.
        </p>
        {receipt && <p className="mt-4 text-sm text-text-muted">Payment reference: <span className="font-mono font-semibold text-prime-dark">{receipt}</span></p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass('primary', 'md')}>
            Back to Home
          </Link>
          <Link href="/schedules" className={buttonClass('outline', 'md')}>
            Browse More Batches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <div className="rounded-2xl border border-border-muted bg-surface p-5 shadow-sm sm:p-8">
        <Steps current={step} />
        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
            {error}
          </p>
        )}
        <div className="mt-6">
          {step === 'details' ? (
            <CustomerForm checkout={checkout} />
          ) : (
            <PaymentOptions checkout={checkout} gateways={data.gateways} currency={data.price.currency} />
          )}
        </div>
      </div>
      <div className="order-first lg:order-none">
        <OrderSummary data={data} checkout={checkout} />
      </div>
    </div>
  );
}
