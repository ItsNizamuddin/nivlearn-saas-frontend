import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Bulleted list with check icons. `dark` for use on dark backgrounds. */
export default function CheckList({
  items,
  tone = 'light',
  className,
}: {
  items: readonly ReactNode[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn(
              'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px]',
              dark ? 'bg-prime1/20 text-prime1' : 'bg-prime/10 text-prime',
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={cn('text-sm sm:text-base', dark ? 'text-on-dark/85' : 'text-text-body')}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
