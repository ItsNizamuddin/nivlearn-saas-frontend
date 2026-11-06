'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';

export default function CourseFAQ({ course }: { course: CourseDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useLeadModal();

  const rawFaqs = course.faqs;
  const faqs = (rawFaqs || [])
    .map((f) => ({
      question: f.question || f.title || '',
      answer: f.answer || f.value || f.des || '',
    }))
    .filter((f) => Boolean(f.question && f.answer));

  // If there are no real FAQs provided for this course, remove/hide the section entirely
  if (faqs.length === 0) {
    return null;
  }

  const handleAskAdvisor = () => {
    openModal({
      formTitle: `Talk To Our Adviser`,
      formDescription: `Our admissions team is available to answer all questions regarding eligibility, batch schedules, fees, and syllabus details.`,
      defaultValues: {
        leadSource: `course-faq-${course.slug}`,
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
    <section id="faqs" className="relative bg-white py-12 sm:py-14 border-b border-border-muted/50 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ══════════════════════════════════════════════════════
              LEFT SIDEBAR: Context & Advisor Card (Desktop 4-5 cols, Mobile Header)
             ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-black text-prime-dark tracking-tight leading-tight">
                Everything You Need to Know
              </h2>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Clear answers regarding cohort timings, course prerequisites, live mentorship, and certificate accreditation for {course.course_title}.
              </p>
            </div>

            {/* Support / Ask Advisor Box (Desktop Only) */}
            <div className="hidden lg:block bg-gradient-to-br from-light/50 via-white to-light/30 border border-border-muted/80 rounded-lg p-5 shadow-xs space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-prime/10 text-prime flex items-center justify-center">
                <MessageCircleQuestion className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-prime-dark">
                  Didn&apos;t find what you&apos;re looking for?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Connect with a dedicated learning advisor to discuss custom schedules, corporate cohorts, or flexible installment options.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAskAdvisor}
                className="w-full inline-flex items-center justify-center gap-2 bg-prime hover:bg-prime-dark text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Ask an Admissions Advisor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive FAQ Accordion (7 cols)
             ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'bg-surface border-prime/40 shadow-xs ring-1 ring-prime/10'
                    : 'bg-surface border-border-muted/80 hover:border-slate-300'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors ${isOpen
                          ? 'bg-prime text-white'
                          : 'bg-light text-prime'
                          }`}
                      >
                        {index + 1}
                      </div>

                      <span className="font-heading text-sm sm:text-base font-bold text-prime-dark leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen
                        ? 'bg-prime/10 text-prime rotate-180'
                        : 'bg-slate-100 text-slate-500'
                        }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-border-muted/40 pt-3.5 pl-13">
                      <div
                        className="prose max-w-none text-slate-600 text-xs sm:text-sm prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile-Only Advisor Prompt Card */}
            <div className="block lg:hidden mt-6 bg-light border border-prime/20 rounded-xl p-4 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-prime text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Have a specific question not covered here?</span>
              </div>
              <button
                type="button"
                onClick={handleAskAdvisor}
                className="w-full inline-flex items-center justify-center gap-2 bg-prime hover:bg-prime-dark text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Ask a Learning Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
