'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CourseOptionItem, LeadFormExtraField } from '@/components/forms/types';

export interface LeadModalConfig {
    formTitle?: string | ReactNode;
    formDescription?: string | ReactNode;

    config?: {
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
    };

    defaultValues?: {
        leadSource?: string;
        courseSlug?: string;
        pagePath?: string;
        hearAboutUs?: string;
        subject?: string;
        purpose?: string;
        companyName?: string;
        designation?: string;
    };

    courses?: CourseOptionItem[];
    /** Page-specific questions (sent as customFields). */
    extraFields?: LeadFormExtraField[];
    submitButtonText?: string;
    onSuccess?: () => void;
    source?: string;
    courseSlug?: string;
    participants?: boolean;
}

interface LeadModalContextType {
    isOpen: boolean;
    openModal: (config?: LeadModalConfig) => void;
    closeModal: () => void;
    modalConfig: LeadModalConfig;
    courses: CourseOptionItem[];
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({
    children,
    courses = []
}: {
    children: ReactNode;
    courses?: CourseOptionItem[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<LeadModalConfig>({});

    const openModal = (config?: LeadModalConfig) => {
        if (config) {
            setModalConfig(config);
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <LeadModalContext.Provider value={{ isOpen, openModal, closeModal, modalConfig, courses }}>
            {children}
        </LeadModalContext.Provider>
    );
}

export function useLeadModal() {
    const context = useContext(LeadModalContext);
    if (context === undefined) {
        throw new Error('useLeadModal must be used within a LeadModalProvider');
    }
    return context;
}
