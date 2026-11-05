'use client';

import type { ReactNode } from 'react';
import { useLeadModal } from '@/context/LeadModalContext';
import { LEAD_FORMS, type LeadFormKey } from '@/lib/leadForms';

interface LeadCtaProps {
  /** Which lead-form setup to open (see lib/leadForms.ts). */
  form: LeadFormKey;
  className?: string;
  children: ReactNode;
}

/** Button that opens the lead form modal. Usable from server components. */
export default function LeadCta({ form, className, children }: LeadCtaProps) {
  const { openModal } = useLeadModal();
  return (
    <button type="button" onClick={() => openModal(LEAD_FORMS[form])} className={className}>
      {children}
    </button>
  );
}
