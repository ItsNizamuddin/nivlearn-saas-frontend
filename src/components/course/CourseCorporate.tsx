'use client';

import React from 'react';
import {
  Building2,
  ArrowRight,
  Users,
  ShieldCheck,
  TrendingUp,
  Laptop,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

const ENTERPRISE_FEATURES = [
  {
    icon: Laptop,
    iconColor: 'text-prime',
    iconBg: 'bg-prime/10',
    title: 'Customized Team Curriculums',
    description: 'Tailored specifically to match your technology stack, architectural roadmaps, and project deadlines.',
  },
  {
    icon: Users,
    iconColor: 'text-prime-yellow',
    iconBg: 'bg-prime-yellow/15',
    title: 'Dedicated Enterprise Cohorts',
    description: 'Synchronized live interactive batches scheduled around your team’s timezones and workflow availability.',
  },
  {
    icon: Layers,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    title: 'Hands-On Labs & Sandboxes',
    description: 'Real-world enterprise capstone projects, sandbox environments, and actionable competency drills.',
  },
  {
    icon: TrendingUp,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    title: 'Pre & Post Skill Benchmarking',
    description: 'Measurable competency reports, ROI benchmarks, and management dashboards tracking team velocity.',
  },
];

const ENTERPRISE_STATS = [
  { value: '3,000+', label: 'Organizations Trained' },
  { value: '98.4%', label: 'Team Completion Rate' },
  { value: '50+', label: 'Countries Supported' },
  { value: '4.9/5', label: 'Partner Satisfaction' },
];

const CORPORATE_LOGOS = [
  'bg-CorpVertical__2_', 'bg-CorpVertical__3_', 'bg-CorpVertical__4_', 'bg-CorpVertical__5_',
  'bg-CorpVertical__6_', 'bg-CorpVertical__7_', 'bg-CorpVertical__8_', 'bg-CorpVertical__9_',
  'bg-CorpVertical__10_', 'bg-CorpVertical__11_', 'bg-CorpVertical__12_', 'bg-CorpVertical__13_',
];

export default function CourseCorporate({
  courseTitle,
  courseSlug,
}: {
  courseTitle?: string;
  courseSlug?: string;
}) {
  const { openModal } = useLeadModal();

  const handleCorporate = () => {
    openModal({
      formTitle: courseTitle
        ? `Corporate Training: ${courseTitle}`
        : 'Corporate Enterprise Training Solutions',
      formDescription:
        'Request custom batch schedules, volume team licensing, and tailored skill assessments for your organization.',
      defaultValues: {
        leadSource: courseSlug ? `course-corporate-${courseSlug}` : 'course-corporate-section',
        courseSlug: courseSlug,
        purpose: 'Corporate Training',
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
        company: true,
        designation: true,
      },
    });
  };

  return (
    <section id="corporate" className="relative bg-gradient-to-b from-[#F8FAFC] via-light/30 to-white py-12 sm:py-16 lg:py-20 border-b border-border-muted/50 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Upskilling Solutions</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-black text-prime-dark tracking-tight leading-tight">
            Upskill Your Workforce with Tailored Enterprise Cohorts
          </h2>

          <p className="mt-3 text-sm  text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {courseTitle
              ? `Empower your engineering and product teams with customized ${courseTitle} training, enterprise sandboxes, and verifiable ROI metrics.`
              : 'Empower your engineering and product teams with customized training batches, enterprise sandboxes, and verifiable ROI metrics.'}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP VIEW: 12-Column Grid (hidden lg:grid)
           ══════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 4 Enterprise Features & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {ENTERPRISE_FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-surface border border-border-muted/80 rounded-lg p-5 shadow-xs hover:border-prime/40 hover:shadow-sm transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-lg ${feat.iconBg} ${feat.iconColor} flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-prime-dark mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Proof Metric Strip */}
            <div className="grid grid-cols-4 gap-3 bg-surface border border-border-muted/80 rounded-lg p-4 shadow-xs text-center">
              {ENTERPRISE_STATS.map((stat, idx) => (
                <div key={idx} className={idx !== 0 ? 'border-l border-border-muted/60 pl-2' : ''}>
                  <p className="text-lg 2xl:text-xl font-black text-prime-dark tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCorporate}
                className="inline-flex items-center gap-2 bg-prime-yellow hover:bg-amber-400 active:scale-95 text-white font-extrabold text-sm py-3 px-6 rounded-lg shadow-md transition-all cursor-pointer group"
              >
                <span>Request Enterprise Demo &amp; Rates</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Global Enterprise Logos & Trust Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface rounded-lg  border border-border-muted/80 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border-muted/60 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-prime-dark uppercase tracking-wider">
                    Trusted by Fortune 500 &amp; Tech Unicorns
                  </span>
                </div>
                <span className="text-[11px] font-bold text-prime bg-light px-2 py-0.5 rounded-full border border-prime/20">
                  Global
                </span>
              </div>

              {/* Logo Grid */}
              <div className="grid grid-cols-3 gap-3 place-items-center">
                {CORPORATE_LOGOS.map((sprite, idx) => (
                  <div
                    key={idx}
                    className="w-full h-14 rounded-xl border border-border-muted/50 bg-slate-50/50 flex items-center justify-center p-2 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 hover:border-prime/30 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className={`${sprite} scale-[0.65] transform-gpu origin-center`} />
                  </div>
                ))}
              </div>

              {/* Endorsement Quote */}
              <div className="rounded-xl bg-sec-prime/60 border border-border-muted/60 p-4 space-y-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-prime-dark">
                    Enterprise Outcome Highlight
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;NivLearn allowed us to upskill 120+ team members across 3 continents with zero scheduling friction and measurable competency gains.&rdquo;
                </p>
                <p className="text-[11px] text-slate-500 font-semibold not-italic">
                  — VP of Learning &amp; Development, Global FinTech Enterprise
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE VIEW: Compact, Touch-Optimized (block lg:hidden)
           ══════════════════════════════════════════════════════ */}
        <div className="block lg:hidden space-y-6">
          {/* Feature Highlights: 1-Column Cards */}
          <div className="space-y-3">
            {ENTERPRISE_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface border border-border-muted/80 rounded-lg p-4 shadow-xs flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-lg ${feat.iconBg} ${feat.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-prime-dark">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proof Stats 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5 bg-surface border border-border-muted/80 rounded-lg p-3.5 shadow-xs text-center">
            {ENTERPRISE_STATS.map((stat, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50/60">
                <p className="text-lg font-black text-prime-dark tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Corporate Logos Carousel/Strip */}
          <div className="bg-surface rounded-lg border border-border-muted/80 p-4 shadow-xs space-y-3">
            <p className="text-xs font-bold text-center text-prime-dark uppercase tracking-wider">
              Trusted by 3,000+ Enterprises Worldwide
            </p>
            <div className="grid grid-cols-3 gap-2 place-items-center">
              {CORPORATE_LOGOS.slice(0, 6).map((sprite, idx) => (
                <div
                  key={idx}
                  className="w-full h-12 rounded-lg border border-border-muted/50 bg-slate-50/50 flex items-center justify-center p-1 grayscale"
                >
                  <div className={`${sprite} scale-[0.55] transform-gpu origin-center`} />
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleCorporate}
              className="w-full inline-flex items-center justify-center gap-2 bg-prime-yellow hover:bg-amber-400 active:scale-95 text-white font-extrabold text-xs sm:text-sm py-3 px-5 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <span>Request Enterprise Demo &amp; Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
