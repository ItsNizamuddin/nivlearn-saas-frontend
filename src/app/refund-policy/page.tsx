import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description: 'Terms for cancellations and refunds of NivLearn courses and services.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return <LegalPage slug="refund-policy" />;
}
