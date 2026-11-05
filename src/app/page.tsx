import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Banner from '@/components/home/Banner';
import CoursesSection from '@/components/home/CoursesSection';
import CTA from '@/components/home/CTA';
import { getCategories } from '@/services/catalog.service';

const AboutUsSec = dynamic(() => import('@/components/home/AboutUsSec'));
const OurBestFeatures = dynamic(() => import('@/components/home/OurBestFeatures'));
const TopExperiences = dynamic(() => import('@/components/home/TopExperiences'));
const WhoWeAre = dynamic(() => import('@/components/home/WhoWeAre'));
const TestsSection = dynamic(() => import('@/components/home/TestsSection'));
const Corporate = dynamic(() => import('@/components/home/Corporate'));
const ExpertServices = dynamic(() => import('@/components/home/ExpertServices'));
const TestimonialSections = dynamic(() => import('@/components/home/TestimonialSections'));

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

export const revalidate = 3600;

export default async function Home() {
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
      <Corporate />
      <ExpertServices />
      <TestimonialSections />
    </>
  );
}
