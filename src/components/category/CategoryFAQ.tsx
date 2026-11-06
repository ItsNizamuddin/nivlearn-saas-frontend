'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export interface CategoryFAQItem {
  question?: string;
  answer?: string;
  title?: string;
  value?: string;
  ans?: string;
  des?: string;
  description?: string;
  _id?: string;
}

interface CategoryFAQProps {
  categoryName: string;
  categorySlug?: string;
  faqs?: CategoryFAQItem[];
}

export default function CategoryFAQ({
  categoryName,
  categorySlug,
  faqs,
}: CategoryFAQProps) {
  const { openModal } = useLeadModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Normalize FAQs supporting both {question, answer} and CMS format {title, value}
  const normalizedFaqs = useMemo(() => {
    const parsed = (faqs || [])
      .map((item, idx) => {
        const q = item.question || item.title || '';
        const a = item.answer || item.value || item.ans || item.des || item.description || '';
        return {
          id: item._id || `faq-${idx}`,
          question: q.trim(),
          answer: a.trim(),
        };
      })
      .filter((item) => item.question && item.answer);

    if (parsed.length > 0) return parsed;

    // High-value fallback FAQs tailored to the category when CMS data is empty
    return [
      {
        id: 'fallback-1',
        question: `What are the eligibility requirements for ${categoryName} programs?`,
        answer: `<p>Our ${categoryName} programs are designed for learners from diverse backgrounds, including beginners, career switchers, and working professionals. No prior advanced technical degree is required — training starts with foundational concepts before moving into advanced hands-on applications.</p>`,
      },
      {
        id: 'fallback-2',
        question: `Will I work on live real-world projects during the course?`,
        answer: `<p>Yes, practical implementation is at the core of our curriculum. You will work on real client simulation briefs, live agency sandboxes, and portfolio capstone projects with 1-on-1 mentor guidance.</p>`,
      },
      {
        id: 'fallback-3',
        question: `Are the certifications globally recognized by hiring companies?`,
        answer: `<p>All program completion certificates are accredited and recognized by global enterprise hiring partners. Each certificate comes with a unique, verifiable digital credential URL and accreditation seal.</p>`,
      },
      {
        id: 'fallback-4',
        question: `What kind of career placement and interview support is offered?`,
        answer: `<p>Learners receive end-to-end career support including 1-on-1 resume optimization, LinkedIn profile reviews, mock technical interviews, and direct referrals to our network of corporate hiring partners.</p>`,
      },
      {
        id: 'fallback-5',
        question: `Are flexible weekday and weekend batch timings available?`,
        answer: `<p>Yes, we offer multiple cohort batches including weekday morning/evening slots and weekend intensive batches to accommodate busy schedules for both working professionals and students.</p>`,
      },
    ];
  }, [faqs, categoryName]);

  const handleAdvisorClick = () => {
    openModal({
      formTitle: `FAQ Inquiry: ${categoryName}`,
      formDescription: `Connect with an academic advisor to get personalized answers regarding curriculum, admissions, and schedules.`,
      defaultValues: {
        leadSource: `category-faq-${categorySlug || 'general'}`,
        purpose: `FAQ Query: ${categoryName}`,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  return (
    <section id="faqs" className="section-container py-10 lg:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-prime-dark tracking-tight leading-tight">
          Frequently Asked Questions on {categoryName}
        </h2>
        <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Everything you need to know about course eligibility, curriculum accreditation, project mentorship, and schedules.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {normalizedFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const numStr = String(index + 1).padStart(2, '0');

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-surface border-prime/40 shadow-sm ring-1 ring-prime/15'
                  : 'bg-surface/80 border-border-muted/80 hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3.5 cursor-pointer focus:outline-none group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-prime text-white'
                        : 'bg-light text-text-muted group-hover:text-prime-dark'
                    }`}
                  >
                    {numStr}
                  </span>
                  <span className="font-heading text-sm sm:text-base font-bold text-prime-dark leading-snug group-hover:text-prime transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-prime/10 text-prime rotate-180'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-border-muted/40 mt-1">
                  <div
                    className="prose prose-sm max-w-none text-slate-600 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Advisor Prompt Card */}
      <div className="max-w-3xl mx-auto mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-light/80 via-surface to-light/40 border border-border-muted/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-prime/10 text-prime flex items-center justify-center shrink-0 hidden sm:flex">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-prime-dark">
              Still have questions about {categoryName}?
            </p>
            <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">
              Our learning advisors are online to provide personalized curriculum & fee guidance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdvisorClick}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-prime hover:bg-prime-dark active:scale-95 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Speak with an Advisor</span>
        </button>
      </div>
    </section>
  );
}
