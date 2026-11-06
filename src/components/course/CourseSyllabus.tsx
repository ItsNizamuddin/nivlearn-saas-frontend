'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  Download,
  Sparkles,
  BookOpen,
  Layers,
  Clock,
  Award,
  Search,
  X,
  Wrench,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Users
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';
import { parseToListItems } from '@/lib/utils';

interface CourseSyllabusProps {
  course: CourseDetail;
}

export default function CourseSyllabus({ course }: CourseSyllabusProps) {
  const { openModal } = useLeadModal();

  // Normalize syllabus modules dynamically from API (array or object wrapper)
  const rawModules = Array.isArray(course.syllabus_content)
    ? course.syllabus_content
    : course.syllabus_content?.syllabus_accordian || [];

  const modules = useMemo(() => {
    return rawModules
      .map((m, idx) => ({
        index: idx,
        title: (m.title || '').trim(),
        des: m.des || m.value || '',
        duration: m.duration?.trim(),
      }))
      .filter((m) => Boolean(m.title));
  }, [rawModules]);

  // Extract skills dynamically from course.skills or overview_content.skillfocused
  const dynamicSkills = useMemo(() => {
    if (course.skills && course.skills.length > 0) {
      return course.skills.map((s) => s.name).filter(Boolean);
    }
    const raw = course.overview_content?.skillfocused || course.overview_content?.overview_skils_focused;
    if (raw) {
      return parseToListItems(raw).filter(Boolean);
    }
    return [];
  }, [course.skills, course.overview_content]);

  // Tools dynamically from API
  const dynamicTools = useMemo(() => {
    return (course.tools || []).filter((t) => Boolean(t.name));
  }, [course.tools]);

  // If no modules exist for this course in the CMS, do not render an empty section
  if (modules.length === 0) {
    return null;
  }

  // Dynamic course metadata from API
  const courseName = course.course_name || course.course_title || 'Course';
  const duration = course.courseCard?.courseDuration?.trim();
  const mode = course.courseCard?.courseMode?.trim();
  const courseType = course.courseCard?.courseType?.trim();
  const totalEnrolled = course.courseCard?.totalEnrolled?.trim();
  const tagline = course.courseCard?.tagline?.trim();
  const brochureUrl =
    course.leadmagnet?.[0]?.broucher?.url ||
    (course.leadmagnet?.[0] as unknown as { brochure?: { url?: string } })?.brochure?.url;

  // Build dynamic metric cards — only fields present in API data are rendered
  const dynamicMetrics = [
    {
      icon: Layers,
      label: 'Curriculum',
      value: `${modules.length} Modules`,
      color: 'bg-prime/10 text-prime',
    },
    duration
      ? {
        icon: Clock,
        label: 'Duration',
        value: duration,
        color: 'bg-emerald-500/10 text-emerald-600',
      }
      : null,
    mode
      ? {
        icon: GraduationCap,
        label: 'Learning Mode',
        value: mode,
        color: 'bg-purple-500/10 text-purple-600',
      }
      : null,
    totalEnrolled
      ? {
        icon: Users,
        label: 'Enrolled',
        value: `${totalEnrolled} Students`,
        color: 'bg-blue-500/10 text-blue-600',
      }
      : courseType
        ? {
          icon: Award,
          label: 'Program Type',
          value: courseType,
          color: 'bg-amber-500/10 text-amber-600',
        }
        : null,
  ].filter(Boolean) as Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    color: string;
  }>;

  // Search & Accordion State
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return modules;
    const q = searchQuery.toLowerCase();
    return modules.filter(
      (m) => m.title.toLowerCase().includes(q) || m.des.toLowerCase().includes(q)
    );
  }, [modules, searchQuery]);

  const allOpen = filteredModules.length > 0 && filteredModules.every((m) => openIndices.has(m.index));

  const toggleExpandAll = () => {
    if (allOpen) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(filteredModules.map((m) => m.index)));
    }
  };

  const toggleModule = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleDownloadCurriculum = () => {
    openModal({
      formTitle: 'Download Comprehensive Curriculum',
      formDescription: `Get the detailed module-by-module syllabus and project briefs for ${courseName}.`,
      downloadUrl: brochureUrl,
      defaultValues: {
        leadSource: `course-syllabus-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  const handleTalkToAdvisor = () => {
    openModal({
      formTitle: `Connect with a Course Advisor`,
      formDescription: `Discuss curriculum details, batch schedules, and learning outcomes for ${courseName}.`,
      defaultValues: {
        leadSource: `course-syllabus-advisor-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  const hasSidebarContent = dynamicSkills.length > 0 || dynamicTools.length > 0 || Boolean(tagline);

  return (
    <section id="syllabus" className="section-container py-12 sm:py-16 lg:py-24">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-muted/70">
        <div className="max-w-4xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-xs font-bold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Blueprint</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-prime-dark tracking-tight">
            {course.course_title || `${courseName} Syllabus`}
          </h2>
          {course.banner_content?.description && (
            <div
              className="rich-text skilldeck-rich-text text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-2 overflow-hidden [&_*]:inline [&_*]:m-0 [&_*]:leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: course.banner_content.description,
              }}
            />
          )}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadCurriculum}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-prime hover:bg-prime-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Syllabus PDF</span>
          </button>
        </div>
      </div>

      {/* Dynamic Micro Metrics Strip (Only renders fields that exist in API) */}
      {dynamicMetrics.length > 0 && (
        <div
          className={`grid gap-3 my-6 sm:my-8 ${dynamicMetrics.length === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : dynamicMetrics.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-2'
            }`}
        >
          {dynamicMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-surface border border-border-muted/70 shadow-2xs"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${metric.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-text-muted block">{metric.label}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-prime-dark truncate block">
                    {metric.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Grid: Modules + Conditional Dynamic Sidebar */}
      <div className={`grid grid-cols-1 ${hasSidebarContent ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8 lg:gap-10 items-start`}>
        {/* Modules Accordion Column */}
        <div className={`order-1 ${hasSidebarContent ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
          {/* Controls Bar: Search & Expand All */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-surface border border-border-muted shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, modules, or keywords..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-light/70 focus:bg-surface border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-prime/20 text-prime-dark placeholder:text-text-muted/70 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-prime-dark p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
              <span className="text-[11px] text-text-muted sm:hidden">
                {filteredModules.length} of {modules.length} modules
              </span>
              <button
                type="button"
                onClick={toggleExpandAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-muted hover:border-prime/40 bg-surface hover:bg-light/60 text-xs font-semibold text-prime-dark transition-all cursor-pointer shadow-2xs"
              >
                <span>{allOpen ? 'Collapse All' : 'Expand All'}</span>
              </button>
            </div>
          </div>

          {/* Module List */}
          {filteredModules.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-lg border border-dashed border-border-muted bg-surface/50">
              <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-prime-dark">No matching modules found</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-bold text-prime hover:underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredModules.map((item) => {
                const isOpen = openIndices.has(item.index);
                const displayIndex = String(item.index + 1).padStart(2, '0');

                return (
                  <div
                    key={item.index}
                    className={`rounded-lg border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-surface border-prime/40 shadow-sm ring-1 ring-prime/10'
                      : 'bg-surface/85 border-border-muted hover:border-slate-300 hover:bg-surface shadow-2xs'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(item.index)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none select-none transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-colors ${isOpen
                            ? 'bg-prime text-white shadow-xs'
                            : 'bg-light text-prime-dark border border-border-muted'
                            }`}
                        >
                          {displayIndex}
                        </div>

                        <div className="min-w-0">
                          <span className="text-[10.5px] font-bold text-prime uppercase tracking-wider block sm:hidden mb-0.5">
                            Module {displayIndex}
                          </span>
                          <h3
                            className={`font-heading text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-prime' : 'text-prime-dark'
                              }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 pt-0.5 sm:pt-0">
                        {item.duration && (
                          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-text-muted bg-light px-2.5 py-1 rounded-md border border-border-muted/50">
                            <Clock className="w-3 h-3 text-text-muted" />
                            <span>{item.duration}</span>
                          </span>
                        )}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isOpen ? 'bg-prime/10 text-prime rotate-180' : 'bg-light/80 text-text-muted hover:text-prime-dark'
                            }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-border-muted/40 animate-in fade-in duration-200">
                        <div
                          className="rich-text skilldeck-rich-text py-3 prose-sm max-w-none text-slate-700 font-normal"
                          dangerouslySetInnerHTML={{ __html: item.des }}
                        />

                        <div className="mt-2 pt-3 border-t border-border-muted/30 flex items-center justify-between text-[11.5px]">
                          {item.duration ? (
                            <span className="text-text-muted flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Estimated completion: {item.duration}</span>
                            </span>
                          ) : (
                            <span />
                          )}
                          <button
                            type="button"
                            onClick={handleDownloadCurriculum}
                            className="inline-flex items-center gap-1 font-bold text-prime hover:underline cursor-pointer ml-auto"
                          >
                            <span>Download Full Syllabus</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Sticky Sidebar (Only renders if skills, tools, or tagline exist in API) */}
        {hasSidebarContent && (
          <div className="order-2 lg:order-2 lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="rounded-lg bg-gradient-to-b from-[#0a192f] via-prime-dark to-[#071322] text-white p-5 sm:p-6 shadow-xl border border-white/10 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-white/10 pb-4">
                <div className="relative w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center p-2 shrink-0 border border-white/15">
                  <Image
                    src="/course/skills.webp"
                    alt="Skills"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-prime-yellow block">
                    Curriculum Focus
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                    Skills & Competencies
                  </h3>
                </div>
              </div>

              {/* Dynamic Skills List (Parsed from API) */}
              {dynamicSkills.length > 0 && (
                <div className="space-y-2.5 text-xs sm:text-[13px] text-slate-200">
                  {dynamicSkills.slice(0, 10).map((skillText, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                      <span className="leading-snug">{skillText}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic Tools List (From API course.tools) */}
              {dynamicTools.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Wrench className="w-3.5 h-3.5 text-prime-yellow" />
                    <span>Tools & Platforms Covered</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dynamicTools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[11px] font-medium text-slate-200"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Tagline if available in API */}
              {tagline && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <span className="text-[10px] uppercase font-bold text-prime-yellow block mb-0.5">Highlights</span>
                  <p className="text-[11.5px] leading-relaxed text-slate-200">{tagline}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleTalkToAdvisor}
                  className="w-full bg-white/10 hover:bg-white/15 active:scale-95 text-white font-semibold text-xs py-2.5 rounded-xl border border-white/15 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                  <span>Talk to Learning Advisor</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
