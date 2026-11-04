import { Award, BadgePercent, BookOpen, ChartLine, Cloud, FileText, Globe, MonitorPlay, Star, ThumbsUp } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { Feature } from '@/components/ui/FeatureCard';

import heroImage from '../../../public/hire.webp';
import speakImage from '../../../public/hirefromus/speak.webp';
import role1 from '../../../public/hirefromus/image.webp';
import role2 from '../../../public/hirefromus/image1.webp';
import role3 from '../../../public/hirefromus/image2.webp';
import role4 from '../../../public/hirefromus/image3.webp';
import role5 from '../../../public/hirefromus/image4.webp';
import role6 from '../../../public/hirefromus/image5.webp';
import role7 from '../../../public/hirefromus/image6.webp';
import role8 from '../../../public/hirefromus/image7.webp';

export const HIRE_FORM_ID = 'hire-form';

export const HERO = {
  eyebrow: 'Hire from us',
  title: "Hiring Best Persons for Tomorrow's Job Roles",
  description: 'Unlock a new recruitment strategy that moves your business forward — at no cost.',
  actionLabel: 'Start Hiring',
  image: heroImage,
} as const;

export const WHY_HIRE: { eyebrow: string; title: string; items: readonly Feature[] } = {
  eyebrow: 'Values',
  title: 'Why NivLearn?',
  items: [
    {
      icon: Star,
      title: 'Best Talents',
      description: 'Training by best international experts and exposure to real-life dev environments in Cloud Labs.',
    },
    {
      icon: Award,
      title: 'Learn by Doing',
      description: 'Startups, unicorns, and Fortune 500s like Amazon, Cognizant, Adobe, and more hire our learners.',
    },
    {
      icon: ThumbsUp,
      title: 'Zero Training Cost',
      description: 'Our learners are industry-ready, they have worked on several industry-grade projects under expert supervision.',
    },
    {
      icon: BadgePercent,
      title: 'One-Stop Acquisition',
      description: 'While you focus on your business, we prepare top talents to work for you without any hiring charges.',
    },
  ],
};

export const JOB_ROLES: { eyebrow: string; title: string; items: readonly { title: string; icon: StaticImageData }[] } = {
  eyebrow: 'Why us',
  title: 'Job Roles Available for Hiring',
  items: [
    { title: 'Associate Business Manager', icon: role1 },
    { title: 'Online Sales Executive', icon: role2 },
    { title: 'Senior Lead Gen Executive', icon: role3 },
    { title: 'Product Manager', icon: role4 },
    { title: 'Marketing Operations', icon: role5 },
    { title: 'Talent Acquisition', icon: role6 },
    { title: 'Senior Program Manager', icon: role7 },
    { title: 'Full Stack Developers', icon: role8 },
  ],
};

export const TALENT: { eyebrow: string; title: string; items: readonly Feature[] } = {
  eyebrow: 'Why us',
  // Old page heading was "Why Teach at Nevolearn", which didn't match this
  // section's content (what makes the learners hire-ready).
  title: 'Why Hire NivLearn Talent',
  items: [
    { icon: MonitorPlay, title: 'Live Training by Experts', description: 'Our learners attend 140+ hours of live instructor-led training.' },
    { icon: BookOpen, title: 'Learn Through Practice', description: 'Our learners have an impressive portfolio of stunning Cloud apps.' },
    { icon: FileText, title: 'Immersive Learning', description: 'Our learners are trained with hands-on exercises, assessments, assignments, & more.' },
    { icon: ChartLine, title: 'Beyond Full-Stack', description: 'Our learners are equipped with key techno-managerial skills to lead professional projects.' },
    { icon: Cloud, title: 'Cloud Labs', description: '250+ hrs of Cloud Labs help learners emulate pro developers in crunch situations.' },
    { icon: Globe, title: '100+ Countries', description: 'We have a global network of top international talents. Start Hiring.' },
  ],
};

export const FREE_PLATFORM = {
  image: speakImage,
  text: 'Eliminate the process of reaching out to different agencies for finding the right source. We provide the right platform filled with an array of tech talents that enables you to hire the right resources instantly. Did we mention that you are not paying a single penny for this?',
} as const;

export const FORM = {
  eyebrow: 'Join us',
  title: 'Become a NivLearn Hiring Partner',
  description: 'Join our hiring network.',
} as const;
