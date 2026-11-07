import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'x' | 'y';
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  /** Background colour class used for the fading edges (e.g. 'from-surface'). */
  fadeFrom?: string;
  className?: string;
  label?: string;
}

/**
 * Endless scrolling strip, done in CSS (no JS animation loop).
 * Pauses on hover; stops under prefers-reduced-motion (global rule).
 */
export default function Marquee({
  children,
  direction = 'x',
  reverse,
  duration = 40,
  fadeFrom = 'from-surface',
  className,
  label,
}: MarqueeProps) {
  const vertical = direction === 'y';
  const track = cn(
    'flex shrink-0 gap-6 will-change-transform',
    vertical ? 'flex-col animate-marquee-y' : 'animate-marquee-x',
    reverse && '[animation-direction:reverse]',
  );

  return (
    <div
      role={label ? 'region' : undefined}
      aria-label={label}
      className={cn('group relative overflow-hidden', vertical ? 'h-full' : 'w-full', className)}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div className={cn('flex w-max group-hover:*:[animation-play-state:paused]', vertical ? 'flex-col' : 'flex-row')}>
        <div className={cn(track, vertical ? 'pb-6' : 'pr-6')}>{children}</div>
        {/* Duplicate for a seamless loop; hidden from assistive tech. */}
        <div className={cn(track, vertical ? 'pb-6' : 'pr-6')} aria-hidden>
          {children}
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute to-transparent',
          fadeFrom,
          vertical ? 'inset-x-0 top-0 h-16 bg-linear-to-b' : 'inset-y-0 left-0 w-16 bg-linear-to-r',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute to-transparent',
          fadeFrom,
          vertical ? 'inset-x-0 bottom-0 h-16 bg-linear-to-t' : 'inset-y-0 right-0 w-16 bg-linear-to-l',
        )}
      />
    </div>
  );
}
