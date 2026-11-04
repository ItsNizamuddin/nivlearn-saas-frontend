import Image from 'next/image';
import { cn } from '@/lib/utils';
import BlogCover from './BlogCover';
import type { BlogPost } from './data';

/**
 * Post cover photo, or the branded BlogCover when a post has none.
 * Decorative by default (cards: the title says it all); pass `describe` on the article page.
 * Set the box (aspect ratio / size / radius) with `className`; the image fills it.
 */
export default function PostImage({
  post,
  sizes,
  preload,
  coverSize,
  describe,
  className,
  imageClassName,
}: {
  post: Pick<BlogPost, 'image' | 'imageAlt' | 'categoryId'>;
  sizes: string;
  preload?: boolean;
  coverSize?: 'md' | 'sm';
  /** Use the post's alt text instead of treating the image as decorative. */
  describe?: boolean;
  className?: string;
  /** Extra classes on the <img> (e.g. hover zoom). */
  imageClassName?: string;
}) {
  if (!post.image) return <BlogCover categoryId={post.categoryId} size={coverSize} className={className} />;
  return (
    <div className={cn('relative overflow-hidden bg-surface-muted', className)}>
      <Image
        src={post.image}
        alt={describe ? (post.imageAlt ?? '') : ''}
        fill
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
