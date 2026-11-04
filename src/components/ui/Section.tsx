import type { ReactNode } from 'react';
import Container from '@/components/layout/Container';
import Glow from '@/components/ui/Glow';
import { cn } from '@/lib/utils';

const TONES = {
  white: 'bg-surface',
  muted: 'bg-surface-muted',
  light: 'bg-light',
  fade: 'bg-linear-to-b from-light to-surface',
  dark: 'bg-prime-dark text-on-dark',
} as const;

interface SectionProps {
  children: ReactNode;
  tone?: keyof typeof TONES;
  /** Soft brand glow behind the content. */
  glow?: boolean;
  id?: string;
  className?: string;
  /** Classes for the inner Container (e.g. grid layout). */
  containerClassName?: string;
  'aria-label'?: string;
}

/** Full-width page section: background tone + standard vertical rhythm + Container. */
export default function Section({
  children,
  tone = 'white',
  glow,
  id,
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-16 md:py-24', glow && 'overflow-hidden', TONES[tone], className)}
      {...rest}
    >
      {glow && <Glow />}
      <Container className={cn('relative', containerClassName)}>{children}</Container>
    </section>
  );
}
