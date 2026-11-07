'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Building2,
  Briefcase,
  Wrench,
  Award,
  Link2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface HomeSEOContentProps {
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
}

const POPULAR_PROGRAM_LINKS = [
  { label: 'Digital Marketing Course in Bangalore', href: '/trainings/digital-marketing-course' },
  { label: 'Advanced SEO Training', href: '/trainings/seo-course' },
  { label: 'Google Ads & Performance Marketing', href: '/trainings/google-ads-course' },
  { label: 'Social Media Marketing Course', href: '/trainings/social-media-marketing-course' },
  { label: 'Full Stack Web Development', href: '/trainings/full-stack-web-development' },
  { label: 'WordPress Website Development', href: '/trainings/wordpress-development-course' },
];

const LEARNING_PATH_LINKS = [
  { label: 'Job-Oriented Trainings', href: '/trainings' },
  { label: 'Intensive Bootcamps', href: '/bootcamps' },
  { label: 'Internship Programs', href: '/trainings' },
  { label: 'Corporate Team Upskilling', href: '/corporate' },
  { label: 'Hire Trained Graduates', href: '/hire-from-us' },
  { label: 'Accreditations & Partners', href: '/accreditations' },
  { label: 'Industry Career Insights & Blog', href: '/blog' },
];

const SEO_HIGHLIGHT_CARDS = [
  {
    icon: Building2,
    title: 'Agency-Style Hands-on Learning',
    description:
      'Unlike conventional institutes focused on textbook theory, our curriculum immerses you directly into real agency workflows — managing live client budgets, optimizing SEO campaigns, and building production applications.',
  },
  {
    icon: Briefcase,
    title: '100% Dedicated Placement Cell',
    description:
      'Every learner receives end-to-end career acceleration: 1-on-1 resume optimization, LinkedIn and GitHub portfolio enhancement, mock behavioral and technical interviews, and direct hiring partner referrals.',
  },
  {
    icon: Wrench,
    title: '30+ Enterprise Tools Mastery',
    description:
      'Master industry-standard software hands-on: Google Ads Manager, Meta Business Suite, Ahrefs, SEMrush, Google Analytics 4, Figma, and modern Generative AI marketing workflows.',
  },
  {
    icon: Award,
    title: 'Flexible Batches & Accreditation',
    description:
      'Choose between weekday immersive cohorts, weekend intensive batches, and live interactive online sessions with verifiable globally recognized graduation certificates.',
  },
];

export default function HomeSEOContent({
  internalSection,
  bottomSection,
}: HomeSEOContentProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const internalTitle = internalSection?.title || 'Explore Learning Paths & Training Programs';
  const bottomTitle =
    bottomSection?.title || 'India’s #1 Agency-Based Practical Training Institute';

  const customInternalHtml = internalSection?.value;
  const customBottomHtml = bottomSection?.value;

  return (
    <section className="section-container pb-14 pt-2">
      <div className="space-y-4 max-w-5xl mx-auto">
        {/* 1. Internal Links Directory Accordion */}
        <div className="rounded-2xl border border-border-muted/80 bg-surface shadow-xs overflow-hidden transition-all duration-200">
          <button
            type="button"
            onClick={() => setInternalOpen(!internalOpen)}
            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors focus:outline-none"
            aria-expanded={internalOpen}
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-prime/10 flex items-center justify-center shrink-0">
                <Link2 className="size-4 text-prime" />
              </div>
              <div>
                <span className="font-heading text-sm sm:text-base font-bold text-prime-dark block">
                  {internalTitle}
                </span>
                <span className="text-xs text-text-muted hidden sm:block">
                  Quick directory of certified courses, bootcamps, and corporate learning paths
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-prime hidden sm:inline">
                {internalOpen ? 'Hide Links' : 'View Directory'}
              </span>
              <ChevronDown
                className={`size-4 text-prime transition-transform duration-300 ${
                  internalOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {internalOpen && (
            <div className="px-5 pb-6 pt-2 border-t border-border-muted/50 bg-slate-50/40">
              {customInternalHtml ? (
                <div
                  className="text-text-muted text-xs sm:text-sm leading-relaxed rich-text skilldeck-rich-text"
                  dangerouslySetInnerHTML={{ __html: customInternalHtml }}
                />
              ) : (
                <div className="space-y-5 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-prime-dark mb-2.5">
                      Popular Training Programs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_PROGRAM_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-muted/80 text-xs font-medium text-text-body hover:border-prime/60 hover:text-prime hover:bg-prime/5 hover:shadow-2xs transition-all"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="size-3 text-prime/60" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-prime-dark mb-2.5">
                      Career Tracks & Enterprise Solutions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {LEARNING_PATH_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-muted/80 text-xs font-medium text-text-body hover:border-prime/60 hover:text-prime hover:bg-prime/5 hover:shadow-2xs transition-all"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="size-3 text-prime/60" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. SEO Bottom Content Card Grid Accordion */}
        <div className="rounded-2xl border border-border-muted/80 bg-surface shadow-xs overflow-hidden transition-all duration-200">
          <button
            type="button"
            onClick={() => setBottomOpen(!bottomOpen)}
            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors focus:outline-none"
            aria-expanded={bottomOpen}
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-prime/10 flex items-center justify-center shrink-0">
                <BookOpen className="size-4 text-prime" />
              </div>
              <div>
                <span className="font-heading text-sm sm:text-base font-bold text-prime-dark block">
                  {bottomTitle}
                </span>
                <span className="text-xs text-text-muted hidden sm:block">
                  Why choose agency-style practical learning with guaranteed placement support
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-prime hidden sm:inline">
                {bottomOpen ? 'Hide Overview' : 'Read Overview'}
              </span>
              <ChevronDown
                className={`size-4 text-prime transition-transform duration-300 ${
                  bottomOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {bottomOpen && (
            <div className="px-5 pb-6 pt-3 border-t border-border-muted/50 bg-slate-50/40">
              {customBottomHtml ? (
                <div
                  className="text-text-muted text-xs sm:text-sm leading-relaxed rich-text skilldeck-rich-text max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: customBottomHtml }}
                />
              ) : (
                <div className="space-y-6 pt-1">
                  {/* Overview Paragraph */}
                  <div className="p-4 rounded-xl bg-surface border border-border-muted/60 text-xs sm:text-sm text-text-muted leading-relaxed">
                    <p>
                      <strong className="text-prime-dark font-semibold">NivLearn</strong> is India’s leading career accelerator delivering 100% practical, agency-style training designed to transform graduates, career-switchers, and working professionals into high-impact digital specialists. Rather than relying on outdated academic theory, learners build real-world portfolios with live client campaign deliverables, measurable ROI tracking, and executive mentor support.
                    </p>
                  </div>

                  {/* 4 Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {SEO_HIGHLIGHT_CARDS.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-surface border border-border-muted/70 hover:border-prime/40 shadow-2xs transition-all space-y-1.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="size-7 rounded-lg bg-prime/10 text-prime flex items-center justify-center shrink-0">
                              <Icon className="size-3.5" />
                            </span>
                            <h4 className="font-heading text-sm font-bold text-prime-dark">
                              {card.title}
                            </h4>
                          </div>
                          <p className="text-xs text-text-muted leading-relaxed pl-9.5">
                            {card.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
