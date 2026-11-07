'use client';

import React, { useState } from 'react';
import { ChevronDown, Link2, BookOpen } from 'lucide-react';

interface HomeSEOContentProps {
  internalSection?: { title?: string; value?: string };
  bottomSection?: { title?: string; value?: string };
}

const DEFAULT_INTERNAL_LINKS = `
<div class="space-y-3">
  <p class="text-xs sm:text-sm text-foreground-muted">
    Explore top-rated agency training programs, bootcamps, and career certifications across key domains:
  </p>
  <div class="flex flex-wrap gap-x-2 gap-y-2 text-xs sm:text-sm text-prime leading-relaxed">
    <a href="/trainings/digital-marketing-course" class="hover:underline hover:text-prime-dark transition-colors">Digital Marketing Course in Bangalore</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings/seo-course" class="hover:underline hover:text-prime-dark transition-colors">Advanced SEO Training</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings/google-ads-course" class="hover:underline hover:text-prime-dark transition-colors">Google Ads & Performance Marketing</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings/social-media-marketing-course" class="hover:underline hover:text-prime-dark transition-colors">Social Media Marketing Course</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings/full-stack-web-development" class="hover:underline hover:text-prime-dark transition-colors">Full Stack Web Development Training</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings/wordpress-development-course" class="hover:underline hover:text-prime-dark transition-colors">WordPress Development Course</a>
    <span class="text-border-muted">|</span>
    <a href="/bootcamps" class="hover:underline hover:text-prime-dark transition-colors">Intensive Tech Bootcamps</a>
    <span class="text-border-muted">|</span>
    <a href="/trainings" class="hover:underline hover:text-prime-dark transition-colors">Professional Certification Trainings</a>
    <span class="text-border-muted">|</span>
    <a href="/corporate" class="hover:underline hover:text-prime-dark transition-colors">Corporate Team Upskilling</a>
    <span class="text-border-muted">|</span>
    <a href="/hire-from-us" class="hover:underline hover:text-prime-dark transition-colors">Hire Trained Talent</a>
    <span class="text-border-muted">|</span>
    <a href="/blog" class="hover:underline hover:text-prime-dark transition-colors">Industry Career Insights & Guides</a>
  </div>
</div>
`;

const DEFAULT_BOTTOM_CONTENT = `
<article class="space-y-4 text-xs sm:text-sm text-foreground-muted leading-relaxed">
  <div>
    <h3 class="text-base sm:text-lg font-bold text-foreground mb-2">
      Practice-Based & Agency-Oriented Digital Training Institute
    </h3>
    <p>
      NivLearn is India’s premier career accelerator delivering 100% practical, agency-style training designed to transform graduates and professionals into high-impact industry specialists. Unlike conventional institutes focused solely on textbook theory, our curriculum immerses learners directly into real agency environments, managing live client ad budgets, running conversion-optimized SEO campaigns, and building production web applications.
    </p>
  </div>

  <div>
    <h3 class="text-base sm:text-lg font-bold text-foreground mb-2">
      Why Choose Agency-Style Learning at NivLearn?
    </h3>
    <p>
      Our training model bridges the gap between traditional education and actual employer expectations. Every module incorporates real business deliverables, sandbox tools, and campaign audits under the mentorship of senior agency directors. Students master industry-standard software including Google Ads Manager, Meta Business Suite, Ahrefs, SEMrush, Google Analytics 4, Figma, and modern generative AI tools.
    </p>
  </div>

  <div>
    <h3 class="text-base sm:text-lg font-bold text-foreground mb-2">
      100% Dedicated Placement & Career Acceleration
    </h3>
    <p>
      Beyond comprehensive technical instruction, NivLearn’s placement cell ensures each student is job-ready from day one. Learners receive personalized 1-on-1 resume optimization, GitHub and LinkedIn portfolio enhancement, mock behavioral and technical interview coaching, and direct interview opportunities through our extensive network of hiring partner agencies and enterprises.
    </p>
  </div>

  <div>
    <h3 class="text-base sm:text-lg font-bold text-foreground mb-2">
      Flexible Learning Formats Designed for Every Schedule
    </h3>
    <p>
      Whether you are a college student, job seeker, or working professional seeking career progression, NivLearn provides tailored schedules including weekday immersive cohorts, weekend intensive batches, interactive live online classes, and classroom sessions across major tech hubs.
    </p>
  </div>
</article>
`;

export default function HomeSEOContent({
  internalSection,
  bottomSection,
}: HomeSEOContentProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const internalTitle = internalSection?.title || 'Useful Links & Training Programs';
  const internalHtml = internalSection?.value || DEFAULT_INTERNAL_LINKS;

  const bottomTitle =
    bottomSection?.title || 'India’s #1 Agency-Based Practical Training Institute';
  const bottomHtml = bottomSection?.value || DEFAULT_BOTTOM_CONTENT;

  return (
    <section className="section-container pb-14 pt-2">
      <div className="space-y-4">
        {/* Internal Linking Section */}
        <div className="rounded-xl border border-border-muted bg-surface overflow-hidden">
          <button
            type="button"
            onClick={() => setInternalOpen(!internalOpen)}
            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            aria-expanded={internalOpen}
          >
            <span className="font-heading text-sm sm:text-base font-bold text-prime-dark flex items-center gap-2">
              <Link2 className="w-4 h-4 text-prime shrink-0" />
              {internalTitle}
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
              dangerouslySetInnerHTML={{ __html: internalHtml }}
            />
          )}
        </div>

        {/* SEO Bottom Content Section */}
        <div className="rounded-xl border border-border-muted bg-surface overflow-hidden">
          <button
            type="button"
            onClick={() => setBottomOpen(!bottomOpen)}
            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            aria-expanded={bottomOpen}
          >
            <span className="font-heading text-sm sm:text-base font-bold text-prime-dark flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-prime shrink-0" />
              {bottomTitle}
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
              dangerouslySetInnerHTML={{ __html: bottomHtml }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

