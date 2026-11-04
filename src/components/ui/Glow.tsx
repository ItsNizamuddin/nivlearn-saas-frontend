import { cn } from '@/lib/utils';

/**
 * Soft blurred brand-colour blobs for section backgrounds (decorative only).
 * Parent needs `relative overflow-hidden`; put content in a `relative` wrapper.
 */
export default function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <div className="absolute -top-32 -left-24 size-96 rounded-full bg-prime1/20 blur-3xl" />
      <div className="absolute -right-24 -bottom-32 size-96 rounded-full bg-prime-yellow/15 blur-3xl" />
    </div>
  );
}
