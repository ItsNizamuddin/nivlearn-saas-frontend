'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Briefcase,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';

export default function CourseCareer({ course }: { course: CourseDetail }) {
  const { openModal } = useLeadModal();
  const [mobileTab, setMobileTab] = useState<'path' | 'cert'>('path');
  const certScrollRef = useRef<HTMLDivElement>(null);

  const career = course.career;
  const pathItems = career?.path || career?.career_path || [];
  const certSteps = career?.certification_process || [];
  const certificates = career?.certificates || [];

  if (!career || (pathItems.length === 0 && certSteps.length === 0 && certificates.length === 0)) {
    return null;
  }

  const handleAdvisor = () => {
    openModal({
      formTitle: 'Speak with a Career Advisor',
      formDescription: `Discuss personalized career progression, salary benchmarks, and cohort fit for ${course.course_title}.`,
      defaultValues: {
        leadSource: `course-career-advisor-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  const scrollCertificates = (direction: 'left' | 'right') => {
    if (certScrollRef.current) {
      const amount = 300;
      certScrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const careerTitle = career.career_title || `Career Trajectory & Certification in ${course.course_title}`;
  const careerDesc =
    career.career_description ||
    'A structured milestone roadmap designed to advance your professional standing into high-impact leadership roles, validated by globally recognized enterprise certification.';

  // Stage labels for progressive roles
  const getStageBadge = (index: number, total: number) => {
    if (index === 0) return 'Entry Milestone';
    if (index === total - 1) return 'Leadership Peak';
    if (index === Math.floor(total / 2)) return 'Mid-Senior Level';
    return `Level ${index + 1}`;
  };

  return (
    <section id="career" className="relative bg-white py-12 sm:py-16 border-b border-border-muted/50 overflow-hidden">
      <div className="section-container relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Career Outcomes &amp; Accreditation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-black text-prime-dark tracking-tight leading-tight">
            {careerTitle}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {careerDesc}
          </p>
        </div>

        {/* MOBILE VIEW: Interactive Segmented Switcher */}
        <div className="block lg:hidden">
          {pathItems.length > 0 && certSteps.length > 0 && (
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6 border border-slate-200">
              <button
                type="button"
                onClick={() => setMobileTab('path')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mobileTab === 'path'
                  ? 'bg-white text-prime-dark shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-prime" />
                <span>Career Path ({pathItems.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab('cert')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mobileTab === 'cert'
                  ? 'bg-white text-prime-dark shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <Award className="w-3.5 h-3.5 text-prime-yellow" />
                <span>Certification ({certSteps.length})</span>
              </button>
            </div>
          )}

          {/* Mobile Tab 1: Career Path */}
          {(mobileTab === 'path' || certSteps.length === 0) && pathItems.length > 0 && (
            <div className="space-y-4">
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-prime before:via-prime1 before:to-prime-yellow">
                {pathItems.map((item, idx) => {
                  const label = item.title || item.value || '';
                  const desc = item.description || '';
                  if (!label) return null;
                  return (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-3.5 w-5 h-5 rounded-full bg-white border-2 border-prime flex items-center justify-center shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-prime" />
                      </div>

                      <div className="bg-surface border border-border-muted/80 rounded-lg p-4 shadow-xs">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-prime uppercase tracking-wider">
                            Stage 0{idx + 1}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-light border border-prime/20 text-prime-dark">
                            {getStageBadge(idx, pathItems.length)}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-sm text-prime-dark">
                          {label}
                        </h4>
                        {desc && (
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleAdvisor}
                className="w-full py-2.5 px-4 rounded-lg bg-light hover:bg-prime/10 border border-prime/20 text-prime font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Personalized Salary Trajectory</span>
              </button>
            </div>
          )}

          {/* Mobile Tab 2: Certification Process */}
          {(mobileTab === 'cert' || pathItems.length === 0) && (
            <div className="space-y-3">
              {certSteps.map((step, idx) => {
                const desc = step.title || step.value || step.desc || step.description || '';
                if (!desc) return null;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg border border-border-muted/80 bg-surface shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-prime-yellow/15 text-prime-yellow font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-prime-yellow/30">
                      0{idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* DESKTOP VIEW: Balanced Two-Track Grid */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Track 1: Career Progression Journey (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between pb-1 border-b border-border-muted/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-prime/10 text-prime flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-prime-dark">
                    Career Progression Milestones
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gradual evolution from initial mastery to executive leadership
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-prime bg-light px-2.5 py-1 rounded-full border border-prime/20">
                {pathItems.length} Key Stages
              </span>
            </div>

            {/* Connected Vertical Timeline */}
            <div className="relative pl-8 space-y-4 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-prime before:via-prime1 before:to-prime-yellow">
              {pathItems.map((item, idx) => {
                const label = item.title || item.value || '';
                const desc = item.description || '';
                if (!label) return null;
                return (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-8 top-3.5 w-6 h-6 rounded-full bg-white border-2 border-prime flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-prime-yellow transition-all">
                      <span className="w-2 h-2 rounded-full bg-prime group-hover:bg-prime-yellow transition-colors" />
                    </div>

                    <div className="bg-surface border border-border-muted/80 rounded-lg p-4 sm:p-4.5 shadow-xs hover:border-prime/50 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-xs font-black text-prime tracking-wide uppercase">
                          Stage 0{idx + 1}
                        </span>
                        <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-light border border-prime/20 text-prime-dark">
                          {getStageBadge(idx, pathItems.length)}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-prime-dark group-hover:text-prime transition-colors">
                        {label}
                      </h4>
                      {desc && (
                        <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAdvisor}
                className="inline-flex items-center gap-2 text-xs font-bold text-prime hover:text-prime-dark transition-colors cursor-pointer group"
              >
                <span>Want to map your specific current background to this trajectory?</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Track 2: Step-by-Step Certification Roadmap (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-1 border-b border-border-muted/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-prime-yellow/15 text-prime-yellow flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-prime-dark">
                    Certification &amp; Qualifying Process
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transparent framework to qualify and claim your credential
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-prime-yellow bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Verifiable
              </span>
            </div>

            {/* Certification Step Cards */}
            <div className="space-y-3">
              {certSteps.map((step, idx) => {
                const desc = step.title || step.value || step.desc || step.description || '';
                if (!desc) return null;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border-muted/80 bg-surface shadow-xs hover:border-prime/40 hover:shadow-xs transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-light to-white border border-prime/20 text-prime font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-105 group-hover:bg-prime group-hover:text-secondary transition-all">
                      0{idx + 1}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Phase 0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTERED ACCREDITED CERTIFICATES SHOWCASE (Scrollable if multiple) */}
        {certificates.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border-muted/50 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-prime-dark uppercase tracking-wider">
                Accredited Certificates &amp; Credentials
              </span>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Desktop Scroll Arrow Controls (when more than 2 certificates) */}
              {certificates.length > 2 && (
                <>
                  <button
                    type="button"
                    onClick={() => scrollCertificates('left')}
                    aria-label="Previous certificate"
                    className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-border-muted shadow-md items-center justify-center text-slate-700 hover:text-prime hover:border-prime transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCertificates('right')}
                    aria-label="Next certificate"
                    className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-border-muted shadow-md items-center justify-center text-slate-700 hover:text-prime hover:border-prime transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Scroll Container: centers when few, smoothly scrolls horizontally when many */}
              <div
                ref={certScrollRef}
                className="overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
              >
                <div className="flex items-start justify-center gap-4 w-max min-w-full mx-auto">
                  {certificates.map((cert, cIdx) => {
                    const imgUrl = cert.certimg?.url || cert.certimg?.thumbnail || cert.image || cert.url;
                    if (!imgUrl) return null;
                    const name = cert.name || cert.title;
                    const desc = cert.description || cert.desc;

                    return (
                      <div
                        key={cIdx}
                        className="w-64 sm:w-72 shrink-0 rounded-xl border border-border-muted overflow-hidden bg-surface p-3 shadow-xs hover:border-prime/40 hover:shadow-sm transition-all text-center"
                      >
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                          <Image
                            src={imgUrl}
                            alt={name || 'Accredited Course Certificate'}
                            fill
                            sizes="(max-width: 768px) 260px, 290px"
                            className="object-contain p-2"
                          />
                        </div>
                        {name && (
                          <p className="text-center font-bold text-xs text-prime-dark mt-2 truncate">
                            {name}
                          </p>
                        )}
                        {desc && (
                          <p className="text-center text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-3">
                            {desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
