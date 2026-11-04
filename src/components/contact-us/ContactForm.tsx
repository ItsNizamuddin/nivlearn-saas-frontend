'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import FormField, { controlClass, errorId } from '@/components/ui/form/FormField';
import { buttonClass } from '@/components/ui/button';
import { DEFAULT_DIAL_CODE, DIAL_CODES } from '@/lib/countryCodes';
import { cn } from '@/lib/utils';

export interface CourseOption {
  name: string;
  slug: string;
}

const OTHER_COURSE = 'others';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  fullname: '',
  email: '',
  dialCode: DEFAULT_DIAL_CODE,
  phone: '',
  course: '',
  message: '',
  agreed: false,
};

type FormState = typeof EMPTY_FORM;
type FieldName = 'fullname' | 'email' | 'phone' | 'course' | 'message' | 'agreed';
type Errors = Partial<Record<FieldName, string>>;

/** Field order = order we move focus to the first error. */
const FIELD_ORDER: FieldName[] = ['fullname', 'email', 'phone', 'course', 'message', 'agreed'];

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.fullname.trim()) e.fullname = 'Full name is required.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (f.phone.length < 7 || f.phone.length > 15) e.phone = 'Enter a valid phone number.';
  if (!f.course) e.course = 'Please select a course.';
  if (!f.message.trim()) e.message = 'Message is required.';
  if (!f.agreed) e.agreed = 'Please accept the Privacy Policy and Terms & Conditions.';
  return e;
}

export default function ContactForm({ courses = [] }: { courses?: readonly CourseOption[] }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof FormState>(name: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user fixes it.
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    update(e.target.name as 'fullname' | 'email' | 'course' | 'message' | 'dialCode', e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // TODO: send `{ ...form, phone: form.dialCode + form.phone }` to the backend
    // (with Turnstile CAPTCHA) once the NivLearn contact endpoint is known.
    // Until then nothing is sent — this only shows the success state.
    setSubmitted(true);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center" role="status">
        <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-2xl text-success">
          <FaCheck aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-prime-dark">Thank You!</h2>
        <p className="mt-2 text-text-muted">We will get back to you soon.</p>
        <button
          type="button"
          onClick={reset}
          className={buttonClass('primary', 'md', 'mt-8')}
        >
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (field: FieldName) => (errors[field] ? errorId(`contact-${field}`) : undefined);

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField id="contact-fullname" label="Full Name" required error={errors.fullname}>
        <input
          id="contact-fullname"
          name="fullname"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={form.fullname}
          onChange={onText}
          aria-invalid={!!errors.fullname}
          aria-describedby={describedBy('fullname')}
          className={controlClass(!!errors.fullname)}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-email" label="Email" required error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onText}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={controlClass(!!errors.email)}
          />
        </FormField>

        <FormField id="contact-phone" label="Phone No" required error={errors.phone}>
          <div className="flex gap-2">
            <select
              name="dialCode"
              aria-label="Country code"
              autoComplete="tel-country-code"
              value={form.dialCode}
              onChange={onText}
              className={controlClass(false, 'w-28 shrink-0 px-2')}
            >
              {DIAL_CODES.map((c) => (
                <option key={c.iso} value={c.dial}>
                  {c.iso} {c.dial}
                </option>
              ))}
            </select>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy('phone')}
              className={controlClass(!!errors.phone, 'min-w-0 flex-1 px-3.5')}
            />
          </div>
        </FormField>
      </div>

      <FormField id="contact-course" label="Select a course" required error={errors.course}>
        <select
          id="contact-course"
          name="course"
          value={form.course}
          onChange={onText}
          aria-invalid={!!errors.course}
          aria-describedby={describedBy('course')}
          className={controlClass(!!errors.course, undefined, cn(!form.course && 'text-text-muted'))}
        >
          <option value="" disabled>
            Select course
          </option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
          <option value={OTHER_COURSE}>Others</option>
        </select>
      </FormField>

      <FormField id="contact-message" label="Your Message" required error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          value={form.message}
          onChange={onText}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message')}
          className={controlClass(!!errors.message, undefined, 'resize-y')}
        />
      </FormField>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
          <input
            name="agreed"
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => update('agreed', e.target.checked)}
            aria-invalid={!!errors.agreed}
            aria-describedby={describedBy('agreed')}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-prime"
          />
          <span>
            By clicking submit, you agree to NivLearn&apos;s{' '}
            <Link href="/privacy-policy" className="font-medium text-prime underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-and-conditions" className="font-medium text-prime underline-offset-2 hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </span>
        </label>
        {errors.agreed && (
          <p id={errorId('contact-agreed')} role="alert" className="mt-1.5 text-sm text-danger">
            {errors.agreed}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={buttonClass('accent', 'lg', 'w-full sm:w-auto')}
      >
        Submit
      </button>
    </form>
  );
}
