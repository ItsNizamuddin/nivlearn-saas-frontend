'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Download, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';

export default function CourseSyllabus({ course }: { course: CourseDetail }) {
  const { openModal } = useLeadModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const modules = course.syllabus_content?.syllabus_accordian || [];
  const hasSkills = Boolean(course.skills?.length || course.tools?.length);

  if (modules.length === 0 && !hasSkills) {
    return null;
  }

  const handleDownloadCurriculum = () => {
    openModal({
      formTitle: 'Download Complete Syllabus & Capstone Specs',
      formDescription: `Get the detailed week-by-week curriculum and lab exercises for ${course.course_title}.`,
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

  return (
    <section id="syllabus" className="section-container py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Skills Focused Navy Box (4 cols) */}
        <div className="lg:col-span-4 h-fit rounded-2xl bg-prime-dark text-white p-6 shadow-xl space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/course/skills.webp"
                alt="Skills"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-prime-yellow block">
                Target Competencies
              </span>
              <h3 className="font-heading text-lg font-bold text-white">
                Skills Focused
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-200">
            {(course.skills && course.skills.length > 0) ? (
              course.skills.map((skill, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                  <span>{skill.name}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                  <span>End-to-End Enterprise Governance</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                  <span>Real-World Scenario Simulations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                  <span>Cross-Functional Team Collaboration</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prime-yellow shrink-0 mt-0.5" />
                  <span>Industry Exam Blueprint Mastery</span>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownloadCurriculum}
            className="w-full bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Syllabus PDF</span>
          </button>
        </div>

        {/* Right Column: Modules Accordion (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curriculum Breakdown</span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
                {course.course_title} Syllabus
              </h2>
            </div>
            <button
              type="button"
              onClick={handleDownloadCurriculum}
              className="inline-flex items-center gap-2 bg-prime-dark hover:bg-prime text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Full Curriculum</span>
            </button>
          </div>

          <div className="space-y-3">
            {modules.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'bg-surface border-prime/40 shadow-xs' : 'bg-surface/70 border-border-muted hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-prime/10 text-prime font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-prime-dark truncate sm:whitespace-normal">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {item.duration && (
                        <span className="text-[11px] font-semibold text-text-muted bg-slate-100 px-2.5 py-1 rounded-md hidden sm:inline-block">
                          {item.duration}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-prime transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-text-muted text-xs sm:text-sm leading-relaxed border-t border-border-muted/30 pt-3">
                      <div dangerouslySetInnerHTML={{ __html: item.des }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

