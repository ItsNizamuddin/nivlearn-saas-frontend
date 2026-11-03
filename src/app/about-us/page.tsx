import type { Metadata } from 'next';
import AboutUs from '@/components/about-us';

export const metadata: Metadata = {
  title: 'About Us',
  robots: { index: true, follow: true },
  alternates: { canonical: '/about-us' },
};

export default function AboutUsPage() {
  return <AboutUs />;
}
