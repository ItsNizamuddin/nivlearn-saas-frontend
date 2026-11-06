'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Play,
  CheckCircle2,
  Sparkles,
  BookOpen,
  X,
  Building2,
  TrendingUp,
  Award,
  Hash,
  Users,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Laptop,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';
import { parseToListItems } from '@/lib/utils';

export default function CourseOverview({ course }: { course: CourseDetail }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { openModal } = useLeadModal();

  const overview = course.overview_content;
  if (!overview) return null;

  // Video resolution
  const videoThumb =
    (typeof overview.overview_video_thumbnail === 'string'
      ? overview.overview_video_thumbnail
      : typeof overview.overview_video_thumbnail === 'object'
        ? overview.overview_video_thumbnail?.url || overview.overview_video_thumbnail?.thumbnail
        : undefined) ||
    overview.videoThumbnail ||
    course.courseCard?.courseThumbnail?.url ||
    '/default.webp';

  const rawVideo =
    (typeof overview.overview_video_link === 'string'
      ? overview.overview_video_link
      : typeof overview.overview_video_link === 'object'
        ? overview.overview_video_link?.url
        : undefined) ||
    (typeof course.banner_content?.video_link === 'string'
      ? course.banner_content.video_link
      : typeof course.banner_content?.video_link === 'object'
        ? course.banner_content.video_link.url
        : undefined) ||
    overview.videoUrl;

  const hasValidVideo = Boolean(
    rawVideo &&
    rawVideo !== '#' &&
    (rawVideo.startsWith('http://') || rawVideo.startsWith('https://'))
  );

  const videoUrl = hasValidVideo
    ? rawVideo!.includes('youtube.com/watch?v=')
      ? rawVideo!.replace('watch?v=', 'embed/')
      : rawVideo!.includes('youtu.be/')
        ? `https://www.youtube.com/embed/${rawVideo!.split('youtu.be/')[1].split('?')[0]}`
        : rawVideo!
    : undefined;

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

  /**
   * Reusable Video Card rendered in sticky desktop sidebar and inline on mobile
   */
  const renderVideoCard = (isMobile = false) => (
    <div
      className={`rounded-2xl overflow-hidden bg-surface border border-border-muted/80 shadow-sm transition-all duration-300 hover:border-prime/40 hover:shadow-md ${isMobile ? 'block lg:hidden my-6' : 'hidden lg:block'
        }`}
    >
      <div
        className={`relative aspect-video w-full bg-slate-900 overflow-hidden ${hasValidVideo ? 'group cursor-pointer' : ''
          }`}
        onClick={() => {
          if (hasValidVideo) setIsVideoModalOpen(true);
        }}
      >
        <Image
          src={videoThumb}
          alt={`${course.course_title} Walkthrough`}
          fill
          sizes={isMobile ? '100vw' : '(max-width: 1280px) 380px, 420px'}
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
        />

        {/* Video overlay pill */}
        <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/10 z-10 shadow-sm">
          <Play className="w-3 h-3 text-prime-yellow fill-prime-yellow" />
          <span>Program Walkthrough</span>
        </div>

        {hasValidVideo && (
          <div className="absolute inset-0 bg-slate-950/35 group-hover:bg-slate-950/45 transition-colors flex items-center justify-center">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-prime-yellow text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-prime-yellow animate-ping opacity-25 pointer-events-none" />
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center px-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                Watch 2-Min Course Preview
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Advisory & Trust Highlights Box */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-prime-yellow uppercase tracking-wider">
          <Laptop className="w-4 h-4 text-prime" />
          <span>{course.courseCard?.courseMode || 'Live Mentor-Led Interactive Program'}</span>
        </div>

        {/* Value Assurances */}
        <ul className="space-y-2 text-xs text-slate-700 font-medium">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Practical curriculum with live projects</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Accredited certificate & hiring partner access</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1-on-1 career mentorship & mock interviews</span>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={() => handleEnquire('overview-sidebar')}
            className="w-full bg-prime hover:bg-prime-dark text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Check Eligibility & Syllabus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleAdvisor}
            className="w-full bg-light hover:bg-prime/10 text-prime hover:text-prime-dark font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer border border-prime/20 flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Speak with an Advisor</span>
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400 font-medium">
          Instant eligibility check • No commitment required
        </p>
      </div>
    </div>
  );

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

          {/* Mobile Video Walkthrough Preview (renders only on mobile < lg right after intro) */}
          {renderVideoCard(true)}

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
                <h4 className="font-heading text-sm font-bold text-prime-dark uppercase tracking-wider">
                  Industry Software & Practical Frameworks
                </h4>
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

        {/* Right Column: Sticky Video / Preview Card (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          {renderVideoCard(false)}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black hover:text-prime-yellow transition-all cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={
                videoUrl
                  ? videoUrl.includes('?')
                    ? `${videoUrl}&autoplay=1`
                    : `${videoUrl}?autoplay=1`
                  : ''
              }
              title="Course Program Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
