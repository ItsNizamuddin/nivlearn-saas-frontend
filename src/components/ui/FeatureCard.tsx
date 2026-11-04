import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Content shape for a FeatureCard driven by data files. */
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ICON_TONES = {
  blue: 'bg-prime/10 text-prime',
  orange: 'bg-prime-yellow/15 text-prime-yellow',
  glass: 'bg-on-dark/10 text-prime1',
} as const;

/** Square tinted tile holding an icon. */
export function IconTile({
  children,
  tone = 'blue',
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof ICON_TONES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl [&>svg]:size-6', ICON_TONES[tone], className)}
    >
      {children}
    </span>
  );
}

interface FeatureCardProps {
  icon?: ReactNode;
  iconTone?: keyof typeof ICON_TONES;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** `row` puts the icon beside the text. `dark` = card on a dark section. */
  layout?: 'stack' | 'row';
  tone?: 'light' | 'dark';
  as?: 'li' | 'div';
  className?: string;
}

/** Icon + title + description card — the most common block on marketing pages. */
export default function FeatureCard({
  icon,
  iconTone = 'blue',
  title,
  description,
  children,
  layout = 'stack',
  tone = 'light',
  as: Tag = 'li',
  className,
}: FeatureCardProps) {
  const dark = tone === 'dark';

  return (
    <Tag
      className={cn(
        'flex h-full gap-4 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5',
        layout === 'row' ? 'flex-row items-start' : 'flex-col',
        dark
          ? 'border-on-dark/15 bg-on-dark/5 hover:bg-on-dark/10'
          : 'border-prime/15 bg-surface hover:border-prime/25 hover:shadow-card',
        className,
      )}
    >
      {icon && <IconTile tone={dark ? 'glass' : iconTone}>{icon}</IconTile>}
      <div className="min-w-0">
        <h3 className={cn('text-lg font-bold', dark ? 'text-on-dark' : 'text-prime-dark')}>{title}</h3>
        {description && (
          <p className={cn('mt-2 text-sm leading-relaxed sm:text-base', dark ? 'text-on-dark/75' : 'text-text-muted')}>
            {description}
          </p>
        )}
        {children}
      </div>
    </Tag>
  );
}
