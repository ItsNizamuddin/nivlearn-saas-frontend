import Link from 'next/link';
import PostImage from '../PostImage';
import { formatDate } from '../data';
import type { BlogSummary } from '../types';

/** Compact list of recent articles for the article sidebar. */
export default function RecentPosts({ posts }: { posts: readonly BlogSummary[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="rounded-2xl border border-border-muted bg-surface p-6">
      <h2 className="text-lg font-bold text-prime-dark">Recent articles</h2>
      <ul className="mt-4 divide-y divide-border-muted/70">
        {posts.map((post) => (
          <li key={post.slug} className="group relative flex gap-3 py-3 first:pt-0 last:pb-0">
            <PostImage image={post.image} sizes="112px" coverSize="sm" className="aspect-[495/199] w-28 shrink-0 self-start rounded-lg" />
            <div className="min-w-0">
              <Link
                href={`/blog/${post.slug}`}
                className="line-clamp-2 text-sm leading-snug font-semibold text-prime-dark transition-colors duration-200 group-hover:text-prime after:absolute after:inset-0"
              >
                {post.title}
              </Link>
              <time dateTime={post.publishedAt} className="mt-1 block text-xs text-text-muted">
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
