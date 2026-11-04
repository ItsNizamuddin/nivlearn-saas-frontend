'use client';

import { Check, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { controlClass, errorId } from '@/components/ui/form/FormField';
import { buttonClass } from '@/components/ui/button';
import { validEmail } from '@/lib/validation';

const ID = 'newsletter-email';

/**
 * Newsletter sign-up (UI only).
 * TODO: POST the email to the subscribe endpoint once the backend exposes one.
 */
export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err = validEmail(email);
    setError(err);
    if (!err) setDone(true);
  };

  return (
    <div className="rounded-2xl border border-prime/10 bg-light p-6">
      <span className="flex size-11 items-center justify-center rounded-xl bg-prime text-xl text-on-dark">
        <Mail aria-hidden className="size-5" />
      </span>
      <h2 className="mt-4 text-lg font-bold text-prime-dark">Subscribe to our newsletter</h2>
      <p className="mt-1 text-sm text-text-muted">Get new articles and learning resources in your inbox.</p>

      {done ? (
        <p role="status" className="mt-5 flex items-center gap-2 text-sm font-medium text-success">
          <Check aria-hidden className="size-4" /> Thanks! You&apos;re subscribed.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <label htmlFor={ID} className="sr-only">
            Email address
          </label>
          <input
            id={ID}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId(ID) : undefined}
            className={controlClass(Boolean(error))}
          />
          {error && (
            <p id={errorId(ID)} role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          <button type="submit" className={buttonClass('primary', 'md', 'w-full')}>
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
