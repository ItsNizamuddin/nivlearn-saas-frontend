import React from 'react';
import type { CourseDetail } from '@/services/catalog.service';
import { SITE_URL } from '@/lib/site';

export default function CourseSchema({
  course,
  courseUrl,
}: {
  course: CourseDetail;
  courseUrl: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.course_title,
    description: course.metaDescription || course.course_title,
    provider: {
      '@type': 'Organization',
      name: 'NivLearn',
      sameAs: SITE_URL,
    },
    url: courseUrl,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.courseCard?.courseMode || 'Blended',
      courseWorkload: course.courseCard?.courseDuration || '45 Days',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '3120',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

