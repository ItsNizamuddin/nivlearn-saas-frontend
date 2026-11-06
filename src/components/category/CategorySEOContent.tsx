'use client';

import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function CategorySEOContent({
  internalSection,
  bottomSection,
}: {
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const hasInternal = Boolean(internalSection?.value);
  const hasBottom = Boolean(bottomSection?.value);

  if (!hasInternal && !hasBottom) return null;

  return (
    <section className="section-container pb-12 pt-4">
      <div className="space-y-4">
        {hasInternal && (
          <div className="rounded-xl border border-border-muted bg-surface overflow-hidden">
            <button
              type="button"
              onClick={() => setInternalOpen(!internalOpen)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span className="font-heading text-sm sm:text-base font-bold text-prime-dark flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-prime" />
                {internalSection?.title || 'Program Overview & Career Pathways'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-prime shrink-0 transition-transform duration-300 ${
                  internalOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {internalOpen && (
              <div
                className="px-4 pb-5 sm:px-5 sm:pb-6 text-text-muted text-xs sm:text-sm leading-relaxed rich-text skilldeck-rich-text border-t border-border-muted/40 pt-3"
                dangerouslySetInnerHTML={{ __html: internalSection?.value || '' }}
              />
            )}
          </div>
        )}

        {hasBottom && (
          <div className="rounded-xl border border-border-muted bg-surface overflow-hidden">
            <button
              type="button"
              onClick={() => setBottomOpen(!bottomOpen)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span className="font-heading text-sm sm:text-base font-bold text-prime-dark flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-prime" />
                {bottomSection?.title || 'Certification Guide & Exam Guidelines'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-prime shrink-0 transition-transform duration-300 ${
                  bottomOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {bottomOpen && (
              <div
                className="px-4 pb-5 sm:px-5 sm:pb-6 text-text-muted text-xs sm:text-sm leading-relaxed rich-text skilldeck-rich-text border-t border-border-muted/40 pt-3"
                dangerouslySetInnerHTML={{ __html: bottomSection?.value || '' }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
