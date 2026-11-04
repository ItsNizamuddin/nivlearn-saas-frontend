import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared look for text inputs, selects and textareas.
 * Width and horizontal padding are NOT in the base on purpose: `cn` only joins
 * classes, so a base `w-full` would silently beat a caller's `w-24`.
 * Pass `layout` to override the default `w-full px-3.5`.
 */
export function controlClass(hasError?: boolean, layout = 'w-full px-3.5', extra?: string) {
  return cn(
    layout,
    'rounded-lg border bg-surface py-2.5 text-base text-prime-dark placeholder:text-text-muted/70',
    'transition-[border-color,box-shadow] duration-200 outline-none focus:ring-3',
    hasError
      ? 'border-danger focus:border-danger focus:ring-danger/20'
      : 'border-border-muted focus:border-prime focus:ring-prime/20',
    extra,
  );
}

/** Id of the error message for a field — wire to the control's `aria-describedby`. */
export const errorId = (id: string) => `${id}-error`;

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Visible label + control + inline error under the field. */
export default function FormField({ id, label, required, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-prime-dark">
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId(id)} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
