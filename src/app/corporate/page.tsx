import type { Metadata } from 'next';
import Corporate from '@/components/corporate';

export const metadata: Metadata = {
  title: 'Leading Corporate Training & Consulting Company | 100+ Programs',
  description:
    "Empower your workforce with NivLearn's expert enterprise training and consulting services. Enhance team skills, achieve 4X productivity, and drive success with guidance from leading industry professionals.",
  alternates: { canonical: '/corporate' },
};

export default function CorporatePage() {
  return <Corporate />;
}
