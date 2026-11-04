import { fetchFromBackend } from '@/lib/apiProxy';

export interface TestimonialCourse {
    slug?: string;
    course_title?: string;
}

export interface TestimonialImage {
    alt?: string;
    url: string;
    thumbnail?: string;
    width?: number | null;
    height?: number | null;
}

export interface TestimonialVideo {
    alt?: string;
    url: string;
    thumbnail?: string;
    width?: number | null;
    height?: number | null;
}

export interface Testimonial {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    message: string;
    rating: number;
    platform: string;
    company?: string;
    designation?: string;
    course?: TestimonialCourse | TestimonialCourse[];
    image?: TestimonialImage;
    videoLink?: TestimonialVideo | string;
    createdAt?: string;
}

export interface TestimonialsResponse {
    data: Testimonial[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export async function getTestimonials(
    page: number = 1,
    limit: number = 3,
    courseSlug?: string,
    platform?: string
): Promise<TestimonialsResponse> {
    try {
        const query = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (courseSlug) {
            query.append('courseSlug', courseSlug);
        }

        if (platform && platform !== 'all') {
            query.append('platform', platform);
        }

        const res = await fetchFromBackend('/testimonials', {
            queryParams: query,
            next: { revalidate: 3600, tags: ['testimonials'] },
        });

        let items: Testimonial[] = [];
        let meta = {
            page,
            limit,
            total: 0,
            pages: 1,
        };

        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json)) {
                items = json;
                meta.total = json.length;
                meta.pages = Math.ceil(json.length / limit) || 1;
            } else if (Array.isArray(json?.data)) {
                items = json.data;
                if (json.meta) {
                    meta = json.meta;
                } else {
                    meta.total = json.data.length;
                    meta.pages = Math.ceil(json.data.length / limit) || 1;
                }
            }
        }

        // Filter platform if requested and not handled by backend
        const filtered =
            platform && platform !== 'all'
                ? items.filter(
                      (t) => t.platform?.toLowerCase() === platform.toLowerCase()
                  )
                : items;

        return {
            data: filtered,
            meta,
        };
    } catch (error) {
        console.error('[testimonial.service] Error fetching testimonials:', error);
        return {
            data: [],
            meta: {
                page: 1,
                limit,
                total: 0,
                pages: 1,
            },
        };
    }
}
