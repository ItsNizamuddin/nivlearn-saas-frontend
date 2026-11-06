'use client';

import { ArrowLeft, CreditCard, LoaderCircle, Lock, ShieldCheck, Smartphone } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatMoney, type PaymentGateway } from './types';
import type { CheckoutState } from './useCheckout';

const GATEWAY_INFO: Record<PaymentGateway, { title: string; detail: string; icon: typeof CreditCard }> = {
  RAZORPAY: { title: 'UPI, cards, net banking & wallets', detail: 'Secure payment by Razorpay', icon: Smartphone },
  STRIPE: { title: 'Credit or debit card', detail: 'Secure payment by Stripe', icon: CreditCard },
};

/** Step 2: pick a gateway and pay. */
export default function PaymentOptions({
  checkout,
  gateways,
  currency,
}: {
  checkout: CheckoutState;
  gateways: PaymentGateway[];
  currency: string;
}) {
  const { pay, busy, activeGateway, stripeReady, mountStripeCard, confirmStripe, backToDetails, pricing, customer } = checkout;
  const total = formatMoney(pricing.totalPayable, currency);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-heading text-lg font-bold text-prime-dark">Choose a payment method</h2>
        <button
          type="button"
          onClick={backToDetails}
          disabled={busy}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-prime hover:underline disabled:opacity-50"
        >
          <ArrowLeft aria-hidden className="size-4" /> Edit details
        </button>
      </div>

      <p className="rounded-xl bg-light/70 p-3 text-sm text-text-muted">
        Paying as <span className="font-semibold text-prime-dark">{customer.name}</span> ({customer.email})
      </p>

      {gateways.length === 0 ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          Online payment is not available right now. Please contact us to complete your enrolment.
        </p>
      ) : (
        <ul className="space-y-3">
          {gateways.map((gateway) => {
            const info = GATEWAY_INFO[gateway];
            const Icon = info.icon;
            const active = activeGateway === gateway;
            return (
              <li key={gateway}>
                <button
                  type="button"
                  onClick={() => pay(gateway)}
                  disabled={busy || (stripeReady && gateway === 'STRIPE')}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-colors disabled:cursor-default',
                    active ? 'border-prime bg-light/60' : 'border-border-muted hover:border-prime/50 hover:bg-light/40',
                  )}
                >
                  <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface text-prime shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-prime-dark">{info.title}</span>
                    <span className="block text-xs text-text-muted">{info.detail}</span>
                  </span>
                  {active && busy ? (
                    <LoaderCircle aria-label="Starting payment" className="size-5 animate-spin text-prime" />
                  ) : (
                    <span className="text-sm font-bold text-prime">Pay {total}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {stripeReady && (
        <div className="space-y-3 rounded-xl border border-border-muted p-4">
          <p className="text-sm font-medium text-prime-dark">Card details</p>
          <div ref={mountStripeCard} className="rounded-lg border border-border-muted px-3 py-3.5" />
          <button type="button" onClick={confirmStripe} disabled={busy} className={buttonClass('accent', 'lg', 'w-full disabled:opacity-70')}>
            {busy ? <LoaderCircle aria-hidden className="size-5 animate-spin" /> : <Lock aria-hidden className="size-4" />} Pay {total}
          </button>
        </div>
      )}

      <p className="flex items-center justify-center gap-1.5 text-xs text-text-muted">
        <ShieldCheck aria-hidden className="size-4 text-success" /> Payments are processed by the gateway; we never see your card details.
      </p>
    </div>
  );
}
