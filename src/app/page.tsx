import type { Metadata } from 'next';
import Banner from '@/components/page-comp/home-page/Banner';

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

export default function Home() {
  return (
    <>
      <Banner />
    </>
  );
}
