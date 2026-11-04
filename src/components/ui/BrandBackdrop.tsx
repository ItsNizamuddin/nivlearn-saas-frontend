import Image from 'next/image';
import { cn } from '@/lib/utils';
import mark from '../../../public/nivlearn-mark.webp';

/*
 * Faint, edge-cropped NivLearn "n" mark behind a hero or banner (decorative).
 * Parent needs `relative overflow-hidden`; content goes in a `relative` wrapper.
 *
 * Use sparingly — one per page at most, only where the area beside the text is
 * empty. Opacity is kept low so text on top keeps its contrast.
 */
const TONES = {
  light: 'opacity-[0.07]',
  dark: 'opacity-[0.12]',
} as const;

/** `lg` for full-width heroes, `sm` for cards / banners. */
const SIZES = {
  lg: { className: '-right-20 w-72 md:-right-24 md:w-md', sizes: '(min-width: 768px) 28rem, 18rem' },
  sm: { className: '-right-12 w-56 md:-right-14 md:w-64', sizes: '16rem' },
} as const;

export default function BrandBackdrop({
  tone = 'light',
  size = 'lg',
  className,
}: {
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  /** Extra classes, e.g. visibility (`hidden md:block`). Don't set position/width here. */
  className?: string;
}) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden
      sizes={SIZES[size].sizes}
      className={cn(
        'pointer-events-none absolute top-1/2 h-auto -translate-y-1/2 select-none',
        SIZES[size].className,
        TONES[tone],
        className,
      )}
    />
  );
}
