/** Shared form validators. Return an error message, or undefined when valid. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const required = (value: string, message: string) => (value.trim() ? undefined : message);

export const validEmail = (value: string) =>
  EMAIL_RE.test(value.trim()) ? undefined : 'Enter a valid email address.';

/** National number only (digits, no dial code). */
export const validPhone = (digits: string) =>
  digits.length >= 7 && digits.length <= 15 ? undefined : 'Enter a valid phone number.';

/** Focus the first field (by `name`) that has an error, in the given order. */
export function focusFirstError<K extends string>(
  form: HTMLFormElement | null,
  errors: Partial<Record<K, string | undefined>>,
  order: readonly K[],
) {
  const first = order.find((k) => errors[k]);
  if (first) form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  return Boolean(first);
}
