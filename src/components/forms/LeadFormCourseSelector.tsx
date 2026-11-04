'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import SearchableSelect from './SearchableSelect';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseOptionItem } from './types';

interface LeadFormCourseSelectorProps {
    value?: string;
    onChange: (slug: string, title?: string) => void;
    defaultSlug?: string;
    placeholder?: string;
    icon?: ReactNode;
    courses?: CourseOptionItem[];
}

export default function LeadFormCourseSelector({
    value,
    onChange,
    defaultSlug,
    placeholder,
    icon,
    courses: propCourses
}: LeadFormCourseSelectorProps) {
    let contextCourses: CourseOptionItem[] = [];
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const modalCtx = useLeadModal();
        contextCourses = modalCtx?.courses || [];
    } catch {
        // Rendered outside of LeadModalProvider (e.g. standalone page form)
    }

    const availableCourses = propCourses && propCourses.length > 0 ? propCourses : contextCourses;

    useEffect(() => {
        if (defaultSlug && availableCourses.length > 0) {
            if (!value || value === defaultSlug) {
                const defaultCourse = availableCourses.find(c => c.slug === defaultSlug);
                if (defaultCourse) {
                    onChange(defaultSlug, defaultCourse.name);
                } else if (!value) {
                    const formattedTitle = defaultSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    onChange(defaultSlug, formattedTitle);
                }
            }
        } else if (!value && defaultSlug) {
            const formattedTitle = defaultSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            onChange(defaultSlug, formattedTitle);
        }
    }, [defaultSlug, value, onChange, availableCourses]);

    const options: Array<{ label: string; value: string }> = [
        { label: placeholder || "Select a Course", value: "" },
        ...availableCourses.map(c => ({
            label: c.name,
            value: c.slug
        }))
    ];

    options.push({
        label: "Not Sure – Need Career Guidance",
        value: "need-guidance"
    });

    if (value && !options.some(o => o.value === value)) {
        options.unshift({
            label: defaultSlug === value ? (defaultSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) : value,
            value: value
        });
    }

    const handleChange = (slug: string) => {
        const selected = options.find(o => o.value === slug);
        onChange(slug, selected?.label);
    };

    return (
        <div className="relative">
            <SearchableSelect
                value={value || ""}
                onChange={handleChange}
                options={options}
                label="Course Selection"
                placeholder={placeholder || "Select Course..."}
                icon={icon}
            />
        </div>
    );
}
