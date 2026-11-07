import React from 'react';
import type { CategoryDetail } from '@/services/catalog.service';
import type { Course } from '@/components/Navbar/types';
import { SITE_URL } from '@/lib/site';

interface CategorySchemaProps {
  category: CategoryDetail;
  categorySlug: string;
  courses: Course[];
}

export default function CategorySchema({
  category,
  categorySlug,
  courses,
}: CategorySchemaProps) {
  const categoryUrl = `${SITE_URL}/${categorySlug}`;

  // 1. Breadcrumbs
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: categoryUrl,
      },
    ],
  };

  // 2. CollectionPage with Course ItemList
  const collectionSchema = {
    '@type': 'CollectionPage',
    '@id': `${categoryUrl}#collection`,
    name: category.metaTitle || `${category.name} Courses & Certifications`,
    description:
      category.metaDescription ||
      category.description ||
      `Explore industry-certified ${category.name} training programs with live agency projects and mentor support.`,
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: courses.length,
      itemListElement: courses.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: course.name,
        url: `${SITE_URL}/${categorySlug}/${course.slug}`,
      })),
    },
  };

  // 3. Category FAQs
  const rawFaqs = Array.isArray(category.faqs) ? category.faqs : [];
  let validFaqs = rawFaqs
    .map((f) => ({
      question: (f.title || f.question || '').replace(/<[^>]+>/g, '').trim(),
      answer: (f.value || f.answer || '').replace(/<[^>]+>/g, '').trim(),
    }))
    .filter((f) => f.question && f.answer);

  // If CMS category has no FAQs, match the visible fallback FAQs on the page
  if (validFaqs.length === 0) {
    validFaqs = [
      {
        question: `What are the eligibility requirements for ${category.name} programs?`,
        answer: `Our ${category.name} programs are designed for learners from diverse backgrounds, including beginners, career switchers, and working professionals. No prior advanced technical degree is required — training starts with foundational concepts before moving into advanced hands-on applications.`,
      },
      {
        question: `Will I work on live real-world projects during the course?`,
        answer: `Yes, practical implementation is at the core of our curriculum. You will work on real client simulation briefs, live agency sandboxes, and portfolio capstone projects with 1-on-1 mentor guidance.`,
      },
      {
        question: `Are the certifications globally recognized by hiring companies?`,
        answer: `All program completion certificates are accredited and recognized by global enterprise hiring partners. Each certificate comes with a unique, verifiable digital credential URL and accreditation seal.`,
      },
      {
        question: `What kind of career placement and interview support is offered?`,
        answer: `Learners receive end-to-end career support including 1-on-1 resume optimization, LinkedIn profile reviews, mock technical interviews, and direct referrals to our network of corporate hiring partners.`,
      },
      {
        question: `Are flexible weekday and weekend batch timings available?`,
        answer: `Yes, we offer multiple cohort batches including weekday morning/evening slots and weekend intensive batches to accommodate busy schedules for both working professionals and students.`,
      },
    ];
  }

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${categoryUrl}#faq`,
    mainEntity: validFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema,
      collectionSchema,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
