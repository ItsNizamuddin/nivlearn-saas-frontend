'use client';

import React from 'react';
import Image from 'next/image';
import { Star, GraduationCap, Award, Users } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import type { CourseDetail } from '@/services/catalog.service';

interface TrainerItem {
  name: string;
  role: string;
  experience?: string;
  totalTrained?: string;
  rating: number;
  bio: string;
  image?: string;
}

function extractBio(bio: unknown): string {
  if (typeof bio === 'string') return bio;
  if (bio && typeof bio === 'object') {
    const record = bio as Record<string, unknown>;
    const val =
      record['Trainer Journey'] ||
      record['bio'] ||
      record['Education/Expertise'] ||
      Object.values(record).find((v) => typeof v === 'string');
    if (typeof val === 'string') return val;
  }
  return '';
}

export default function CourseTrainers({ course }: { course: CourseDetail }) {
  const { openModal } = useLeadModal();

  if (!course.trainers || course.trainers.length === 0) {
    return null;
  }

  const trainers: TrainerItem[] = course.trainers
    .filter((t) => Boolean(t.name))
    .map((t) => {
      const photoUrl =
        (typeof t.photo === 'object' && t.photo !== null && ('url' in t.photo || 'thumbnail' in t.photo)
          ? ((t.photo as { url?: string; thumbnail?: string }).url || (t.photo as { url?: string; thumbnail?: string }).thumbnail)
          : typeof t.photo === 'string'
            ? t.photo
            : typeof t.image === 'string'
              ? t.image
              : (t.image as { url?: string } | undefined)?.url) || undefined;

      const bioHtml =
        t.description ||
        extractBio(t.bio);

      return {
        name: t.name || '',
        role: t.role || (t.experience ? `${t.experience} Years Experience` : 'Course Instructor'),
        experience: t.experience ? `${t.experience} Years Experience` : undefined,
        totalTrained: t.totalTrained ? `${t.totalTrained} Trained` : undefined,
        rating: t.rating || 5.0,
        bio: bioHtml,
        image: photoUrl,
      };
    });

  if (trainers.length === 0) {
    return null;
  }

  const handleConnectMentor = () => {
    openModal({
      formTitle: 'Connect with a Course Mentor',
      formDescription: `Speak with an accredited instructor regarding syllabus specifics and career advice for ${course.course_title}.`,
      defaultValues: {
        leadSource: `course-trainers-${course.slug}`,
        courseSlug: course.slug,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  return (
    <section id="trainers" className="section-container py-12 lg:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-[11px] 2xl:text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Top 1% Mentors</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl 2xl:text-3xl font-extrabold text-prime-dark tracking-tight">
            Learn Directly from Industry Leaders
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Our instructors are verified practitioners who bring live boardroom case studies and practical frameworks to every cohort.
          </p>
        </div>
        <button
          type="button"
          onClick={handleConnectMentor}
          className="inline-flex items-center gap-2 border border-prime-dark text-prime-dark hover:bg-prime-dark hover:text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>Connect with Mentors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((mentor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-card hover:border-prime/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-prime/10 border-2 border-prime/20 shrink-0">
                  {mentor.image ? (
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full text-prime font-bold text-lg flex items-center justify-center">
                      {mentor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-prime-yellow/15 text-prime-yellow px-2.5 py-1 rounded-full text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-prime-yellow text-prime-yellow" />
                  <span>{mentor.rating}</span>
                </div>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-prime-dark">
                {mentor.name}
              </h3>
              <p className="text-xs font-semibold text-prime mt-0.5">
                {mentor.role}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {mentor.experience && (
                  <span className="text-[11px] text-text-muted">
                    {mentor.experience}
                  </span>
                )}
                {mentor.totalTrained && (
                  <>
                    {mentor.experience && <span className="text-slate-300">•</span>}
                    <span className="text-[11px] text-text-muted">
                      {mentor.totalTrained}
                    </span>
                  </>
                )}
              </div>


              <div
                className="text-xs text-slate-600 leading-relaxed mt-3 line-clamp-4 overflow-hidden space-y-1.5 [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_span]:!text-inherit [&_ul]:list-disc [&_ul]:pl-4"
                dangerouslySetInnerHTML={{ __html: mentor.bio }}
              />
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Verified Mentor
              </span>
              <button
                type="button"
                onClick={handleConnectMentor}
                className="text-xs font-bold text-prime hover:underline cursor-pointer"
              >
                Request 1-on-1
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
