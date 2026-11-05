import type { AccordionEntry } from '@/components/ui/Accordion';

/*
 * UI shapes for the blog. The backend response is mapped into these in
 * src/services/blog.service.ts, so components never touch raw API fields.
 */

export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BlogAuthor {
  name: string;
  slug?: string;
  /** Undefined when the author only has the CMS default avatar. */
  photo?: string;
  bio?: string;
}

export interface BlogSummary {
  slug: string;
  title: string;
  excerpt: string;
  image?: BlogImage;
  author: BlogAuthor;
  category?: BlogCategory;
  /** ISO timestamp. */
  publishedAt: string;
  /** Minutes; undefined when the CMS has no read time. */
  readMinutes?: number;
  views: number;
}

export interface BlogSection {
  title: string;
  /** Sanitized HTML. */
  html: string;
}

export interface BlogPost extends BlogSummary {
  /** Sanitized HTML, rendered inside `.rich-text`. */
  body: string;
  /** Extra CMS sections shown after the body (internal / bottom sections). */
  sections: BlogSection[];
  faqs: AccordionEntry[];
  updatedAt?: string;
  seo: {
    title?: string;
    description?: string;
    robots?: string;
    canonical?: string;
    image?: string;
  };
}

export interface BlogList {
  posts: BlogSummary[];
  page: number;
  /** Total matching posts across all pages. */
  total: number;
  hasMore: boolean;
}

export const ALL_CATEGORIES = 'all';
export const BLOG_PAGE_SIZE = 9;
