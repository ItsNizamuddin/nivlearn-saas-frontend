import { ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import AuthorAvatar from './AuthorAvatar';
import PostImage from './PostImage';
import { formatDate } from './data';
import type { BlogSummary } from './types';

/** Article teaser. The title link is stretched over the whole card. */
export default function BlogCard({ post, preload }: { post: BlogSummary; preload?: boolean }) {
  const date = formatDate(post.publishedAt);

  return (
    <article className="group relative flex w-full flex-col rounded-2xl border border-border-muted/70 bg-surface p-2 transition-all duration-300 hover:-translate-y-1 hover:border-prime/30 hover:shadow-card has-focus-visible:ring-2 has-focus-visible:ring-prime has-focus-visible:ring-offset-2">
      <div className="relative">
        <PostImage
          image={post.image}
          preload={preload}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          // CMS card images are 495×199 banners with text: match that shape so nothing is cropped.
          className="aspect-[495/199] rounded-xl"
        />
        {post.category && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-prime shadow-sm">
            {post.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        {(date || post.readMinutes) && (
          <p className="flex items-center gap-2 text-xs text-text-muted">
            {date && <time dateTime={post.publishedAt}>{date}</time>}
            {date && post.readMinutes && <span aria-hidden className="size-1 rounded-full bg-border-muted" />}
            {post.readMinutes && (
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden className="size-3.5" />
                {post.readMinutes} min read
              </span>
            )}
          </p>
        )}

        <h3 className="mt-2 line-clamp-2 text-lg leading-snug font-bold text-prime-dark transition-colors duration-200 group-hover:text-prime">
          <Link href={`/blog/${post.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>}

        <div className="mt-auto flex items-center gap-3 pt-5">
          <AuthorAvatar author={post.author} />
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-prime-dark">{post.author.name}</p>
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-light text-prime transition-colors duration-200 group-hover:bg-prime group-hover:text-on-dark"
          >
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
