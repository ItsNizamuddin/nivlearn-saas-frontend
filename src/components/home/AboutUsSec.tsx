'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    ChevronDown,
    Award,
    ShieldCheck,
    Globe2,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

interface AccordionItem {
    id: string;
    title: string;
    description: string;
    tag: string;
    icon: React.ElementType;
}

const ACCORDION_ITEMS: AccordionItem[] = [
    {
        id: 'certifications',
        title: '50+ Globally Accredited Certifications',
        description:
            'Partnered with world-leading credential bodies such as PMI (Project Management Institute) and Scrum Alliance to deliver official training for PMP®, CSM®, PMI-ACP®, and SPO.',
        tag: 'Official Curricula',
        icon: Award,
    },
    {
        id: 'global-reach',
        title: 'Global Reach Across 80+ Countries',
        description:
            'Delivering live cohort-based workshops and self-paced programs across North America, EMEA, and APAC, making tier-1 education accessible worldwide.',
        tag: 'Worldwide Network',
        icon: Globe2,
    },
    {
        id: 'career-growth',
        title: 'Measurable Career Advancement & ROI',
        description:
            'Rigorous exam simulations, real-world case studies, and 1-on-1 advisor sessions empower over 98% of our candidates to pass on their first attempt.',
        tag: '98.4% Pass Rate',
        icon: TrendingUp,
    },
    {
        id: 'enterprise-pdus',
        title: 'Official PDUs, SEUs & Continuing Education',
        description:
            'All qualifying programs grant verified Professional Development Units (PDUs) and Scrum Education Units (SEUs) to maintain your existing enterprise credentials.',
        tag: 'Lifelong Credits',
        icon: ShieldCheck,
    },
];

const STATS = [
    { value: '50+', label: 'Accredited Programs', sub: 'PMI & Scrum Alliance' },
    { value: '80+', label: 'Countries Represented', sub: 'Global Alumni Base' },
    { value: '98.4%', label: 'First-Attempt Pass Rate', sub: 'Exam-Ready Drills' },
    { value: '25k+', label: 'Careers Transformed', sub: 'Industry Placements' },
];

export interface AboutUsSecProps {
    className?: string;
}

export default function AboutUsSec({ className = '' }: AboutUsSecProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [isReadMore, setIsReadMore] = useState(false);
    const { openModal } = useLeadModal();

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleEnquireCredentials = () => {
        openModal({
            formTitle: 'Talk to a Certification Advisor',
            formDescription:
                'Learn which globally accredited program aligns with your career path and check eligibility for exclusive batch scholarships.',
            defaultValues: {
                leadSource: 'home-credentials-section',
            },
            config: {
                showCourse: true,
                showMessage: true,
                purpose: true,
            },
        });
    };

    return (
        <section
            className={`py-14 mt-10 md:py-14 bg-sec-prime border-t border-b border-border-muted/50 ${className}`}
            id="credentials"
        >
            <div className="section-container">
                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/15 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-3">
                        <ShieldCheck className="w-4 h-4 text-prime" />
                        <span>Authorized Global Partner</span>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-prime-dark tracking-tight leading-tight">
                        NivLearn Credentials & Recognition
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm 2xl:text-base text-text-muted leading-relaxed">
                        Globally renowned learning partner empowering professionals to earn prestigious certifications in project management, agile product delivery, and tech leadership.
                    </p>
                </div>

                {/* 2. Key Metrics Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {STATS.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-surface rounded-lg p-4 sm:p-5 border border-border-muted shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                        >
                            <span className="font-heading text-2xl font-extrabold text-prime-dark leading-none mb-1.5">
                                {stat.value}
                            </span>
                            <div>
                                <h3 className="text-xs 2xl:text-sm font-bold text-prime-dark leading-tight">
                                    {stat.label}
                                </h3>
                                <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">
                                    {stat.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Main Content Split: Visual Narrative (Left) vs Interactive Accordion (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-stretch">
                    {/* Left Column: Visual Artwork & Brand Story (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Illustration with Floating Badge (no card frame) */}
                        <div className="relative hidden md:flex lg:flex-1 items-center justify-center">
                            <div className="relative w-full max-w-[400px]">
                                <Image
                                    src="/home/about-advisor.webp"
                                    alt="NivLearn certified professional"
                                    width={400}
                                    height={400}
                                    sizes="400px"
                                    className="w-full h-auto drop-shadow-xl"
                                />

                                {/* Floating Micro Badge */}
                                <div className="absolute -bottom-3 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface/95 backdrop-blur-xs border border-border-muted shadow-md">
                                    <Sparkles className="w-3.5 h-3.5 text-prime-yellow" />
                                    <span className="text-[11px] font-bold text-prime-dark">
                                        100% Verified Outcomes
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Story Card */}
                        <div className="bg-surface rounded-lg border border-border-muted p-6 shadow-xs">
                            <h3 className="font-heading text-lg font-bold text-prime-dark mb-2">
                                Trusted Across Global Tech Hubs
                            </h3>
                            <p className="text-text-muted text-xs sm:text-sm leading-relaxed text-justify sm:text-left">
                                NivLearn Global delivers accredited certification programs recognized worldwide. Through partnerships with accreditation pioneers including PMI and Scrum Alliance, we provide high-caliber instruction that translates directly to real-world promotions.
                            </p>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isReadMore ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="mt-2 text-text-muted text-xs sm:text-sm leading-relaxed">
                                        Candidates master Certified ScrumMaster (CSM), Project Management Professional (PMP), PMI-ACP, and Product Owner tracks with verified exam pass blueprints and corporate case studies designed by Fortune 500 mentors.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-muted/40">
                                <button
                                    type="button"
                                    onClick={() => setIsReadMore(!isReadMore)}
                                    className="text-prime hover:text-prime-outline font-bold text-xs underline underline-offset-4 cursor-pointer"
                                >
                                    {isReadMore ? 'Show Less' : 'Read Full Story...'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEnquireCredentials}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-prime-dark hover:text-prime transition-colors cursor-pointer"
                                >
                                    <span>Consult Advisor</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-prime" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Accordion Track Showcase (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-3.5">
                        <div className="mb-2">
                            <h3 className="font-heading text-lg sm:text-xl font-bold text-prime-dark">
                                Why Industry Leaders Choose NivLearn
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                                Explore how our curriculum and certified mentors accelerate your credentials.
                            </p>
                        </div>

                        {ACCORDION_ITEMS.map((item, index) => {
                            const isOpen = activeIndex === index;
                            const IconComponent = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    className={`rounded-lg border transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'bg-surface border-l-4 border-l-prime-yellow border-t-border-muted border-r-border-muted border-b-border-muted shadow-xs'
                                        : 'bg-surface/80 hover:bg-surface border-border-muted'
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={isOpen}
                                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div
                                                className={`p-2 rounded-lg shrink-0 transition-colors ${isOpen
                                                    ? 'bg-prime text-on-dark shadow-xs'
                                                    : 'bg-sec-prime text-prime-dark border border-border-muted/50'
                                                    }`}
                                            >
                                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-prime/10 text-prime">
                                                        {item.tag}
                                                    </span>
                                                </div>
                                                <h4 className="font-heading text-sm sm:text-base font-bold text-prime-dark truncate sm:whitespace-normal">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="shrink-0 text-text-muted ml-2">
                                            <ChevronDown
                                                className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-prime' : 'rotate-0 text-text-muted'
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen
                                            ? 'grid-rows-[1fr] opacity-100'
                                            : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-text-muted border-t border-border-muted/30 leading-relaxed">
                                                <p>{item.description}</p>
                                                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-prime-dark">
                                                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                                                    <span>Includes verified syllabus, exam pass warranty & career guidance</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom Action Strip */}
                        <div className="mt-2 bg-prime-dark text-on-dark rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                            <div>
                                <h4 className="text-sm font-bold text-on-dark">
                                    Ready to fast-track your global certification?
                                </h4>
                                <p className="text-xs text-on-dark/70 mt-0.5">
                                    Our learning advisors are available to review your profile and match your track.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleEnquireCredentials}
                                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-md shadow-xs transition-all cursor-pointer"
                            >
                                <span>Get Consultation</span>
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
