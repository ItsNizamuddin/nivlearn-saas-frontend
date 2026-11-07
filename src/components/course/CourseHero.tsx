'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Laptop, GraduationCap, Download, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import TruncatedContent from '@/components/ui/TruncatedContent';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import BannerScheduleCards from './BannerScheduleCards';
import type { CourseDetail } from '@/services/catalog.service';
import { parseToListItems } from '@/lib/utils';

export default function CourseHero({
  course,
  location,
}: {
  course: CourseDetail;
  location?: string;
}) {
  const { openModal } = useLeadModal();

  const categoryName = course.category?.name || 'Programs';
  const categorySlug = course.category?.slug || '';
  const card = course.courseCard;
  const banner = course.banner_content;

  const duration = card?.courseDuration;
  const mode = card?.courseMode;
  const type = card?.courseType;
  const accredationLogo = card?.accredation?.[0];
  const tagline = card?.tagline;

  const bannerDescription = banner?.description || banner?.banner_description || '';
  const bannerKeypoints = banner?.keypoints || banner?.banner_key_points || '';
  const keypointsList = React.useMemo(() => parseToListItems(bannerKeypoints), [bannerKeypoints]);
  const [isKeypointsExpanded, setIsKeypointsExpanded] = React.useState(false);

  const brochureUrl =
    course.leadmagnet?.[0]?.broucher?.url ||
    (course.leadmagnet?.[0] as unknown as { brochure?: { url?: string } })?.brochure?.url;

  const handleCurriculumDownload = () => {
    openModal({
      formTitle: 'Download Comprehensive Curriculum',
      formDescription: `Get the detailed module-by-module syllabus and project blueprints for ${course.course_title}.`,
      downloadUrl: brochureUrl,
      defaultValues: {
        leadSource: `course-hero-curriculum-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: false,
      },
    });
  };

  return (
    <section className="relative bg-white border-b border-slate-200/70 overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-14 lg:pt-10 lg:pb-16">
      <BrandBackdrop tone="light" size="lg" top="top-[70%]" className="hidden lg:block opacity-[0.05]" />

      <div className="section-container relative z-10">
        {/* Breadcrumbs - Clean natural wrap without horizontal scroll */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted mb-3 sm:mb-5 leading-relaxed">
          <Link href="/" className="hover:text-prime transition-colors shrink-0 font-medium">Home</Link>
          <span className="text-slate-300 shrink-0">/</span>
          {categorySlug ? (
            <Link href={`/${categorySlug}`} className="hover:text-prime transition-colors font-medium">
              {categoryName}
            </Link>
          ) : (
            <span className="font-medium">{categoryName}</span>
          )}
          <span className="text-slate-300 shrink-0">/</span>
          <span className="text-prime-dark font-semibold line-clamp-1">{course.course_title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Main Content Column (Left 7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-5">
            {/* Tagline Badge from API courseCard */}
            {tagline && (
              <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-prime" />
                <span>{tagline}</span>
              </div>
            )}

            {/* Course Heading */}
            <h1 className="font-heading text-xl sm:text-2xl 2xl:text-4xl font-black text-prime-dark tracking-tight leading-snug sm:leading-tight">
              {course.course_title}
            </h1>

            {/* Banner Description only from banner_content */}
            {bannerDescription && (
              <TruncatedContent
                content={bannerDescription}
                maxLines={2}
                className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl"
              />
            )}

            {/* Meta Badges / Pills Row */}
            {(duration || mode || type || accredationLogo) && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
                {duration && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-prime bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-prime/20 text-xs font-semibold shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-prime shrink-0" />
                    <span>{duration}</span>
                  </div>
                )}
                {mode && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-prime bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-prime/20 text-xs font-semibold shadow-2xs">
                    <Laptop className="w-3.5 h-3.5 text-prime shrink-0" />
                    <span className="capitalize">{mode}</span>
                  </div>
                )}
                {type && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-prime bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-prime/20 text-xs font-semibold shadow-2xs">
                    <GraduationCap className="w-3.5 h-3.5 text-prime shrink-0" />
                    <span className="capitalize">{type}</span>
                  </div>
                )}
                {accredationLogo && (
                  <div className="h-8 sm:h-10 w-20 sm:w-24 rounded-lg bg-white border border-slate-200/90 shadow-2xs p-1 flex items-center justify-center overflow-hidden">
                    <Image
                      src={accredationLogo.thumbnail || accredationLogo.url}
                      alt={accredationLogo.alt || 'Accreditation'}
                      width={80}
                      height={32}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Keypoints list parsed to clean array with <li> bullets */}
            {keypointsList.length > 0 && (
              <div className="pt-0.5 space-y-1.5 max-w-2xl">
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm marker:text-prime">
                  {(isKeypointsExpanded ? keypointsList : keypointsList.slice(0, 3)).map((point, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
                {keypointsList.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setIsKeypointsExpanded(!isKeypointsExpanded)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-prime text-xs font-semibold cursor-pointer underline underline-offset-4 decoration-slate-300 hover:decoration-prime transition-colors py-0.5"
                  >
                    <span>{isKeypointsExpanded ? 'Read Less' : 'Read More'}</span>
                    {isKeypointsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Hero Quick Stats from banner_content.stats */}
            {banner?.stats && banner.stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-slate-100">
                {banner.stats.map((st, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-extrabold text-prime-dark text-xs sm:text-sm">
                      {st.value}
                    </span>
                    <span className="text-text-muted text-[11px] sm:text-xs">
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons: balanced on mobile with prominent Download pill + side-by-side secondary actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 sm:pt-3">
              {/* All batches for this course, with filters and plan picker */}
              <Link
                href={`/schedules/${course.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-prime text-white bg-prime hover:bg-prime-dark hover:border-prime-dark font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                View Schedules
              </Link>
              <button
                type="button"
                onClick={handleCurriculumDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Curriculum</span>
              </button>
            </div>
          </div>

          {/* Right Column: Upcoming Batches / Schedule Cards */}
          <div id="schedules" className="lg:col-span-5 xl:col-span-4 w-full pt-2 lg:pt-0 scroll-mt-24">
            <BannerScheduleCards courseSlug={course.slug} courseTitle={course.course_title} />
          </div>
        </div>
      </div>
    </section>
  );
}
