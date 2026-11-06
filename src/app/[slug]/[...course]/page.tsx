import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCourseBySlug } from '@/services/catalog.service';
import CourseHero from '@/components/course/CourseHero';
import CourseStickyNav from '@/components/course/CourseStickyNav';
import CourseOverview from '@/components/course/CourseOverview';
import CourseBenefits from '@/components/course/CourseBenefits';
import CourseWhyUs from '@/components/course/CourseWhyUs';
import CourseSyllabus from '@/components/course/CourseSyllabus';
import CourseTrainers from '@/components/course/CourseTrainers';
import CourseCareer from '@/components/course/CourseCareer';
import CourseCorporate from '@/components/course/CourseCorporate';
import CourseFAQ from '@/components/course/CourseFAQ';
import CourseSEOContent from '@/components/course/CourseSEOContent';
import CourseSchema from '@/components/course/CourseSchema';
import CategorySalaries from '@/components/category/CategorySalaries';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
    course: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: categorySlug, course: courseParts } = await params;
  const courseSlug = courseParts[0];
  const locationSlug = courseParts[1];

  const course = await getCourseBySlug(courseSlug, locationSlug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  const title =
    course.metaTitle ||
    `${course.course_title}${locationSlug ? ` in ${locationSlug}` : ''} | NivLearn`;
  const description =
    course.metaDescription ||
    `Enroll in accredited ${course.course_title} training at NivLearn. Industry-aligned syllabus, hands-on enterprise simulation, and 100% exam pass support.`;

  const canonicalPath = locationSlug
    ? `${categorySlug}/${courseSlug}/${locationSlug}`
    : `${categorySlug}/${courseSlug}`;

  return {
    title,
    description,
    keywords: Array.isArray(course.keywords)
      ? course.keywords
      : typeof course.keywords === 'string'
        ? course.keywords.split(',').map((k) => k.trim())
        : undefined,
    robots: course.metaRobots || 'index, follow',
    alternates: {
      canonical: `${SITE_URL}/${canonicalPath}`,
    },
    openGraph: {
      title: course.ogTitle || title,
      description: course.ogDescription || description,
      url: `${SITE_URL}/${canonicalPath}`,
      siteName: 'NivLearn',
      type: 'website',
      images: course.ogImage ? [{ url: course.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: course.ogTitle || title,
      description: course.ogDescription || description,
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug: categorySlug, course: courseParts } = await params;

  if (!courseParts || courseParts.length === 0 || courseParts.length > 2) {
    notFound();
  }

  const courseSlug = courseParts[0];
  const locationSlug = courseParts[1];

  const course = await getCourseBySlug(courseSlug, locationSlug);

  if (!course) {
    notFound();
  }

  // Strict URL check: Ensure category slug matches course's category if present
  if (course.category?.slug && course.category.slug !== categorySlug) {
    notFound();
  }

  const courseUrl = `${SITE_URL}/${categorySlug}/${courseSlug}${locationSlug ? `/${locationSlug}` : ''}`;

  const hasBenefits = Boolean(
    course.benefits_section?.individual_benefits ||
    course.benefits_section?.organisational_benefits ||
    course.benefits_section?.benefits_desc ||
    course.overview_content?.benefits?.individual ||
    course.overview_content?.benefits?.organization ||
    course.overview_content?.benefits?.description
  );
  const hasSalaries = Boolean(course.salaries && course.salaries.length > 0);
  const hasSyllabus = Boolean(
    (Array.isArray(course.syllabus_content) && course.syllabus_content.length > 0) ||
    (course.syllabus_content && 'syllabus_accordian' in course.syllabus_content && course.syllabus_content.syllabus_accordian && course.syllabus_content.syllabus_accordian.length > 0) ||
    course.skills?.length ||
    course.tools?.length ||
    course.overview_content?.skillfocused
  );
  const hasTrainers = Boolean(course.trainers && course.trainers.length > 0);
  const hasCareer = Boolean(
    course.career &&
    ((course.career.path && course.career.path.length > 0) ||
      (course.career.career_path && course.career.career_path.length > 0) ||
      (course.career.certification_process && course.career.certification_process.length > 0) ||
      (course.career.certificates && course.career.certificates.length > 0))
  );
  const hasFaqs = Boolean(course.faqs && course.faqs.length > 0);

  const navItems = [
    { label: 'Overview', href: '#overview' },
    ...(hasBenefits ? [{ label: 'Benefits', href: '#benefits' }] : []),
    ...(hasSalaries ? [{ label: 'Salaries', href: '#salaries' }] : []),
    { label: 'Why NivLearn', href: '#whyus' },
    ...(hasSyllabus ? [{ label: 'Syllabus', href: '#syllabus' }] : []),
    ...(hasTrainers ? [{ label: 'Trainers', href: '#trainers' }] : []),
    ...(hasCareer ? [{ label: 'Career', href: '#career' }] : []),
    ...(hasFaqs ? [{ label: 'FAQs', href: '#faqs' }] : []),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CourseSchema course={course} courseUrl={courseUrl} />
      <CourseHero course={course} location={locationSlug} />
      <CourseStickyNav items={navItems} course={course} />
      <CourseOverview course={course} />
      <CourseBenefits course={course} />
      {hasSalaries && (
        <div id="salaries">
          <CategorySalaries categoryName={course.course_title} salaries={course.salaries} />
        </div>
      )}
      <CourseWhyUs />
      <CourseSyllabus course={course} />
      <CourseTrainers course={course} />
      <CourseCareer course={course} />
      <CourseCorporate courseTitle={course.course_title} courseSlug={course.slug} />
      <CourseFAQ course={course} />
      <CourseSEOContent
        internalSection={course.internalSection}
        bottomSection={course.bottomSection}
      />
    </main>
  );
}
