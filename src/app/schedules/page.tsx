import type { Metadata } from 'next';
import SchedulesView from '@/components/schedules/SchedulesView';
import { getActiveCoupons } from '@/services/schedule.service';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Upcoming Training Batches',
  description: 'Browse upcoming live training batches at NivLearn: dates, timings, formats and fees for every course.',
  alternates: { canonical: '/schedules' },
};

export default async function SchedulesPage() {
  const coupons = await getActiveCoupons();
  return (
    <SchedulesView
      title="Upcoming Training Batches"
      description="Pick a batch that fits your week. Filter by month, timing and format, then enrol online in minutes."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Schedules' }]}
      coupons={coupons}
    />
  );
}
