import { Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

/** `md` for cards, `sm` for thumbnails in lists. */
const SIZES = {
  md: { tile: 'size-16 rounded-2xl', icon: 'size-8', glow: 'size-40' },
  sm: { tile: 'size-9 rounded-lg', icon: 'size-5', glow: 'size-12' },
} as const;

/**
 * Branded fallback for posts without a thumbnail: navy→blue gradient,
 * soft brand glows and an article icon. Purely decorative.
 * Set the box size / aspect ratio / radius with `className`.
 */
export default function BlogCover({ size = 'md', className }: { size?: keyof typeof SIZES; className?: string }) {
  const s = SIZES[size];
  return (
    <div
      aria-hidden
      className={cn('relative flex items-center justify-center overflow-hidden bg-linear-to-br from-prime-dark to-prime', className)}
    >
      <span className={cn('absolute -top-1/4 -left-1/4 rounded-full bg-prime1/30 blur-2xl', s.glow)} />
      <span className={cn('absolute -right-1/4 -bottom-1/4 rounded-full bg-prime-yellow/30 blur-2xl', s.glow)} />
      <span className={cn('relative flex items-center justify-center bg-on-dark/10 ring-1 ring-on-dark/20', s.tile)}>
        <Newspaper className={cn('text-on-dark', s.icon)} />
      </span>
    </div>
  );
}
