'use client';

import LeadForm from './LeadForm';
import { LEAD_FORMS, type LeadFormKey } from '@/lib/leadForms';
import type { LeadFormExtraField } from './types';

/**
 * The real lead form, embedded in a page section (same setup as the modal
 * opened by <LeadCta form="…" />). Usable from server components.
 */
export default function InlineLeadForm({ form, submitButtonText }: { form: LeadFormKey; submitButtonText?: string }) {
  const preset = LEAD_FORMS[form];
  const extraFields: LeadFormExtraField[] | undefined = 'extraFields' in preset ? preset.extraFields : undefined;
  const submitText = 'submitButtonText' in preset ? preset.submitButtonText : undefined;
  // LeadForm pads itself (px-4); pull it out so it lines up with the card it sits in.
  return (
    <div className="-mx-4">
      <LeadForm
        layout="standard"
        formTitle={null}
        formDescription={null}
        config={preset.config}
        defaultValues={preset.defaultValues}
        extraFields={extraFields}
        submitButtonText={submitButtonText ?? submitText ?? 'Submit Inquiry'}
      />
    </div>
  );
}
