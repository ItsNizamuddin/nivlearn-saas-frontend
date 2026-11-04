import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Standard page-width wrapper: max-w-6xl from md, max-w-7xl on 2xl site-wide. */
export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('section-container', className)}>{children}</div>;
}
