'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Sparkles,
  BookOpen,
  Building2,
  TrendingUp,
  Award,
  Hash,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';
import { parseToListItems } from '@/lib/utils';
import CourseLMSOfferCard from './CourseLMSOfferCard';

export default function CourseOverview({ course }: { course: CourseDetail }) {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { openModal } = useLeadModal();

  const overview = course.overview_content;
  if (!overview) return null;

  // Who can attend parsing (supports string and { description, roles })
  const whoCanAttend = overview.overview_who_can_attend;
  const whoCanAttendDesc =
    typeof whoCanAttend === 'string'
      ? whoCanAttend
      : typeof whoCanAttend === 'object' && whoCanAttend
        ? whoCanAttend.description
        : undefined;

  const whoCanAttendRoles =
    typeof whoCanAttend === 'object' && whoCanAttend?.roles
      ? whoCanAttend.roles.split(',').map((r) => r.trim()).filter(Boolean)
      : [];

  // Prerequisites parsing
  const prereqHtml = overview.prerequisites || overview.overview_prerequisits;
  const prereqList = useMemo(() => parseToListItems(prereqHtml || ''), [prereqHtml]);
  const prereqIntro = useMemo(() => {
    if (!prereqHtml) return '';
    const firstListIndex = prereqHtml.search(/<(ul|ol)/i);
    if (firstListIndex > 0) {
      return prereqHtml.slice(0, firstListIndex).replace(/<[^>]+>/g, '').trim();
    }
    return '';
  }, [prereqHtml]);

  // Skill focused
  const skillFocusedHtml = overview.skillfocused || overview.overview_skils_focused;

  // Stats
  const stats = overview.stats && overview.stats.length > 0 ? overview.stats : undefined;

  // Key features
  const keyFeatures = overview.overview_key_features;

  // Companies
  const companies = overview.companies && overview.companies.length > 0 ? overview.companies : undefined;

  // Check if description is long enough to warrant read-more on mobile
  const isDescLong = Boolean(overview.overview_description && overview.overview_description.length > 320);

  const handleEnquire = (source = 'course-overview') => {
    openModal({
      formTitle: 'Check Your Eligibility',
      formDescription: `Verify course prerequisites and career alignment for ${course.course_title}.`,
      defaultValues: {
        leadSource: `${source}-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  const handleAdvisor = () => {
    openModal({
      formTitle: 'Speak with an Advisor',
      formDescription: `Get 1-on-1 personalized guidance on curriculum, schedules, and career outcomes for ${course.course_title}.`,
      defaultValues: {
        leadSource: `course-advisor-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };



  return (
    <section id="overview" className="section-container py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Comprehensive Overview Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          {/* Main Description Block */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Program Overview</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-prime-dark tracking-tight leading-tight">
              {overview.overview_title || `About the ${course.course_title} Program`}
            </h2>

            {overview.overview_description && (
              <div className="relative">
                <div
                  className={`text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 prose max-w-none prose-p:leading-relaxed prose-strong:text-prime-dark ${isDescLong && !isDescExpanded ? 'max-h-48 overflow-hidden' : ''
                    }`}
                  dangerouslySetInnerHTML={{ __html: overview.overview_description }}
                />

                {isDescLong && !isDescExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                )}

                {isDescLong && (
                  <button
                    type="button"
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-prime hover:text-prime-dark transition-colors cursor-pointer pt-1"
                  >
                    <span>{isDescExpanded ? 'Show less' : 'Read full program overview'}</span>
                    {isDescExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile LMS Offer Card (renders only on mobile < lg right after intro) */}
          <CourseLMSOfferCard course={course} isMobile={true} />

          {/* Stats Metrics Grid */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-light/50 via-white to-light/30 border border-border-muted/80 rounded-lg p-4 text-center shadow-xs hover:border-prime/40 hover:shadow-sm transition-all group"
                >
                  <p className="text-xl 2xl:text-2xl font-black text-prime-dark group-hover:text-prime transition-colors tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] 2xl:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1.5 leading-snug">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Key Features Grid */}
          {keyFeatures && keyFeatures.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-prime-yellow/15 text-prime-yellow flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg 2xl:text-xl font-bold text-prime-dark">
                    Key Features & Learning Highlights
                  </h3>
                  <p className="text-xs text-slate-500">
                    Engineered to give you hands-on practical competence from day one
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {keyFeatures.map((feat, idx) => {
                  const featText = typeof feat === 'string' ? feat : feat.title || feat.des || '';
                  return (
                    <div
                      key={idx}
                      className="bg-surface border border-border-muted/70 rounded-lg p-4 flex items-start gap-3.5 hover:border-prime/40 hover:shadow-xs transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-prime-yellow flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Award className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {featText}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Who Can Attend & Target Roles */}
          {(whoCanAttendDesc || whoCanAttendRoles.length > 0) && (
            <div className="bg-surface border border-border-muted/80 rounded-lg p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-prime/10 text-prime flex items-center justify-center shrink-0">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-prime-dark">
                    Who Should Enroll in This Program?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tailored for both aspiring career starters and experienced professionals
                  </p>
                </div>
              </div>

              {whoCanAttendDesc && (
                <div
                  className="text-slate-600 text-xs sm:text-sm leading-relaxed prose max-w-none pt-1"
                  dangerouslySetInnerHTML={{ __html: whoCanAttendDesc }}
                />
              )}

              {whoCanAttendRoles.length > 0 && (
                <div className="pt-3 border-t border-border-muted/50">
                  <p className="text-xs font-bold text-prime-dark uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-prime" />
                    <span>Target Profiles & Roles:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {whoCanAttendRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-light border border-prime/20 text-prime-dark text-xs font-semibold hover:bg-prime hover:text-white hover:border-prime transition-all shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-prime shrink-0" />
                        <span>{role}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prerequisites & Eligibility */}
          {prereqHtml && (
            <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-lg p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                      Prerequisites & Entry Requirements
                    </h3>
                    <p className="text-xs text-slate-500">
                      Minimum background needed before joining this cohort
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnquire('overview-prereq')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-300 px-3.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer group"
                >
                  <span>Check Your Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {prereqIntro && (
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {prereqIntro}
                </p>
              )}

              {prereqList.length > 0 ? (
                <div className="space-y-2.5 pt-1">
                  {prereqList.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-slate-700 text-xs sm:text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: prereqHtml }}
                />
              )}
            </div>
          )}

          {/* Skill Focused / Technologies */}
          {skillFocusedHtml && (
            <div className="bg-surface border border-border-muted/80 rounded-lg p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-prime/10 text-prime flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-prime-dark">
                    Core Skills & Focus Areas
                  </h3>
                  <p className="text-xs text-slate-500">
                    High-demand capabilities covered through practical drills
                  </p>
                </div>
              </div>
              <div
                className="text-xs sm:text-sm text-slate-700 leading-relaxed prose max-w-none prose-ul:list-disc prose-ul:pl-5 prose-li:my-1.5"
                dangerouslySetInnerHTML={{ __html: skillFocusedHtml }}
              />
            </div>
          )}

          {/* Structural Skills & Tools Badges */}
          {(course.skills?.length || course.tools?.length) ? (
            <div className="bg-surface border border-border-muted/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div>
                <h3 className="font-heading text-sm font-bold text-prime-dark uppercase tracking-wider">
                  Industry Software & Practical Frameworks
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Master enterprise-grade tools used daily by top industry teams
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {(course.skills || []).map((skill, index) => (
                  <span
                    key={`skill-${index}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-light border border-prime/20 text-xs font-semibold text-prime-dark shadow-2xs hover:border-prime transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-prime-yellow" />
                    <span>{skill.name}</span>
                  </span>
                ))}
                {(course.tools || []).map((tool, index) => (
                  <span
                    key={`tool-${index}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border-muted text-xs font-semibold text-slate-700 shadow-2xs hover:border-prime/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-prime1" />
                    <span>{tool.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Companies Hiring Alumni */}
          {companies && (
            <div className="bg-gradient-to-r from-light/40 via-white to-light/40 border border-border-muted/80 rounded-lg p-5 sm:p-6 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-prime-dark text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-prime-dark">
                    Top Companies Hiring Alumni from This Program
                  </h3>
                  <p className="text-xs text-slate-500">
                    Graduates actively work at leading tech, product, and consulting brands
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                {companies.map((comp, idx) => {
                  const compName = typeof comp === 'string' ? comp : comp.name || '';
                  return (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-border-muted text-xs font-bold text-slate-800 shadow-2xs hover:border-prime/50 hover:shadow-xs transition-all"
                    >
                      {compName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky LMS Offer Card (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <CourseLMSOfferCard course={course} isMobile={false} />
        </div>
      </div>
    </section>
  );
}
