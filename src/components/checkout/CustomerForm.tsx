'use client';

import { ArrowRight, LoaderCircle, Lock } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';
import FormField, { controlClass } from '@/components/ui/form/FormField';
import { DIAL_CODES } from '@/lib/countryCodes';
import type { CheckoutState } from './useCheckout';

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
}

/** Step 1: learner and billing details. */
export default function CustomerForm({ checkout }: { checkout: CheckoutState }) {
  const { customer, updateCustomer, submitDetails, busy } = checkout;

  const valueOf = (name: string) =>
    name.startsWith('address.')
      ? customer.address[name.slice(8) as keyof typeof customer.address]
      : (customer[name as 'name' | 'email' | 'phone'] ?? '');

  const Field = ({ name, label, type = 'text', autoComplete, required, className, maxLength = 120 }: FieldProps) => {
    const id = `checkout-${name.replace('.', '-')}`;
    return (
      <FormField id={id} label={label} required={required} className={className}>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          value={valueOf(name)}
          onChange={(e) => updateCustomer(name, e.target.value)}
          className={controlClass()}
        />
      </FormField>
    );
  };

  return (
    <form onSubmit={submitDetails} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="font-heading text-lg font-bold text-prime-dark">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {Field({ name: 'name', label: 'Full name', autoComplete: 'name', required: true, className: 'sm:col-span-2' })}
          {Field({ name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true })}
          <FormField id="checkout-phone" label="Phone" required>
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={customer.dialCode}
                onChange={(e) => updateCustomer('dialCode', e.target.value)}
                autoComplete="tel-country-code"
                className={controlClass(false, 'w-24 shrink-0 px-2')}
              >
                {DIAL_CODES.map((c) => (
                  <option key={c.iso} value={c.dial}>
                    {c.iso} {c.dial}
                  </option>
                ))}
              </select>
              <input
                id="checkout-phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel-national"
                pattern="[0-9 ()-]{7,15}"
                title="Enter a valid phone number"
                maxLength={16}
                value={customer.phone}
                onChange={(e) => updateCustomer('phone', e.target.value)}
                className={controlClass()}
              />
            </div>
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-lg font-bold text-prime-dark">Billing address</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {Field({ name: 'address.line1', label: 'Address line 1', autoComplete: 'address-line1', required: true, className: 'sm:col-span-2', maxLength: 200 })}
          {Field({ name: 'address.line2', label: 'Address line 2 (optional)', autoComplete: 'address-line2', className: 'sm:col-span-2', maxLength: 200 })}
          {Field({ name: 'address.city', label: 'City', autoComplete: 'address-level2', required: true })}
          {Field({ name: 'address.state', label: 'State / Region', autoComplete: 'address-level1', required: true })}
          {Field({ name: 'address.country', label: 'Country', autoComplete: 'country-name', required: true })}
          {Field({ name: 'address.postalCode', label: 'Postal code', autoComplete: 'postal-code', required: true, maxLength: 20 })}
        </div>
      </fieldset>

      <button type="submit" disabled={busy} className={buttonClass('accent', 'lg', 'w-full disabled:cursor-wait disabled:opacity-70')}>
        {busy ? (
          <>
            <LoaderCircle aria-hidden className="size-5 animate-spin" /> Creating your order…
          </>
        ) : (
          <>
            Continue to Payment <ArrowRight aria-hidden className="size-5" />
          </>
        )}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-text-muted">
        <Lock aria-hidden className="size-3.5" /> Your details are sent securely and used only for this enrolment.
      </p>
    </form>
  );
}
