import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Brand gradient text.
 * - `blue`   (prime → prime-dark): for light backgrounds.
 * - `orange` (logo orange gradient): for dark backgrounds only — the yellow
 *   end is unreadable on white.
 */
export default function GradientText({
  children,
  tone = 'blue',
  className,
}: {
  children: ReactNode;
  tone?: 'blue' | 'orange';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent',
        tone === 'orange' ? 'bg-brand-orange' : 'bg-linear-to-r from-prime to-prime-dark',
        className,
      )}
    >
      {children}
    </span>
  );
}
