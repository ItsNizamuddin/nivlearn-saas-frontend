import type { Metadata } from 'next';
import HireFromUs from '@/components/hire-from-us';

export const metadata: Metadata = {
  title: 'Hire From Us',
  description: 'Hire industry-ready NivLearn talent at no cost.',
  // Old site served this page as noindex — kept.
  robots: { index: false, follow: false },
  alternates: { canonical: '/hire-from-us' },
};

export default function HireFromUsPage() {
  return <HireFromUs />;
}
