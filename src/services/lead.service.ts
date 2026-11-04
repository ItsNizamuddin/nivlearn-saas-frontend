export interface LeadAttribution {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
    lead_source?: string;
    [key: string]: unknown;
}

export interface LeadCustomFields {
    hearAboutUs?: string;
    subject?: string;
    companyName?: string;
    designation?: string;
    friendName?: string;
    friendPhone?: string;
    friendEmail?: string;
    [key: string]: unknown;
}

export interface LeadPayload {
    fullName: string;
    email: string;
    phone: string;
    message?: string;
    budgetRange?: string;
    courseSlug?: string;
    selectedCourse?: string;
    participantsCount?: number;
    leadSource?: string;
    pagePath?: string;
    purpose?: string;
    customFields?: LeadCustomFields;
    turnstileToken?: string;
    [key: string]: unknown;
}

export interface LeadSubmitResult {
    success: boolean;
    message: string;
    data?: unknown;
}

/**
 * Submits a lead inquiry to the Next.js API proxy route.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
    const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || 'Failed to submit inquiry. Please try again.');
    }

    return {
        success: true,
        message: data.message || 'Inquiry submitted successfully.',
        data,
    };
}
