'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CategoryDetail } from '@/services/catalog.service';
import { smoothScrollTo } from '@/lib/utils';

export default function CategoryBanner({ category }: { category: CategoryDetail }) {
  const { openModal } = useLeadModal();

  const handleAdvisorClick = () => {
    openModal({
      formTitle: 'Contact Learning Advisor',
      formDescription: `Get 1-on-1 career path guidance, syllabus walkthroughs, and fee structures for ${category.name}.`,
      defaultValues: {
        leadSource: `category-banner-${category.slug}`,
      },
      config: {
        showCourse: true,
        showMessage: false,
        purpose: true,
      },
    });
  };

  return (
    <section className="section-container pt-6 pb-8 lg:pt-10 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
        {/* Mobile Illustration */}
        <div className="flex justify-center lg:hidden">
          <Image
            src="/illus1.webp"
            alt={category.name}
            width={340}
            height={280}
            className="w-auto max-h-56 object-contain"
            priority
          />
        </div>

        {/* Left Column: Narrative & Details */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-black text-prime-dark tracking-tight leading-tight">
              {category.name}
            </h1>
            {category.description || category.cat_description ? (
              <div
                className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0 space-y-2 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_span]:!text-inherit"
                dangerouslySetInnerHTML={{ __html: category.description || category.cat_description || '' }}
              />
            ) : (
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Master high-growth tech skills and earn accredited certifications recognized by top enterprises worldwide.
              </p>
            )}
          </div>

          {/* Accreditations Row (Dynamic from CMS) */}
          {((category.accreditionImages && category.accreditionImages.length > 0) ||
            (category.accredation && category.accredation.length > 0)) && (
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-prime">
                Accreditations:
              </span>
              <div className="flex items-center gap-3">
                {(category.accreditionImages || category.accredation || []).map((acc, idx) => (
                  <div key={idx} className="relative h-8 w-auto px-2 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                    {acc.url ? (
                      <Image
                        src={acc.url}
                        alt={acc.alt || 'Accreditation'}
                        width={80}
                        height={32}
                        className="h-full w-auto object-contain"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Bullet Points */}
          {category.key_points && (
            <div
              className="text-xs sm:text-sm text-slate-700 space-y-1.5 banner-points-listing text-left bg-slate-50 p-4 rounded-xl border border-slate-200/60"
              dangerouslySetInnerHTML={{ __html: category.key_points }}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <Link
              href="#courses"
              onClick={(e) => smoothScrollTo('#courses', e)}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border-2 border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-white transition-all text-sm font-bold shadow-xs cursor-pointer"
            >
              Explore Courses
            </Link>
            <button
              type="button"
              onClick={handleAdvisorClick}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-prime-yellow hover:bg-prime-yellow/90 active:scale-95 text-white transition-all text-sm font-bold shadow-md cursor-pointer"
            >
              Contact Learning Advisor
            </button>
          </div>
        </div>

        {/* Right Column: Desktop Illustration with Floating Pill */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <div className="relative mx-auto max-w-md">
            <Image
              src="/illus1.webp"
              alt={category.name}
              width={480}
              height={400}
              sizes="(max-width: 1024px) 340px, 480px"
              className="w-full h-auto object-contain drop-shadow-lg"
              priority
            />
            {/* Floating Course Details Pill */}
            <div
              onClick={handleAdvisorClick}
              className="absolute top-16 right-0 bg-white/95 backdrop-blur-md rounded-full flex items-center gap-2.5 px-6 py-3 shadow-card border border-slate-100 hover:scale-105 transition-transform cursor-pointer"
            >
              <Send className="w-4 h-4 text-prime" />
              <span className="text-xs font-bold text-prime-dark">Get Curriculum & Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

