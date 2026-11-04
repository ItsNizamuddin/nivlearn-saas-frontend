import type { Metadata } from 'next';
import GuestAuthor from '@/components/guest-author';

export const metadata: Metadata = {
  title: 'Become a Guest Author',
  description: 'Write for NivLearn: share your expertise on careers, skills, corporate learning and EdTech.',
  alternates: { canonical: '/become-a-guest-author' },
};

export default function GuestAuthorPage() {
  return <GuestAuthor />;
}
