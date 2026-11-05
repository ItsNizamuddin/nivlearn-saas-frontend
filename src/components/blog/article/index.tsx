import { CalendarDays, Clock, Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import Container from '@/components/layout/Container';
import Accordion from '@/components/ui/Accordion';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import EnquiryForm from '@/components/ui/form/EnquiryForm';
import { SITE_URL } from '@/lib/site';
import AuthorAvatar from '../AuthorAvatar';
import BlogExplorer from '../BlogExplorer';
import { formatDate, formatViews, LEVEL_UP } from '../data';
import PostImage from '../PostImage';
import { ALL_CATEGORIES, type BlogCategory, type BlogList, type BlogPost, type BlogSummary } from '../types';
import NewsletterCard from './NewsletterCard';
import RecentPosts from './RecentPosts';
import ShareLinks from './ShareLinks';

function MetaItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="min-w-0">
        <dt className="text-xs text-text-muted">{label}</dt>
        <dd className="truncate text-sm font-semibold text-prime-dark">{children}</dd>
      </div>
    </div>
  );
}

const metaIcon = (Icon: typeof Clock) => (
  <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-light text-lg text-prime">
    <Icon className="size-4.5" />
  </span>
);

interface BlogArticleProps {
  post: BlogPost;
  recent: BlogSummary[];
  categories: BlogCategory[];
  /** First page of "more articles" (same category as the post). */
  related: BlogList;
}

/** /blog/[slug] — header, meta, body with sidebar, FAQs and more articles. */
export default function BlogArticle({ post, recent, categories, related }: BlogArticleProps) {
  const published = formatDate(post.publishedAt);

  return (
    <>
      <Container className="py-10 md:py-14">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]}
        />

        {/* Header */}
        <header className="relative mt-6 overflow-hidden rounded-2xl bg-light px-6 py-12 md:px-12 md:py-16">
          <BrandBackdrop className="hidden md:block" />
          <div className="relative max-w-3xl">
            {post.category && (
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-prime uppercase sm:text-sm">
                <span aria-hidden className="h-0.5 w-6 rounded-full bg-brand-orange" />
                {post.category.name}
              </p>
            )}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance text-prime-dark sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-base leading-relaxed text-pretty text-text-muted sm:text-lg">{post.excerpt}</p>
            )}
          </div>
        </header>

        {/* Featured image */}
        <PostImage
          image={post.image}
          describe
          preload
          coverSize="md"
          sizes="(min-width: 768px) 768px, 100vw"
          // CMS images are small (~500px wide): keep them at a modest width so they stay sharp.
          className="mx-auto mt-6 aspect-[495/199] max-w-3xl rounded-2xl"
        />

        {/* Meta strip */}
        <dl className="mt-6 grid grid-cols-2 gap-5 rounded-2xl border border-border-muted p-5 sm:grid-cols-4">
          <MetaItem icon={<AuthorAvatar author={post.author} />} label="Author">
            {post.author.name}
          </MetaItem>
          {published && (
            <MetaItem icon={metaIcon(CalendarDays)} label="Published">
              <time dateTime={post.publishedAt}>{published}</time>
            </MetaItem>
          )}
          {post.readMinutes && (
            <MetaItem icon={metaIcon(Clock)} label="Read time">
              {post.readMinutes} min
            </MetaItem>
          )}
          {post.views > 0 && (
            <MetaItem icon={metaIcon(Eye)} label="Views">
              {formatViews(post.views)}
            </MetaItem>
          )}
        </dl>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div>
            {/* HTML is sanitized in blog.service before it gets here. */}
            <article className="rich-text" dangerouslySetInnerHTML={{ __html: post.body }} />

            {post.sections.map((section, i) => (
              <section key={i} className="mt-10 border-t border-border-muted/70 pt-8">
                {section.title && <h2 className="mb-4 text-2xl font-bold text-prime-dark">{section.title}</h2>}
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: section.html }} />
              </section>
            ))}

            <div className="mt-10 border-t border-border-muted/70 pt-6">
              <ShareLinks url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />
            </div>

            {/* Lead form */}
            <section className="mt-12 rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-8" aria-labelledby="level-up">
              <h2 id="level-up" className="text-2xl font-bold text-prime-dark sm:text-3xl">
                {LEVEL_UP.title}
              </h2>
              <p className="mt-2 text-text-muted">{LEVEL_UP.description}</p>
              <p className="mt-3 text-sm font-semibold text-prime">{LEVEL_UP.prompt}</p>
              <div className="mt-6">
                <EnquiryForm formId="blog" />
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <NewsletterCard />
            <RecentPosts posts={recent} />
          </aside>
        </div>

        {post.faqs.length > 0 && (
          <section className="mt-16 md:mt-20">
            <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
            <Accordion items={post.faqs} className="mt-8 space-y-3" />
          </section>
        )}
      </Container>

      <Section tone="muted">
        {/* Keyed by slug so client state resets when navigating between articles. */}
        <BlogExplorer
          key={post.slug}
          eyebrow="Keep reading"
          title="Explore More Articles"
          categories={categories}
          initial={related}
          initialCategory={post.category?.slug ?? ALL_CATEGORIES}
          excludeSlug={post.slug}
        />
      </Section>
    </>
  );
}
