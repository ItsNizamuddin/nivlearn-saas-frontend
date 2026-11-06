'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { CourseDetail } from '@/services/catalog.service';

const DEFAULT_COURSE_FAQS = [
  {
    question: 'How do live virtual cohort sessions work?',
    answer: 'All sessions are conducted live by certified industry practitioners using interactive screen sharing, hands-on lab environments, and real-time Q&A. You receive lifetime access to session recordings within 2 hours of batch conclusion.',
  },
  {
    question: 'What is the certification pass guarantee?',
    answer: 'We provide comprehensive full-length exam simulations, question banks with detailed rationale, and 1-on-1 advisor evaluations. If you do not pass on your first attempt, you may re-attend upcoming batches for free until certified.',
  },
  {
    question: 'Are installment fee plans and group discounts available?',
    answer: 'Yes! We offer no-cost EMI options across major credit cards and customized team discounts for 3 or more enrollments from the same organization.',
  },
  {
    question: 'Will I receive placement and resume review support?',
    answer: 'Every candidate receives dedicated 1-on-1 resume optimization, LinkedIn profile review, and access to our hiring partner portal with priority referrals.',
  },
];

export default function CourseFAQ({ course }: { course: CourseDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rawFaqs = course.faqs;
  const faqs = rawFaqs && rawFaqs.length > 0
    ? rawFaqs.map((f) => ({
        question: f.question || f.title || '',
        answer: f.answer || f.value || f.des || '',
      })).filter((f) => f.question && f.answer)
    : DEFAULT_COURSE_FAQS;

  return (
    <section id="faqs" className="section-container py-12 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clear Answers</span>
        </div>
        <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
          Frequently Asked Questions About {course.course_title}
        </h2>
        <p className="text-text-muted text-xs sm:text-sm mt-1">
          Everything you need to know regarding batch timings, exam criteria, and career advisory.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
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
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-heading text-sm sm:text-base font-bold text-prime-dark">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-prime shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-text-muted text-xs sm:text-sm leading-relaxed border-t border-border-muted/30 pt-3">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

