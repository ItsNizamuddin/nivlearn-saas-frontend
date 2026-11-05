'use client';

import React from 'react';
import {
    ArrowRight,
    Award,
    Building2,
    CheckCircle2,
    Download,
    FileSpreadsheet,
    Globe2,
    Headphones,
    Layers,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export interface CorporateProps {
    className?: string;
}

interface CapabilityPillar {
    category: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    points: {
        text: string;
        highlight?: string;
    }[];
}

const CAPABILITY_PILLARS: CapabilityPillar[] = [
    {
        category: 'Talent & Sourcing',
        icon: Users,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50 border-blue-100',
        points: [
            { text: '20+ Trending Technology resources sourced', highlight: '20+' },
            { text: 'Huge Pool Of Industry-Seasoned Consultants' },
            { text: 'Facilitators To Cater Any Enterprise Need' },
        ],
    },
    {
        category: 'Global Reach & Compliance',
        icon: Globe2,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50 border-amber-100',
        points: [
            { text: 'Transformed 3,000+ Companies & Counting', highlight: '3,000+' },
            { text: '400+ Enterprise Associations Across Geographies', highlight: '400+' },
            { text: '100% Multi-Country & Enterprise Compliant' },
        ],
    },
    {
        category: 'Measurable Business ROI',
        icon: TrendingUp,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50 border-emerald-100',
        points: [
            { text: 'Team efficiency increased by 60%', highlight: '60%' },
            { text: 'Work satisfaction improved by 30%', highlight: '30%' },
            { text: '10+ High-Impact Enterprise Certifications', highlight: '10+' },
        ],
    },
    {
        category: 'Delivery & Enterprise LMS',
        icon: Layers,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50 border-purple-100',
        points: [
            { text: 'Customized Learning Per Corporate Needs' },
            { text: 'Platform-Based Learning & Live Sandboxes' },
            { text: 'Dedicated Pre & Post Training Support' },
        ],
    },
];

const CORPORATE_COMPANIES = [
    'bg-CorpVertical__2_', 'bg-CorpVertical__3_', 'bg-CorpVertical__4_', 'bg-CorpVertical__5_',
    'bg-CorpVertical__6_', 'bg-CorpVertical__7_', 'bg-CorpVertical__8_', 'bg-CorpVertical__9_',
    'bg-CorpVertical__10_', 'bg-CorpVertical__11_', 'bg-CorpVertical__12_', 'bg-CorpVertical__13_',
    'bg-CorpVertical__14_', 'bg-CorpVertical__15_', 'bg-CorpVertical__16_', 'bg-CorpVertical__17_',
    'bg-CorpVertical__18_', 'bg-CorpVertical__19_', 'bg-CorpVertical__20_', 'bg-CorpVertical__21_',
    'bg-CorpVertical__22_', 'bg-CorpVertical__23_', 'bg-CorpVertical__24_', 'bg-CorpVertical__25_',
    'bg-CorpVertical__26_', 'bg-CorpVertical__27_', 'bg-CorpVertical__28_', 'bg-CorpVertical__29_',
    'bg-CorpVertical', 'bg-CorpVertical__1_',
];

export default function Corporate({ className = '' }: CorporateProps) {
    const { openModal } = useLeadModal();

    const handleCustomQuote = () => {
        openModal({
            formTitle: 'Request a Custom Corporate Quote',
            formDescription:
                'Tailored enterprise training cohorts, bulk team certifications, dedicated LMS sandboxes, and volume pricing.',
            defaultValues: {
                leadSource: 'home-corporate-quote',
                purpose: 'Corporate Training for Team',
            },
            config: {
                showCourse: true,
                company: true,
                participants: true,
                purpose: true,
                showMessage: false,
            },
        });
    };

    const handleBrochureDownload = () => {
        openModal({
            formTitle: 'Download Corporate Training Brochure',
            formDescription:
                'Access comprehensive course syllabi, corporate case studies, accreditation credentials, and delivery methodologies.',
            defaultValues: {
                leadSource: 'home-corporate-brochure',
                purpose: 'Corporate Training for Team',
            },
            config: {
                showCourse: true,
                company: true,
                participants: true,
                purpose: true,
                showMessage: false,
            },
        });
    };

    return (
        <section
            className={`py-12 sm:py-16 lg:py-20 bg-slate-50/70 relative overflow-hidden ${className}`}
            id="corporate"
        >
            {/* Ambient Background Accents */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-prime/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-prime-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Enterprise Solutions</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Why Corporates Prefer <span className="text-prime">NivLearn</span> To Upskill Their Teams
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm 2xl:text-base font-normal leading-relaxed mt-2 max-w-3xl mx-auto">
                        As a premier enterprise learning partner, we deliver scalable workforce upskilling with measurable ROI. Our hands-on practitioner model accelerates team productivity and validates technical mastery.
                    </p>
                </div>

                {/* 2. Enterprise Capabilities Pillars (Desktop: 4 Columns / Mobile: 2x2 Clean Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {CAPABILITY_PILLARS.map((pillar, pIdx) => {
                        const PillarIcon = pillar.icon;
                        return (
                            <div
                                key={pIdx}
                                className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-prime/30 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Pillar Header */}
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                        <div
                                            className={`w-10 h-10 rounded-lg ${pillar.iconBg} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                        >
                                            <PillarIcon className={`w-5 h-5 ${pillar.iconColor}`} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                Pillar 0{pIdx + 1}
                                            </span>
                                            <h3 className="font-heading text-sm xl:text-base font-bold text-slate-900 leading-tight">
                                                {pillar.category}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Capability Checklist */}
                                    <ul className="space-y-3">
                                        {pillar.points.map((pt, ptIdx) => (
                                            <li
                                                key={ptIdx}
                                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-snug"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>
                                                    {pt.highlight ? (
                                                        <strong className="text-slate-900 font-bold">
                                                            {pt.text.substring(0, pt.text.indexOf(pt.highlight) + pt.highlight.length)}
                                                        </strong>
                                                    ) : null}
                                                    {pt.highlight
                                                        ? pt.text.substring(pt.text.indexOf(pt.highlight) + pt.highlight.length)
                                                        : pt.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-[11px] font-semibold text-prime">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Enterprise SLA Guaranteed</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Auto-Scrolling Enterprise Logos Marquee (Pure CSS, 100% SSR Compatible) */}
                <div className="mt-12 sm:mt-16 bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
                    <div className="text-center mb-4 sm:mb-6">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                            Trusted By Global Fortune 500 Enterprises & Tech Leaders
                        </span>
                    </div>

                    <div className="relative overflow-hidden w-full py-2">
                        {/* Gradient Fade Edges */}
                        <div className="absolute left-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                        {/* Continuous Hardware-Accelerated Marquee Stream */}
                        <div className="animate-marquee flex items-center gap-6 sm:gap-10">
                            {CORPORATE_COMPANIES.concat(CORPORATE_COMPANIES).map((logoClass, index) => (
                                <div
                                    key={`${logoClass}-${index}`}
                                    className="shrink-0 flex items-center justify-center p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-slate-200 shadow-2xs transition-all min-w-[110px] h-16"
                                >
                                    <div
                                        className={`${logoClass} scale-75 sm:scale-90 origin-center filter contrast-105`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Executive CTAs */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-5 mt-8 sm:mt-12">
                    <button
                        type="button"
                        onClick={handleCustomQuote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
                    >
                        <span>Request a Custom Quote</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <button
                        type="button"
                        onClick={handleBrochureDownload}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
                    >
                        <Download className="w-4 h-4 text-slate-600" />
                        <span>Download Corporate Brochure</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

