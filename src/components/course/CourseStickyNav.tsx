'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, Sparkles } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import { smoothScrollTo } from '@/lib/utils';
import type { CourseDetail } from '@/services/catalog.service';

const DEFAULT_NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Why NivLearn', href: '#whyus' },
  { label: 'Syllabus', href: '#syllabus' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Career', href: '#career' },
  { label: 'FAQs', href: '#faqs' },
];

export default function CourseStickyNav({
  items = DEFAULT_NAV_ITEMS,
  course,
}: {
  items?: Array<{ label: string; href: string }>;
  course?: CourseDetail;
}) {
  const [activeHref, setActiveHref] = useState(items[0]?.href || '#overview');
  const [isSticky, setIsSticky] = useState(false);
  const [validItems, setValidItems] = useState(items);
  const { openModal } = useLeadModal();

  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Filter items to only include those that actually exist in the current page DOM
  useEffect(() => {
    const existing = items.filter((item) => {
      if (!item.href.startsWith('#')) return true;
      return Boolean(document.querySelector(item.href));
    });
    if (existing.length > 0) {
      setValidItems(existing);
      if (!existing.some((i) => i.href === activeHref)) {
        setActiveHref(existing[0].href);
      }
    }
  }, [items]);

  // Robust ScrollSpy observer
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);

      // If user recently clicked a tab, don't let scroll spy overwrite it during smooth scroll
      if (isClickScrollingRef.current) return;

      const navOffset = 180; // Distance below sticky nav to check active section
      let current = validItems[0]?.href || '#overview';

      // Check if user is near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        current = validItems[validItems.length - 1]?.href || current;
      } else {
        for (const item of validItems) {
          if (!item.href.startsWith('#')) continue;
          const el = document.querySelector(item.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Section is active if its top has reached the nav threshold and bottom is still visible
            if (rect.top <= navOffset && rect.bottom > 80) {
              current = item.href;
            }
          }
        }
      }

      setActiveHref(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [validItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      // 1. Immediately highlight the clicked button
      setActiveHref(href);

      // 2. Lock scroll spy during smooth scroll transition
      isClickScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 3. Smoothly glide to the target section
      smoothScrollTo(href);

      // 4. Release lock after smooth scroll finishes
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);
    }
  };

  const handleEnquire = () => {
    openModal({
      formTitle: course?.course_title ? `Enquire About ${course.course_title}` : 'Enquire About Course',
      formDescription: `Get batch schedules, fee structure, and syllabus details${course?.course_title ? ` for ${course.course_title}` : ''
        }.`,
      defaultValues: {
        leadSource: course?.slug ? `course-stickynav-${course.slug}` : 'course-stickynav',
        courseSlug: course?.slug,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  return (
    <nav
      className={`sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-border-muted/70 transition-all duration-200 ${isSticky ? 'shadow-md py-2 sm:py-2.5' : 'py-2.5 sm:py-3'
        }`}
    >
      <div className="section-container flex items-center justify-between gap-4">
        {/* Left Side: Navigation Tabs with Smooth Horizontal Scroll on Mobile */}
        <div
          ref={navContainerRef}
          className="flex-1 flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2.5 py-0.5"
        >
          {validItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                  ? 'bg-prime text-white shadow-xs'
                  : 'text-slate-600 hover:text-prime hover:bg-light/70'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Desktop Only CTA Action Bar */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 pl-4 border-l border-border-muted/70">
          <a
            href="#schedules"
            onClick={(e) => smoothScrollTo('#schedules', e)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-prime-dark hover:text-prime px-3.5 py-2 rounded-lg border border-border-muted hover:border-prime/40 hover:bg-light/60 transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-prime" />
            <span>View Schedules</span>
          </a>

          <button
            type="button"
            onClick={handleEnquire}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-prime-yellow hover:bg-amber-500 active:scale-95 px-4 py-2 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
