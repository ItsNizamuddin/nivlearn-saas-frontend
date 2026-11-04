'use client';

import { useRef, useState, type FormEvent } from 'react';
import FormField, { controlClass, errorId } from '@/components/ui/form/FormField';
import FormSuccess from '@/components/ui/form/FormSuccess';
import PhoneField from '@/components/ui/form/PhoneField';
import { buttonClass } from '@/components/ui/button';
import { DEFAULT_DIAL_CODE } from '@/lib/countryCodes';
import { focusFirstError, required, validEmail, validPhone } from '@/lib/validation';

const EMPTY = { fullname: '', email: '', dialCode: DEFAULT_DIAL_CODE, phone: '', company: '', message: '' };
type Values = typeof EMPTY;
type Field = 'fullname' | 'email' | 'phone' | 'company';
const ORDER: Field[] = ['fullname', 'email', 'phone', 'company'];

/**
 * Business enquiry form (name, email, phone, company, optional message).
 * Used by Hire From Us and Corporate. `formId` keeps field ids unique per page.
 */
export default function EnquiryForm({ formId, submitLabel = 'Submit' }: { formId: string; submitLabel?: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const id = (f: string) => `${formId}-${f}`;

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = {
      fullname: required(values.fullname, 'Full name is required.'),
      email: validEmail(values.email),
      phone: validPhone(values.phone),
      company: required(values.company, 'Company name is required.'),
    };
    setErrors(found);
    if (focusFirstError(formRef.current, found, ORDER)) return;

    // TODO: send `{ ...values, phone: values.dialCode + values.phone }` to the backend
    // once the NivLearn enquiry endpoint is known. Nothing is sent yet.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess
        onReset={() => {
          setValues(EMPTY);
          setErrors({});
          setSubmitted(false);
        }}
      />
    );
  }

  const text = (field: Field, label: string, type: string, autoComplete: string, placeholder: string) => (
    <FormField id={id(field)} label={label} required error={errors[field]}>
      <input
        id={id(field)}
        name={field}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[field]}
        onChange={(e) => set(field, e.target.value)}
        aria-invalid={!!errors[field]}
        aria-describedby={errors[field] ? errorId(id(field)) : undefined}
        className={controlClass(!!errors[field])}
      />
    </FormField>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {text('fullname', 'Full Name', 'text', 'name', 'Your full name')}
      {text('email', 'Work Email', 'email', 'email', 'you@company.com')}
      <PhoneField
        id={id('phone')}
        dialCode={values.dialCode}
        phone={values.phone}
        onDialCodeChange={(v) => set('dialCode', v)}
        onPhoneChange={(v) => set('phone', v)}
        error={errors.phone}
      />
      {text('company', 'Company Name', 'text', 'organization', 'Company name')}
      <FormField id={id('message')} label="Message (optional)" className="sm:col-span-2">
        <textarea
          id={id('message')}
          name="message"
          rows={3}
          placeholder="Tell us about your requirement"
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          className={controlClass(false, undefined, 'resize-y')}
        />
      </FormField>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClass('accent', 'lg', 'w-full sm:w-auto')}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
