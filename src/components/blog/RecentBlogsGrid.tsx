'use client';

import { ArrowDown, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { buttonClass } from '@/components/ui/button';
import BlogCard from './BlogCard';
import type { BlogList, BlogSummary } from './types';

/** Merge pages, dropping posts already shown (the CMS can repeat a post across pages). */
function mergeUnique(current: BlogSummary[], next: BlogSummary[]) {
  const seen = new Set(current.map((p) => p.slug));
  return [...current, ...next.filter((p) => !seen.has(p.slug))];
}

/** Recent posts grid with "Load more" (fetches further pages from /api/blogs). */
export default function RecentBlogsGrid({ initial, pageSize }: { initial: BlogList; pageSize: number }) {
  const [list, setList] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const params = new URLSearchParams({ page: String(list.page + 1), limit: String(pageSize) });
      const res = await fetch(`/api/blogs?${params}`);
      if (!res.ok) throw new Error(`Blog list failed: ${res.status}`);
      const next: BlogList = await res.json();
      setList((prev) => ({ ...next, posts: mergeUnique(prev.posts, next.posts) }));
    } catch (error) {
      console.error(error);
      setFailed(true);
    }
    setLoading(false);
  };

  return (
    <>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy={loading}>
        {list.posts.map((post) => (
          <li key={post.slug} className="flex">
            <BlogCard post={post} />
          </li>
        ))}
      </ul>

      {failed && (
        <p role="alert" className="mt-6 text-center text-sm text-text-muted">
          Couldn&apos;t load more articles. Please try again.
        </p>
      )}

      {list.hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className={buttonClass('outline', 'md', 'disabled:cursor-wait disabled:opacity-70')}
          >
            {loading ? 'Loading…' : 'Load more'}
            {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <ArrowDown aria-hidden className="size-4" />}
          </button>
        </div>
      )}
    </>
  );
}
