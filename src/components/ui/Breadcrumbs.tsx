import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  /** Omit for the current page (last crumb). */
  href?: string;
}

/** Breadcrumb trail. Last item is the current page. `tone="dark"` for navy backgrounds. */
export default function Breadcrumbs({
  items,
  tone = 'light',
  className,
}: {
  items: readonly Crumb[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-1 text-sm', dark ? 'text-on-dark/70' : 'text-text-muted')}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-1">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn('transition-colors duration-200', dark ? 'hover:text-on-dark' : 'hover:text-prime')}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={cn('line-clamp-1 font-medium', dark ? 'text-on-dark' : 'text-prime-dark')}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-4 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
