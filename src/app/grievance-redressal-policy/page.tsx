import { CircleCheck } from 'lucide-react';
import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { GRIEVANCE_OFFICER } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Grievance Redressal Policy',
  // Old site served this page as noindex — kept.
  robots: { index: false, follow: false },
  alternates: { canonical: '/grievance-redressal-policy' },
};

export default function GrievancePage() {
  return (
    <LegalPage slug="grievance-redressal-policy">
      <div className="mt-8 rounded-xl bg-light p-6">
        <h2 className="text-xl font-bold text-prime-dark">Grievance Officers</h2>
        <ul className="mt-4 space-y-3 text-text-body">
          <li className="flex items-center gap-3">
            <CircleCheck aria-hidden className="size-5 shrink-0 text-prime" />
            Name: {GRIEVANCE_OFFICER.name}
          </li>
          <li className="flex items-center gap-3">
            <CircleCheck aria-hidden className="size-5 shrink-0 text-prime" />
            Email us:{' '}
            <a href={`mailto:${GRIEVANCE_OFFICER.email}`} className="font-medium text-prime hover:underline">
              {GRIEVANCE_OFFICER.email}
            </a>
          </li>
        </ul>
      </div>
    </LegalPage>
  );
}
