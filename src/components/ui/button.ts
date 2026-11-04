import { cn } from '@/lib/utils';

/**
 * Shared button styles for <button> and <Link>.
 * - `accent`  brand orange + navy text (main CTA; white on orange fails contrast)
 * - `primary` brand blue + white text
 * - `outline` blue border, for secondary actions
 */
const VARIANTS = {
  accent: 'bg-prime-yellow text-prime-dark shadow-md shadow-prime-yellow/25 hover:bg-prime-yellow/90 hover:shadow-lg hover:shadow-prime-yellow/30',
  primary: 'bg-prime text-on-dark shadow-md shadow-prime/25 hover:bg-prime-outline',
  outline: 'border border-prime/30 text-prime hover:border-prime hover:bg-prime/5',
} as const;

const SIZES = {
  md: 'min-h-11 px-6 text-sm',
  lg: 'min-h-12 px-8 text-base',
} as const;

export function buttonClass(
  variant: keyof typeof VARIANTS = 'accent',
  size: keyof typeof SIZES = 'md',
  className?: string,
) {
  return cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98]',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}
