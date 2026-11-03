export interface FooterLink {
    label: string;
    url: string;
    external?: boolean;
}

export interface FooterLogo {
    alt?: string;
    url?: string;
    thumbnail?: string;
}

export interface FooterColumn {
    title: string;
    order: number;
    links: FooterLink[];
    content?: string;
    logo?: FooterLogo;
}

export interface PopularCategory {
    name: string;
    slug: string;
    courseCount?: number;
}

export interface PopularCourse {
    slug: string;
    course_name: string;
    course_title?: string;
    category_slug: string;
}

export interface SocialLink {
    name?: string;
    label?: string;
    link: string;
    icon?: string | { url: string };
}

export interface FooterData {
    footer_columns?: FooterColumn[];
    popular?: string[];
    numbers?: string[];
    emails?: string[];
    disclaimer?: string;
    bottom_ribbon?: string;
    popular_categories?: PopularCategory[];
    popular_courses?: PopularCourse[];
    social?: SocialLink[];
}
