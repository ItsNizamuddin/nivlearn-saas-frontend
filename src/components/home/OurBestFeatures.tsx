'use client';

import React from 'react';
import {
    GraduationCap,
    BookOpenCheck,
    Award,
    BadgePercent,
    Infinity as InfinityIcon,
    MessagesSquare,
    Headphones,
    HeartHandshake,
    Sparkles,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

interface FeatureItem {
    id: string;
    title: string;
    desc: string;
    tag: string;
    icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
    {
        id: 'real-mentors',
        icon: GraduationCap,
        tag: 'Top 1% Mentors',
        title: 'The Real Mentors',
        desc: 'Learn from seasoned industry practitioners with decades of hands-on experience and actionable real-world insights.',
    },
    {
        id: 'relevant-syllabus',
        icon: BookOpenCheck,
        tag: 'Industry Aligned',
        title: 'The Relevant Syllabus',
        desc: 'Stay ahead of emerging trends with constantly updated, market-driven curricula built in sync with top tech enterprises.',
    },
    {
        id: 'in-demand-certifications',
        icon: Award,
        tag: 'Global Value',
        title: 'In-Demand Certifications',
        desc: 'Earn globally recognized credentials that validate your mastery and immediately boost your career prospects.',
    },
    {
        id: 'competitive-prices',
        icon: BadgePercent,
        tag: 'High ROI Fee',
        title: 'Competitive Prices',
        desc: 'World-class, enterprise-grade training at transparent, affordable, and value-driven course fee structures.',
    },
    {
        id: 'unlimited-access',
        icon: InfinityIcon,
        tag: 'Lifetime LMS',
        title: 'Unlimited Access',
        desc: 'Enjoy lifetime access to recordings, lecture decks, question banks, and case studies for continuous refresher learning.',
    },
    {
        id: 'pre-training-access',
        icon: MessagesSquare,
        tag: 'Pre-Batch Access',
        title: 'Pre-Training Trainer Access',
        desc: 'Connect directly with instructors ahead of batch kick-offs to clarify prerequisites, align goals, and review roadmaps.',
    },
    {
        id: 'learning-consultant',
        icon: Headphones,
        tag: '1-on-1 Guidance',
        title: 'Advice from Learning Consultant',
        desc: 'Receive personalized profile evaluation to select the exact credential pathway aligned with your long-term goals.',
    },
    {
        id: 'post-training-support',
        icon: HeartHandshake,
        tag: 'Alumni Network',
        title: 'Post Training Support',
        desc: 'Receive ongoing assistance, interview prep resources, and career community networking well beyond course completion.',
    },
];

export interface OurBestFeaturesProps {
    className?: string;
}

export default function OurBestFeatures({ className = '' }: OurBestFeaturesProps) {
    const { openModal } = useLeadModal();

    const handleConsultantInquiry = () => {
        openModal({
            formTitle: 'Connect with a Learning Consultant',
            formDescription:
                'Get 1-on-1 career path advice, syllabus walkthroughs, and upcoming batch availability from our advisory team.',
            defaultValues: {
                leadSource: 'home-features-section',
            },
            config: {
                showCourse: true,
                showMessage: true,
                purpose: false,
            },
        });
    };

    return (
        <section
            className={`py-12 md:py-20 bg-surface ${className}`}
            id="features"
        >
            <div className="section-container">
                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-5 md:mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/15 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Sparkles className="w-3.5 h-3.5 text-prime" />
                        <span>The NivLearn Advantage</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-prime-dark tracking-tight leading-tight">
                        Our Best Features
                    </h2>

                    <div className="flex items-center gap-x-3 justify-center mt-1">
                        <div className="h-1 rounded-full w-8 sm:w-14 bg-prime-yellow" />
                        <p className="text-xs sm:text-sm md:text-base font-medium text-text-muted">
                            Comprehensive Learning, Endless Support
                        </p>
                        <div className="h-1 rounded-full w-8 sm:w-14 bg-prime-yellow" />
                    </div>
                </div>

                {/* 2. Responsive 2-Column Mobile & 4-Column Desktop Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {FEATURES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="group relative bg-surface hover:bg-sec-prime/40 border border-border-muted rounded-lg p-3.5 sm:p-5 lg:p-6 transition-all duration-300 shadow-2xs hover:shadow-card hover:border-prime/30 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Icon & Micro-Tag Row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-prime/10 text-prime flex items-center justify-center group-hover:bg-prime group-hover:text-on-dark transition-all duration-300 shadow-2xs group-hover:scale-105 shrink-0">
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                                        </div>
                                        <span className="w-fit text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-muted text-text-muted border border-border-muted/50 group-hover:border-prime/20 group-hover:text-prime transition-colors whitespace-nowrap">
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Feature Title */}
                                    <h3 className="font-heading text-xs sm:text-sm lg:text-base font-bold text-prime-dark group-hover:text-prime transition-colors leading-snug mb-1.5 sm:mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Feature Description */}
                                    <p className="text-[11px] sm:text-xs lg:text-sm text-text-muted leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Subtle hover indicator bar */}
                                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border-muted/30 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-text-muted group-hover:text-prime transition-colors">
                                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-success shrink-0" />
                                    <span className="truncate">Lifetime Verified Access</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Bottom Trust & Action Banner */}
                <div className="mt-8 sm:mt-12 bg-linear-to-br from-sec-prime via-surface to-sec-prime border border-border-muted rounded-lg p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xs text-center md:text-left">
                    <div>
                        <h4 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-prime-dark">
                            Need guidance choosing the right track?
                        </h4>
                        <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl">
                            Our dedicated learning consultants evaluate your background, recommend the best certification path, and provide customized schedules.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleConsultantInquiry}
                        className="inline-flex items-center justify-center gap-2 bg-prime hover:bg-prime-outline active:scale-95 text-on-dark font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                        <span>Talk to Learning Consultant</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
