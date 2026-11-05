'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Play, Star, CheckCircle2, Download } from 'lucide-react';
import rating from '../../../public/home/enrolled.webp';
import underline from '../../../public/home/underline.webp';
import pattern from '../../../public/home/pattern.webp';
import Link from 'next/link';
import { useLeadModal } from '@/context/LeadModalContext';

interface CardData {
    name: string;
    role: string;
    promotion: string;
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
    { name: "John M.", role: "Project Coordinator", promotion: "Certified Project Manager", image: 'bg-HomeBannerSprites__7_', company: "bg-HomeBannerSprites__9_" },
    { name: "Sarah K.", role: "Transitioned into Agile", promotion: "with CSM Certification", image: 'bg-HomeBannerSprites__6_', company: "bg-HomeBannerSprites__13_" },
    { name: "David R.", role: "Upskilled & Achieved", promotion: "SAFe Agilist Certification", image: 'bg-HomeBannerSprites__8_', company: "bg-HomeBannerSprites__5_" },
];

export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { openModal } = useLeadModal();

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    function triggerForm() {
        openModal({
            formTitle: 'Download Company Profile',
            formDescription: 'Fill out your details to receive our comprehensive company profile & training brochure.',
            defaultValues: {
                leadSource: 'home-banner-profile',
                purpose: 'Corporate Training',
            },
            config: {
                showCourse: true,
                showMessage: true,
            }
        });
    }

    // Auto-rotate alumni cards
    useEffect(() => {
        const interval = setInterval(() => {
            setIsChanging(true);
            setTimeout(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
                setIsChanging(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden w-full  ">
            {/* Dark curved shape on desktop */}
            <div className="bg-prime-dark/90 rounded-br-[150px] w-8/12 h-full absolute top-0 left-0 lg:block hidden -z-10 shadow-lg" />

            <div className="section-container relative z-10 pt-10 lg:py-16">
                <div className="lg:grid lg:grid-cols-12 gap-8 items-center">

                    {/* Left Column: Headline, Copy & CTAs (7 cols) */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">

                        <div className="group space-y-2">
                            <h1 className="text-prime-dark lg:text-white text-2xl sm:text-3xl 2xl:text-4xl font-black leading-tight xl:leading-[1.18] tracking-tight">
                                Advance Your Career with Industry-Leading Training &amp; Certification!
                            </h1>
                            <div className="flex justify-center lg:justify-start">
                                <Image
                                    src={underline}
                                    alt="accent"
                                    sizes="(max-width: 640px) 192px, 256px"
                                    className="w-48 sm:w-64 h-auto group-hover:animate-pulse"
                                />
                            </div>
                        </div>

                        <p className="text-slate-600 lg:text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
                            Stay ahead in the competitive job market with our expert-led training programs and globally recognized certifications. Whether you&apos;re looking to upskill, switch careers, or enhance your expertise, NivLearn provides the tools and guidance to help you succeed.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 pt-1">
                            <button
                                type="button"
                                onClick={triggerForm}
                                className="bg-prime-yellow hover:bg-prime-yellow/90 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2 active:scale-95"
                            >
                                <span>Download Company Profile</span>
                                <Download size={16} />
                            </button>

                            <Link
                                href="#courses"
                                className="border-2 border-prime lg:border-white/30 hover:bg-white/10 text-prime lg:text-white font-bold px-5 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                            <div className="flex text-prime-yellow text-sm gap-1">
                                <Star size={14} className="fill-prime-yellow text-prime-yellow" />
                                <Star size={14} className="fill-prime-yellow text-prime-yellow" />
                                <Star size={14} className="fill-prime-yellow text-prime-yellow" />
                                <Star size={14} className="fill-prime-yellow text-prime-yellow" />
                                <Star size={14} className="fill-prime-yellow text-prime-yellow" />
                            </div>
                            <Image src={rating} alt="enrolled students" sizes="120px" className="lg:hidden h-6 w-auto" />
                            <span className="text-whiteprime-dark lg:text-white text-xs sm:text-sm font-semibold">
                                Trusted by over 4,32,000+ Learners Globally
                            </span>
                        </div>

                        {/* Hiring Partners Ticker (Pure CSS GPU-accelerated marquee) */}
                        <div className="bg-slate-100 lg:bg-white/10 backdrop-blur-xs rounded-2xl p-4 flex items-center gap-4 max-w-xl mx-auto lg:mx-0 overflow-hidden">
                            <span className="text-xs font-bold text-prime-dark lg:text-white uppercase tracking-wider shrink-0 z-10">
                                Trusted by:
                            </span>
                            <div className="relative overflow-hidden w-full py-1">
                                <div className="animate-marquee flex items-center gap-x-10">
                                    {logos.concat(logos).map((logo, index) => (
                                        <span
                                            key={index}
                                            className={`shrink-0 h-5 sm:h-6 ${logo}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Cards & Video Banner (5 cols) */}
                    <div className="lg:col-span-5 hidden lg:flex flex-col items-center mt-10 lg:mt-0">

                        {/* Dynamic Alumni Promotion Card Carousel */}
                        <div className="hidden lg:flex flex-col gap-4 w-full max-w-md">
                            {/* Primary Rotating Card */}
                            <div
                                className={`p-4 bg-white rounded-2xl border border-slate-200/80 shadow-md grid grid-cols-12 gap-3 items-center transition-all duration-300 ${isChanging ? "opacity-70 scale-98" : "opacity-100 scale-100"
                                    }`}
                            >
                                <span className={`col-span-2 ${cards[activeIndex].image}`} />
                                <div className="col-span-7">
                                    <h4 className="text-xs sm:text-sm font-bold text-prime-dark">{cards[activeIndex].name}</h4>
                                    <p className="text-slate-500 text-xs">{cards[activeIndex].role}</p>
                                    <p className="text-prime font-semibold text-xs mt-0.5">{cards[activeIndex].promotion}</p>
                                </div>
                                <span className={`col-span-2 ${cards[activeIndex].company}`} />
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 col-span-1" />
                            </div>

                            {/* Secondary Preview Card */}
                            <div className="p-4 bg-white/95 rounded-2xl border border-slate-200/60 shadow-xs grid grid-cols-12 gap-3 items-center opacity-85">
                                <span className={`col-span-2 ${cards[(activeIndex + 1) % cards.length].image}`} />
                                <div className="col-span-7">
                                    <h4 className="text-xs sm:text-sm font-bold text-prime-dark">{cards[(activeIndex + 1) % cards.length].name}</h4>
                                    <p className="text-slate-500 text-xs">{cards[(activeIndex + 1) % cards.length].role}</p>
                                    <p className="text-prime font-semibold text-xs mt-0.5">{cards[(activeIndex + 1) % cards.length].promotion}</p>
                                </div>
                                <span className={`col-span-2 ${cards[(activeIndex + 1) % cards.length].company}`} />
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 col-span-1" />
                            </div>
                        </div>

                        {/* Video / Poster Box */}
                        <div className="hidden md:block w-full max-w-md mt-6 relative">
                            <Image
                                src={pattern}
                                alt="decor"
                                className="absolute -z-10 -bottom-6 -right-6 w-32 h-auto opacity-70 hidden sm:block"
                            />

                            <div className="border-3 border-prime rounded-2xl overflow-hidden shadow-xl bg-slate-900 relative">
                                {!isPlaying ? (
                                    <div className="relative aspect-video w-full group cursor-pointer" onClick={handlePlayClick}>
                                        <Image
                                            src="https://img.youtube.com/vi/iMIEMMvVx70/maxresdefault.jpg"
                                            alt="NivLearn Overview Video"
                                            fill
                                            className="object-cover group-hover:scale-102 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 448px"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 group-hover:bg-white text-prime flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-prime text-prime" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="aspect-video w-full">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/iMIEMMvVx70?autoplay=1"
                                            title="NivLearn Video"
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
