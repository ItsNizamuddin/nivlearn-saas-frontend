'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CategoryDetail } from '@/services/catalog.service';
import { cn, smoothScrollTo } from '@/lib/utils';

interface ParsedKeyPoint {
  title?: string;
  description: string;
}

function parseKeyPoints(html?: string): ParsedKeyPoint[] {
  if (!html) return [];

  const normalized = html
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    // Remove emoji checkboxes (✅, ☑, etc.) from CMS content
    .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2600-\u26FF]/g, '')
    .replace(/✅/g, '')
    .replace(/☑/g, '')
    .trim();

  let rawChunks: string[] = [];

  if (/<li[^>]*>/i.test(normalized)) {
    const liMatches = normalized.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches) rawChunks = liMatches.map((li) => li.replace(/<\/?li[^>]*>/gi, ''));
  } else if (/<br\s*\/?>/i.test(normalized)) {
    const unwrapped = normalized.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '');
    rawChunks = unwrapped.split(/<br\s*\/?>/i);
  } else {
    const pMatches = normalized.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    rawChunks = pMatches && pMatches.length > 1
      ? pMatches.map((p) => p.replace(/<\/?p[^>]*>/gi, ''))
      : [normalized.replace(/<\/?p[^>]*>/gi, '')];
  }

  const results: ParsedKeyPoint[] = [];

  for (const chunk of rawChunks) {
    const trimmed = chunk.trim();
    if (!trimmed || trimmed === '<br>' || trimmed === '<br/>') continue;

    const boldMatch = trimmed.match(/<(b|strong)[^>]*>([\s\S]*?)<\/\1>/i);
    if (boldMatch) {
      const rawTitle = boldMatch[2].replace(/<[^>]+>/g, '').replace(/✅|☑/g, '').trim();
      const rest = trimmed
        .replace(boldMatch[0], '')
        .replace(/<[^>]+>/g, '')
        .replace(/✅|☑/g, '')
        .trim();
      if (rawTitle || rest) {
        results.push({ title: rawTitle || undefined, description: rest || rawTitle });
      }
    } else {
      const cleaned = trimmed.replace(/<[^>]+>/g, '').replace(/✅|☑/g, '').trim();
      if (cleaned) results.push({ description: cleaned });
    }
  }

  return results;
}

export default function CategoryBanner({ category }: { category: CategoryDetail }) {
  const { openModal } = useLeadModal();
  const [mobilePointsExpanded, setMobilePointsExpanded] = useState(false);
  const [desktopPointsExpanded, setDesktopPointsExpanded] = useState(false);

  const handleAdvisorClick = () => {
    openModal({
      formTitle: `Explore ${category.name} Programs`,
      formDescription: `Get 1-on-1 career path guidance, syllabus walkthroughs, and fee structures for ${category.name}.`,
      defaultValues: {
        leadSource: `category-banner-${category.slug}`,
        purpose: `Category Advisory: ${category.name}`,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  const accreditations =
    category.accreditionImages?.length ? category.accreditionImages
      : category.accredation?.length ? category.accredation
        : [];

  const keyPoints = parseKeyPoints(category.key_points);
  const coursesCount = category.courses?.length || 0;
  const rawDesc = category.description || category.cat_description;
  const fallbackDesc =
    category.metaDescription ||
    `Explore comprehensive ${category.name} programs with hands-on training for real-world career mastery.`;

  const POINTS_LIMIT = 5;
  const mobileVisiblePoints = mobilePointsExpanded ? keyPoints : keyPoints.slice(0, POINTS_LIMIT);
  const desktopVisiblePoints = desktopPointsExpanded ? keyPoints : keyPoints.slice(0, POINTS_LIMIT);

  return (
    <section className="section-container pt-6 pb-4 sm:pt-8 sm:pb-6 lg:pt-10 lg:pb-6">

      {/* ===== MOBILE LAYOUT (< lg) ===== */}
      <div className="lg:hidden space-y-5">

        {/* Top Row: Dynamic Badge + Count */}
        <div className="flex items-center gap-2 flex-wrap">
          {coursesCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{coursesCount} {coursesCount === 1 ? 'Program' : 'Programs'} Available</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading text-[26px] sm:text-3xl font-black text-prime-dark tracking-tight leading-[1.2]">
          {category.name}
        </h1>

        {/* Description */}
        {rawDesc ? (
          <div
            className="text-slate-600 text-sm leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_span]:!text-inherit"
            dangerouslySetInnerHTML={{ __html: rawDesc }}
          />
        ) : (
          <p className="text-slate-600 text-sm leading-relaxed">{fallbackDesc}</p>
        )}

        {/* Mobile Action Buttons */}
        <div className="flex gap-2.5">
          <Link
            href="#courses"
            onClick={(e) => smoothScrollTo('#courses', e)}
            className="flex-1 py-3 px-4 rounded-xl bg-prime hover:bg-prime-dark active:scale-98 text-white font-extrabold text-sm text-center shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Explore Courses</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleAdvisorClick}
            className="flex-1 py-3 px-3 rounded-xl bg-surface hover:bg-light text-prime font-bold text-sm text-center border border-prime/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span>Get Advice</span>
          </button>
        </div>

        {/* Mobile Key Points (collapsible) */}
        {keyPoints.length > 0 && (
          <div className="rounded-2xl border border-border-muted/80 bg-surface overflow-hidden shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-prime/5 to-transparent border-b border-border-muted/60">
              <Award className="w-4 h-4 text-prime shrink-0" />
              <span className="text-sm font-bold text-prime-dark">Program Highlights</span>
            </div>
            {/* Points */}
            <div className="p-4 space-y-2.5">
              {mobileVisiblePoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm leading-snug">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-slate-700">
                    {pt.title && <strong className="font-bold text-prime-dark">{pt.title}: </strong>}
                    <span className="font-medium">{pt.description}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* Expand/Collapse toggle */}
            {keyPoints.length > POINTS_LIMIT && (
              <button
                type="button"
                onClick={() => setMobilePointsExpanded(!mobilePointsExpanded)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-prime hover:text-prime-dark border-t border-border-muted/60 bg-light/40 hover:bg-light transition-colors cursor-pointer"
              >
                {mobilePointsExpanded ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Read More (+{keyPoints.length - POINTS_LIMIT} highlights)</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Mobile Accreditations */}
        {accreditations.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Accredited By:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
              {accreditations.map((acc, idx) => (
                <div key={idx} className="h-7 px-2.5 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs shrink-0 flex items-center">
                  {acc.url && (
                    <Image src={acc.url} alt={acc.alt || 'Accreditation'} width={70} height={22} className="h-full w-auto object-contain" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== DESKTOP LAYOUT (>= lg) ===== */}
      <div className="hidden lg:grid lg:grid-cols-12 items-center gap-10 xl:gap-14">

        {/* Left Column: 7 cols */}
        <div className="lg:col-span-7 space-y-6">

          {/* Eyebrow + Count */}
          <div className="flex items-center gap-3 flex-wrap">
            {coursesCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{coursesCount} {coursesCount === 1 ? 'Program' : 'Programs'} Available</span>
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-heading text-2xl xl:text-3xl font-black text-prime-dark tracking-tight leading-[1.12]">
              {category.name}
            </h1>

            {/* Description */}
            {rawDesc ? (
              <div
                className="text-slate-600 text-[15px] xl:text-base leading-relaxed space-y-2 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_span]:!text-inherit"
                dangerouslySetInnerHTML={{ __html: rawDesc }}
              />
            ) : (
              <p className="text-slate-600 text-[15px] xl:text-base leading-relaxed">{fallbackDesc}</p>
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="#courses"
              onClick={(e) => smoothScrollTo('#courses', e)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-prime hover:bg-prime-dark active:scale-95 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Explore Courses</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              onClick={handleAdvisorClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-light border border-prime/30 hover:border-prime/50 text-prime hover:text-prime-dark font-bold text-sm transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Speak with an Advisor</span>
            </button>
          </div>

          {/* Desktop Accreditations */}
          {accreditations.length > 0 && (
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">Accredited By:</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {accreditations.map((acc, idx) => (
                  <div key={idx} className="h-9 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs flex items-center hover:border-prime/30 transition-colors">
                    {acc.url && (
                      <Image src={acc.url} alt={acc.alt || 'Accreditation'} width={80} height={28} className="h-full w-auto object-contain" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 5 cols — Program Highlights Card or Advisor CTA */}
        <div className="lg:col-span-5">
          {keyPoints.length > 0 ? (
            <div className="rounded-2xl bg-surface border border-border-muted/80 shadow-md overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center gap-2.5 px-5 py-4 bg-gradient-to-r from-prime/8 via-prime/5 to-transparent border-b border-border-muted/70">
                <div className="w-8 h-8 rounded-xl bg-prime/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-prime" />
                </div>
                <div>
                  <h3 className="font-heading text-[15px] font-bold text-prime-dark leading-tight">Program Highlights</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">What makes this track stand out</p>
                </div>
              </div>

              {/* Points List: title + 2-line summary each, so the card stays close to the hero's height */}
              <ul className="px-5 py-4 space-y-3.5">
                {desktopVisiblePoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 aria-hidden className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <div className="min-w-0">
                      {pt.title && <p className="text-sm font-bold text-prime-dark leading-snug">{pt.title}</p>}
                      <p
                        className={cn(
                          'text-[13px] text-slate-600 leading-relaxed',
                          pt.title && 'mt-0.5',
                          !desktopPointsExpanded && 'line-clamp-2',
                        )}
                      >
                        {pt.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-5 pb-3 -mt-1">
                {/* Read More / Show Less Toggle (Desktop): also un-clamps the summaries */}
                {(keyPoints.length > POINTS_LIMIT || keyPoints.some((pt) => pt.description.length > 110)) && (
                  <button
                    type="button"
                    onClick={() => setDesktopPointsExpanded(!desktopPointsExpanded)}
                    className="w-full flex items-center justify-center gap-1.5 pt-2 text-xs font-bold text-prime hover:text-prime-dark transition-colors cursor-pointer"
                  >
                    <span>
                      {desktopPointsExpanded
                        ? 'Show Less'
                        : keyPoints.length > POINTS_LIMIT
                          ? `Read More (+${keyPoints.length - POINTS_LIMIT} highlights)`
                          : 'Read More'}
                    </span>
                    {desktopPointsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Footer CTA */}
              <div className="px-5 py-3 bg-light/60 border-t border-border-muted/60">
                <button
                  type="button"
                  onClick={handleAdvisorClick}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-prime hover:text-prime-dark text-xs font-bold hover:bg-prime/8 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Have questions? Speak with a Learning Advisor</span>
                </button>
              </div>
            </div>
          ) : (
            /* Advisor CTA Card when no key points */
            <div className="rounded-2xl bg-gradient-to-br from-prime/8 via-surface to-light/40 border border-prime/20 shadow-md p-6 space-y-4">
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-prime-dark">Not sure where to start?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our learning advisors will help you pick the right program, compare curricula, and secure your preferred batch.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAdvisorClick}
                className="w-full py-3 px-4 rounded-xl bg-prime hover:bg-prime-dark active:scale-95 text-white font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Speak with a Learning Advisor</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">Free guidance • No commitment</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
