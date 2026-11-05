'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { Course } from '@/components/Navbar/types';
import CourseCard from './CourseCard';

export interface MobileCourseViewProps {
    courses: Course[];
    activeCategorySlug: string;
    onEnquire?: (course: Course) => void;
}

export default function MobileCourseView({
    courses,
    activeCategorySlug,
    onEnquire,
}: MobileCourseViewProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Reset index whenever the category changes or course list changes
    useEffect(() => {
        setActiveIndex(0);
    }, [activeCategorySlug, courses.length]);

    if (courses.length === 0) {
        return null;
    }

    const currentCourse = courses[activeIndex];
    const isFirst = activeIndex === 0;
    const isLast = activeIndex >= courses.length - 1;

    const handlePrev = () => {
        if (!isFirst) {
            setActiveIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (!isLast) {
            setActiveIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="block md:hidden w-full max-w-sm mx-auto">
            {/* Single Course Card Display */}
            {currentCourse ? (
                <CourseCard
                    course={currentCourse}
                    activeCategorySlug={activeCategorySlug}
                    onEnquire={onEnquire}
                    className="w-full shadow-md"
                />
            ) : null}

            {/* Mobile Navigation Controls: Previous / Next & Counter */}
            {courses.length > 1 && (
                <div className="flex items-center justify-between mt-5 px-1">
                    {/* Previous Button */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={isFirst}
                        aria-label="Previous course"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all ${
                            isFirst
                                ? 'bg-surface-muted text-text-muted/50 border border-border-muted cursor-not-allowed'
                                : 'bg-surface hover:bg-sec-prime text-prime-dark border border-border-muted shadow-2xs hover:border-prime cursor-pointer active:scale-95'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    {/* Step Indicator & Dots */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-semibold text-text-muted">
                            {activeIndex + 1} of {courses.length}
                        </span>
                        <div className="flex items-center gap-1">
                            {courses.slice(0, 8).map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all ${
                                        idx === activeIndex
                                            ? 'w-4 bg-prime'
                                            : 'w-1.5 bg-border-muted'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={isLast}
                        aria-label="Next course"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all ${
                            isLast
                                ? 'bg-surface-muted text-text-muted/50 border border-border-muted cursor-not-allowed'
                                : 'bg-prime hover:bg-prime-outline text-on-dark shadow-xs cursor-pointer active:scale-95'
                        }`}
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

