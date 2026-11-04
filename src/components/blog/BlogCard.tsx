import { Clock } from 'lucide-react';
import Link from 'next/link';
import AuthorAvatar from './AuthorAvatar';
import PostImage from './PostImage';
import { formatDate, getCategory, type BlogPost } from './data';

/** Article teaser. The title link is stretched over the whole card. */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border-muted bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/30 hover:shadow-card">
      <PostImage
        post={post}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="aspect-video"
        imageClassName="transition-transform duration-500 group-hover:scale-105"
      />

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-[0.15em] text-prime uppercase">{getCategory(post.categoryId).label}</p>
        <h3 className="mt-2 line-clamp-2 text-lg leading-snug font-bold text-prime-dark transition-colors duration-200 group-hover:text-prime">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center gap-3 border-t border-divider pt-4 text-sm">
          <AuthorAvatar name={post.author} />
          <div className="min-w-0">
            <p className="truncate font-medium text-prime-dark">{post.author}</p>
            <p className="flex items-center gap-1 text-xs text-text-muted">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <Clock aria-hidden className="size-3.5" />
              {post.readMinutes} min read
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
