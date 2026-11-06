import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug, getCategoryCourses } from '@/services/catalog.service';
import CategoryBanner from '@/components/category/CategoryBanner';
import CategoryBannerStats from '@/components/category/CategoryBannerStats';
import CategoryCourses from '@/components/category/CategoryCourses';
import CategorySalaries from '@/components/category/CategorySalaries';
import CategoryCertificate from '@/components/category/CategoryCertificate';
import CategoryFAQ from '@/components/category/CategoryFAQ';
import CategorySEOContent from '@/components/category/CategorySEOContent';
import CTA from '@/components/home/CTA';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const title = category.metaTitle || `${category.name} Training & Certifications | NivLearn`;
  const description =
    category.metaDescription ||
    category.description ||
    `Explore industry-leading ${category.name} certifications and bootcamps at NivLearn. Hands-on training with global mentors.`;

  return {
    title,
    description,
    keywords: Array.isArray(category.keywords)
      ? category.keywords
      : typeof category.keywords === 'string'
        ? category.keywords.split(',').map((k) => k.trim())
        : undefined,
    robots: category.metaRobots || 'index, follow',
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
    openGraph: {
      title: category.ogTitle || title,
      description: category.ogDescription || description,
      url: `${SITE_URL}/${slug}`,
      siteName: 'NivLearn',
      type: 'website',
      images: category.ogImage ? [{ url: category.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.ogTitle || title,
      description: category.ogDescription || description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [category, coursesResult] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryCourses(slug, 1, 50),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CategoryBanner category={category} />
      <CategoryBannerStats stats={category.stats} />
      <CategoryCourses
        categoryName={category.name}
        categorySlug={slug}
        courses={coursesResult.data}
      />
      <CategorySalaries categoryName={category.name} salaries={category.salaries} />
      <CTA
        title={`Accelerate Your Career with ${category.name}`}
        subtitle="Claim our limited-time scholarship, cohort fee discount, and 1-on-1 career consultation today."
        buttonText="Get Exclusive Offer"
      />
      <CategoryCertificate title={category.name} categorySlug={slug} />
      <CategoryFAQ categoryName={category.name} categorySlug={slug} faqs={category.faqs} />
      <CategorySEOContent
        internalSection={category.internalSection}
        bottomSection={category.bottomSection}
      />
    </main>
  );
}
