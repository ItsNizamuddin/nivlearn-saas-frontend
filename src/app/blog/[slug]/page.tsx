import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import BlogArticle from '@/components/blog/article';
import type { BlogPost } from '@/components/blog/types';
import { SITE_URL } from '@/lib/site';
import { getBlogBySlug, getBlogCategories, getBlogs } from '@/services/blog.service';

// ISR: rebuilt at most hourly, or immediately via the webhook (tags `blogs` / `blog-<slug>`).
export const revalidate = 3600;

/** Prerender the newest posts; older slugs render on first visit and are then cached. */
export async function generateStaticParams() {
  const { posts } = await getBlogs({ limit: 20 });
  return posts.map(({ slug }) => ({ slug }));
}

/** Shared by generateMetadata and the page so the post is fetched once per request. */
const getPost = cache(getBlogBySlug);

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: 'Article not found' };

  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? post.excerpt;
  const image = post.seo.image ?? post.image?.url;
  const noIndex = post.seo.robots?.toLowerCase().includes('noindex');

  return {
    title,
    description,
    alternates: { canonical: post.seo.canonical ?? `/blog/${post.slug}` },
    ...(noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      ...(image && { images: [image] }),
    },
  };
}

function jsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo.description ?? post.excerpt,
    image: post.image?.url,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt ?? (post.publishedAt || undefined),
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'NivLearn', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const faq = post.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.title,
          acceptedAnswer: { '@type': 'Answer', text: f.content },
        })),
      }
    : null;
  // Escape `<` so CMS text can't close the <script> tag.
  return JSON.stringify(faq ? [article, faq] : article).replace(/</g, '\\u003c');
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [categories, recentList, related] = await Promise.all([
    getBlogCategories(),
    getBlogs({ limit: 5 }),
    getBlogs({ category: post.category?.slug }),
  ]);
  const recent = recentList.posts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(post) }} />
      <BlogArticle post={post} recent={recent} categories={categories} related={related} />
    </>
  );
}
