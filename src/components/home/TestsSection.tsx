'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    Award,
    BadgePercent,
    CheckCircle2,
    ChevronRight,
    GraduationCap,
    ShieldCheck,
    Sparkles,
    Zap,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

import womanImg from '../../../public/home/womanimg.webp';

export interface TestsSectionProps {
    className?: string;
}

const ASSURANCES = [
    {
        title: '100% Pass Assurance',
        icon: ShieldCheck,
        iconColor: 'text-prime',
        bgColor: 'bg-prime/10',
    },
    {
        title: '100% Satisfaction Assured',
        icon: Award,
        iconColor: 'text-prime-yellow',
        bgColor: 'bg-prime-yellow/15',
    },
    {
        title: 'Best Price Guarantee',
        icon: BadgePercent,
        iconColor: 'text-prime',
        bgColor: 'bg-prime/10',
    },
    {
        title: 'Instant Score & Analysis',
        icon: CheckCircle2,
        iconColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
    },
];

export default function TestsSection({ className = '' }: TestsSectionProps) {
    const { openModal } = useLeadModal();

    const handleTakeTest = () => {
        openModal({
            formTitle: 'Access Free Practice Test',
            formDescription:
                'Select your certification track to receive full-length timed diagnostic questions and answers curated by certified practitioners.',
            defaultValues: {
                leadSource: 'home-free-practice-test',
                purpose: 'Practice Test Access',
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
            className={`py-12 sm:py-16 lg:py-20 bg-slate-50/60 relative overflow-hidden ${className}`}
            id="practice-tests"
        >
            <div className="section-container relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mock Exams & Practice Labs</span>
                    </div>

                    <h2 className="font-heading text-xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Access Free Practice Tests to Master Your Certifications with Confidence
                    </h2>

                    <div className="flex items-center justify-center gap-3 mt-2">
                        <div className="hidden sm:block h-1 rounded-full w-8 bg-prime" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide">
                            Seamless Learning Systems All In One Place
                        </p>
                        <div className="hidden sm:block h-1 rounded-full w-8 bg-prime" />
                    </div>
                </div>

                {/* 2 Feature Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-stretch">

                    {/* CARD 1: Training Bootcamps & Skill Building */}
                    <div className="relative rounded-lg  bg-gradient-to-br from-prime via-[#004bb5] to-[#002f80] b shadow-xl overflow-hidden group min-h-[300px] sm:min-h-[320px] flex flex-col justify-between p-6 ">
                        {/* Background Subtle Geometric Pattern */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"
                            style={{ backgroundImage: `url('/home/bgpattern.webp')` }}
                        />

                        {/* Ambient Glow */}
                        <div className="absolute top-0 right-0 w-60 h-60 bg-prime/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Content (constrained width so it never overlaps the woman illustration on desktop) */}
                        <div className="relative z-10 max-w-full sm:max-w-[62%] lg:max-w-[60%]">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-prime-yellow/20 text-prime-yellow text-[10px] font-bold uppercase tracking-wider mb-3">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>Start Today</span>
                            </div>

                            <h3 className="font-heading text-xl sm:text-2xl  font-extrabold text-white leading-tight mb-2.5">
                                Join Our Training Courses & Build In-Demand Skills.
                            </h3>

                            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                                Instructor-led enterprise cohorts, hands-on portfolio labs, and dedicated 1-on-1 exam mentorship to guarantee your career launch.
                            </p>
                        </div>

                        {/* Bottom CTA Button */}
                        <div className="relative z-10 pt-2">
                            <Link
                                href="#courses"
                                className="w-full sm:w-fit inline-flex items-center justify-center gap-3 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-5 py-2 rounded-lg shadow-md transition-all cursor-pointer group/btn"
                            >
                                <span>Join Now</span>
                                <div className="bg-prime-dark/10 p-1.5 rounded-lg group-hover/btn:translate-x-0.5 transition-transform">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                            </Link>
                        </div>

                        {/* Grounded Woman Illustration: anchored firmly to the bottom edge */}
                        <div className="hidden sm:block absolute right-2 lg:right-4 bottom-0 z-10 pointer-events-none">
                            <div className="relative w-44 md:w-48 lg:w-48 xl:w-52 h-[260px] md:h-[280px] lg:h-[290px] flex items-end">
                                <Image
                                    src={womanImg}
                                    alt="NivLearn career advisor"
                                    sizes="(max-width: 1024px) 192px, 208px"
                                    className="w-full h-full object-contain object-bottom transform group-hover:scale-103 transition-transform duration-500 drop-shadow-2xl"
                                    priority={false}
                                />
                                {/* Grounded Pill Badge */}
                                <div className="absolute bottom-3 left-0 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-md border border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>120+ Live Batches</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: Free Practice Test & Rep Guidance */}
                    <div className="relative rounded-lg bg-gradient-to-br from-prime-dark via-[#091b35] to-[#040e21] border border-white/15 shadow-xl overflow-hidden group min-h-[300px] sm:min-h-[320px] flex flex-col justify-between p-6 ">
                        {/* Background Subtle Geometric Pattern */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"
                            style={{ backgroundImage: `url('/home/bgpattern.webp')` }}
                        />

                        {/* Ambient Glow */}
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 h-full">
                            {/* Left Text Content */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider mb-3">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Free Diagnostic Evaluation</span>
                                </div>

                                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2.5">
                                    Connect With Our Reps For Guidance.
                                </h3>

                                <p className="text-blue-100 text-xs sm:text-sm font-normal leading-relaxed mb-6 max-w-sm">
                                    Benchmark your readiness with free mock exams that reflect real certification questions and scoring methodologies.
                                </p>

                                {/* Action CTA */}
                                <button
                                    type="button"
                                    onClick={handleTakeTest}
                                    className="w-full sm:w-fit inline-flex items-center justify-center gap-3 bg-prime hover:bg-prime-outline active:scale-95 text-white font-extrabold text-xs sm:text-sm px-5 py-2 rounded-lg shadow-md transition-all cursor-pointer group/btn"
                                >
                                    <span>Take Free Test</span>
                                    <div className="bg-white/20 p-1.5 rounded-lg group-hover/btn:translate-x-0.5 transition-transform">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </button>
                            </div>

                            {/* Right Candidate Guarantee Box: Balanced, neat & proportional */}
                            <div className="w-full sm:w-auto shrink-0 self-center">
                                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-white/50 flex flex-col gap-2.5 sm:min-w-[215px]">
                                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5 text-center sm:text-left">
                                        Candidate Guarantee
                                    </div>

                                    {ASSURANCES.map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-slate-800"
                                            >
                                                <div
                                                    className={`w-6 h-6 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0`}
                                                >
                                                    <IconComponent className={`w-3.5 h-3.5 ${item.iconColor}`} />
                                                </div>
                                                <span className="leading-tight">{item.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
