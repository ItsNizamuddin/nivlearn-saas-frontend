'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/components/Navbar/types';

export interface CategoryTabsProps {
    categories: Category[];
    selectedSlug: string;
    onSelectCategory: (slug: string) => void;
}

export default function CategoryTabs({
    categories,
    selectedSlug,
    onSelectCategory,
}: CategoryTabsProps) {
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = useCallback(() => {
        const el = tabsContainerRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        const isOverflowing = scrollWidth > clientWidth + 4;

        if (!isOverflowing) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }

        setCanScrollLeft(scrollLeft > 4);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateScrollButtons();

        const el = tabsContainerRef.current;
        if (!el) return;

        window.addEventListener('resize', updateScrollButtons);

        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateScrollButtons();
            });
            resizeObserver.observe(el);
        }

        return () => {
            window.removeEventListener('resize', updateScrollButtons);
            resizeObserver?.disconnect();
        };
    }, [updateScrollButtons, categories]);

    const scrollTabs = (direction: 'left' | 'right') => {
        const el = tabsContainerRef.current;
        if (!el) return;
        const scrollAmount = direction === 'left' ? -240 : 240;
        el.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative flex items-center mb-8 border-b border-border-muted/60 pb-2">
            {/* Left scroll arrow - Only visible on desktop when scrolled right */}
            {canScrollLeft && (
                <button
                    type="button"
                    onClick={() => scrollTabs('left')}
                    aria-label="Scroll tabs left"
                    className="hidden md:flex shrink-0 items-center justify-center w-8 h-8 rounded-full border border-border-muted bg-surface text-text-muted hover:text-prime hover:bg-sec-prime transition-all mr-2 cursor-pointer shadow-2xs active:scale-95"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
            )}

            {/* Scrollable Tabs */}
            <div
                ref={tabsContainerRef}
                onScroll={updateScrollButtons}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth p-1 w-full"
            >
                {categories.map((cat) => {
                    const isSelected = cat.slug === selectedSlug;
                    return (
                        <button
                            key={cat.slug}
                            type="button"
                            onClick={() => onSelectCategory(cat.slug)}
                            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm transition-all cursor-pointer ${isSelected
                                    ? 'bg-surface text-prime-dark font-bold border border-prime-yellow ring-1 ring-prime-yellow shadow-xs'
                                    : 'bg-surface text-text-muted font-medium hover:text-prime-dark hover:bg-sec-prime border border-border-muted'
                                }`}
                        >
                            <span className="capitalize">{cat.name}</span>
                            {cat.courses && cat.courses.length > 0 && (
                                <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${isSelected
                                            ? 'bg-prime-yellow/20 text-prime-dark'
                                            : 'bg-sec-prime text-text-muted'
                                        }`}
                                >
                                    {cat.courses.length}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Right scroll arrow - Only visible on desktop when more categories overflow to the right */}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={() => scrollTabs('right')}
                    aria-label="Scroll tabs right"
                    className="hidden md:flex shrink-0 items-center justify-center w-8 h-8 rounded-full border border-border-muted bg-surface text-text-muted hover:text-prime hover:bg-sec-prime transition-all ml-2 cursor-pointer shadow-2xs active:scale-95"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
