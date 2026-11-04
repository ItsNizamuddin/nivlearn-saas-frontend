import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  // Old site served this page as noindex — kept.
  robots: { index: false, follow: false },
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsPage() {
  return <LegalPage slug="terms-and-conditions" />;
}
