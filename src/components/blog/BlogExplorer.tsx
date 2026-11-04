'use client';

import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import TabList from '@/components/ui/TabList';
import { buttonClass } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { BLOG_CATEGORIES, BLOG_POSTS } from './data';

const ALL = 'all';
const PAGE_SIZE = 6;
const TABS = [{ id: ALL, label: 'All' }, ...BLOG_CATEGORIES.map(({ id, label }) => ({ id, label }))];

interface BlogExplorerProps {
  eyebrow?: string;
  title: string;
  /** Category selected first (defaults to All). */
  initialCategory?: string;
  /** Hide this post (e.g. the article being read). */
  excludeSlug?: string;
}

/** Category tabs + article grid with client-side "Load more". */
export default function BlogExplorer({ eyebrow, title, initialCategory = ALL, excludeSlug }: BlogExplorerProps) {
  const [active, setActive] = useState(initialCategory);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const posts = BLOG_POSTS.filter((p) => p.slug !== excludeSlug && (active === ALL || p.categoryId === active));

  const selectCategory = (id: string) => {
    setActive(id);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} className="shrink-0" />
        <TabList idPrefix="blog" label="Blog categories" items={TABS} active={active} onChange={selectCategory} className="lg:justify-end" />
      </div>

      <div role="tabpanel" id={`blog-panel-${active}`} aria-labelledby={`blog-tab-${active}`} className="mt-10">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-muted py-16 text-center text-text-muted">
            No articles in this category yet.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, visible).map((post) => (
              <li key={post.slug} className="flex">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}

        {posts.length > visible && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className={buttonClass('outline', 'md')}>
              Load more
              <ArrowDown aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
