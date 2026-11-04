'use client';

import FormField, { controlClass, errorId } from '@/components/ui/form/FormField';
import { DIAL_CODES } from '@/lib/countryCodes';

interface PhoneFieldProps {
  id: string;
  label?: string;
  dialCode: string;
  phone: string;
  onDialCodeChange: (value: string) => void;
  /** Receives digits only. */
  onPhoneChange: (digits: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

/** Country dial-code select + national number input. Input `name` is "phone". */
export default function PhoneField({
  id,
  label = 'Phone No',
  dialCode,
  phone,
  onDialCodeChange,
  onPhoneChange,
  error,
  required = true,
  className,
}: PhoneFieldProps) {
  return (
    <FormField id={id} label={label} required={required} error={error} className={className}>
      <div className="flex gap-2">
        <select
          name="dialCode"
          aria-label="Country code"
          autoComplete="tel-country-code"
          value={dialCode}
          onChange={(e) => onDialCodeChange(e.target.value)}
          className={controlClass(false, 'w-28 shrink-0 px-2')}
        >
          {DIAL_CODES.map((c) => (
            <option key={c.iso} value={c.dial}>
              {c.iso} {c.dial}
            </option>
          ))}
        </select>
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
          aria-invalid={!!error}
          aria-describedby={error ? errorId(id) : undefined}
          className={controlClass(!!error, 'min-w-0 flex-1 px-3.5')}
        />
      </div>
    </FormField>
  );
}
