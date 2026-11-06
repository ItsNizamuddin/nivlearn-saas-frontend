'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ArrowRight, Download } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export default function CategoryCertificate({ title }: { title: string }) {
  const { openModal } = useLeadModal();

  const handleEnquire = () => {
    openModal({
      formTitle: 'Request Sample Certificate & Syllabus',
      formDescription: `Explore accredited credentials, accreditation validation, and exam pass guidelines for ${title}.`,
      defaultValues: {
        leadSource: 'category-certificate-section',
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
      <div className="bg-gradient-to-br from-sec-prime via-slate-50 to-blue-50/50 rounded-2xl p-6 sm:p-10 lg:p-12 border border-border-muted/80 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Certificate Preview Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg border-4 border-white bg-white hover:scale-102 transition-transform duration-300">
              <Image
                src="/CourseCat/cert1.webp"
                alt={`${title} Accredited Certificate`}
                width={400}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Narrative Content */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Official Accreditation Body Credential</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
              Transform Your Career with {title}
            </h3>

            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              Boost your career trajectory with globally recognized {title} certifications. Get trained directly by top practitioners, master hands-on simulation frameworks, and showcase verified credentials to recruiters worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex items-center gap-2 bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Connect With Us!</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex items-center gap-2 border border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer"
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

