import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { getBlogs } from '@/services/blog.service';
import RecentBlogsGrid from './RecentBlogsGrid';

const PAGE_SIZE = 3;

interface RecentBlogsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: 'white' | 'muted';
}

/**
 * "Our Blog" section for any page: the 3 newest CMS posts, rendered on the
 * server, with "Load more" for the next 3. Renders nothing if the CMS has no posts.
 */
export default async function RecentBlogs({
  eyebrow = 'Our blog',
  title = 'Recent Articles & Insights',
  description = 'Expert tips, career guides and industry updates from the NivLearn team.',
  tone = 'white',
}: RecentBlogsProps) {
  const initial = await getBlogs({ limit: PAGE_SIZE });
  if (initial.posts.length === 0) return null;

  return (
    <Section tone={tone}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-prime transition-colors hover:text-prime-dark"
        >
          View all articles <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
      <RecentBlogsGrid initial={initial} pageSize={PAGE_SIZE} />
    </Section>
  );
}
