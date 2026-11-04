'use client';

import React, { useState } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export interface ExpertServicesProps {
    className?: string;
}

interface ServiceItem {
    id: string;
    step: string;
    tag: string;
    title: string;
    description: string;
    spriteClass: string;
    perk: string;
    cardBg: string;
    badgeStyle: string;
    iconBoxBg: string;
}

const SERVICES: ServiceItem[] = [
    {
        id: 'certifications',
        step: '01',
        tag: 'Accreditation',
        title: '100+ Certifications',
        description: 'Explore globally accredited certification pathways across Cloud, Agile, ITIL, DevOps, and Cyber Security.',
        spriteClass: 'bg-accelerate1',
        perk: 'Global Vendor Credentials',
        cardBg: 'from-[#FFF4E5] via-[#FFF9F2] to-white border-amber-300/80 hover:border-amber-400',
        badgeStyle: 'bg-amber-100/90 text-amber-900 border-amber-300',
        iconBoxBg: 'bg-white/90 border border-amber-200/90 shadow-xs',
    },
    {
        id: 'career-advancement',
        step: '02',
        tag: 'Mentorship',
        title: 'Career Advancement Support',
        description: 'Gain expert 1-on-1 profile reviews, resume positioning, and strategic interview prep to negotiate top roles.',
        spriteClass: 'bg-accelerate2',
        perk: '1-on-1 Executive Guidance',
        cardBg: 'from-[#E1F7FA] via-[#F0FBFC] to-white border-cyan-300/80 hover:border-cyan-400',
        badgeStyle: 'bg-cyan-100/90 text-cyan-900 border-cyan-300',
        iconBoxBg: 'bg-white/90 border border-cyan-200/90 shadow-xs',
    },
    {
        id: 'lifetime-access',
        step: '03',
        tag: 'LMS Platform',
        title: 'Lifetime LMS Access',
        description: 'Continuous refresher access to recorded lecture decks, practice mock exams, project sandboxes, and alumni community.',
        spriteClass: 'bg-accelerate3',
        perk: 'Unlimited Learning Portal',
        cardBg: 'from-[#FFF4E5] via-[#FFF9F2] to-white border-amber-300/80 hover:border-amber-400',
        badgeStyle: 'bg-amber-100/90 text-amber-900 border-amber-300',
        iconBoxBg: 'bg-white/90 border border-amber-200/90 shadow-xs',
    },
    {
        id: '24-7-support',
        step: '04',
        tag: 'Assistance',
        title: '24/7 Dedicated Support',
        description: 'Never get stuck. Connect directly with technical instructors and academic mentors for swift doubt clearance.',
        spriteClass: 'bg-accelerate4',
        perk: 'Round-the-Clock Help Desk',
        cardBg: 'from-[#E1F7FA] via-[#F0FBFC] to-white border-cyan-300/80 hover:border-cyan-400',
        badgeStyle: 'bg-cyan-100/90 text-cyan-900 border-cyan-300',
        iconBoxBg: 'bg-white/90 border border-cyan-200/90 shadow-xs',
    },
];

export default function ExpertServices({ className = '' }: ExpertServicesProps) {
    const { openModal } = useLeadModal();
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleConsultation = () => {
        openModal({
            formTitle: 'Connect with a Learning Advisor',
            formDescription:
                'Discuss your target certifications, batch schedules, syllabus deep-dives, and LMS access with an advisor.',
            defaultValues: {
                leadSource: 'home-expert-services',
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
            className={`py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden ${className}`}
            id="expert-services"
        >
            {/* Ambient Background Accents */}
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-prime-yellow/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-80 h-80 bg-prime/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* 1. Header Area */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Student & Professional Support</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Accelerate Your Career With <span className="text-prime">Our Expert Services</span>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm 2xl:text-base font-normal leading-relaxed mt-2.5 max-w-2xl mx-auto">
                        You don&apos;t have to navigate professional certifications alone. From personalized exam roadmaps to 24/7 technical doubt resolution, our ecosystem ensures your success.
                    </p>
                </div>

                {/* 2. DESKTOP VIEW (lg+): 4-Column Balanced Grid */}
                <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className={`rounded-lg bg-linear-to-b ${service.cardBg} border p-5 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
                        >
                            <div>
                                {/* Top Header: Step & Category Tag */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="font-heading text-[11px] font-bold text-slate-500">
                                        STEP {service.step}
                                    </span>
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${service.badgeStyle}`}
                                    >
                                        {service.tag}
                                    </span>
                                </div>

                                {/* Sprite Icon: Rendered at exact native 50x50 with unconstrained container (zero clip, zero scale blur) */}
                                <div className="mb-5">
                                    <div
                                        className={`w-[66px] h-[66px] rounded-2xl ${service.iconBoxBg} flex items-center justify-center shrink-0 group-hover:scale-108 group-hover:shadow-md transition-transform duration-300`}
                                    >
                                        <div
                                            className={`${service.spriteClass} shrink-0`}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <h3 className="font-heading text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-prime transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                                    {service.description}
                                </p>
                            </div>

                            {/* Bottom Verified Perk Tag */}
                            <div className="mt-6 pt-3.5 border-t border-slate-200/70 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span className="leading-tight">{service.perk}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. MOBILE VIEW (< lg): Tailored 2-Column Responsive Grid + Active Detail Drawer */}
                <div className="lg:hidden">
                    {/* 2x2 Clean Micro-Cards Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {SERVICES.map((service, index) => {
                            const isSelected = activeTab === index;
                            return (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => setActiveTab(index)}
                                    className={`text-left rounded-lg p-4 transition-all duration-200 flex flex-col justify-between border cursor-pointer ${isSelected
                                        ? 'bg-white shadow-md border-prime ring-2 ring-prime/20'
                                        : `bg-gradient-to-b ${service.cardBg} shadow-2xs`
                                        }`}
                                >
                                    <div>
                                        {/* Sprite Icon: Clean 50x50 without destructive scaling */}
                                        <div
                                            className={`w-[60px] h-[60px] rounded-xl ${service.iconBoxBg} flex items-center justify-center shrink-0 mb-3`}
                                        >
                                            <div
                                                className={`${service.spriteClass} shrink-0`}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </div>

                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                                            {service.tag}
                                        </span>

                                        <h3 className="font-heading text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-prime">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        <span className="truncate">{service.perk}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Service Highlight Card (Dynamic Mobile Context) */}
                    <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-prime animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                {SERVICES[activeTab].tag} Guarantee
                            </span>
                        </div>
                        <h4 className="font-heading text-sm font-bold text-slate-900 mb-1">
                            {SERVICES[activeTab].title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            {SERVICES[activeTab].description}
                        </p>
                    </div>
                </div>

                {/* 4. Action CTA */}
                <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <button
                        type="button"
                        onClick={handleConsultation}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-prime hover:bg-prime/90 active:scale-95 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
                    >
                        <span>Speak with a Learning Advisor</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <span className="text-xs text-slate-500 font-medium">
                        Instant Callback Available • Free Consultation
                    </span>
                </div>
            </div>
        </section>
    );
}
