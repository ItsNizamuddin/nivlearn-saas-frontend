import type { Metadata } from 'next';
import { cache } from 'react';
import SchedulesView from '@/components/schedules/SchedulesView';
import { getActiveCoupons, getScheduleCourseName } from '@/services/schedule.service';

export const revalidate = 300;

/** Render on first visit, then cache (no build-time backend calls). */
export async function generateStaticParams() {
  return [];
}

const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

const courseName = cache(async (slug: string) => (await getScheduleCourseName(slug)) ?? titleFromSlug(slug));

export async function generateMetadata({ params }: PageProps<'/schedules/[courseSlug]'>): Promise<Metadata> {
  const { courseSlug } = await params;
  const name = await courseName(courseSlug);
  return {
    title: `${name} Schedules`,
    description: `Upcoming ${name} batches at NivLearn: dates, timings, formats and fees.`,
    alternates: { canonical: `/schedules/${courseSlug}` },
  };
}

export default async function CourseSchedulesPage({ params }: PageProps<'/schedules/[courseSlug]'>) {
  const { courseSlug } = await params;
  const [name, coupons] = await Promise.all([courseName(courseSlug), getActiveCoupons()]);
  return (
    <SchedulesView
      title={`${name} Schedules`}
      description={`Upcoming ${name} batches. Choose the dates and timing that suit you and enrol online.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Schedules', href: '/schedules' }, { label: name }]}
      coupons={coupons}
      courseSlug={courseSlug}
    />
  );
}
