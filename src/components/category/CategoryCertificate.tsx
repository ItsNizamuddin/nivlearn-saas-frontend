'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ArrowRight, Download, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

interface CategoryCertificateProps {
  title: string;
  categorySlug?: string;
}

export default function CategoryCertificate({
  title,
  categorySlug,
}: CategoryCertificateProps) {
  const { openModal } = useLeadModal();

  const handleEnquire = () => {
    openModal({
      formTitle: `Request Sample Certificate & Syllabus: ${title}`,
      formDescription: `Explore accredited credentials, accreditation validation, and exam pass guidelines for ${title}.`,
      defaultValues: {
        leadSource: `category-certificate-${categorySlug || 'general'}`,
        purpose: `Certificate Sample: ${title}`,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  return (
    <section className="section-container py-10 lg:py-16">
      <div className="relative rounded-3xl bg-gradient-to-br from-light via-surface to-blue-50/40 p-6 sm:p-10 lg:p-12 border border-border-muted/80 shadow-sm overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-prime/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Certificate Mockup Preview (Desktop: 5 cols, Mobile: full width) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group hover:shadow-2xl transition-all duration-300">
              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur-xs border border-border-muted/70 text-[10px] font-bold text-prime-dark shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verifiable Digital Credential</span>
              </div>

              {/* Certificate Image */}
              <div className="relative aspect-[4/3] w-full bg-slate-50 flex items-center justify-center p-2">
                <Image
                  src="/CourseCat/cert1.webp"
                  alt={`${title} Accredited Certificate`}
                  width={420}
                  height={295}
                  priority
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Bottom Credential Bar */}
              <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5 font-semibold text-prime-dark">
                  <QrCode className="w-3.5 h-3.5 text-prime" />
                  <span>Unique Verification ID</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Lifetime Valid
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Content (Desktop: 7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-prime/10 border border-prime/20 text-prime text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-prime" />
              <span>Official Accreditation Credential</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-prime-dark tracking-tight leading-tight">
              Transform Your Career with an Accredited {title} Certificate
            </h2>

            {/* Paragraph */}
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              Validate your expertise with globally recognized credentials accredited by international bodies. Showcase hands-on project mastery and add verified certificates to your LinkedIn, portfolio, and resume to accelerate recruiter callbacks.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white/80 border border-border-muted/70 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-prime-dark">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Global Validity</span>
                </div>
                <p className="text-[11px] text-text-muted leading-snug">
                  Recognized across top tech brands and enterprise teams worldwide.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-border-muted/70 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-prime-dark">
                  <CheckCircle2 className="w-4 h-4 text-prime shrink-0" />
                  <span>Recruiter Verified</span>
                </div>
                <p className="text-[11px] text-text-muted leading-snug">
                  Shareable digital verification link & QR code for one-click validation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-border-muted/70 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-prime-dark">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Portfolio Edge</span>
                </div>
                <p className="text-[11px] text-text-muted leading-snug">
                  Earned through real-world capstone projects and live drills.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex items-center justify-center gap-2 bg-prime-yellow hover:bg-amber-400 active:scale-95 text-prime-dark font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Connect With Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-light border border-prime/30 text-prime hover:text-prime-dark font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Sample Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
