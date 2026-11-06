import 'server-only';
import sanitizeHtml from 'sanitize-html';
import { fetchFromBackend, UpstreamError } from '@/lib/apiProxy';
import {
  ALL_CATEGORIES,
  BLOG_PAGE_SIZE,
  type BlogAuthor,
  type BlogCategory,
  type BlogImage,
  type BlogList,
  type BlogPost,
  type BlogSection,
  type BlogSummary,
} from '@/components/blog/types';

/*
 * Blog content from the CMS Content API (`/content/blogs*`, see api.skilldeck.net/api-docs#tag/blogs).
 * Cached for an hour and purged on demand via the /api/revalidate webhook (tag `blogs` or `blog-<slug>`).
 *
 * The live API differs a little from its docs (e.g. `body` vs `content`,
 * `smallDescription` vs `excerpt`, flat `metaTitle` vs `seo`), so the mappers accept both.
 */

const REVALIDATE = 3600;

/* ---------- raw API shapes (only the fields we read) ---------- */

interface RawMedia {
  url?: string;
  thumbnail?: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
}

interface RawCategory {
  name?: string;
  title?: string;
  slug?: string;
  order?: number;
}

interface RawAuthor {
  name?: string;
  slug?: string;
  description?: string;
  bio?: string;
  photo?: RawMedia | string;
}

interface RawBlog {
  title?: string;
  slug?: string;
  excerpt?: string;
  smallDescription?: string;
  readTime?: string | number;
  views?: string | number;
  createdAt?: string;
  updatedAt?: string;
  thumbnail?: RawMedia | string;
  author?: RawAuthor | string;
  category?: RawCategory | string;
  body?: string;
  content?: string;
  faqs?: { _id?: string; title?: string; value?: string; answer?: string }[];
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
  metaTitle?: string;
  metaDescription?: string;
  metaRobots?: string;
  canonicalUrl?: string;
  ogImage?: string;
  seo?: { metaTitle?: string; metaDescription?: string; title?: string; description?: string };
}

/* ---------- sanitizing ---------- */

const RICH_TEXT: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags.filter((tag) => tag !== 'h1'),
    'img',
    'iframe',
  ],
  // No `style`/`class`: CMS inline styles (fonts, colours) would fight the theme.
  allowedAttributes: {
    a: ['href', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
  transformTags: {
    // The page title is the only <h1>.
    h1: 'h2',
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
    }),
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
  },
  // Empty wrappers left behind once inline styles are stripped.
  exclusiveFilter: (frame) => ['p', 'span', 'strong', 'em'].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren.length,
};

const sanitizeRichText = (html?: string) => (html ? sanitizeHtml(html, RICH_TEXT).trim() : '');

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };

/** Plain text (for FAQ answers and JSON-LD). */
function toPlainText(html?: string) {
  if (!html) return '';
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, entity: string) => ENTITIES[entity])
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---------- mappers ---------- */

const text = (value?: string) => value?.trim() || undefined;

function mapImage(media: RawBlog['thumbnail'], fallbackAlt: string): BlogImage | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return media ? { url: media, alt: fallbackAlt } : undefined;
  const url = media.url || media.thumbnail;
  if (!url) return undefined;
  return {
    url,
    alt: text(media.alt) ?? fallbackAlt,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  };
}

function mapCategory(raw?: RawCategory | string): BlogCategory | undefined {
  if (!raw || typeof raw === 'string' || !raw.slug) return undefined;
  return { slug: raw.slug, name: text(raw.name) ?? text(raw.title) ?? raw.slug };
}

function mapAuthor(raw?: RawAuthor | string): BlogAuthor {
  if (!raw || typeof raw === 'string') return { name: 'NivLearn Team' };
  const photo = typeof raw.photo === 'string' ? raw.photo : raw.photo?.url || raw.photo?.thumbnail;
  return {
    name: text(raw.name) ?? 'NivLearn Team',
    slug: raw.slug,
    // The CMS placeholder avatar looks worse than our initials avatar.
    photo: photo && !photo.includes('default-profile') ? photo : undefined,
    bio: text(raw.bio) ?? text(raw.description),
  };
}

/** "10 min", "12", 12 → 12 */
function parseMinutes(value?: string | number) {
  const minutes = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : undefined;
}

function mapSummary(raw: RawBlog): BlogSummary | null {
  if (!raw.slug || !raw.title) return null;
  const title = raw.title.trim();
  return {
    slug: raw.slug,
    title,
    excerpt: toPlainText(raw.smallDescription ?? raw.excerpt),
    image: mapImage(raw.thumbnail, title),
    author: mapAuthor(raw.author),
    category: mapCategory(raw.category),
    publishedAt: raw.createdAt ?? '',
    readMinutes: parseMinutes(raw.readTime),
    views: Number(raw.views) || 0,
  };
}

function mapSection(raw?: { title?: string; value?: string }): BlogSection | null {
  const html = sanitizeRichText(raw?.value);
  return html ? { title: raw?.title?.trim() ?? '', html } : null;
}

function mapPost(raw: RawBlog): BlogPost | null {
  const summary = mapSummary(raw);
  if (!summary) return null;
  return {
    ...summary,
    body: sanitizeRichText(raw.body ?? raw.content),
    sections: [mapSection(raw.internalSection), mapSection(raw.bottomSection)].filter((s): s is BlogSection => s !== null),
    faqs: (raw.faqs ?? [])
      .map((faq, i) => ({ id: faq._id ?? i, title: toPlainText(faq.title), content: toPlainText(faq.value ?? faq.answer) }))
      .filter((faq) => faq.title && faq.content),
    updatedAt: raw.updatedAt,
    seo: {
      title: text(raw.metaTitle) ?? text(raw.seo?.metaTitle) ?? text(raw.seo?.title),
      description: text(raw.metaDescription) ?? text(raw.seo?.metaDescription) ?? text(raw.seo?.description),
      robots: text(raw.metaRobots),
      canonical: text(raw.canonicalUrl),
      image: text(raw.ogImage),
    },
  };
}

/* ---------- fetchers ---------- */

/** All blog categories, in CMS order. Empty list if the API is unavailable. */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const res = await fetchFromBackend('/blogs/categories', { next: { revalidate: REVALIDATE, tags: ['blogs'] } });
    if (!res.ok) throw new UpstreamError('/blogs/categories', res.status);
    const json: unknown = await res.json();
    const raw: RawCategory[] = Array.isArray(json) ? json : ((json as { data?: RawCategory[] })?.data ?? []);
    return raw
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(mapCategory)
      .filter((c): c is BlogCategory => c !== undefined);
  } catch (error) {
    console.error('[blog.service] categories:', error);
    return [];
  }
}

interface BlogQuery {
  /** Category slug; omit or `all` for every category. */
  category?: string;
  page?: number;
  limit?: number;
}

/** Newest posts first. Returns an empty page if the API is unavailable. */
export async function getBlogs({ category, page = 1, limit = BLOG_PAGE_SIZE }: BlogQuery = {}): Promise<BlogList> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(Math.min(limit, 100)),
    sortBy: 'createdAt',
    order: 'desc',
  });
  // The API filters by category slug (the docs say "name", but names return nothing).
  if (category && category !== ALL_CATEGORIES) params.set('category', category);

  try {
    const res = await fetchFromBackend('/blogs', { queryParams: params, next: { revalidate: REVALIDATE, tags: ['blogs'] } });
    if (!res.ok) throw new UpstreamError('/blogs', res.status);
    const json = (await res.json()) as { data?: RawBlog[]; meta?: { page?: number; limit?: number; total?: number } };
    const posts = (json.data ?? []).map(mapSummary).filter((p): p is BlogSummary => p !== null);
    const total = json.meta?.total ?? posts.length;
    return { posts, page, total, hasMore: page * limit < total };
  } catch (error) {
    console.error('[blog.service] list:', error);
    return { posts: [], page, total: 0, hasMore: false };
  }
}

/**
 * Full post, or `null` when the slug doesn't exist (404).
 * Any other failure throws, so an API outage shows the error page instead of a cached "not found".
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const endpoint = `/blogs/${encodeURIComponent(slug)}`;
  const res = await fetchFromBackend(endpoint, { next: { revalidate: REVALIDATE, tags: ['blogs', `blog-${slug}`] } });
  if (res.status === 404 || res.status === 410) return null;
  if (!res.ok) throw new UpstreamError(endpoint, res.status);
  const json = (await res.json()) as RawBlog & { data?: RawBlog; blog?: RawBlog };
  return mapPost(json.blog ?? json.data ?? json);
}
