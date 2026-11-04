import type { ResourceLink } from './types';

/** Shared by the desktop Resources mega menu and the mobile drawer — edit links here only. */

export const RESOURCE_LINKS: ResourceLink[] = [
  { name: 'Corporate Training', link: '/corporate', descp: 'Upskill your teams with tailored programs' },
  { name: 'Blog', link: '/blog', descp: 'Stay ahead with expert articles and insights' },
  { name: 'Become an Instructor', link: '/become-an-instructor', descp: 'Lead engaging live sessions worldwide' },
  { name: 'Accreditations', link: '/accreditations', descp: 'Earn globally recognized certifications' },
  { name: 'Hire From Us', link: '/hire-from-us', descp: 'Access job-ready, pre-vetted tech talent' },
  { name: 'Guest Author', link: '/become-a-guest-author', descp: 'Share insights with our learner community' },
];

export const COMPANY_LINKS = [
  { name: 'About Us', link: '/about-us' },
  { name: 'Contact Us', link: '/contact-us' },
  { name: 'Privacy Policy', link: '/privacy-policy' },
  { name: 'Terms & Conditions', link: '/terms-and-conditions' },
  { name: 'Refund Policy', link: '/refund-policy' },
  { name: 'Grievance Redressal', link: '/grievance-redressal-policy' },
] as const;
