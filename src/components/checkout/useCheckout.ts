'use client';

import { useState, type FormEvent } from 'react';
import { DEFAULT_DIAL_CODE } from '@/lib/countryCodes';
import { getAttributionData } from '@/lib/utm';
import {
  calculatePricing,
  type CheckoutCustomer,
  type CheckoutData,
  type CheckoutPricing,
  type PaymentGateway,
} from './types';

/* ---------- gateway SDKs (loaded on demand) ---------- */

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface StripeCard {
  mount: (element: HTMLElement) => void;
  destroy: () => void;
}

interface StripeClient {
  elements: () => { create: (type: 'card', options?: Record<string, unknown>) => StripeCard };
  confirmCardPayment: (
    secret: string,
    data: { payment_method: { card: StripeCard; billing_details: Record<string, unknown> } },
  ) => Promise<{ paymentIntent?: { id: string; status: string }; error?: { message?: string } }>;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
    Stripe?: (key: string) => StripeClient;
  }
}

const SDK_URLS = { RAZORPAY: 'https://checkout.razorpay.com/v1/checkout.js', STRIPE: 'https://js.stripe.com/v3/' } as const;

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ---------- helpers ---------- */

const toMajor = (minor: unknown) => (typeof minor === 'number' ? Math.round(minor) / 100 : 0);

function deviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
}

async function post<T = Record<string, unknown>>(path: string, body: unknown): Promise<{ ok: boolean; data: T & { message?: string } }> {
  try {
    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && data.success !== false, data };
  } catch {
    return { ok: false, data: { message: 'Network error. Check your connection and try again.' } as T & { message?: string } };
  }
}

export type CheckoutStep = 'details' | 'payment' | 'success';

const EMPTY_CUSTOMER: CheckoutCustomer = {
  name: '',
  email: '',
  dialCode: DEFAULT_DIAL_CODE,
  phone: '',
  address: { line1: '', line2: '', city: '', state: '', country: '', postalCode: '' },
};

/**
 * Checkout flow (Payment API): optional coupon preview → draft order (submit) →
 * gateway (initiate + SDK) → confirm (resolve-success). Prices are recomputed on the server.
 */
export function useCheckout(data: CheckoutData) {
  const { ref, schedule, price, tax } = data;
  const [step, setStep] = useState<CheckoutStep>('details');
  const [customer, setCustomer] = useState<CheckoutCustomer>(EMPTY_CUSTOMER);
  const [pricing, setPricing] = useState<CheckoutPricing>(() => calculatePricing(price.amount, 0, tax));
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponBusy, setCouponBusy] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [activeGateway, setActiveGateway] = useState<PaymentGateway | null>(null);
  const [stripe, setStripe] = useState<{ client: StripeClient; secret: string; card?: StripeCard } | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);

  const updateCustomer = (field: string, value: string) =>
    setCustomer((prev) =>
      field.startsWith('address.')
        ? { ...prev, address: { ...prev.address, [field.slice(8)]: value } }
        : { ...prev, [field]: value },
    );

  const applyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    setCouponBusy(true);
    setCouponError(null);
    const { ok, data: res } = await post('/api/payments/coupon', { ...ref, code });
    setCouponBusy(false);
    if (!ok) {
      setCouponError(res.message || 'This coupon is not valid.');
      return;
    }
    setAppliedCoupon(code);
    setPricing({
      originalAmount: toMajor(res.originalAmount),
      discountAmount: toMajor(res.discountAmount),
      finalAmountBeforeTax: toMajor(res.finalAmountBeforeTax),
      taxAmount: toMajor(res.taxAmount),
      totalPayable: toMajor(res.totalPayable),
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
    setPricing(calculatePricing(price.amount, 0, tax));
  };

  /** Step 1: create the payment draft. */
  const submitDetails = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const attribution = getAttributionData();
    const phone = `${customer.dialCode}${customer.phone.replace(/\D/g, '')}`;
    const { ok, data: res } = await post<{ paymentId?: string; finalAmount?: number }>('/api/payments/submit', {
      ...ref,
      name: customer.name,
      email: customer.email,
      phone,
      address: customer.address,
      couponCode: appliedCoupon,
      deviceType: deviceType(),
      pageUrl: window.location.href,
      referrerUrl: document.referrer,
      utm: {
        utm_source: attribution.utm_source ?? attribution.utmSource,
        utm_medium: attribution.utm_medium ?? attribution.utmMedium,
        utm_campaign: attribution.utm_campaign ?? attribution.utmCampaign,
        utm_term: attribution.utm_term ?? attribution.utmTerm,
        utm_content: attribution.utm_content ?? attribution.utmContent,
      },
    });
    setBusy(false);
    if (!ok || !res.paymentId) {
      setError(res.message || 'Could not create your order. Please try again.');
      return;
    }
    // Never send the learner to the gateway for a different amount than the one shown.
    if (typeof res.finalAmount === 'number' && Math.abs(res.finalAmount / 100 - pricing.totalPayable) > 1) {
      setError(
        appliedCoupon
          ? `Coupon ${appliedCoupon} could not be applied to this order. Remove it and try again.`
          : 'The price of this batch has changed. Please refresh the page.',
      );
      return;
    }
    setPaymentId(res.paymentId);
    setStep('payment');
  };

  const confirm = async (gateway: PaymentGateway, gatewayOrderId: string) => {
    const { ok, data: res } = await post<{ payment?: { gatewayPaymentId?: string } }>('/api/payments/resolve-success', {
      paymentId,
      gatewayOrderId,
      gateway,
    });
    // The gateway already took the payment; the webhook settles the order even if this call fails.
    setReceipt((ok && res.payment?.gatewayPaymentId) || gatewayOrderId);
    setStep('success');
  };

  /** Step 2: start the payment with a gateway. */
  const pay = async (gateway: PaymentGateway) => {
    if (!paymentId) return;
    setBusy(true);
    setError(null);
    setActiveGateway(gateway);
    const fail = (message: string) => {
      setError(message);
      setBusy(false);
      setActiveGateway(null);
    };

    const { ok, data: res } = await post<{
      keyId?: string;
      gatewayOrderId?: string;
      amount?: number;
      currency?: string;
      clientSecret?: string;
      approvalUrl?: string;
    }>('/api/payments/initiate', { paymentId, gateway });
    if (!ok || !res.keyId) return fail(res.message || 'Could not start the payment. Please try again.');
    if (res.approvalUrl) {
      window.location.assign(res.approvalUrl);
      return;
    }
    if (!(await loadScript(SDK_URLS[gateway]))) return fail('The payment window could not load. Disable ad blockers and try again.');

    if (gateway === 'RAZORPAY') {
      if (!window.Razorpay || !res.gatewayOrderId) return fail('The payment window could not load. Please try again.');
      const orderId = res.gatewayOrderId;
      new window.Razorpay({
        key: res.keyId,
        amount: res.amount ?? Math.round(pricing.totalPayable * 100),
        currency: res.currency ?? price.currency,
        name: 'NivLearn',
        description: data.planName ? `${schedule.courseName} (${data.planName})` : schedule.courseName,
        order_id: orderId,
        prefill: { name: customer.name, email: customer.email, contact: `${customer.dialCode}${customer.phone}` },
        theme: { color: '#005CCF' },
        handler: () => {
          void confirm('RAZORPAY', orderId);
        },
        modal: { ondismiss: () => fail('Payment was cancelled. You can try again.') },
      }).open();
      return;
    }

    if (!window.Stripe || !res.clientSecret) return fail('Card payment could not start. Please try again.');
    setStripe({ client: window.Stripe(res.keyId), secret: res.clientSecret });
    setBusy(false);
  };

  /** Mount Stripe's card field into the given element (once). */
  const mountStripeCard = (element: HTMLElement | null) => {
    if (!element || !stripe || stripe.card) return;
    const card = stripe.client.elements().create('card', { hidePostalCode: true });
    card.mount(element);
    setStripe({ ...stripe, card });
  };

  const confirmStripe = async () => {
    if (!stripe?.card) return;
    setBusy(true);
    setError(null);
    const { paymentIntent, error: stripeError } = await stripe.client.confirmCardPayment(stripe.secret, {
      payment_method: {
        card: stripe.card,
        billing_details: { name: customer.name, email: customer.email, phone: `${customer.dialCode}${customer.phone}` },
      },
    });
    if (stripeError || paymentIntent?.status !== 'succeeded') {
      setBusy(false);
      setError(stripeError?.message || 'Card payment failed. Please try again.');
      return;
    }
    await confirm('STRIPE', paymentIntent.id);
    setBusy(false);
  };

  const backToDetails = () => {
    setStep('details');
    setPaymentId(null);
    setStripe(null);
    setActiveGateway(null);
    setError(null);
  };

  return {
    step,
    customer,
    updateCustomer,
    pricing,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponBusy,
    couponError,
    applyCoupon,
    removeCoupon,
    submitDetails,
    busy,
    error,
    activeGateway,
    pay,
    stripeReady: !!stripe,
    mountStripeCard,
    confirmStripe,
    backToDetails,
    receipt,
  };
}

export type CheckoutState = ReturnType<typeof useCheckout>;
