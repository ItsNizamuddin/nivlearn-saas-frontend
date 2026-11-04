import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { getCategories } from '@/lib/categories';
import { COURSES, COURSES_ID } from './data';

const GRID = 'mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4';

/** Course cards from the same cached course data the navbar uses. */
async function CourseGrid() {
  const categories = await getCategories();
  const courses = categories
    .flatMap((cat) => cat.courses.map((course) => ({ ...course, categorySlug: course.catslug || cat.slug })))
    .slice(0, COURSES.limit);

  if (courses.length === 0) return null;

  return (
    <ul className={GRID}>
      {courses.map((course) => {
        const icon = course.courseCard?.courseIcon?.thumbnail || course.courseCard?.courseIcon?.url;
        return (
          <li key={course.slug}>
            <Link
              href={`/${course.categorySlug}/${course.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-prime/10 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/30 hover:shadow-card"
            >
              <span className="flex size-14 items-center justify-center overflow-hidden rounded-xl bg-light">
                {icon ? (
                  <Image src={icon} alt="" width={40} height={40} className="object-contain" />
                ) : (
                  <BookOpen aria-hidden className="size-5 text-prime" />
                )}
              </span>
              <span className="mt-4 font-semibold text-prime-dark">{course.name}</span>
              <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm text-text-muted">
                {course.courseCard?.courseDuration ? (
                  <span className="flex items-center gap-1.5">
                    <Clock aria-hidden className="size-3.5" />
                    {course.courseCard.courseDuration}
                  </span>
                ) : (
                  <span>{course.courseCard?.courseMode || 'Live Online & Self-Paced'}</span>
                )}
                <ArrowRight aria-hidden className="size-4 text-prime transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function CourseGridSkeleton() {
  return (
    <ul className={GRID} aria-hidden>
      {Array.from({ length: COURSES.limit }, (_, i) => (
        <li key={i} className="h-40 animate-pulse rounded-2xl bg-light" />
      ))}
    </ul>
  );
}

export default function Courses() {
  return (
    <Section id={COURSES_ID} tone="muted">
      <SectionHeading align="center" eyebrow={COURSES.eyebrow} title={COURSES.title} />
      <Suspense fallback={<CourseGridSkeleton />}>
        <CourseGrid />
      </Suspense>
    </Section>
  );
}
