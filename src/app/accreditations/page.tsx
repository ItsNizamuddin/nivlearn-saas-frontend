import type { Metadata } from 'next';
import Accreditations from '@/components/accreditations';

export const metadata: Metadata = {
  title: 'Accreditations',
  description: 'Accredited training that is valuable, recognized and beneficial — now and in the future.',
  alternates: { canonical: '/accreditations' },
};

export default function AccreditationsPage() {
  return <Accreditations />;
}
