export interface CourseCardData {
  courseIcon?: {
    url?: string;
    thumbnail?: string;
    alt?: string;
  };
  courseTag?: string;
  courseType?: string;
  courseMode?: string;
  courseDuration?: string;
  totalEnrolled?: string;
}

export interface Course {
  name: string;
  slug: string;
  order?: number;
  catslug?: string;
  courseCard?: CourseCardData;
}

export interface Category {
  name: string;
  slug: string;
  images?: string[];
  courses: Course[];
}

export interface ResourceLink {
  name: string;
  link: string;
  descp: string;
}
