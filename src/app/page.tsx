import type { Metadata } from 'next';
import Banner from '@/components/home/Banner';
import CoursesSection from '@/components/home/CoursesSection';
import CTA from '@/components/home/CTA';
import AboutUsSec from '@/components/home/AboutUsSec';
import OurBestFeatures from '@/components/home/OurBestFeatures';
import TopExperiences from '@/components/home/TopExperiences';
import WhoWeAre from '@/components/home/WhoWeAre';
import TestsSection from '@/components/home/TestsSection';
import Corporate from '@/components/home/Corporate';
import ExpertServices from '@/components/home/ExpertServices';
import TestimonialSections from '@/components/home/TestimonialSections';
import { getCategories } from '@/services/catalog.service';

export const metadata: Metadata = {
  title: 'Learn In-Demand Tech Skills & Industry Certifications',
  description:
    'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
  keywords: [
    'tech bootcamps',
    'certification training',
    'software engineering',
    'digital marketing',
    'cloud computing',
    'career placement',
    'NivLearn',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NivLearn | Learn In-Demand Tech Skills & Industry Certifications',
    description:
      'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
    url: '/',
    siteName: 'NivLearn',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NivLearn | Learn In-Demand Tech Skills & Industry Certifications',
    description:
      'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const categories = await getCategories();

  return (
    <>
      <Banner />
      <CoursesSection categories={categories} />
      <CTA />
      <AboutUsSec />
      <OurBestFeatures />
      <TopExperiences />
      <WhoWeAre />
      <TestsSection />
      {/* <Corporate />
      <ExpertServices />
      <TestimonialSections searchParams={searchParams} /> */}
    </>
  );
}
