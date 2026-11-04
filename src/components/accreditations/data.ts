import { Building2, Mail, Monitor, Phone, ShieldCheck, UserCheck } from 'lucide-react';
import type { Feature } from '@/components/ui/FeatureCard';

import heroBg from '../../../public/accredation/accredations.webp';
import certificate from '../../../public/accredation/certificateimg.webp';
import pmiLogo from '../../../public/accredation/pmilogo.webp';
import scrumLogo from '../../../public/accredation/scrum_Alliance.webp';

export const HERO = {
  title: 'Accreditations',
  description:
    'Essentially, accreditation ensures that the training you receive will be valuable, recognized, and beneficial both now and in the future.',
  backgroundImage: heroBg,
} as const;

export const PARTNERSHIPS = {
  eyebrow: 'Quick facts',
  title: 'Overview of the Accreditations Partnerships',
  description:
    'PMP Certification is the number one certification in project management. In this comprehensive course, you will learn complex project management topics tested on the new (2021) PMP exam in a way that instills confidence in your understanding of the concepts. Certified PMPs earn over 25 percent more on average PMP Certification is the number one certification in project management.In this comprehensive course, you will learn complex project management topics tested.',
  points: [
    'Live instructor-led virtual classrooms & self-paced modules',
    'High-engagement outcome-centric training',
    'Hands-on projects & cloud-based labs',
    'Focus on Industry 4.0 digital skills',
    'Build reusable modules and backends and frontends APIs',
  ],
  image: certificate,
} as const;

/*
 * ⚠ VERIFY BEFORE GOING LIVE: the REP statement and these logos come from the
 * old NevoLearn site (REP ID 5199 was issued to NevoLearn). Replace with
 * NivLearn's own accreditation details, or remove.
 */
export const BODIES = {
  title: 'Our Accreditation Bodies',
  logos: [
    { src: pmiLogo, alt: 'PMI logo' },
    { src: scrumLogo, alt: 'Scrum Alliance logo' },
  ],
  repStatement: 'NivLearn is a Global Registered Education Provider (REP) of PMI®, USA. Our REP ID is 5199.',
  description:
    'PMP Certification is the leading certification in project management. This course covers complex project management topics tested on the new (2021) PMP exam, boosting confidence in your understanding of key concepts. Certified PMPs earn over 25% more on average. In this comprehensive course, you will gain insights into project management methodologies, leadership strategies, and practical applications, preparing you for real-world challenges in project execution.',
} as const;

// The old page listed "Enhanced Credibility and Recognition" twice with identical
// text; the duplicate is removed.
export const BENEFITS: { title: string; items: readonly Feature[] } = {
  title: 'Benefits of Accreditations',
  items: [
    {
      icon: Building2,
      title: 'Enhanced Credibility and Recognition',
      description:
        'We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.',
    },
    {
      icon: ShieldCheck,
      title: 'Assurance of Quality Education',
      description:
        'We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.',
    },
  ],
};

export const PROGRAMS: { title: string; items: readonly Feature[] } = {
  title: 'Accredited Programs by Our Partners',
  items: [
    {
      icon: Mail,
      title: 'Programs Accredited by Partnered Agencies',
      description:
        "You can work remotely or from one of our offices. Or, try a combination of the two. If you like challenging the status quo, you'll fit right in!",
    },
    {
      icon: Phone,
      title: 'Benefits for Students Enrolled in Accredited Programs',
      description:
        "You can work remotely or from one of our offices. Or, try a combination of the two. If you like challenging the status quo, you'll fit right in!",
    },
  ],
};

const STANDARDS_TEXT =
  "At NivLearn, we work hard to guarantee our partner's success by providing our unique bootcamp format, designed to provide a better, more effective learning experience. PMP Certification is the number one certification in project management. In this comprehensive course, you will learn complex project management topics tested on the new (2021) PMP exam in a way that instills confidence in your understanding of the concepts.";

export const STANDARDS: { eyebrow: string; title: string; items: readonly Feature[] } = {
  eyebrow: 'Quick facts',
  title: 'Maintaining Accreditations Standards',
  items: [
    { icon: Monitor, title: 'Commitment to Meeting and Exceeding Accreditations Criteria', description: STANDARDS_TEXT },
    { icon: UserCheck, title: 'Continuous Improvement and the Evaluation Processes', description: STANDARDS_TEXT },
  ],
};
