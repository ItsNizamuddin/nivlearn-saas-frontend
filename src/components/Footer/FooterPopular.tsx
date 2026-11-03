import React from 'react';
import Link from 'next/link';
import { PopularCategory, PopularCourse } from './types';

interface FooterPopularProps {
    categories?: PopularCategory[];
    courses?: PopularCourse[];
}

export default function FooterPopular({ categories = [], courses = [] }: FooterPopularProps) {
    if (categories.length === 0 && courses.length === 0) return null;

    return (
        <section aria-label="Popular Programs and Domains" className="border-t border-white/10 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
                {/* Top Domains (4 cols) */}
                {categories.length > 0 && (
                    <div className="lg:col-span-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-prime-yellow text-xs font-bold uppercase tracking-wider">
                                Explore Domains
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat, i) => (
                                <Link
                                    key={i}
                                    href={`/${cat.slug}`}
                                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-prime-yellow/40 text-xs text-zinc-300 hover:text-white transition-all duration-150"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-prime-yellow/70 group-hover:bg-prime-yellow transition-colors" />
                                    <span>{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Programs & Courses (8 cols) */}
                {courses.length > 0 && (
                    <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-prime-yellow text-xs font-bold uppercase tracking-wider">
                                In-Demand Certifications & Bootcamps
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {courses.map((course, i) => (
                                <Link
                                    key={i}
                                    href={`/${course.category_slug}/${course.slug}`}
                                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-prime/40 text-xs text-zinc-300 hover:text-white transition-all duration-150"
                                >
                                    <span>{course.course_name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
