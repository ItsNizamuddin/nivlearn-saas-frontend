import React from 'react';
import { Award, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { getTestimonials } from '@/services/testimonial.service';
import TestimonialSectionView from './TestimonialSectionView';

export interface TestimonialSectionsProps {
    courseSlug?: string;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    hideVideo?: boolean;
    className?: string;
}

export default async function TestimonialSections({
    courseSlug,
    searchParams,
    hideVideo = false,
    className = '',
}: TestimonialSectionsProps) {
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const page = Number(resolvedSearchParams?.page) || 1;
    const platform =
        typeof resolvedSearchParams?.platform === 'string'
            ? resolvedSearchParams.platform
            : undefined;

    // Fetch 3 testimonials initially
    const data = await getTestimonials(page, 3, courseSlug, platform);
    const testimonialsList = data?.data || [];

    // If no real testimonials exist in the backend, return null (do not display empty or fake content)
    if (testimonialsList.length === 0) {
        return null;
    }

    return (
        <section
            id="testimonials"
            className={`py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden select-none ${className}`}
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-prime/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Header Area */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-prime fill-prime" />
                        <span>Verified Student Outcomes</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Loved By Professionals,{' '}
                        <span className="text-prime">Trusted By Fortune 500s</span>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-normal leading-relaxed mt-1 max-w-2xl mx-auto">
                        Real stories from learners who accelerated their careers and unlocked new opportunities with NivLearn.
                    </p>
                </div>

                {/* Client Interactive View (Spotlight card for single item, responsive grid for multiple) */}
                <TestimonialSectionView
                    testimonials={
                        hideVideo
                            ? testimonialsList.map((t) => ({ ...t, videoLink: undefined }))
                            : testimonialsList
                    }
                    selectedPlatform={platform || 'all'}
                />
            </div>
        </section>
    );
}
