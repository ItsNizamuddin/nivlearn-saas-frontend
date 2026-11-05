import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface CourseOptionItem {
    slug: string;
    name: string;
}

export interface LeadFormConfig {
    budget?: boolean;
    participants?: boolean;
    hearAbout?: boolean;
    subject?: boolean;
    purpose?: boolean;
    showCourse?: boolean;
    showMessage?: boolean;
    company?: boolean;
    designation?: boolean;
    isReferral?: boolean;
}

export interface LeadFormDefaultValues {
    leadSource?: string;
    courseSlug?: string;
    pagePath?: string;
    dialCode?: string;
    hearAboutUs?: string;
    purpose?: string;
    friendName?: string;
    friendEmail?: string;
    friendPhone?: string;
    companyName?: string;
    designation?: string;
    [key: string]: string | undefined;
}

/**
 * Page-specific question added to the lead form. Answers are sent in
 * `customFields` under its `name`, so no backend change is needed.
 */
export interface LeadFormExtraField {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'select' | 'textarea';
    required?: boolean;
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
    /** Pre-filled value. */
    defaultValue?: string;
}

export interface LeadFormFieldIcons {
    fullName?: ReactNode;
    phone?: ReactNode;
    email?: ReactNode;
    course?: ReactNode;
    message?: ReactNode;
}

export interface LeadFormProps {
    config?: LeadFormConfig;
    layout?: 'standard' | 'compact';
    coursePlaceholder?: string;
    defaultValues?: LeadFormDefaultValues;
    formTitle?: ReactNode;
    formDescription?: ReactNode;
    icon?: ReactNode;
    fieldIcons?: LeadFormFieldIcons;
    submitButtonText?: string;
    courses?: CourseOptionItem[];
    /** Extra page-specific questions, rendered before the message box. */
    extraFields?: LeadFormExtraField[];
    onSuccess?: () => void;
}

export interface LeadModalPerk {
    icon: LucideIcon;
    text: string;
}

export interface LeadModalShellProps {
    onClose: () => void;
    badge?: string;
    heading: ReactNode;
    description: ReactNode;
    perks: LeadModalPerk[];
    leadFormProps: Omit<LeadFormProps, 'layout'>;
    afterForm?: ReactNode;
}

