'use client';

import React from 'react';
import { Award, ArrowRight, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

const COURSE_SPRITES = [
    'course1', 'course2', 'course3', 'course4', 'course5', 'course6',
    'course7', 'course8', 'course9', 'course10', 'course11', 'course12',
    'course13', 'course14', 'course15', 'course16', 'course17', 'course18',
    'course19', 'course20',
];

export interface TopExperiencesProps {
    className?: string;
}

export default function TopExperiences({ className = '' }: TopExperiencesProps) {
    const { openModal } = useLeadModal();

    const handleConsultation = () => {
        openModal({
            formTitle: 'Schedule a Free Consultation',
            formDescription:
                'Discuss your certification roadmap, exam requirements, and batch availability with a Senior Learning Advisor.',
            defaultValues: {
                leadSource: 'home-top-experiences',
            },
            config: {
                showCourse: true,
                showMessage: false,
                purpose: true,
            },
        });
    };

    return (
        <section
            className={`py-12 sm:py-16 bg-prime-dark text-on-dark relative overflow-hidden ${className}`}
            id="experiences"
        >
            {/* Background Decorative Ambient Glows */}
            <div className="absolute top-0 right-10 w-96 h-96 bg-prime/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-prime-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* 1. Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* DESKTOP ONLY (lg+): Left Dual Radial Progress Rings (5 cols) */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center items-center gap-8 xl:gap-10">
                        {/* Meter 1: 99% Happy Learners */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40 xl:w-44 xl:h-44 flex items-center justify-center">
                                <svg
                                    className="w-full h-full -rotate-90 transform"
                                    viewBox="0 0 160 160"
                                >
                                    <defs>
                                        <linearGradient id="grad-yellow-desk" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FBC907" />
                                            <stop offset="100%" stopColor="#FE8702" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="68"
                                        stroke="rgba(255, 255, 255, 0.12)"
                                        strokeWidth="9"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="68"
                                        stroke="url(#grad-yellow-desk)"
                                        strokeWidth="9"
                                        strokeDasharray="427.26"
                                        strokeDashoffset="4.27"
                                        strokeLinecap="round"
                                        fill="transparent"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                    <span className="font-heading text-3xl font-black text-on-dark leading-none tracking-tight">
                                        99%
                                    </span>
                                    <span className="text-xs font-semibold text-slate-200 mt-1 max-w-[80px] leading-tight">
                                        Happy Learners
                                    </span>
                                </div>
                            </div>
                            <span className="text-[11px] text-slate-300/80 font-medium mt-2">
                                Verified Feedback
                            </span>
                        </div>

                        {/* Meter 2: 95% Certifications Achieved */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40 xl:w-44 xl:h-44 flex items-center justify-center">
                                <svg
                                    className="w-full h-full -rotate-90 transform"
                                    viewBox="0 0 160 160"
                                >
                                    <defs>
                                        <linearGradient id="grad-blue-desk" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7FD8FE" />
                                            <stop offset="100%" stopColor="#01B1FC" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="68"
                                        stroke="rgba(255, 255, 255, 0.12)"
                                        strokeWidth="9"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="68"
                                        stroke="url(#grad-blue-desk)"
                                        strokeWidth="9"
                                        strokeDasharray="427.26"
                                        strokeDashoffset="21.36"
                                        strokeLinecap="round"
                                        fill="transparent"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                                    <span className="font-heading text-3xl font-black text-on-dark leading-none tracking-tight">
                                        95%
                                    </span>
                                    <span className="text-xs font-semibold text-slate-200 mt-1 max-w-[90px] leading-tight">
                                        Certification Achieved
                                    </span>
                                </div>
                            </div>
                            <span className="text-[11px] text-slate-300/80 font-medium mt-2">
                                1st-Attempt Success
                            </span>
                        </div>
                    </div>

                    {/* Content Column (Full width on mobile, 7 cols on lg) */}
                    <div className="lg:col-span-7 flex flex-col justify-start text-center lg:text-left">
                        {/* Header & Subtitle */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime-yellow/20 border border-prime-yellow/30 text-prime-yellow text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Proven Track Record</span>
                            </div>

                            <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold uppercase text-on-dark tracking-tight leading-tight">
                                Top Experiences
                            </h2>

                            <div className="flex items-center gap-x-2.5 justify-center lg:justify-start mt-1.5 mb-3.5">
                                <span className="text-xs md:text-sm 2xl:text-base font-semibold text-slate-200">
                                    Highest Satisfaction & Global Recognition
                                </span>
                                <div className="h-1 rounded-full w-8 sm:w-12 bg-prime-yellow" />
                            </div>
                        </div>

                        {/* Narrative summary */}
                        <p className="text-slate-300 text-xs sm:text-sm lg:text-base font-normal leading-relaxed text-center lg:text-left">
                            At NivLearn, we take pride in delivering exceptional results that exceed the expectations of every learner. With an industry-leading first-attempt pass rate, we empower professionals across 80+ countries to earn globally recognized certifications, advance their careers, and achieve significant salary growth.
                        </p>

                        {/* MOBILE ONLY (< lg): Sleek Frosted Glass Metric Module */}
                        <div className="lg:hidden my-6 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg">
                            <div className="grid grid-cols-2 divide-x divide-white/15">
                                {/* Mobile Meter 1: 99% */}
                                <div className="flex flex-col items-center text-center pr-2">
                                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                                        <svg
                                            className="w-full h-full -rotate-90 transform"
                                            viewBox="0 0 140 140"
                                        >
                                            <defs>
                                                <linearGradient id="grad-yellow-mob" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#FBC907" />
                                                    <stop offset="100%" stopColor="#FE8702" />
                                                </linearGradient>
                                            </defs>
                                            <circle
                                                cx="70"
                                                cy="70"
                                                r="58"
                                                stroke="rgba(255, 255, 255, 0.12)"
                                                strokeWidth="8"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="70"
                                                cy="70"
                                                r="58"
                                                stroke="url(#grad-yellow-mob)"
                                                strokeWidth="8"
                                                strokeDasharray="364.42"
                                                strokeDashoffset="3.64"
                                                strokeLinecap="round"
                                                fill="transparent"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                                            <span className="font-heading text-xl sm:text-2xl font-black text-on-dark leading-none">
                                                99%
                                            </span>
                                            <span className="text-[10px] sm:text-xs font-semibold text-slate-200 mt-0.5 leading-tight">
                                                Happy Learners
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-prime-yellow font-medium mt-1">
                                        Verified Feedback
                                    </span>
                                </div>

                                {/* Mobile Meter 2: 95% */}
                                <div className="flex flex-col items-center text-center pl-2">
                                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                                        <svg
                                            className="w-full h-full -rotate-90 transform"
                                            viewBox="0 0 140 140"
                                        >
                                            <defs>
                                                <linearGradient id="grad-blue-mob" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#7FD8FE" />
                                                    <stop offset="100%" stopColor="#01B1FC" />
                                                </linearGradient>
                                            </defs>
                                            <circle
                                                cx="70"
                                                cy="70"
                                                r="58"
                                                stroke="rgba(255, 255, 255, 0.12)"
                                                strokeWidth="8"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="70"
                                                cy="70"
                                                r="58"
                                                stroke="url(#grad-blue-mob)"
                                                strokeWidth="8"
                                                strokeDasharray="364.42"
                                                strokeDashoffset="18.22"
                                                strokeLinecap="round"
                                                fill="transparent"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                                            <span className="font-heading text-xl sm:text-2xl font-black text-on-dark leading-none">
                                                95%
                                            </span>
                                            <span className="text-[10px] sm:text-xs font-semibold text-slate-200 mt-0.5 leading-tight">
                                                Certification
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-cyan-400 font-medium mt-1">
                                        1st-Attempt Pass
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Trust Highlights: 3-column micro-card row on mobile, flex-wrap on desktop */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:flex-wrap lg:items-center justify-center lg:justify-start mt-2 sm:mt-5">
                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-2 bg-white/5 border border-white/10 p-2 sm:px-3 sm:py-2 rounded-xl">
                                <ShieldCheck className="w-4 h-4 text-prime-yellow shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-200 leading-tight">
                                    Accredited Curricula
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-2 bg-white/5 border border-white/10 p-2 sm:px-3 sm:py-2 rounded-xl">
                                <Users className="w-4 h-4 text-prime-yellow shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-200 leading-tight">
                                    Fortune 500 Alumni
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-2 bg-white/5 border border-white/10 p-2 sm:px-3 sm:py-2 rounded-xl">
                                <Award className="w-4 h-4 text-prime-yellow shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-200 leading-tight">
                                    Pass Guarantee
                                </span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-5 sm:mt-7 flex justify-center lg:justify-start">
                            <button
                                type="button"
                                onClick={handleConsultation}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-abold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
                            >
                                <span>Get Free Career Advice</span>
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Enterprise Frameworks & Certification Logo Marquee */}
                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 relative">
                    <div className="text-center mb-4 sm:mb-6">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">
                            Accredited Partner Frameworks & Certifications
                        </span>
                    </div>

                    <div className="relative overflow-hidden w-full py-2">
                        {/* Gradient Fade Edges */}
                        <div className="absolute left-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-r from-prime-dark to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-l from-prime-dark to-transparent z-10 pointer-events-none" />

                        {/* Infinite CSS Marquee Stream with high-contrast white logo tiles */}
                        <div className="animate-marquee flex items-center gap-4 sm:gap-6">
                            {/* Original Set + Duplicate Set for seamless looping */}
                            {COURSE_SPRITES.concat(COURSE_SPRITES).map((spriteClass, index) => (
                                <div
                                    key={`${spriteClass}-${index}`}
                                    className="shrink-0 flex items-center justify-center p-2 rounded-xl bg-white shadow-sm border border-white/20 transition-transform hover:scale-105"
                                >
                                    <div
                                        className={`${spriteClass} scale-70 sm:scale-80 origin-center`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
