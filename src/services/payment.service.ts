import 'server-only';
import type { NextRequest } from 'next/server';
import { getRealClientIp, getSubdomain } from '@/lib/apiProxy';
import { env } from '@/lib/env';
import type { Money, Schedule } from '@/components/schedules/types';
import { planPrice } from '@/components/schedules/format';
import { getPricingTemplate, getScheduleByCode, getTaxConfig } from './schedule.service';

/*
 * Payment API (https://api.skilldeck.net/payment-docs), served under /public:
 *   keys → coupons/apply (optional) → submit (draft) → initiate (gateway) → gateway SDK → webhook.
 * Amounts are in the smallest currency unit (paise / cents).
 */

export type PaymentGateway = 'RAZORPAY' | 'STRIPE';
export const GATEWAYS: readonly PaymentGateway[] = ['RAZORPAY', 'STRIPE'];

export const toMinorUnit = (amount: number) => Math.round(amount * 100);

export async function callPaymentApi(path: string, body: unknown, request?: NextRequest) {
  const headers: Record<string, string> = { 'x-api-key': env.API_KEY, 'Content-Type': 'application/json' };
  if (request) {
    const ip = getRealClientIp(request);
    if (ip) headers['X-User-IP'] = ip;
    const subdomain = getSubdomain(request);
    if (subdomain) headers['X-Tenant-Subdomain'] = subdomain;
  }
  const res = await fetch(`${env.API_BASE_URL}/public/payments/${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const data: unknown = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data: (data ?? {}) as Record<string, unknown> };
}

/** Gateways with a publishable key configured for this tenant. */
export async function getAvailableGateways(): Promise<PaymentGateway[]> {
  const results = await Promise.all(
    GATEWAYS.map(async (gateway) => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/public/payments/keys?gateway=${gateway}`, {
          headers: { 'x-api-key': env.API_KEY },
          next: { revalidate: 3600, tags: ['payment-keys'] },
        });
        const data = await res.json().catch(() => null);
        return res.ok && data?.success && data.publishableKey ? gateway : null;
      } catch {
        return null;
      }
    }),
  );
  return results.filter((g): g is PaymentGateway => g !== null);
}

export interface CheckoutItem {
  schedule: Schedule;
  planName?: string;
  price: Money;
}

/**
 * The batch and price for a checkout, looked up on the server so the amount charged
 * never comes from the browser.
 */
export async function resolveCheckoutItem(input: {
  scheduleCode?: string;
  currency?: string;
  plan?: string;
  timezone?: string;
}): Promise<CheckoutItem | null> {
  if (!input.scheduleCode) return null;
  const schedule = await getScheduleByCode(input.scheduleCode, input.currency, input.timezone);
  if (!schedule) return null;

  // A multi-plan batch must name a real plan: an unknown or missing plan (or a failed
  // template fetch) is rejected rather than falling back to the cheaper base price.
  if (schedule.pricingTemplateId) {
    if (!input.plan) return null;
    const template = await getPricingTemplate(schedule.pricingTemplateId);
    const plan = template?.plans.find((p) => p.name === input.plan);
    const price = plan && planPrice(plan, input.currency ?? schedule.price?.currency);
    return price ? { schedule, planName: plan.name, price } : null;
  }
  return schedule.price ? { schedule, price: schedule.price } : null;
}

/**
 * Tax for an order, from its currency and the batch country's zone (both set in the CMS).
 * Never from the browser's zone: the tax API matches currency + zone to a country, so
 * e.g. INR + America/New_York would match no country and skip GST.
 */
export function checkoutTax(item: CheckoutItem) {
  return getTaxConfig(item.price.currency, item.schedule.countryTimeZone ?? 'UTC');
}

/** ID coupons are validated against; preview and order must send the same one. */
export const couponTarget = (item: CheckoutItem) => item.schedule.courseId ?? item.schedule.code;
