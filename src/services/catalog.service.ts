import { cache } from 'react';
import { fetchFromBackend } from '@/lib/apiProxy';
import { Category, Course, CourseCardData } from '@/components/Navbar/types';

interface RawCategory {
  _id?: string;
  name?: string;
  slug?: string;
  order?: number;
  images?: string[];
  [key: string]: unknown;
}

interface RawCourseIcon {
  url?: string;
  thumbnail?: string;
  alt?: string;
  [key: string]: unknown;
}

interface RawCourseCard {
  courseThumbnail?: RawCourseIcon;
  courseIcon?: RawCourseIcon;
  courseTag?: string;
  courseType?: string;
  courseMode?: string;
  courseDuration?: string;
  totalEnrolled?: string;
  [key: string]: unknown;
}

interface RawCourse {
  _id?: string;
  course_name?: string;
  course_title?: string;
  name?: string;
  slug?: string;
  order?: number;
  category_slug?: string;
  category?: string | { _id?: string; slug?: string } | null;
  courseCard?: RawCourseCard;
  [key: string]: unknown;
}

/**
 * Fetch all categories and populate their matching courses.
 * Revalidates every 3600s (1h) or on-demand via webhook tags ['categories', 'courses'].
 */
export async function getCategories(): Promise<Category[]> {
  try {
    // 1. Fetch Categories (with pagination support)
    const catQueryParams = new URLSearchParams({
      select: 'name,slug,order,images',
      order: 'asc',
      limit: '100',
      page: '1',
    });

    const catRes = await fetchFromBackend('/categories', {
      queryParams: catQueryParams,
      next: { revalidate: 3600, tags: ['categories'] },
    });

    if (!catRes.ok) {
      console.error('[catalog.service] Failed to fetch categories:', catRes.status, catRes.statusText);
      return [];
    }

    const catJson = await catRes.json();
    let rawCategories: RawCategory[] = Array.isArray(catJson?.data)
      ? catJson.data
      : Array.isArray(catJson)
        ? catJson
        : [];

    const catPages = catJson?.meta?.pages || catJson?.pagination?.pages || 1;
    if (catPages > 1) {
      const remainingCatPromises = [];
      for (let p = 2; p <= catPages; p++) {
        const pageParams = new URLSearchParams({
          select: 'name,slug,order,images',
          order: 'asc',
          limit: '100',
          page: String(p),
        });
        remainingCatPromises.push(
          fetchFromBackend('/categories', {
            queryParams: pageParams,
            next: { revalidate: 3600, tags: ['categories'] },
          }).then((r) => (r.ok ? r.json() : null))
        );
      }
      const extraCats = await Promise.all(remainingCatPromises);
      for (const res of extraCats) {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        rawCategories = rawCategories.concat(list);
      }
    }

    // Return categories with empty courses array for lazy on-demand loading
    const categories: Category[] = rawCategories
      .map((cat) => ({
        name: cat.name || '',
        slug: cat.slug || '',
        order: typeof cat.order === 'number' ? cat.order : 0,
        images: Array.isArray(cat.images) ? cat.images : [],
        courses: [],
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return categories;
  } catch (error) {
    console.error('[catalog.service] Error fetching categories:', error);
    return [];
  }
}

/**
 * Extract distinct course options for form dropdown selectors via SSR.
 */
export async function getCourseOptions(): Promise<Array<{ slug: string; name: string }>> {
  try {
    const res = await fetchFromBackend('/courses', {
      queryParams: new URLSearchParams({
        select: 'slug,course_title,course_name',
        limit: '100',
      }),
      next: { revalidate: 3600, tags: ['courses'] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const seen = new Set<string>();
    const options: Array<{ slug: string; name: string }> = [];

    for (const c of list) {
      const slug = c.slug || '';
      const name = c.course_name || c.course_title || slug;
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        options.push({ slug, name });
      }
    }
    return options;
  } catch (err) {
    console.error('[catalog.service] Error in getCourseOptions:', err);
    return [];
  }
}

export interface CategoryDetail {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  cat_description?: string;
  key_points?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaRobots?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  stats?: Array<{ id?: number | string; value: string; title: string }>;
  salaries?: Array<{
    id: number;
    title: string;
    description?: string[];
    graphData?: Array<{ label: string; value: number }>;
  }>;
  salaryImages?: string[];
  accreditionImages?: Array<{ url: string; alt?: string; thumbnail?: string }>;
  accredation?: Array<{ url: string; alt?: string; thumbnail?: string }>;
  faqs?: Array<{ question: string; answer: string; _id?: string }>;
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
  courses?: RawCourse[];
}

export interface CourseDetail {
  _id?: string;
  slug: string;
  course_title: string;
  course_name?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaRobots?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  category?: { name: string; slug: string };
  courseCard?: {
    courseDuration?: string;
    courseMode?: string;
    courseType?: string;
    totalEnrolled?: string;
    courseTag?: string;
    tagline?: string;
    accredation?: Array<{ url: string; alt?: string; thumbnail?: string }>;
    courseThumbnail?: { url?: string; alt?: string; thumbnail?: string };
    courseIcon?: { url?: string; alt?: string; thumbnail?: string };
  };
  banner_content?: {
    banner_title?: string;
    banner_description?: string;
    description?: string;
    banner_key_points?: string;
    keypoints?: string;
    stats?: Array<{ title: string; value: string }>;
    video_link?: string | { url?: string; thumbnail?: string; alt?: string };
  };
  overview_content?: {
    overview_title?: string;
    overview_description?: string;
    overview_prerequisits?: string;
    prerequisites?: string;
    overview_who_can_attend?: string | { description?: string; roles?: string };
    overview_who_can_atted_list?: Array<{ title?: string; text?: string }>;
    overview_skils_focused?: string;
    skillfocused?: string;
    stats?: Array<{ title: string; value: string }>;
    overview_key_features?: string[] | Array<{ title?: string; des?: string }>;
    overview_video_link?: string | { url?: string; thumbnail?: string; alt?: string };
    overview_video_thumbnail?: string | { url?: string; thumbnail?: string; alt?: string };
    videoThumbnail?: string;
    videoUrl?: string;
    companies?: string[] | Array<{ name: string; logo?: string }>;
    benefits?: {
      description?: string;
      individual?: string;
      organization?: string;
    };
  };
  syllabus_content?: {
    syllabus_accordian?: Array<{ title: string; des: string; duration?: string; _id?: string }>;
  };
  career?: {
    career_title?: string;
    career_description?: string;
    path?: Array<{ title?: string; value?: string; description?: string }>;
    career_path?: Array<{ title?: string; value?: string; description?: string }>;
    certification_process?: Array<{ title?: string; value?: string; desc?: string; description?: string }>;
    certificates?: Array<{ name?: string; title?: string; image?: string; url?: string; certimg?: { url?: string; thumbnail?: string } }>;
    certificate_template?: string | { image: string };
  };
  benefits_section?: {
    benefits_desc?: string;
    individual_benefits?: string;
    organisational_benefits?: string;
  };
  placements?: {
    companies?: Array<{ name: string; logo?: string }>;
    stats?: Array<{ label: string; value: string }>;
  };
  tools?: Array<{ name: string; icon?: string }>;
  skills?: Array<{ name: string; icon?: string }>;
  salaries?: Array<{
    id: number;
    title: string;
    description?: string[];
    graphData?: Array<{ label: string; value: number }>;
  }>;
  faqs?: Array<{ question?: string; answer?: string; title?: string; value?: string; des?: string }>;
  trainers?: Array<{
    name?: string;
    role?: string;
    bio?: unknown;
    description?: string;
    rating?: number;
    image?: string | { url?: string };
    photo?: string | { url?: string; thumbnail?: string; alt?: string };
    totalTrained?: string;
    linkedin?: string;
    experience?: string;
    [key: string]: unknown;
  }>;
  leadmagnet?: Array<{
    broucher?: { url?: string; alt?: string };
  }>;
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
}

/**
 * Fetch a single category by slug (cached for request deduplication & ISR).
 */
export const getCategoryBySlug = cache(async (slug: string): Promise<CategoryDetail | null> => {
  try {
    const res = await fetchFromBackend(`/categories/${slug}`, {
      next: { revalidate: 3600, tags: ['categories', `category-${slug}`] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || json || null;
  } catch (error) {
    console.error(`[catalog.service] Error fetching category "${slug}":`, error);
    return null;
  }
});

/**
 * Fetch courses belonging to a category (with optional pagination).
 */
export const getCategoryCourses = cache(
  async (categorySlug: string, page: number = 1, limit: number = 12): Promise<{ data: Course[]; total: number }> => {
    try {
      const queryParams = new URLSearchParams({
        category: categorySlug,
        page: page.toString(),
        limit: limit.toString(),
        select: 'slug,course_title,course_name,order,category,courseCard',
      });
      const res = await fetchFromBackend('/courses', {
        queryParams,
        next: { revalidate: 3600, tags: ['courses', `courses-${categorySlug}`] },
      });
      if (!res.ok) return { data: [], total: 0 };
      const json = await res.json();
      const rawList: RawCourse[] = Array.isArray(json?.data) ? json.data : [];
      const courses: Course[] = rawList.map((c) => {
        const card = c.courseCard;
        const thumb =
          card?.courseThumbnail?.url ||
          card?.courseThumbnail?.thumbnail ||
          card?.courseIcon?.thumbnail ||
          card?.courseIcon?.url ||
          '/default.webp';
        return {
          name: (c.course_name || c.course_title || c.name || '') as string,
          slug: (c.slug || '') as string,
          catslug: categorySlug,
          order: typeof c.order === 'number' ? c.order : 0,
          thumbnail: thumb,
          duration: card?.courseDuration || 'Flexible Hours',
          enrolled: card?.totalEnrolled || '1,000+',
          tag: card?.courseTag,
          type: card?.courseType,
          courseCard: card,
        };
      });
      return { data: courses, total: json?.meta?.total || courses.length };
    } catch (error) {
      console.error(`[catalog.service] Error fetching category courses for "${categorySlug}":`, error);
      return { data: [], total: 0 };
    }
  }
);

/**
 * Fetch a single course by slug (and optional location).
 */
export const getCourseBySlug = cache(
  async (slug: string, location?: string): Promise<CourseDetail | null> => {
    try {
      const endpoint = location ? `/courses/${slug}/${location}` : `/courses/${slug}`;
      const courseTag = location ? `course-${slug}-${location}` : `course-${slug}`;
      const res = await fetchFromBackend(endpoint, {
        next: { revalidate: 3600, tags: ['courses', courseTag] },
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json?.data || json || null;
    } catch (error) {
      console.error(`[catalog.service] Error fetching course "${slug}":`, error);
      return null;
    }
  }
);

