import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/article';
import { BLOG_POSTS, getPost } from '@/components/blog/data';

// Static placeholder posts are prerendered; unknown slugs hit notFound() below
// (dynamicParams is not available with Cache Components).
export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.publishedAt, authors: [post.author] },
  };
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
