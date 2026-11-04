import type { Metadata } from 'next';
import BlogHome from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog: Trending Articles and Resources for Professionals',
  description:
    'Explore expert articles on Agile, Project Management, Technology, AI, Digital Marketing and more on the NivLearn blog.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogHome />;
}
