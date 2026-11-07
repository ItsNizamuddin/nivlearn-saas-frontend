import type { Money, Schedule } from '@/components/schedules/types';

export type PaymentGateway = 'RAZORPAY' | 'STRIPE';

/** Identifies what is being bought; the server looks the price up from it. */
export interface CheckoutRef {
  scheduleCode: string;
  currency: string;
  plan?: string;
  timezone?: string;
}

export interface TaxInfo {
  percentage: number;
  label: string;
  isInclusive: boolean;
}

/** Order totals in the major currency unit (rupees / dollars). */
export interface CheckoutPricing {
  originalAmount: number;
  discountAmount: number;
  finalAmountBeforeTax: number;
  taxAmount: number;
  totalPayable: number;
}

export interface CheckoutAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CheckoutCustomer {
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  address: CheckoutAddress;
}

export interface CheckoutData {
  ref: CheckoutRef;
  schedule: Schedule;
  planName?: string;
  price: Money;
  tax: TaxInfo;
  gateways: PaymentGateway[];
  isCohort?: boolean;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Totals for an amount after discount, with tax added on top or carved out (inclusive). */
export function calculatePricing(baseAmount: number, discountAmount: number, tax: TaxInfo): CheckoutPricing {
  const afterDiscount = Math.max(0, baseAmount - discountAmount);
  const rate = tax.percentage / 100;
  const taxAmount = tax.isInclusive ? afterDiscount - afterDiscount / (1 + rate) : afterDiscount * rate;
  return {
    originalAmount: round2(baseAmount),
    discountAmount: round2(discountAmount),
    finalAmountBeforeTax: round2(tax.isInclusive ? afterDiscount - taxAmount : afterDiscount),
    taxAmount: round2(taxAmount),
    totalPayable: round2(tax.isInclusive ? afterDiscount : afterDiscount + taxAmount),
  };
}

export function formatMoney(amount: number, currency: string, symbol?: string) {
  try {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${symbol ?? ''}${amount.toLocaleString('en-US')}`;
  }
}
