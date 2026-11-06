/*
 * Static copy for the blog pages. Posts, categories and authors come from the
 * CMS via src/services/blog.service.ts.
 */

export const BLOG_HERO = {
  eyebrow: 'Blog',
  title: 'Expert-driven Insights for Enhanced Growth',
  description:
    "NivLearn's blog features curated content from domain experts — their insights, opinions, experiences and practical know-how across a wide range of subjects, to broaden your understanding and accelerate your growth.",
};

export const LEVEL_UP = {
  title: 'Want to Level Up Your Skills?',
  description:
    'NivLearn is a global training and placement provider helping graduates and professionals pick the right technology trainings and certification programs.',
  prompt: 'Have queries? Get in touch!',
};

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** Fixed locale + UTC so server and client render the same string. Empty for missing/invalid dates. */
export function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date);
}

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
export const formatViews = (n: number) => compact.format(n);
