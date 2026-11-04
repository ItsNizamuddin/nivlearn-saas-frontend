'use client';

import React from 'react';
import Image from 'next/image';
import {
    Award,
    BookOpen,
    Building2,
    Globe2,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

import whoweareImg from '../../../public/home/whoweare.webp';
import enrolledImg from '../../../public/home/enrolled.webp';

interface HighlightItem {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
}

const HIGHLIGHTS: HighlightItem[] = [
    {
        icon: Users,
        iconBg: 'bg-blue-50 border-blue-100',
        iconColor: 'text-blue-600',
        title: '200,000+ Professionals Empowered Worldwide',
        description:
            'Join a global network of ambitious professionals who accelerated their careers with NivLearn, achieving transformative growth.',
    },
    {
        icon: Building2,
        iconBg: 'bg-amber-50 border-amber-100',
        iconColor: 'text-amber-600',
        title: '3,000+ Leading Companies Trust Our Talent',
        description:
            'NivLearn-certified alumni are actively sought by global enterprises, standing out through hands-on practitioner mentorship.',
    },
    {
        icon: TrendingUp,
        iconBg: 'bg-emerald-50 border-emerald-100',
        iconColor: 'text-emerald-600',
        title: 'Average Salary Increase of 75%',
        description:
            'Certified professionals unlock accelerated promotions, negotiate higher salary packages, and lead high-impact engineering teams.',
    },
    {
        icon: Zap,
        iconBg: 'bg-purple-50 border-purple-100',
        iconColor: 'text-purple-600',
        title: 'Minimum 39% Boost in Workplace Performance',
        description:
            'NivLearn-trained team members boost workplace output by 39%, driving real productivity and velocity across tech disciplines.',
    },
];

interface StatItem {
    icon: React.ElementType;
    value: string;
    label: string;
    iconColor: string;
    iconBg: string;
}

const STATS: StatItem[] = [
    {
        icon: Users,
        value: '345,421',
        label: 'Students Enrolled',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50',
    },
    {
        icon: BookOpen,
        value: '120+',
        label: 'Accredited Courses',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
    },
    {
        icon: Globe2,
        value: '45,421',
        label: 'Active Online Learners',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
    },
    {
        icon: Award,
        value: '203k+',
        label: 'Certificates Issued',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50',
    },
];

export interface WhoWeAreProps {
    className?: string;
}

export default function WhoWeAre({ className = '' }: WhoWeAreProps) {
    const { openModal } = useLeadModal();

    const handleConsultation = () => {
        openModal({
            formTitle: 'Speak with a Senior Career Advisor',
            formDescription:
                'Get tailored curriculum roadmaps, schedule batch timings, and evaluate your credential options with NivLearn advisors.',
            defaultValues: {
                leadSource: 'home-who-we-are',
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
            className={`py-14 sm:py-20 bg-white relative overflow-hidden ${className}`}
            id="who-we-are"
        >
            {/* Ambient Background Accents */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-prime/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-96 h-96 bg-prime-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                    {/* Visual Column (Desktop: Left 5 cols, Mobile: Hero card) */}
                    <div className="lg:col-span-5 relative">
                        {/* Glow & Backdrop */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-prime/20 via-prime-yellow/20 to-transparent rounded-3xl blur-xl opacity-70 pointer-events-none" />

                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white">
                            {/* Decorative Left Yellow Accent Border */}
                            <div className="absolute top-0 left-0 bottom-0 w-2 sm:w-2.5 bg-prime-yellow z-10" />

                            <Image
                                src={whoweareImg}
                                width={600}
                                height={600}
                                alt="NivLearn Students and Mentors"
                                className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                                priority={false}
                            />

                            {/* Floating Glassmorphic Badge 1: Enrolled Count */}
                            <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between sm:justify-start gap-3">
                                <Image
                                    src={enrolledImg}
                                    alt="Enrolled Learners"
                                    className="h-6 sm:h-7 w-auto object-contain"
                                />
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <p className="text-xs sm:text-sm font-bold text-slate-800 m-0 leading-tight">
                                        <span className="text-prime font-extrabold">200k+</span> Students
                                    </p>
                                </div>
                            </div>

                            {/* Floating Glassmorphic Badge 2 (Top Right): Salary Hike proof */}
                            <div className="hidden sm:flex absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-100 items-center gap-2 text-xs font-bold text-slate-800">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                <span>+75% Avg Salary Hike</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Column (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-start">
                        {/* Header Badge & Title */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Who We Are</span>
                            </div>

                            <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Transforming Careers,{' '}
                                <span className="text-prime">Empowering Organizations</span>
                            </h2>

                            <p className="text-slate-600 text-xs sm:text-sm 2xl:text-base font-normal leading-relaxed mt-2">
                                At NivLearn, we bridge the gap between aspirational talent and real enterprise execution. Our programs combine live practitioner instruction, recognized global credentials, and dedicated career steering.
                            </p>
                        </div>

                        {/* 4 Impact Highlights (2x2 Grid) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5">
                            {HIGHLIGHTS.map((item, index) => {
                                const IconComp = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="relative bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-prime/30 rounded-lg p-4 sm:p-4.5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2.5 mb-2">
                                                <div
                                                    className={`w-8 h-8 rounded-xl ${item.iconBg} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                                >
                                                    <IconComp className={`w-4 h-4 ${item.iconColor}`} />
                                                </div>
                                                <h3 className="font-heading text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-normal">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                            <span>Verified Outcome</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action CTA Trigger */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                            <button
                                type="button"
                                onClick={handleConsultation}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-prime hover:bg-prime/90 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
                            >
                                <span>Speak with an Advisor</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                                Free 1-on-1 profile evaluation • Zero obligation
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Global Impact Stats Strip (Bottom) */}
                <div className="mt-12 sm:mt-16 bg-slate-50/80 border border-slate-200/80 rounded-lg p-5 sm:p-7 shadow-xs">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
                        {STATS.map((stat, index) => {
                            const StatIcon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4 ${index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                                        }`}
                                >
                                    <div
                                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-xs`}
                                    >
                                        <StatIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                                    </div>
                                    <div>
                                        <div className="font-heading text-xl 2xl:text-2xl font-bold text-slate-900 tracking-tight leading-none">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs 2xl:text-sm font-semibold text-slate-500 mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

