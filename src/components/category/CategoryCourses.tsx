'use client';

import React, { useState, useMemo } from 'react';
import type { Course } from '@/components/Navbar/types';
import CourseCard from '@/components/home/courses/CourseCard';
import MobileCourseView from '@/components/home/courses/MobileCourseView';
import { Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';

export default function CategoryCourses({
  categoryName,
  categorySlug,
  courses = [],
}: {
  categoryName: string;
  categorySlug: string;
  courses: Course[];
}) {
  const { openModal } = useLeadModal();
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const displayedCourses = useMemo(() => {
    return courses.slice(0, visibleCount);
  }, [courses, visibleCount]);

  const handleEnquire = (course: Course) => {
    openModal({
      formTitle: `Enquire About ${course.name}`,
      formDescription: `Get detailed syllabus, upcoming batch schedules, and fee details for ${course.name}.`,
      defaultValues: {
        courseSlug: course.slug,
        leadSource: `${categorySlug}-courses-grid`,
      },
      config: {
        showCourse: true,
        showMessage: true,
        purpose: true,
      },
    });
  };

  return (
    <section id="courses" className="section-container py-10 lg:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-8">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Cohorts</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-prime-dark tracking-tight">
            The Most In-Demand &ldquo;{categoryName}&rdquo; Courses
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Compare comprehensive syllabus modules, industry-certified trainers, and upcoming batch availability.
          </p>
        </div>
        <div className="text-xs font-bold text-prime-dark bg-slate-100 px-3 py-1.5 rounded-md">
          {courses.length} Program{courses.length !== 1 ? 's' : ''} Available
        </div>
      </div>

      {/* Courses Content */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-surface-muted border border-border-muted/50 my-6">
          <BookOpen className="w-10 h-10 text-text-muted/60 mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-prime-dark mb-1">
            No courses available yet
          </h3>
          <p className="text-xs sm:text-sm text-text-muted max-w-sm">
            Courses for{' '}
            <span className="font-semibold text-prime">
              {categoryName}
            </span>{' '}
            are being updated. Check back shortly or contact our team.
          </p>
        </div>
      ) : (
        <>
          {/* 1. Mobile View: 1 Card at a time + Previous & Next Buttons */}
          <MobileCourseView
            courses={courses}
            activeCategorySlug={categorySlug}
            onEnquire={handleEnquire}
          />

          {/* 2. Desktop & Tablet Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course, idx) => (
              <CourseCard
                key={`${course.slug}-${idx}`}
                course={course}
                activeCategorySlug={categorySlug}
                onEnquire={handleEnquire}
              />
            ))}
          </div>

          {/* Load More Button (Desktop only) */}
          {courses.length > visibleCount && (
            <div className="hidden md:flex justify-center items-center mt-10">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-prime text-prime hover:bg-prime hover:text-on-dark font-semibold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <span>Load More Courses</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
