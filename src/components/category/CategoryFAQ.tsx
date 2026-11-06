'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function CategoryFAQ({
  categoryName,
  faqs,
}: {
  categoryName: string;
  faqs?: Array<{ question: string; answer: string; _id?: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faqs" className="section-container py-10 lg:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
          Frequently Asked Questions on {categoryName}
        </h2>
        <p className="text-text-muted text-xs sm:text-sm mt-1">
          Everything you need to know about course eligibility, curriculum accreditation, and schedules.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq._id || index}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-surface border-prime/40 shadow-xs' : 'bg-surface/60 border-border-muted hover:border-slate-300'
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
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-text-muted text-xs sm:text-sm leading-relaxed border-t border-border-muted/30 mt-1">
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

