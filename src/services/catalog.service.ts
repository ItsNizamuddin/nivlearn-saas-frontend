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
    // 1. Fetch Categories
    const catQueryParams = new URLSearchParams({
      select: 'name,slug,order,images',
      order: 'asc',
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
    const rawCategories: RawCategory[] = Array.isArray(catJson?.data)
      ? catJson.data
      : Array.isArray(catJson)
        ? catJson
        : [];

    // 2. Fetch Courses with relevant card fields
    const courseQueryParams = new URLSearchParams({
      select: 'slug,course_title,course_name,order,category,category_slug,courseCard',
      limit: '1000',
    });

    const courseRes = await fetchFromBackend('/courses', {
      queryParams: courseQueryParams,
      next: { revalidate: 3600, tags: ['courses'] },
    });

    let rawCourses: RawCourse[] = [];
    if (courseRes.ok) {
      const courseJson = await courseRes.json();
      rawCourses = Array.isArray(courseJson?.data)
        ? courseJson.data
        : Array.isArray(courseJson)
          ? courseJson
          : [];
    }

    // 3. Merge Courses into Categories & Filter Unwanted Data
    const categoriesWithCourses: Category[] = rawCategories.map((cat) => {
      const matchingCourses: Course[] = rawCourses
        .filter((course) => {
          const courseCat = course.category;
          const courseCatRef =
            typeof courseCat === 'string'
              ? courseCat
              : courseCat?._id || courseCat?.slug;
          return (
            courseCatRef === cat._id ||
            courseCatRef === cat.slug ||
            course.category_slug === cat.slug
          );
        })
        .map((c) => {
          const rawCard = c.courseCard;
          let sanitizedCard: CourseCardData | undefined = undefined;

          if (rawCard) {
            sanitizedCard = {
              courseThumbnail: rawCard.courseThumbnail?.url || rawCard.courseThumbnail?.thumbnail
                ? {
                    url: typeof rawCard.courseThumbnail.url === 'string' ? rawCard.courseThumbnail.url : undefined,
                    thumbnail: typeof rawCard.courseThumbnail.thumbnail === 'string' ? rawCard.courseThumbnail.thumbnail : undefined,
                    alt: typeof rawCard.courseThumbnail.alt === 'string' ? rawCard.courseThumbnail.alt : undefined,
                  }
                : undefined,
              courseIcon: rawCard.courseIcon?.url || rawCard.courseIcon?.thumbnail
                ? {
                    url: typeof rawCard.courseIcon.url === 'string' ? rawCard.courseIcon.url : undefined,
                    thumbnail: typeof rawCard.courseIcon.thumbnail === 'string' ? rawCard.courseIcon.thumbnail : undefined,
                    alt: typeof rawCard.courseIcon.alt === 'string' ? rawCard.courseIcon.alt : undefined,
                  }
                : undefined,
              courseDuration: typeof rawCard.courseDuration === 'string' ? rawCard.courseDuration : undefined,
              courseMode: typeof rawCard.courseMode === 'string' ? rawCard.courseMode : undefined,
              courseTag: typeof rawCard.courseTag === 'string' ? rawCard.courseTag : undefined,
              courseType: typeof rawCard.courseType === 'string' ? rawCard.courseType : undefined,
              totalEnrolled: typeof rawCard.totalEnrolled === 'string' ? rawCard.totalEnrolled : undefined,
            };
          }

          const thumb =
            typeof c.thumbnail === 'string'
              ? c.thumbnail
              : sanitizedCard?.courseThumbnail?.url ||
                sanitizedCard?.courseThumbnail?.thumbnail ||
                sanitizedCard?.courseIcon?.thumbnail ||
                sanitizedCard?.courseIcon?.url;
          const dur =
            typeof c.duration === 'string'
              ? c.duration
              : sanitizedCard?.courseDuration;
          const enr =
            typeof c.enrolled === 'string'
              ? c.enrolled
              : sanitizedCard?.totalEnrolled;
          const tag =
            typeof c.tag === 'string'
              ? c.tag
              : sanitizedCard?.courseTag;
          const type =
            typeof c.type === 'string'
              ? c.type
              : sanitizedCard?.courseType;

          return {
            name: (c.course_name || c.course_title || c.name || '') as string,
            slug: (c.slug || '') as string,
            catslug: cat.slug,
            order: typeof c.order === 'number' ? c.order : 0,
            thumbnail: thumb,
            duration: dur,
            enrolled: enr,
            tag,
            type,
            courseCard: sanitizedCard,
          };
        })
        .filter((c) => c.name && c.slug)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      return {
        name: cat.name || '',
        slug: cat.slug || '',
        order: typeof cat.order === 'number' ? cat.order : 0,
        images: Array.isArray(cat.images) ? cat.images : [],
        courses: matchingCourses,
      };
    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return categoriesWithCourses;
  } catch (error) {
    console.error('[catalog.service] Error fetching categories and courses:', error);
    return [];
  }
}

/**
 * Extract distinct course options for form dropdown selectors via SSR.
 */
export async function getCourseOptions(): Promise<Array<{ slug: string; name: string }>> {
  const categories = await getCategories();
  const seen = new Set<string>();
  const list: Array<{ slug: string; name: string }> = [];

  for (const cat of categories) {
    for (const course of cat.courses || []) {
      if (course.slug && !seen.has(course.slug)) {
        seen.add(course.slug);
        list.push({ slug: course.slug, name: course.name });
      }
    }
  }

  return list;
}

