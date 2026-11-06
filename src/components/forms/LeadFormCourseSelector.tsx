'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname();
    const pathSegments = (pathname || '').split('/').filter(Boolean);
    const isCoursePage = pathSegments.length >= 2 && pathSegments[0] !== 'blog' && pathSegments[0] !== 'api';
    const courseSlugFromPath = isCoursePage ? pathSegments[1] : undefined;

    // Only auto-select from path if currently on a course page; on other pages let it be normal
    const effectiveSlug = defaultSlug || (isCoursePage ? courseSlugFromPath : undefined);

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
        if (effectiveSlug && availableCourses.length > 0) {
            if (!value || value === effectiveSlug) {
                const defaultCourse = availableCourses.find(c => c.slug === effectiveSlug);
                if (defaultCourse) {
                    onChange(effectiveSlug, defaultCourse.name);
                } else if (!value) {
                    const formattedTitle = effectiveSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    onChange(effectiveSlug, formattedTitle);
                }
            }
        } else if (!value && effectiveSlug) {
            const formattedTitle = effectiveSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            onChange(effectiveSlug, formattedTitle);
        }
    }, [effectiveSlug, value, onChange, availableCourses]);

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
        const found = availableCourses.find(c => c.slug === value);
        const formattedTitle = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        options.unshift({
            label: found?.name || (effectiveSlug === value ? formattedTitle : value),
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
