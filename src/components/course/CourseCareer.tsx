'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Download, TrendingUp } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';

export default function CourseCareer({ course }: { course: CourseDetail }) {
  const { openModal } = useLeadModal();

  const career = course.career;
  const pathItems = career?.path || career?.career_path || [];
  const certSteps = career?.certification_process || [];

  if (!career || (pathItems.length === 0 && certSteps.length === 0)) {
    return null;
  }

  const handleDownload = () => {
    openModal({
      formTitle: 'Download Accreditation Blueprint & Certificate Spec',
      formDescription: `Access the certification roadmap, qualifying criteria, and verifiable credential specs for ${course.course_title}.`,
      defaultValues: {
        leadSource: `course-career-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  return (
    <section id="career" className="section-container py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Career Path (Left 4 cols) */}
        {pathItems.length > 0 && (
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Growth Trajectory</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-prime-dark">
                Career Path
              </h3>
            </div>

            <div className="space-y-2.5">
              {pathItems.map((item, index) => {
                const label = item.title || item.value || '';
                if (!label) return null;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-border-muted bg-white shadow-2xs hover:border-prime-yellow/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-prime-yellow/15 text-prime-yellow font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certification Process (Middle 5 cols) */}
        {certSteps.length > 0 && (
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>Step-by-Step Roadmap</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-prime-dark">
                Certification Process
              </h3>
            </div>

            <div className="space-y-3">
              {certSteps.map((step, index) => {
                const desc = step.title || step.value || step.desc || step.description || '';
                if (!desc) return null;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs hover:border-prime/30 transition-colors"
                  >
                    <span className="font-mono text-sm font-bold text-prime shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right CTA Card with Girl Illustration (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-prime-dark text-white p-6 shadow-xl flex flex-col justify-between text-center lg:sticky lg:top-24 space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-prime-yellow block mb-1">
              Accredited Recognition
            </span>
            <h4 className="font-heading text-base font-bold">
              Achieve the next big milestone in your career
            </h4>
            <p className="text-xs text-white/70 mt-1">
              Verifiable credentials recognized worldwide
            </p>
          </div>

          <div className="flex justify-center my-2">
            <Image
              src="/course/ctfdown/ctfgirl.webp"
              alt="Certification Achiever"
              width={200}
              height={220}
              className="w-auto h-44 object-contain"
            />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Spec</span>
          </button>
        </div>
      </div>
    </section>
  );
}

