import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** `dark` = heading sits on a dark (prime-dark) background. */
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

/** Eyebrow + title + optional description, used to open every section. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-prime-yellow uppercase sm:text-sm">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'font-bold tracking-tight text-balance',
          Tag === 'h1' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl',
          dark ? 'text-on-dark' : 'text-prime-dark',
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            dark ? 'text-on-dark/80' : 'text-text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
