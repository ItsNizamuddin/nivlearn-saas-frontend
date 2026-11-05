import type { Metadata } from 'next';
import BlogHome from '@/components/blog';
import { getBlogCategories, getBlogs } from '@/services/blog.service';

// ISR: rebuilt at most hourly, or immediately via the /api/revalidate webhook (tag `blogs`).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog: Trending Articles and Resources for Professionals',
  description:
    'Explore expert articles on technology, business, digital marketing and more on the NivLearn blog.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const [categories, initial] = await Promise.all([getBlogCategories(), getBlogs()]);
  return <BlogHome categories={categories} initial={initial} />;
}
