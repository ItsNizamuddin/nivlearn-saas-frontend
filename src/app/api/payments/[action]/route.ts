import { NextRequest, NextResponse } from 'next/server';
import { getRealClientIp } from '@/lib/apiProxy';
import { checkRateLimit } from '@/lib/rateLimit';
import { isValidTimeZone } from '@/lib/scheduleTime';
import { callPaymentApi, checkoutTax, couponTarget, GATEWAYS, resolveCheckoutItem, toMinorUnit } from '@/services/payment.service';

/*
 * Checkout proxy for the Payment API. The browser only says *what* it buys
 * (schedule code, currency, plan); the price is looked up here, so it can't be edited client-side.
 *   POST /api/payments/coupon           preview a coupon
 *   POST /api/payments/submit           create the payment draft
 *   POST /api/payments/initiate         start the gateway payment
 *   POST /api/payments/resolve-success  confirm after the gateway reports success
 */

type Body = Record<string, unknown>;

const text = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const fail = (message: string, status = 400) => NextResponse.json({ success: false, message }, { status });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function itemFrom(body: Body) {
  const timezone = text(body.timezone, 64);
  return resolveCheckoutItem({
    scheduleCode: text(body.scheduleCode, 40),
    currency: text(body.currency, 3).toUpperCase() || undefined,
    plan: text(body.plan, 120) || undefined,
    timezone: isValidTimeZone(timezone) ? timezone : undefined,
  });
}

/** Payload fields shared by coupon preview and submit. */
async function pricedOrder(body: Body) {
  const item = await itemFrom(body);
  if (!item) return null;
  const tax = await checkoutTax(item);
  return { item, tax, amount: toMinorUnit(item.price.amount), taxRate: tax.isInclusive ? 0 : tax.percentage };
}

async function coupon(body: Body, request: NextRequest) {
  const code = text(body.code, 40).toUpperCase();
  if (!code) return fail('Enter a coupon code.');
  const order = await pricedOrder(body);
  if (!order) return fail('This batch is no longer available.', 404);
  const { ok, status, data } = await callPaymentApi(
    'coupons/apply',
    {
      amount: order.amount,
      code,
      scheduleOrOrderId: couponTarget(order.item),
      tax: order.taxRate,
      courseId: order.item.schedule.courseId,
      courseSlug: order.item.schedule.courseSlug,
    },
    request,
  );
  if (!ok || !data.success) {
    const reason = text(data.error) || text(data.message);
    // The API answers unknown codes with a raw "Request failed with status code 404".
    const message = !reason || /request failed|status code/i.test(reason) ? 'This coupon is not valid for this batch.' : reason;
    return fail(message, ok || status === 404 ? 400 : status);
  }
  return NextResponse.json(data);
}

async function submit(body: Body, request: NextRequest) {
  const name = text(body.name, 100);
  const email = text(body.email, 150);
  const phone = text(body.phone, 20).replace(/[^\d+]/g, '');
  if (name.length < 2) return fail('Enter your full name.');
  if (!EMAIL.test(email)) return fail('Enter a valid email address.');
  if (phone.replace(/\D/g, '').length < 10 || phone.length > 16) return fail('Enter a valid phone number.');

  const order = await pricedOrder(body);
  if (!order) return fail('This batch is no longer available.', 404);
  const { item } = order;
  const address = typeof body.address === 'object' && body.address ? (body.address as Body) : {};
  const utm = typeof body.utm === 'object' && body.utm ? (body.utm as Body) : {};
  const deviceType = ['desktop', 'mobile', 'tablet'].includes(text(body.deviceType)) ? text(body.deviceType) : 'desktop';

  const { ok, status, data } = await callPaymentApi(
    'submit',
    {
      name,
      email,
      phone,
      address: {
        line1: text(address.line1),
        line2: text(address.line2),
        city: text(address.city, 100),
        state: text(address.state, 100),
        country: text(address.country, 100),
        postalCode: text(address.postalCode, 20),
      },
      baseAmount: order.amount,
      currency: item.price.currency,
      couponCode: text(body.couponCode, 40).toUpperCase() || null,
      taxRate: order.taxRate,
      orderId: couponTarget(item),
      referenceId: null,
      source: 'NivLearn',
      productDetails: {
        name: item.planName ? `${item.schedule.courseName} (${item.planName})` : item.schedule.courseName,
        productType: 'SCHEDULE',
        productId: item.schedule.courseId,
        courseId: item.schedule.courseId,
        scheduleId: item.schedule.code,
        variant: item.planName,
        quantity: 1,
        unitPrice: order.amount,
        totalAmount: order.amount,
        currency: item.price.currency,
        startDate: item.schedule.startsAt ?? null,
        endDate: item.schedule.endsAt ?? null,
        location: item.schedule.deliveryType === 'online' ? 'Online' : item.schedule.venue,
        trainerName: item.schedule.trainers[0]?.name,
        sessionCount: item.schedule.totalSessions,
      },
      deviceType,
      ipAddress: getRealClientIp(request) || null,
      userAgent: request.headers.get('user-agent'),
      referrerUrl: text(body.referrerUrl, 500) || null,
      pageUrl: text(body.pageUrl, 500) || null,
      utm_source: text(utm.utm_source) || null,
      utm_medium: text(utm.utm_medium) || null,
      utm_campaign: text(utm.utm_campaign) || null,
      utm_term: text(utm.utm_term) || null,
      utm_content: text(utm.utm_content) || null,
    },
    request,
  );
  if (!ok || !data.success) return fail(text(data.message) || text(data.error) || 'Could not create your order. Please try again.', ok ? 400 : status);
  return NextResponse.json({
    success: true,
    paymentId: data.paymentId,
    finalAmount: data.finalAmount,
    taxAmount: data.taxAmount,
    discountAmount: data.discountAmount,
  });
}

async function initiate(body: Body, request: NextRequest) {
  const paymentId = text(body.paymentId, 100);
  const gateway = text(body.gateway) as (typeof GATEWAYS)[number];
  if (!paymentId || !GATEWAYS.includes(gateway)) return fail('Invalid payment request.');
  const { ok, status, data } = await callPaymentApi('initiate', { paymentId, gateway }, request);
  if (!ok || !data.success) return fail(text(data.message) || 'Could not start the payment. Please try again.', ok ? 400 : status);
  return NextResponse.json(data);
}

async function resolveSuccess(body: Body, request: NextRequest) {
  const paymentId = text(body.paymentId, 100);
  const gatewayOrderId = text(body.gatewayOrderId, 200);
  const gateway = text(body.gateway);
  if (!paymentId || !gatewayOrderId || !GATEWAYS.includes(gateway as (typeof GATEWAYS)[number])) return fail('Invalid payment confirmation.');
  const { ok, status, data } = await callPaymentApi('resolve-success', { paymentId, gatewayOrderId, gateway }, request);
  if (!ok) return fail(text(data.message) || text(data.error) || 'Could not confirm the payment.', status);
  return NextResponse.json(data);
}

const ACTIONS = { coupon, submit, initiate, 'resolve-success': resolveSuccess } as const;

export async function POST(request: NextRequest, { params }: RouteContext<'/api/payments/[action]'>) {
  const { action } = await params;
  const handler = ACTIONS[action as keyof typeof ACTIONS];
  if (!handler) return fail('Not found', 404);

  const ip = getRealClientIp(request) || 'unknown';
  if (!checkRateLimit(`payments-${action}:${ip}`, action === 'coupon' ? 15 : 10, 60_000)) {
    return fail('Too many requests. Please wait a moment and try again.', 429);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return fail('Invalid request body.');
  try {
    return await handler(body as Body, request);
  } catch (error) {
    console.error(`[payments/${action}]`, error);
    return fail('Something went wrong. Please try again.', 500);
  }
}
