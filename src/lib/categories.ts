import { fetchFromBackend } from './apiProxy';
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

export async function getCategories(): Promise<Category[]> {
  try {
    // 1. Fetch Categories
    const catQueryParams = new URLSearchParams({
      select: 'name,slug,order,images',
      order: 'asc',
    });

    const catRes = await fetchFromBackend('/categories', {
      queryParams: catQueryParams,
      next: { revalidate: false, tags: ['categories'] },
    });

    if (!catRes.ok) {
      console.error('[getCategories] Failed to fetch categories:', catRes.status, catRes.statusText);
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
      next: { revalidate: false, tags: ['courses'] },
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

          return {
            name: (c.course_name || c.course_title || c.name || '') as string,
            slug: (c.slug || '') as string,
            order: typeof c.order === 'number' ? c.order : 0,
            courseCard: sanitizedCard,
          };
        })
        .filter((c) => c.name && c.slug)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      return {
        name: cat.name || '',
        slug: cat.slug || '',
        images: Array.isArray(cat.images) ? cat.images : [],
        courses: matchingCourses,
      };
    });

    return categoriesWithCourses;
  } catch (error) {
    console.error('[getCategories] Error fetching categories and courses:', error);
    return [];
  }
}
