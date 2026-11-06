'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export type WhyUsCategoryType = 'all' | 'trust' | 'learning' | 'career';

export interface WhyUsItem {
  id: number;
  sprite: string;
  text: string;
  disc: string;
  category: WhyUsCategoryType;
  categoryLabel: string;
  theme: {
    iconBg: string;
    iconBorder: string;
    accentBar: string;
    tagBg: string;
    tagText: string;
  };
}

export const WHY_US_POINTS: WhyUsItem[] = [
  {
    id: 1,
    sprite: 'bg-whyus1',
    text: 'Best Price Guarantee',
    disc: 'Take the lowest price challenge and enjoy unbeatable value-driven course rates.',
    category: 'trust',
    categoryLabel: 'Trust & Value',
    theme: {
      iconBg: 'bg-light',
      iconBorder: 'border-prime/20',
      accentBar: 'bg-prime',
      tagBg: 'bg-prime/10',
      tagText: 'text-prime',
    },
  },
  {
    id: 2,
    sprite: 'bg-whyus2',
    text: 'Exclusive Discounts',
    disc: 'Limited-time cohort scholarships and group fee incentives to maximize your ROI.',
    category: 'trust',
    categoryLabel: 'Trust & Value',
    theme: {
      iconBg: 'bg-prime-yellow/10',
      iconBorder: 'border-prime-yellow/30',
      accentBar: 'bg-prime-yellow',
      tagBg: 'bg-prime-yellow/10',
      tagText: 'text-prime-yellow',
    },
  },
  {
    id: 3,
    sprite: 'bg-whyus3',
    text: 'Flexible Scheduling',
    disc: 'Choose weekday evening or weekend morning live sessions that fit your routine.',
    category: 'learning',
    categoryLabel: 'Learning Quality',
    theme: {
      iconBg: 'bg-success/10',
      iconBorder: 'border-success/30',
      accentBar: 'bg-success',
      tagBg: 'bg-success/10',
      tagText: 'text-success',
    },
  },
  {
    id: 4,
    sprite: 'bg-whyus4',
    text: '100% Money-Back Guarantee',
    disc: 'Risk-free learning supported by our accredited pass and refund assurances.',
    category: 'trust',
    categoryLabel: 'Trust & Value',
    theme: {
      iconBg: 'bg-amber-500/10',
      iconBorder: 'border-amber-500/30',
      accentBar: 'bg-amber-500',
      tagBg: 'bg-amber-500/10',
      tagText: 'text-amber-600',
    },
  },
  {
    id: 5,
    sprite: 'bg-whyus5',
    text: 'Expert Mentors',
    disc: 'Learn directly from certified practitioners active in global tech enterprises.',
    category: 'learning',
    categoryLabel: 'Learning Quality',
    theme: {
      iconBg: 'bg-prime-dark/10',
      iconBorder: 'border-prime-dark/20',
      accentBar: 'bg-prime-dark',
      tagBg: 'bg-prime-dark/10',
      tagText: 'text-prime-dark',
    },
  },
  {
    id: 6,
    sprite: 'bg-whyus6',
    text: 'Career Boosting Workshops',
    disc: 'Gain actionable interview frameworks, resume optimization, and mock sessions.',
    category: 'career',
    categoryLabel: 'Career ROI',
    theme: {
      iconBg: 'bg-prime1/15',
      iconBorder: 'border-prime1/30',
      accentBar: 'bg-prime1',
      tagBg: 'bg-prime1/15',
      tagText: 'text-prime1',
    },
  },
  {
    id: 7,
    sprite: 'bg-whyus7',
    text: 'Hands-On Learning Resources',
    disc: 'Lifetime access to LMS recorded sessions, simulation question banks, and decks.',
    category: 'learning',
    categoryLabel: 'Learning Quality',
    theme: {
      iconBg: 'bg-indigo-500/10',
      iconBorder: 'border-indigo-500/25',
      accentBar: 'bg-indigo-500',
      tagBg: 'bg-indigo-500/10',
      tagText: 'text-indigo-600',
    },
  },
  {
    id: 8,
    sprite: 'bg-whyus8',
    text: 'Secure Payments',
    disc: 'Hassle-free, encrypted, and globally compliant payment gateway transactions.',
    category: 'trust',
    categoryLabel: 'Trust & Value',
    theme: {
      iconBg: 'bg-emerald-500/10',
      iconBorder: 'border-emerald-500/25',
      accentBar: 'bg-emerald-500',
      tagBg: 'bg-emerald-500/10',
      tagText: 'text-emerald-600',
    },
  },
  {
    id: 9,
    sprite: 'bg-whyus9',
    text: 'Early Bird Benefits',
    disc: 'Register ahead of batch kickoff to unlock priority seat allocation & mentor access.',
    category: 'career',
    categoryLabel: 'Career ROI',
    theme: {
      iconBg: 'bg-orange-500/10',
      iconBorder: 'border-orange-500/25',
      accentBar: 'bg-orange-500',
      tagBg: 'bg-orange-500/10',
      tagText: 'text-orange-600',
    },
  },
];

const CATEGORIES: { id: WhyUsCategoryType; label: string }[] = [
  { id: 'all', label: 'All Benefits' },
  { id: 'trust', label: 'Trust & Value' },
  { id: 'learning', label: 'Mentors & Quality' },
  { id: 'career', label: 'Career ROI' },
];

export interface CourseWhyUsProps {
  title?: string;
  subtitle?: string;
  categoryName?: string;
  className?: string;
}

export default function CourseWhyUs({
  title = 'Why Over 450,000+ Learners Choose NivLearn',
  subtitle = 'Risk-free enrollments, enterprise-certified mentors, and career-accelerating curriculum engineered for verifiable outcomes.',
  categoryName,
  className = '',
}: CourseWhyUsProps) {
  const [activeCategory, setActiveCategory] = useState<WhyUsCategoryType>('all');
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const { openModal } = useLeadModal();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return WHY_US_POINTS;
    return WHY_US_POINTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleAdvisorClick = () => {
    openModal({
      formTitle: 'Connect with a Course Advisor',
      formDescription:
        'Discuss course schedules, batch flexibility, and our 100% money-back guarantee with an admissions consultant.',
      defaultValues: {
        leadSource: 'course-why-us-section',
        purpose: 'Upskilling',
      },
      config: {
        showCourse: true,
        purpose: true,
        showMessage: false,
      },
    });
  };

  return (
    <section id="whyus" className={`relative bg-light py-10 sm:py-14 lg:py-20 overflow-hidden border-y border-border-muted/50 ${className}`}>
      <div className="section-container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* ══════════════════════════════════════════════════════
            DESKTOP LAYOUT: Centered Header + Balanced 3-Col Grid + Trust Bar
            (Completely eliminates left blank space & orphan cards!)
           ══════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col gap-8 lg:gap-10">

          {/* Section Header with Category Tabs */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 text-prime text-[11px] font-bold tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The NivLearn Advantage</span>
            </div>

            <h2 className="font-heading text-2xl lg:text-3xl 2xl:text-[2rem] font-extrabold text-prime-dark tracking-tight leading-snug">
              {title}
            </h2>

            <p className="text-text-muted text-xs sm:text-sm mt-2.5 max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {/* Desktop Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-border-muted/40 border border-border-muted/60 mt-6 shadow-inner">
              {CATEGORIES.map((cat) => {
                const count = cat.id === 'all'
                  ? WHY_US_POINTS.length
                  : WHY_US_POINTS.filter((p) => p.category === cat.id).length;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isSelected
                        ? 'bg-prime text-on-dark shadow-xs'
                        : 'text-text-muted hover:text-prime-dark hover:bg-surface/60'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] min-w-[18px] text-center px-1.5 py-0.2 rounded-full font-semibold ${isSelected ? 'bg-white/20 text-on-dark' : 'bg-border-muted text-text-muted'
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Balanced 3-Column Advantage Cards Grid (3x3 = 9 cards: 100% full & symmetrical!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredItems.map((item) => {
              const itemNumber = item.id.toString().padStart(2, '0');

              return (
                <div
                  key={item.id}
                  className="group relative bg-surface rounded-2xl p-5 border border-border-muted/70 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 overflow-hidden"
                >
                  {/* Themed Left Accent Stripe */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${item.theme.accentBar} opacity-60 group-hover:opacity-100 transition-opacity duration-200`} />

                  {/* Top: Themed Sprite Icon + Number Badge */}
                  <div className="flex items-center justify-between gap-3 pl-1.5">
                    <div className={`w-13 h-13 rounded-xl ${item.theme.iconBg} border ${item.theme.iconBorder} flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-200`}>
                      <div className={`${item.sprite} scale-[0.62] origin-center shrink-0`} />
                    </div>
                    <span className="text-xs font-extrabold text-text-muted/60 group-hover:text-prime transition-colors tabular-nums">
                      #{itemNumber}
                    </span>
                  </div>

                  {/* Middle: Content */}
                  <div className="pl-1.5 flex-1">
                    <h3 className="font-heading text-sm font-bold text-prime-dark group-hover:text-prime transition-colors leading-snug">
                      {item.text}
                    </h3>
                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                      {item.disc}
                    </p>
                  </div>

                  {/* Bottom: Themed Category Badge & Guarantee Tag */}
                  <div className="pl-1.5 pt-3 border-t border-border-muted/40 flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${item.theme.tagBg} ${item.theme.tagText}`}>
                      {item.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-success font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Guaranteed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust & Advisory Action Card (Symmetrical & evenly balanced) */}
          <div className="bg-surface rounded-2xl border border-border-muted/70 shadow-xs overflow-hidden">
            
            {/* Top Row: 4 Evenly Distributed Trust Stats with Clean Vertical Dividers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border-muted/60 p-4 sm:p-5">
              
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-prime/10 text-prime flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-prime-dark block leading-tight">450K+</span>
                  <span className="text-xs text-text-muted">Global Alumni</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-prime-yellow/15 text-prime-yellow flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-prime-yellow" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-prime-dark block leading-tight">4.9 / 5.0</span>
                  <span className="text-xs text-text-muted">Learner Rating</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-prime-dark block leading-tight">98.2%</span>
                  <span className="text-xs text-text-muted">Pass Rate</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-prime-dark/10 text-prime-dark flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-prime-dark block leading-tight">100%</span>
                  <span className="text-xs text-text-muted">Money-Back</span>
                </div>
              </div>

            </div>

            {/* Bottom Row: Advisory Prompt & Action Button */}
            <div className="bg-sec-prime border-t border-border-muted/60 px-5 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <div className="w-2 h-2 rounded-full bg-prime shrink-0 hidden sm:block" />
                <p className="text-xs text-text-muted leading-relaxed">
                  Have questions regarding batch schedules, enterprise fee subsidies, or course guarantees?
                </p>
              </div>
              <button
                type="button"
                onClick={handleAdvisorClick}
                className="w-full sm:w-auto py-2 px-5 bg-prime hover:bg-prime-outline text-on-dark text-xs sm:text-sm font-semibold rounded-lg shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0"
              >
                <span>Speak with an Advisor</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE LAYOUT: Dedicated, compact, swipeable rail
            (Preserved & enhanced with matching rich card colors)
           ══════════════════════════════════════════════════════ */}
        <div className="block lg:hidden space-y-4 sm:space-y-5">

          {/* Mobile Header */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The NivLearn Advantage</span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-extrabold text-prime-dark tracking-tight leading-snug">
              {title}
            </h2>
            <p className="text-text-muted text-xs mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Swipeable Category Filter Strip */}
          <div className="flex items-center overflow-x-auto gap-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? WHY_US_POINTS.length
                : WHY_US_POINTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveMobileIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer border select-none ${isSelected
                      ? 'bg-prime text-on-dark border-prime shadow-xs'
                      : 'bg-surface border-border-muted text-text-muted hover:border-prime/40'
                    }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-white/20 text-on-dark' : 'bg-border-muted text-text-muted'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Swipeable Card Rail with Snap Points */}
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = el.scrollWidth / filteredItems.length;
              if (cardWidth > 0) {
                const idx = Math.round(el.scrollLeft / cardWidth);
                setActiveMobileIndex(Math.min(Math.max(idx, 0), filteredItems.length - 1));
              }
            }}
          >
            {filteredItems.map((item) => {
              const itemNumber = item.id.toString().padStart(2, '0');

              return (
                <div
                  key={item.id}
                  className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-surface border border-border-muted/80 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between gap-3 relative overflow-hidden"
                >
                  {/* Left Themed Accent Stripe */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.theme.accentBar}`} />

                  {/* Top: Icon + Number Badge */}
                  <div className="flex items-center justify-between pl-1">
                    <div className={`w-12 h-12 rounded-xl ${item.theme.iconBg} border ${item.theme.iconBorder} flex items-center justify-center shrink-0 overflow-hidden`}>
                      <div className={`${item.sprite} scale-[0.55] origin-center shrink-0`} />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-prime/10 text-prime tabular-nums">
                      #{itemNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="pl-1">
                    <h3 className="font-heading text-sm font-bold text-prime-dark leading-snug">
                      {item.text}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {item.disc}
                    </p>
                  </div>

                  {/* Bottom Guarantee Pill */}
                  <div className="pl-1 pt-2 border-t border-border-muted/40 flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${item.theme.tagBg} ${item.theme.tagText}`}>
                      {item.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-success font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Guaranteed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Pagination Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {filteredItems.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === activeMobileIndex ? 'w-5 bg-prime' : 'w-1.5 bg-border-muted'
                  }`}
              />
            ))}
          </div>

          {/* Mobile Trust Strip */}
          <div className="grid grid-cols-3 gap-2 bg-surface rounded-xl p-3 border border-border-muted/70 text-center">
            <div>
              <span className="text-xs font-extrabold text-prime-dark block">450K+</span>
              <span className="text-[10px] text-text-muted">Learners</span>
            </div>
            <div className="border-x border-border-muted/60">
              <span className="text-xs font-extrabold text-prime block">100%</span>
              <span className="text-[10px] text-text-muted">Refund Safe</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-prime-yellow block">4.9 ★</span>
              <span className="text-[10px] text-text-muted">Top Rated</span>
            </div>
          </div>

          {/* Mobile Advisor CTA Button */}
          <button
            type="button"
            onClick={handleAdvisorClick}
            className="w-full py-2.5 px-4 bg-prime hover:bg-prime-outline text-on-dark text-xs sm:text-sm font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Speak with an Advisor</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
