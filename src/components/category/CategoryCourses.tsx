'use client';

import React from 'react';
import type { Course } from '@/components/Navbar/types';
import CourseCard from '@/components/home/courses/CourseCard';
import { Sparkles, BookOpen } from 'lucide-react';

export default function CategoryCourses({
  categoryName,
  categorySlug,
  courses,
}: {
  categoryName: string;
  categorySlug: string;
  courses: Course[];
}) {
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

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              activeCategorySlug={categorySlug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No courses available for this category yet.</p>
          <p className="text-xs text-text-muted mt-0.5">Please check back soon or consult a learning advisor.</p>
        </div>
      )}
    </section>
  );
}

