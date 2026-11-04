'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ArrowRight } from 'lucide-react';
import type { Course } from '@/components/Navbar/types';

export interface CourseCardProps {
    course: Course;
    activeCategorySlug?: string;
    onEnquire?: (course: Course) => void;
    className?: string;
}

export default function CourseCard({
    course,
    activeCategorySlug = '',
    onEnquire,
    className = '',
}: CourseCardProps) {
    const categorySlug = course.catslug || activeCategorySlug;
    const courseUrl = `/${categorySlug}/${course.slug}`;
    const tag = course.tag || course.courseCard?.courseTag;
    const type = course.type || course.courseCard?.courseType;
    const duration = course.duration || course.courseCard?.courseDuration || 'Flexible Hours';
    const enrolled = course.enrolled || course.courseCard?.totalEnrolled || '1,000+';
    const thumbnailSrc =
        course.thumbnail ||
        course.courseCard?.courseThumbnail?.url ||
        course.courseCard?.courseThumbnail?.thumbnail ||
        course.courseCard?.courseIcon?.thumbnail ||
        '/default.webp';

    return (
        <div
            className={`flex flex-col justify-between bg-surface border border-border-muted rounded-md shadow-xs hover:shadow-card hover:border-prime/30 transition-all duration-300 overflow-hidden group ${className}`}
        >
            {/* Top Media Thumbnail Container with padding and rounded preview */}
            <div className="w-full">
                <div className="relative w-full aspect-[2/1] overflow-hidden bg-white shadow-2xs">
                    <Image
                        src={thumbnailSrc}
                        alt={course.name}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Tag (e.g. Recommended, Popular) */}
                    {tag && (
                        <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-md bg-surface/95 backdrop-blur-xs shadow-xs border border-border-muted/40">
                            <span className="text-prime-yellow text-xs font-bold leading-none block">
                                {tag}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Content Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Course Type Badge */}
                    {type && (
                        <div className="inline-block px-2 py-0.5 rounded bg-prime/10 text-prime text-[11px] font-bold uppercase tracking-wider mb-2">
                            {type}
                        </div>
                    )}

                    {/* Course Name */}
                    <h3 className="font-heading text-base font-bold text-prime-dark leading-snug line-clamp-2 group-hover:text-prime transition-colors mb-3">
                        <Link href={courseUrl}>{course.name}</Link>
                    </h3>

                    {/* Duration & Enrollment Meta */}
                    <div className="space-y-1.5 text-xs text-text-muted mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                            <span>{duration} Duration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-text-muted shrink-0" />
                            <span>{enrolled} Enrolled</span>
                        </div>
                    </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-border-muted/30 grid grid-cols-2 gap-2 mt-auto">
                    <Link
                        href={courseUrl}
                        className="px-2.5 py-2 text-center border border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-on-dark rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                        <span>Know More</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => onEnquire?.(course)}
                        className="px-2.5 py-2 text-center bg-prime hover:bg-prime-outline text-on-dark rounded-md text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
