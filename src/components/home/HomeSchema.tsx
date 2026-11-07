import React from 'react';
import { SITE_URL } from '@/lib/site';

export default function HomeSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}#organization`,
        name: 'NivLearn',
        alternateName: 'NivLearn Academy',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon1.png`,
          width: '512',
          height: '512',
        },
        description:
          "India's leading career accelerator offering practice-based and agency-style training with guaranteed placement support and live client project exposure.",
        sameAs: [
          'https://www.linkedin.com/company/nivlearn',
          'https://twitter.com/nivlearn',
          'https://www.youtube.com/@nivlearn',
          'https://www.instagram.com/nivlearn',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-80-4567-8900',
          contactType: 'Admissions & Student Support',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
          availableLanguage: ['English', 'Hindi'],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '14850',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: 'NivLearn',
        description:
          'Learn In-Demand Tech Skills & Industry Certifications with hands-on enterprise simulation and mentorship.',
        publisher: {
          '@id': `${SITE_URL}#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/trainings?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
