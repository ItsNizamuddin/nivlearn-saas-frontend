'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Award,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Play,
    Quote,
    Star,
    Video,
    X,
} from 'lucide-react';
import type { Testimonial } from '@/services/testimonial.service';

export interface TestimonialSectionViewProps {
    testimonials: Testimonial[];
    selectedPlatform?: string;
}

// Lightweight HTML cleaner to strip raw CMS tags
function cleanHtml(html: string): string {
    if (!html) return '';
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
}

function getCourseTitle(t: Testimonial): string {
    if (!t.course) return '';
    if (Array.isArray(t.course)) {
        return t.course[0]?.course_title || '';
    }
    return t.course.course_title || '';
}

function getVideoDetails(t: Testimonial) {
    if (!t.videoLink) return { url: null, thumbnail: null, alt: 'Student Story' };
    if (typeof t.videoLink === 'string') {
        return { url: t.videoLink, thumbnail: null, alt: 'Student Story' };
    }
    return {
        url: t.videoLink.url || null,
        thumbnail: t.videoLink.thumbnail || null,
        alt: t.videoLink.alt || 'Student Story',
    };
}

export default function TestimonialSectionView({
    testimonials,
    selectedPlatform = 'all',
}: TestimonialSectionViewProps) {
    const [activeFilter, setActiveFilter] = useState<string>(selectedPlatform);
    const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
    const [desktopIndex, setDesktopIndex] = useState<number>(0);
    const [mobileIndex, setMobileIndex] = useState<number>(0);

    // Extract dynamic platform options from data
    const availablePlatforms = Array.from(
        new Set(testimonials.map((t) => t.platform).filter(Boolean))
    );

    const hasAnyVideo = testimonials.some((t) => !!getVideoDetails(t).url);

    const filterOptions = [
        { id: 'all', label: 'All Reviews', count: testimonials.length },
        ...(hasAnyVideo
            ? [
                  {
                      id: 'video',
                      label: 'Video Stories',
                      count: testimonials.filter((t) => !!getVideoDetails(t).url).length,
                      isVideo: true,
                  },
              ]
            : []),
        ...availablePlatforms.map((p) => ({
            id: p,
            label: p,
            count: testimonials.filter((t) => t.platform?.toLowerCase() === p.toLowerCase()).length,
            isVideo: false,
        })),
    ];

    const filteredList =
        activeFilter === 'all'
            ? testimonials
            : activeFilter === 'video'
            ? testimonials.filter((t) => !!getVideoDetails(t).url)
            : testimonials.filter(
                  (t) => t.platform?.toLowerCase() === activeFilter.toLowerCase()
              );

    // Sliding window of 3 for desktop in 1 row
    const maxDesktopIndex = Math.max(0, filteredList.length - 3);
    const totalDesktopSlides = maxDesktopIndex + 1;

    // Single item slide for mobile in 1 row
    const totalMobileSlides = Math.max(1, filteredList.length);

    const handleFilterChange = (id: string) => {
        setActiveFilter(id);
        setDesktopIndex(0);
        setMobileIndex(0);
    };

    const nextSlide = () => {
        if (totalDesktopSlides <= 1) return;
        setDesktopIndex((prev) => (prev + 1) % totalDesktopSlides);
    };

    const prevSlide = () => {
        if (totalDesktopSlides <= 1) return;
        setDesktopIndex((prev) => (prev - 1 + totalDesktopSlides) % totalDesktopSlides);
    };

    const nextMobileSlide = () => {
        if (totalMobileSlides <= 1) return;
        setMobileIndex((prev) => (prev + 1) % totalMobileSlides);
    };

    const prevMobileSlide = () => {
        if (totalMobileSlides <= 1) return;
        setMobileIndex((prev) => (prev - 1 + totalMobileSlides) % totalMobileSlides);
    };

    const isYouTubeUrl = (url: string) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const getYouTubeEmbedUrl = (url: string) => {
        const match = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
        );
        return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
    };

    if (testimonials.length === 0) {
        return null;
    }

    // Current 3 cards for desktop row
    const currentDesktopItems = filteredList.slice(desktopIndex, desktopIndex + 3);

    // Current 1 card for mobile row
    const currentMobileItem = filteredList[mobileIndex] || filteredList[0];

    return (
        <div className="w-full">
            {/* 1. Filter Pills Row */}
            {filterOptions.length > 2 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
                    {filterOptions.map((opt) => {
                        const isSelected = activeFilter.toLowerCase() === opt.id.toLowerCase();
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleFilterChange(opt.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                                    isSelected
                                        ? 'bg-prime text-white shadow-xs'
                                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                                }`}
                            >
                                {opt.isVideo ? (
                                    <Video className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-prime'}`} />
                                ) : (
                                    <Star
                                        className={`w-3.5 h-3.5 ${
                                            isSelected ? 'text-prime-yellow fill-prime-yellow' : 'text-amber-500 fill-amber-500'
                                        }`}
                                    />
                                )}
                                <span>{opt.label}</span>
                                <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                    }`}
                                >
                                    {opt.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 2. DESKTOP VIEW: Show in 1 row (3 cards) with Next and Previous buttons */}
            <div className="hidden md:block">
                <div
                    className={`grid gap-5 mx-auto items-stretch ${
                        currentDesktopItems.length === 1
                            ? 'max-w-md grid-cols-1'
                            : currentDesktopItems.length === 2
                            ? 'max-w-3xl grid-cols-2'
                            : 'max-w-6xl grid-cols-3'
                    }`}
                >
                    {currentDesktopItems.map((item) => {
                        const { url: videoUrl, thumbnail: videoThumb, alt: videoAlt } = getVideoDetails(item);
                        const courseTitle = getCourseTitle(item);
                        const cleanMsg = cleanHtml(item.message);
                        const hasVideo = !!videoUrl;

                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-md p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-prime/30 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Video Thumbnail (if present) */}
                                    {hasVideo ? (
                                        <div
                                            className="relative aspect-[16/10] rounded-md overflow-hidden mb-4 bg-slate-950 shadow-2xs border border-slate-100 group/vid cursor-pointer"
                                            onClick={() => setActiveVideoModal(videoUrl)}
                                        >
                                            {videoThumb ? (
                                                <Image
                                                    src={videoThumb}
                                                    alt={videoAlt}
                                                    fill
                                                    className="object-cover object-top group-hover/vid:scale-105 transition-transform duration-300"
                                                    sizes="320px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                                                    <Play className="w-8 h-8" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Video Play Pill */}
                                            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                                                <Play className="w-3 h-3 text-prime fill-prime" />
                                                <span className="text-[10px] font-bold text-slate-900">Watch Story</span>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Text-Only Review -> Balanced Showcase Box matching video aspect ratio */
                                        <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/20 border border-slate-100 p-4 flex flex-col justify-between shadow-2xs">
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-bold uppercase tracking-wider border border-slate-200/80 shadow-2xs">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                    Verified Feedback
                                                </span>
                                                <div className="flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${
                                                                i < (item.rating || 5)
                                                                    ? 'text-amber-500 fill-amber-500'
                                                                    : 'text-slate-200 fill-slate-200'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="my-auto py-1">
                                                <Quote className="w-5 h-5 text-prime/40 mb-1" />
                                                <p className="text-xs font-semibold text-slate-800 line-clamp-2 italic leading-snug">
                                                    &ldquo;{cleanMsg}&rdquo;
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                                                <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                                                    {courseTitle || 'Career Advancement'}
                                                </span>
                                                <span className="font-extrabold uppercase text-prime text-[9px] px-1.5 py-0.2 rounded-md bg-white border border-blue-100">
                                                    {item.platform || 'Alumni'}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Stars & Platform Header */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${
                                                        i < (item.rating || 5)
                                                            ? 'text-amber-500 fill-amber-500'
                                                            : 'text-slate-200 fill-slate-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        {item.platform && (
                                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-blue-50 text-prime border border-blue-100">
                                                {item.platform}
                                            </span>
                                        )}
                                    </div>

                                    {/* Target Course */}
                                    {courseTitle && (
                                        <div className="text-xs font-bold text-slate-800 mb-2 line-clamp-1">
                                            🎓 {courseTitle}
                                        </div>
                                    )}

                                    {/* Review Text */}
                                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed line-clamp-4">
                                        &ldquo;{cleanMsg}&rdquo;
                                    </p>
                                </div>

                                {/* Author Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                        {item.image?.url ? (
                                            <Image
                                                src={item.image.url}
                                                alt={item.name}
                                                fill
                                                sizes="36px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-black text-xs text-prime bg-prime/10">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-heading text-xs font-bold text-slate-900 truncate">
                                                {item.name}
                                            </h4>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        </div>
                                        <p className="text-[11px] text-slate-500 truncate">
                                            {item.designation || 'Alumnus'}
                                            {item.company ? ` • ${item.company}` : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop Next & Previous Navigation Bar (shown when multiple slides exist) */}
                {totalDesktopSlides > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={prevSlide}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        <span className="text-xs font-semibold text-slate-500 px-2">
                            {desktopIndex + 1} / {totalDesktopSlides}
                        </span>

                        <button
                            type="button"
                            onClick={nextSlide}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* 3. MOBILE VIEW: Show in 1 row (1 card) with Next and Previous buttons */}
            <div className="block md:hidden">
                {currentMobileItem && (() => {
                    const { url: videoUrl, thumbnail: videoThumb, alt: videoAlt } = getVideoDetails(currentMobileItem);
                    const courseTitle = getCourseTitle(currentMobileItem);
                    const cleanMsg = cleanHtml(currentMobileItem.message);
                    const hasVideo = !!videoUrl;

                    return (
                        <div className="bg-white rounded-md p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                            <div>
                                {/* Video Thumbnail (if present) */}
                                {hasVideo ? (
                                    <div
                                        className="relative aspect-[16/10] rounded-md overflow-hidden mb-4 bg-slate-950 shadow-2xs border border-slate-100 cursor-pointer"
                                        onClick={() => setActiveVideoModal(videoUrl)}
                                    >
                                        {videoThumb ? (
                                            <Image
                                                src={videoThumb}
                                                alt={videoAlt}
                                                fill
                                                className="object-cover object-top"
                                                sizes="(max-width: 640px) 360px, 320px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                                                <Play className="w-8 h-8" />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-md shadow-xs">
                                            <Play className="w-3 h-3 text-prime fill-prime" />
                                            <span className="text-[10px] font-bold text-slate-900">Watch Story</span>
                                        </div>
                                    </div>
                                ) : (
                                    /* Text-Only Review -> Balanced Showcase Box */
                                    <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/20 border border-slate-100 p-4 flex flex-col justify-between shadow-2xs">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-bold uppercase tracking-wider border border-slate-200/80 shadow-2xs">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                Verified Feedback
                                            </span>
                                            <div className="flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${
                                                            i < (currentMobileItem.rating || 5)
                                                                ? 'text-amber-500 fill-amber-500'
                                                                : 'text-slate-200 fill-slate-200'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="my-auto py-1">
                                            <Quote className="w-5 h-5 text-prime/40 mb-1" />
                                            <p className="text-xs font-semibold text-slate-800 line-clamp-2 italic leading-snug">
                                                &ldquo;{cleanMsg}&rdquo;
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                                            <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                                                {courseTitle || 'Career Advancement'}
                                            </span>
                                            <span className="font-extrabold uppercase text-prime text-[9px] px-1.5 py-0.2 rounded-md bg-white border border-blue-100">
                                                {currentMobileItem.platform || 'Alumni'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Stars & Platform Header */}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${
                                                    i < (currentMobileItem.rating || 5)
                                                        ? 'text-amber-500 fill-amber-500'
                                                        : 'text-slate-200 fill-slate-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    {currentMobileItem.platform && (
                                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-blue-50 text-prime border border-blue-100">
                                            {currentMobileItem.platform}
                                        </span>
                                    )}
                                </div>

                                {/* Target Course */}
                                {courseTitle && (
                                    <div className="text-xs font-bold text-slate-800 mb-2 line-clamp-1">
                                        🎓 {courseTitle}
                                    </div>
                                )}

                                {/* Review Text */}
                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                                    &ldquo;{cleanMsg}&rdquo;
                                </p>
                            </div>

                            {/* Author Footer */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                    {currentMobileItem.image?.url ? (
                                        <Image
                                            src={currentMobileItem.image.url}
                                            alt={currentMobileItem.name}
                                            fill
                                            sizes="36px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-black text-xs text-prime bg-prime/10">
                                            {currentMobileItem.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-heading text-xs font-bold text-slate-900 truncate">
                                            {currentMobileItem.name}
                                        </h4>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 truncate">
                                        {currentMobileItem.designation || 'Alumnus'}
                                        {currentMobileItem.company ? ` • ${currentMobileItem.company}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Mobile Next & Previous Navigation Bar (shown when multiple slides exist) */}
                {totalMobileSlides > 1 && (
                    <div className="mt-5 flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={prevMobileSlide}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        <span className="text-xs font-semibold text-slate-500 px-2 shrink-0">
                            {mobileIndex + 1} / {totalMobileSlides}
                        </span>

                        <button
                            type="button"
                            onClick={nextMobileSlide}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* 4. Fullscreen Video Modal */}
            {activeVideoModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
                    onClick={() => setActiveVideoModal(null)}
                >
                    <div
                        className="relative w-full max-w-3xl max-h-[85vh] bg-black rounded-md overflow-hidden shadow-2xl border border-white/20 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveVideoModal(null)}
                            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-md bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {isYouTubeUrl(activeVideoModal) ? (
                            <iframe
                                src={getYouTubeEmbedUrl(activeVideoModal)}
                                title="Student Video Review"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full aspect-video"
                            />
                        ) : (
                            <video
                                src={activeVideoModal}
                                controls
                                autoPlay
                                playsInline
                                className="w-full max-h-[80vh] object-contain rounded-md"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
