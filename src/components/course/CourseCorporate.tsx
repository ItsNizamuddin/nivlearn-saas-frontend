'use client';

import React from 'react';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

const CORPORATE_POINTS = [
  '20+ Trending Technology resources sourced for enterprise squads',
  'Transformed 3,000+ organizations across North America & APAC',
  '400+ Global enterprise associations and customized LMS roadmaps',
  'Pre & Post training evaluation with measurable candidate competency reports',
];

const CORPORATE_LOGOS = [
  'bg-CorpVertical__2_', 'bg-CorpVertical__3_', 'bg-CorpVertical__4_', 'bg-CorpVertical__5_',
  'bg-CorpVertical__6_', 'bg-CorpVertical__7_', 'bg-CorpVertical__8_', 'bg-CorpVertical__9_',
  'bg-CorpVertical__10_', 'bg-CorpVertical__11_', 'bg-CorpVertical__12_', 'bg-CorpVertical__13_',
];

export default function CourseCorporate() {
  const { openModal } = useLeadModal();

  const handleCorporate = () => {
    openModal({
      formTitle: 'Corporate Enterprise Training Solutions',
      formDescription: 'Request custom batch schedules, volume licensing, and team skill assessments tailored to your enterprise goals.',
      defaultValues: {
        leadSource: 'course-corporate-section',
        purpose: 'Corporate Training',
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-12 lg:py-20 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Corporate Value (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Training Partner</span>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
              Upskill Your Entire Team with Custom Enterprise Batches
            </h2>

            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
              We partner with Fortune 500 enterprises, tech unicorns, and consultancies to deliver synchronized live workshops, custom syllabus modules, and corporate reporting dashboards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {CORPORATE_POINTS.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCorporate}
                className="inline-flex items-center gap-2 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Request Enterprise Demo & Rates</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Column: Corporate Logos Strip (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-xs font-bold text-prime-dark uppercase tracking-wider mb-4 text-center">
              Trusted by Top Tier Global Brands
            </h4>
            <div className="grid grid-cols-3 gap-4 place-items-center">
              {CORPORATE_LOGOS.map((sprite, idx) => (
                <div key={idx} className="p-2 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                  <div className={`${sprite} scale-75`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

