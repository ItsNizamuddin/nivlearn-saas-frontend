import Image from 'next/image';
import { cn } from '@/lib/utils';
import BlogCover from './BlogCover';
import type { BlogImage } from './types';

/**
 * Post thumbnail, or the branded BlogCover when a post has none.
 * Decorative by default (cards: the title says it all); pass `describe` on the article page.
 * Set the box (aspect ratio / size / radius) with `className`; the image fills it.
 */
export default function PostImage({
  image,
  sizes,
  preload,
  coverSize,
  describe,
  className,
  imageClassName,
}: {
  image?: BlogImage;
  sizes: string;
  preload?: boolean;
  coverSize?: 'md' | 'sm';
  /** Use the image's alt text instead of treating it as decorative. */
  describe?: boolean;
  className?: string;
  /** Extra classes on the <img> (e.g. hover zoom). */
  imageClassName?: string;
}) {
  if (!image) return <BlogCover size={coverSize} className={className} />;
  return (
    <div className={cn('relative overflow-hidden bg-surface-muted', className)}>
      <Image
        src={image.url}
        alt={describe ? image.alt : ''}
        fill
        sizes={sizes}
        preload={preload}
        // CMS files are already small, compressed WebP (~500px). Re-optimising them only
        // adds a second round of compression, so serve the original as-is.
        unoptimized
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
