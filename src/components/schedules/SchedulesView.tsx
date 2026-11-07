import { Suspense } from 'react';
import Container from '@/components/layout/Container';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs';
import ScheduleBrowser from './ScheduleBrowser';
import ScheduleSidebar from './ScheduleSidebar';
import type { Coupon } from './types';

interface SchedulesViewProps {
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  coupons: Coupon[];
  courseSlug?: string;
}

/** Shared layout of /schedules and /schedules/[courseSlug]: hero, batch list, sidebar. */
export default function SchedulesView({ title, description, breadcrumbs, coupons, courseSlug }: SchedulesViewProps) {
  return (
    <>
      <PageHero eyebrow="Upcoming batches" title={title} description={description}>
        <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-6" />
      </PageHero>

      <section className="bg-surface-muted py-10 md:py-14">
        {/* Sidebar on the left from lg (as on the old site); below the list on mobile. */}
        <Container className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
          {/* Search params (filters) are read on the client. */}
          <Suspense>
            <ScheduleBrowser courseSlug={courseSlug} />
          </Suspense>
          <div className="lg:order-first lg:self-stretch">
            <ScheduleSidebar coupons={coupons} />
          </div>
        </Container>
      </section>
    </>
  );
}
