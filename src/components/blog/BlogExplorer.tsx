'use client';

import { ArrowDown, LoaderCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import TabList from '@/components/ui/TabList';
import { buttonClass } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BlogCard from './BlogCard';
import { ALL_CATEGORIES, type BlogCategory, type BlogList } from './types';

interface BlogExplorerProps {
  eyebrow?: string;
  title: string;
  categories: readonly BlogCategory[];
  /** First page for `initialCategory`, rendered on the server. */
  initial: BlogList;
  initialCategory?: string;
  /** Hide this post (e.g. the article being read). */
  excludeSlug?: string;
}

async function fetchPage(category: string, page: number, signal: AbortSignal): Promise<BlogList> {
  const params = new URLSearchParams({ category, page: String(page) });
  const res = await fetch(`/api/blogs?${params}`, { signal });
  if (!res.ok) throw new Error(`Blog list failed: ${res.status}`);
  return res.json();
}

/** Category tabs + article grid. Tabs and "Load more" fetch further pages from /api/blogs. */
export default function BlogExplorer({
  eyebrow,
  title,
  categories,
  initial,
  initialCategory = ALL_CATEGORIES,
  excludeSlug,
}: BlogExplorerProps) {
  const [active, setActive] = useState(initialCategory);
  const [list, setList] = useState(initial);
  const [loading, setLoading] = useState<'tab' | 'more' | null>(null);
  const [failed, setFailed] = useState(false);
  const request = useRef<AbortController | null>(null);

  const tabs = [{ id: ALL_CATEGORIES, label: 'All' }, ...categories.map((c) => ({ id: c.slug, label: c.name }))];
  const posts = list.posts.filter((p) => p.slug !== excludeSlug);

  const load = async (category: string, page: number) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(page === 1 ? 'tab' : 'more');
    setFailed(false);
    try {
      const next = await fetchPage(category, page, controller.signal);
      setList((prev) => (page === 1 ? next : { ...next, posts: [...prev.posts, ...next.posts] }));
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error(error);
      setFailed(true);
    }
    setLoading(null);
  };

  const selectCategory = (id: string) => {
    if (id === active) return;
    setActive(id);
    load(id, 1);
  };

  return (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} />
      {/* Fade at the right edge hints that the category row scrolls. */}
      <TabList
        idPrefix="blog"
        label="Blog categories"
        items={tabs}
        active={active}
        onChange={selectCategory}
        className="mt-6 pr-10 [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]"
      />

      <div
        role="tabpanel"
        id={`blog-panel-${active}`}
        aria-labelledby={`blog-tab-${active}`}
        aria-busy={loading !== null}
        className={cn('mt-10 transition-opacity duration-200', loading === 'tab' && 'opacity-50')}
      >
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-muted py-16 text-center text-text-muted">
            {loading === 'tab' ? 'Loading articles…' : failed ? "Couldn't load articles. Please try again." : 'No articles in this category yet.'}
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="flex">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}

        {failed && posts.length > 0 && (
          <p role="alert" className="mt-6 text-center text-sm text-text-muted">
            Couldn&apos;t load more articles. Please try again.
          </p>
        )}

        {list.hasMore && loading !== 'tab' && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              disabled={loading === 'more'}
              onClick={() => load(active, list.page + 1)}
              className={buttonClass('outline', 'md', 'disabled:cursor-wait disabled:opacity-70')}
            >
              {loading === 'more' ? 'Loading…' : 'Load more'}
              {loading === 'more' ? (
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
              ) : (
                <ArrowDown aria-hidden className="size-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
