'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight,
    Award,
    CheckCircle2,
    Download,
    GraduationCap,
    ShieldCheck,
    Sparkles,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import underline from '../../../public/home/underline.webp';
import { useLeadModal } from '@/context/LeadModalContext';
import { smoothScrollTo } from '@/lib/utils';

interface CardData {
    name: string;
    role: string;
    promotion: string;
    salaryHike: string;
    certification: string;
    image: string;
    company: string;
}

const logos = [
    "bg-HomeBannerSprites__9_",
    "bg-HomeBannerSprites__10_",
    "bg-HomeBannerSprites__11_",
    "bg-HomeBannerSprites__12_",
    "bg-HomeBannerSprites__13_",
    "bg-HomeBannerSprites__14_",
    "bg-HomeBannerSprites__15_",
    "bg-HomeBannerSprites__16_",
    "bg-HomeBannerSprites__17_",
    "bg-HomeBannerSprites__18_",
    "bg-HomeBannerSprites__19_",
    "bg-HomeBannerSprites__20_",
    "bg-HomeBannerSprites",
    "bg-HomeBannerSprites__1_",
    "bg-HomeBannerSprites__2_",
    "bg-HomeBannerSprites__3_",
    "bg-HomeBannerSprites__4_",
    "bg-HomeBannerSprites__5_",
];

const cards: CardData[] = [
    {
        name: "John M.",
        role: "Project Coordinator",
        promotion: "Certified Project Manager",
        salaryHike: "+75% Hike",
        certification: "PMP® Certified",
        image: 'bg-HomeBannerSprites__7_',
        company: "bg-HomeBannerSprites__9_",
    },
    {
        name: "Sarah K.",
        role: "Transitioned to Agile",
        promotion: "Scrum Master Lead",
        salaryHike: "+85% Hike",
        certification: "CSM® Certified",
        image: 'bg-HomeBannerSprites__6_',
        company: "bg-HomeBannerSprites__13_",
    },
    {
        name: "David R.",
        role: "Upskilled in Cloud",
        promotion: "SAFe® Enterprise Architect",
        salaryHike: "+90% Hike",
        certification: "SAFe® Agilist",
        image: 'bg-HomeBannerSprites__8_',
        company: "bg-HomeBannerSprites__5_",
    },
];

const outcomeMetrics = [
    { label: "1st-Attempt Pass Rate", value: "99%", icon: Award },
    { label: "Avg Salary Jump", value: "+75%", icon: TrendingUp },
    { label: "Global Alumni Network", value: "4.3L+", icon: Users },
    { label: "Industry Certifications", value: "100+", icon: GraduationCap },
];

export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const { openModal } = useLeadModal();

    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    function triggerForm() {
        openModal({
            formTitle: 'Enterprise Team Training',
            formDescription:
                'Request custom team curriculums, dedicated cohorts, and volume enterprise pricing.',
            defaultValues: {
                leadSource: 'home-banner-corporate',
                purpose: 'Corporate Training',
            },
            config: {
                showCourse: true,
                showMessage: true,
                company: true,
            },
            submitButtonText: 'Request Corporate Proposal',
        });
    }

    // Auto-rotate alumni cards
    useEffect(() => {
        const interval = setInterval(() => {
            setIsChanging(true);
            setTimeout(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
                setIsChanging(false);
            }, 250);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    // Smooth ticker for hiring partner logos
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || logos.length === 0) return;

        const scrollWidth = scrollContainer.scrollWidth / 2;
        let scrollLeft = 0;

        const autoScroll = () => {
            if (scrollContainer) {
                scrollLeft += 0.8;
                if (scrollLeft >= scrollWidth) {
                    scrollLeft = 0;
                }
                scrollContainer.scrollLeft = scrollLeft;
            }
            animationRef.current = requestAnimationFrame(autoScroll);
        };

        animationRef.current = requestAnimationFrame(autoScroll);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const activeCard = cards[activeIndex];

    return (
        <section className="relative overflow-hidden w-full bg-gradient-to-b from-[#071b30] via-prime-dark to-[#051628] text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[400px] bg-prime/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-[450px] h-[350px] bg-prime-yellow/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Subtle Grid Backdrop Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none"
            />

            <div className="section-container relative z-10 pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

                    {/* LEFT COLUMN: Headline, Value Proposition & Actions (7 cols) */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">

                        {/* Live Announcement Pill */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-xs">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-prime-yellow font-bold">2026 Cohorts Live</span>
                            <span className="text-white/40">•</span>
                            <span className="text-white/90">100% Placement Guidance</span>
                        </div>

                        {/* Main Value Proposition Heading */}
                        <div className="space-y-3">
                            <h1 className="font-heading text-2xl sm:text-4xl 2xl:text-5xl font-black leading-[1.15] tracking-tight text-white">
                                Advance Your Career with{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prime-yellow via-amber-300 to-yellow-400">
                                    Industry-Leading
                                </span>{' '}
                                Training &amp; Certifications
                            </h1>
                            <div className="flex justify-center lg:justify-start">
                                <Image
                                    src={underline}
                                    alt="accent"
                                    className="w-48 sm:w-64 h-auto opacity-90"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Paragraph Copy */}
                        <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
                            Accelerate your professional trajectory with expert-led training programs and globally recognized credentials. From hands-on live cohorts to 1-on-1 executive mentorship, NivLearn ensures your career success.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex justify-center lg:justify-start items-center gap-3 sm:gap-4 pt-1">
                            <Link
                                href="#courses"
                                onClick={(e) => smoothScrollTo('#courses', e)}
                                className="bg-prime-yellow hover:bg-amber-400 text-white font-extrabold px-4 md:px-5 py-3.5 rounded-lg shadow-lg shadow-prime-yellow/20 hover:shadow-xl transition-all text-xs sm:text-sm flex items-center gap-2.5 active:scale-95 group cursor-pointer"
                            >
                                <span>Explore Top Courses</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <button
                                type="button"
                                onClick={triggerForm}
                                className="bg-white/10 hover:bg-white/15 text-white font-bold px-4 md:px-5 py-3.5 rounded-lg border border-white/20 backdrop-blur-sm transition-all text-xs sm:text-sm flex items-center gap-2 hover:border-white/30 active:scale-95 cursor-pointer"
                            >
                                <span>Corporate Training</span>
                            </button>
                        </div>

                        {/* Social Proof & Rating Metrics */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <div className="flex items-center gap-1.5">
                                <div className="flex text-amber-400 gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="font-extrabold text-sm text-white">4.9 / 5.0</span>
                            </div>
                            <span className="hidden sm:inline text-white/30">•</span>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Trusted by over <strong className="text-white font-bold">4,32,000+</strong> Learners Globally</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Interactive Career & Outcome Showcase (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-4 w-full max-w-lg mx-auto lg:max-w-none">

                        {/* Live Alumni Career Leap Showcase Card */}
                        <div className="relative rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-2xl overflow-hidden transition-all duration-300 group hover:border-white/25">
                            {/* Card Ambient Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-prime-yellow/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex items-center justify-between gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" />
                                    Verified Career Transition
                                </span>
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white/10 text-prime-yellow border border-white/10">
                                    {activeCard.salaryHike}
                                </span>
                            </div>

                            {/* Candidate & Promotion Row */}
                            <div
                                className={`flex items-center gap-3.5 transition-all duration-300 ${isChanging ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                                    <span className={`${activeCard.image} shrink-0`} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-heading text-sm sm:text-base font-bold text-white truncate">
                                            {activeCard.name}
                                        </h4>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                    <p className="text-xs text-slate-400 truncate mt-0.5">
                                        {activeCard.role}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <ArrowRight className="w-3 h-3 text-prime-yellow shrink-0" />
                                        <span className="text-xs font-bold text-prime-yellow truncate">
                                            {activeCard.promotion}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end shrink-0 pl-2">
                                    <div className="h-7 flex items-center justify-center bg-white/95 px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
                                        <span className={`${activeCard.company} shrink-0`} />
                                    </div>
                                    <span className="text-[9px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                                        {activeCard.certification}
                                    </span>
                                </div>
                            </div>

                            {/* Carousel Slide Indicators */}
                            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-[11px] text-slate-400">
                                <span>Alumni Success Spotlight</span>
                                <div className="flex items-center gap-1.5">
                                    {cards.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveIndex(idx)}
                                            aria-label={`View student ${idx + 1}`}
                                            className={`h-1.5 rounded-full transition-all cursor-pointer ${activeIndex === idx
                                                ? 'w-6 bg-prime-yellow'
                                                : 'w-1.5 bg-white/30 hover:bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Outcomes & Guarantees Grid (2x2) */}
                        <div className="grid grid-cols-2 gap-3">
                            {outcomeMetrics.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="rounded-lg bg-white/5 backdrop-blur-md border border-white/10 p-3.5 sm:p-4 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-prime/20 text-prime-yellow flex items-center justify-center mb-2 border border-prime/30">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tight">
                                                {item.value}
                                            </div>
                                            <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight mt-0.5">
                                                {item.label}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>

                {/* BOTTOM: Global Corporate Hiring Partners Marquee */}
                <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="shrink-0 text-center md:text-left">
                            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                Trusted by Hiring Managers at
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-white">
                                Fortune 500 &amp; Global Tech Enterprises
                            </span>
                        </div>

                        {/* Infinite Smooth Scrolling Partner Logos */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-hidden whitespace-nowrap py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] w-full"
                        >
                            <div className="inline-flex items-center gap-x-12 shrink-0">
                                {logos.concat(logos).map((logo, index) => (
                                    <div
                                        key={index}
                                        className="h-8 px-3 py-1 rounded-md bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shrink-0 shadow-2xs"
                                    >
                                        <span className={`shrink-0 ${logo}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
