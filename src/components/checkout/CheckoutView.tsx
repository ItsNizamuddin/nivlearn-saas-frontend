'use client';

import {
  Check,
  CircleCheckBig,
  ExternalLink,
  KeyRound,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/button';
import { LMS_URL } from '@/lib/site';
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
          <li
            key={step.id}
            className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3"
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                done
                  ? 'bg-success text-on-dark'
                  : active
                    ? 'bg-prime text-on-dark'
                    : 'bg-sec-prime text-text-muted',
              )}
            >
              {done ? <Check aria-hidden className="size-4" /> : i + 1}
            </span>
            <span
              className={cn(
                'hidden text-sm font-semibold sm:inline',
                active ? 'text-prime-dark' : 'text-text-muted',
              )}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn('h-0.5 flex-1 rounded-full', done ? 'bg-success' : 'bg-border-muted')}
              />
            )}
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
    const formattedAmount = formatMoney(
      pricing.totalPayable,
      data.price.currency,
      data.price.symbol,
    );

    // 1. Regular/General Schedules (NOT an LMS Cohort): Clean standard confirmation view
    if (!data.isCohort) {
      return (
        <div className="mx-auto max-w-xl rounded-2xl border border-border-muted bg-surface p-6 text-center shadow-sm sm:p-10">
          <CircleCheckBig aria-hidden className="mx-auto size-16 text-success" />
          <h2 className="mt-5 font-heading text-2xl font-bold text-prime-dark">You&apos;re enrolled!</h2>
          <p className="mt-3 text-text-muted">
            We received your payment of{' '}
            <span className="font-semibold text-prime-dark">{formattedAmount}</span> for{' '}
            <span className="font-semibold text-prime-dark">{data.schedule.courseName}</span>. A confirmation receipt is on its way to {customer.email}.
          </p>
          {receipt && (
            <p className="mt-4 text-sm text-text-muted">
              Payment reference: <span className="font-mono font-semibold text-prime-dark">{receipt}</span>
            </p>
          )}
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

    // 2. LMS Cohorts: Comprehensive credentials & 3-step onboarding guide
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border-muted bg-surface p-6 shadow-sm sm:p-10 text-center">
        {/* Success Icon */}
        <div className="inline-flex size-20 items-center justify-center rounded-full bg-success/10 text-success mb-2">
          <CircleCheckBig aria-hidden className="size-12" />
        </div>

        <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-extrabold text-prime-dark tracking-tight">
          Payment Successful! Welcome to the Cohort 🎉
        </h2>

        <p className="mt-2 text-sm sm:text-base text-text-muted max-w-lg mx-auto">
          We received your payment of <span className="font-bold text-prime-dark">{formattedAmount}</span> for{' '}
          <span className="font-bold text-prime-dark">{data.schedule.courseName}</span>.
        </p>

        {receipt && (
          <div className="mt-3 inline-block rounded-lg bg-light px-3.5 py-1.5 text-xs text-text-muted font-mono">
            Transaction Reference: <span className="font-bold text-prime-dark">{receipt}</span>
          </div>
        )}

        {/* Actionable Next Steps Guide */}
        <div className="mt-8 rounded-xl border border-prime/20 bg-prime/5 p-5 sm:p-6 text-left">
          <h3 className="font-heading text-base font-bold text-prime-dark flex items-center gap-2">
            <KeyRound className="size-5 text-prime shrink-0" />
            Next Steps to Access Your Class & Credentials:
          </h3>

          <ol className="mt-4 space-y-4 text-xs sm:text-sm text-text-muted">
            <li className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-prime text-white text-xs font-bold mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-prime-dark font-semibold text-sm">
                  Check Your Inbox for LMS Credentials
                </strong>
                <span>
                  Your login details and temporary password have been automatically sent to{' '}
                  <span className="font-semibold text-prime-dark">{customer.email}</span>.
                  (Please also check your Spam/Promotions folder if you don&apos;t see it within 2 minutes).
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-prime text-white text-xs font-bold mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-prime-dark font-semibold text-sm">
                  Access the Student Learning Portal
                </strong>
                <span>
                  Log in to explore pre-reading curriculum materials, syllabus milestones, and required software tools ahead of the first session.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-prime text-white text-xs font-bold mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-prime-dark font-semibold text-sm">
                  Live Class Link & Cohort Community
                </strong>
                <span>
                  Your Google Meet / Zoom classroom link and invite to the private batch community will be shared 24 hours prior to the batch start date.
                </span>
              </div>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={LMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('primary', 'lg', 'gap-2')}
          >
            Go to Student Portal <ExternalLink className="size-4" />
          </a>
          <Link href="/" className={buttonClass('outline', 'lg')}>
            Back to Home
          </Link>
        </div>

        {/* Help & Support note */}
        <p className="mt-6 text-xs text-text-muted flex items-center justify-center gap-1.5">
          <MessageSquare className="size-3.5 text-prime" />
          Need immediate onboarding help? Contact academic support at{' '}
          <a
            href="mailto:support@nivlearn.com"
            className="text-prime font-semibold hover:underline"
          >
            support@nivlearn.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <div className="rounded-2xl border border-border-muted bg-surface p-5 shadow-sm sm:p-8">
        <Steps current={step} />
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
          >
            {error}
          </p>
        )}
        <div className="mt-6">
          {step === 'details' ? (
            <CustomerForm checkout={checkout} />
          ) : (
            <PaymentOptions
              checkout={checkout}
              gateways={data.gateways}
              currency={data.price.currency}
              isCohort={data.isCohort}
            />
          )}
        </div>
      </div>
      <div className="order-first lg:order-none">
        <OrderSummary data={data} checkout={checkout} />
      </div>
    </div>
  );
}
