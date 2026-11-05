import TrustedBy from '@/components/ui/TrustedBy';
import Banner from './Banner';
import Benefits from './Benefits';
import Courses from './Courses';
import EnquiryCta from './EnquiryCta';
import RecentBlogs from '@/components/blog/RecentBlogs';
import { Certifications, GlobalShowcase, WhyUs } from './Showcase';
import Stats from './Stats';
import Stories from './Stories';
import Transform from './Transform';

/*
 * Old page also had a testimonials carousel loaded from the NevoLearn API.
 * The new backend has no testimonials endpoint yet, so it's left out.
 */
export default function Corporate() {
  return (
    <>
      <Banner />
      <Transform />
      <Courses />
      <Stats />
      <Benefits />
      <Stories />
      <TrustedBy />
      <WhyUs />
      <Certifications />
      <GlobalShowcase />
      <RecentBlogs />
      <EnquiryCta />
    </>
  );
}
