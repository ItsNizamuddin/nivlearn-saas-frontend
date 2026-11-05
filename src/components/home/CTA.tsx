'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export interface CTAProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    className?: string;
}

export default function CTA({
    title = 'Get exclusive offers!',
    subtitle = 'Kickstart Your Career with Industry-Accredited Tech & Business Certifications Today!',
    buttonText = 'Avail Now!',
    className = '',
}: CTAProps) {
    const { openModal } = useLeadModal();

    const handleTriggerModal = () => {
        openModal({
            formTitle: 'Claim Exclusive Course Offer',
            formDescription:
                'Fill in your details below to unlock our limited-time scholarship, career consultation, and exclusive fee discount.',
            defaultValues: {
                leadSource: 'home-cta-banner',
            },
            config: {
                showCourse: true,
                showMessage: true,
                purpose: true,
            },
        });
    };

    return (
        <section className={`pt-12 pb-6 lg:pt-16 lg:pb-10 ${className}`}>
            <div className="mx-auto w-full px-0 sm:px-6 md:px-4 md:max-w-6xl 2xl:max-w-7xl">
                {/* 
                  Main Card: 
                  - Mobile: Rich dark-blue gradient theme with pop-out illustration
                  - Tab & Desktop (md+): Preserves previous prime-gray theme, text & button styling
                */}
                <div className="relative bg-linear-to-br from-prime-dark via-[#082042] to-prime-dark md:bg-prime-gray rounded-none md:rounded-xl lg:rounded-lg p-5 sm:p-7 md:py-8 md:px-10 lg:px-14 shadow-xl md:shadow-lg border border-white/10 md:border-none flex flex-col lg:flex-row items-start lg:items-center justify-between min-h-[160px] md:h-44">
                    {/* Background Decorative Glow (Mobile only) */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl md:hidden pointer-events-none">
                        <div className="absolute top-0 right-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-prime/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-6 w-40 sm:w-48 h-40 sm:h-48 bg-prime-yellow/15 rounded-full blur-2xl pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div className="relative z-10 w-full lg:w-3/4 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pr-24 sm:pr-32 lg:pr-0">
                        <div className="max-w-xl text-left">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime-yellow/20 border border-prime-yellow/30 text-prime-yellow text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Limited Time Offer</span>
                            </div>
                            <h2 className="font-heading text-lg sm:text-2xl 2xl:text-3xl font-extrabold text-white/90 tracking-tight leading-tight">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="mt-1 text-[11px] sm:text-sm text-slate-200/90 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className="shrink-0 pt-1 md:pt-0">
                            <button
                                type="button"
                                onClick={handleTriggerModal}
                                className="inline-flex items-center justify-center gap-2 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold md:font-semibold text-xs sm:text-sm md:text-base px-5 sm:px-8 py-2.5 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
                            >
                                <span>{buttonText}</span>
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* 3D Pop-Out Illustration */}
                    <div className="absolute -right-1 sm:right-6 lg:right-10 bottom-0 pointer-events-none select-none z-20">
                        <Image
                            src="/CourseCat/cta-learner.webp"
                            alt="Smiling learner waving with a laptop"
                            width={470}
                            height={640}
                            sizes="(max-width: 640px) 134px, (max-width: 1024px) 200px, 281px"
                            className="object-contain w-auto h-36 sm:h-48 md:h-52 lg:h-56 xl:h-64 drop-shadow-md translate-y-1"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
