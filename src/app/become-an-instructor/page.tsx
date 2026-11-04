import type { Metadata } from 'next';
import BecomeAnInstructor from '@/components/become-an-instructor';

export const metadata: Metadata = {
  title: 'Become an Instructor',
  description: 'Join a global community of expert instructors at NivLearn and share your expertise.',
  alternates: { canonical: '/become-an-instructor' },
};

export default function BecomeAnInstructorPage() {
  return <BecomeAnInstructor />;
}
