'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { Category, Course } from '@/components/Navbar/types';
import { CategoryTabs, CourseCard, MobileCourseView } from './courses';

export interface CoursesSectionProps {
    categories?: Category[];
    title?: string;
    subtitle?: string;
}

export default function CoursesSection({
    categories = [],
    title = 'Explore In-Demand Courses',
    subtitle = 'Hands-on curriculum designed by industry tech leaders to advance your professional career.',
}: CoursesSectionProps) {
    const { openModal } = useLeadModal();

    // Active category selection
    const [selectedSlug, setSelectedSlug] = useState<string>(
        categories[0]?.slug || ''
    );

    // Visible count for desktop grid (Load More pagination)
    const [visibleCount, setVisibleCount] = useState<number>(6);

    const activeCategory = useMemo(() => {
        return (
            categories.find((c) => c.slug === selectedSlug) ||
            categories[0] ||
            null
        );
    }, [categories, selectedSlug]);

    const courses: Course[] = useMemo(() => {
        if (!activeCategory) return [];
        return activeCategory.courses || [];
    }, [activeCategory]);

    const displayedCourses = useMemo(() => {
        return courses.slice(0, visibleCount);
    }, [courses, visibleCount]);

    const handleCategoryChange = (slug: string) => {
        setSelectedSlug(slug);
        setVisibleCount(6);
    };

    const handleEnquire = (course: Course) => {
        openModal({
            formTitle: `Enquire About ${course.name}`,
            formDescription: `Get detailed syllabus, upcoming batch schedules, and fee details for ${course.name}.`,
            defaultValues: {
                courseSlug: course.slug,
                leadSource: 'home-courses-grid',
            },
            config: {
                showCourse: true,
                showMessage: true,
                purpose: true,
            },
        });
    };

    if (categories.length === 0) {
        return null;
    }

    const activeCategorySlug = activeCategory?.slug || '';

    return (
        <section
            className="py-8 mt-4 md:mt-0 md:py-16 bg-surface"
            id="courses"
        >
            <div className="section-container">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/15 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Top Learning Paths</span>
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-prime-dark tracking-tight">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 text-sm text-text-muted max-w-2xl">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Modular Category Navigation Tabs */}
                <CategoryTabs
                    categories={categories}
                    selectedSlug={activeCategorySlug}
                    onSelectCategory={handleCategoryChange}
                />

                {/* Empty State */}
                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-surface-muted border border-border-muted/50 my-6">
                        <BookOpen className="w-10 h-10 text-text-muted/60 mb-3" />
                        <h3 className="text-base sm:text-lg font-bold text-prime-dark mb-1">
                            No courses available yet
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted max-w-sm">
                            Courses for{' '}
                            <span className="font-semibold text-prime">
                                {activeCategory?.name}
                            </span>{' '}
                            are being updated. Check back shortly or contact our team.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* 1. Mobile View: 1 Card at a time + Previous & Next Buttons */}
                        <MobileCourseView
                            courses={courses}
                            activeCategorySlug={activeCategorySlug}
                            onEnquire={handleEnquire}
                        />

                        {/* 2. Desktop & Tablet Grid View */}
                        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {displayedCourses.map((course, idx) => (
                                <CourseCard
                                    key={`${course.slug}-${idx}`}
                                    course={course}
                                    activeCategorySlug={activeCategorySlug}
                                    onEnquire={handleEnquire}
                                />
                            ))}
                        </div>

                        {/* Load More Button (Desktop only) */}
                        {courses.length > visibleCount && (
                            <div className="hidden md:flex justify-center items-center mt-10">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((prev) => prev + 6)}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-prime text-prime hover:bg-prime hover:text-on-dark font-semibold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
                                >
                                    <span>Load More Courses</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
