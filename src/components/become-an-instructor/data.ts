import { BookOpen, Globe, GraduationCap, Handshake, Medal, Presentation, Users, Video } from 'lucide-react';
import type { Stat } from '@/components/ui/StatCard';
import type { Feature } from '@/components/ui/FeatureCard';
import heroImage from '../../../public/home/testsection/womanimg.webp';

export const HERO = {
  eyebrow: 'Become an Instructor at NivLearn',
  title: 'Join a Global Community of Expert Instructors',
  description:
    'Our team is wholeheartedly committed to providing unwavering support and guidance to empower you in realizing and surpassing your goals, ensuring your journey to success is both fulfilling and rewarding.',
  actionLabel: 'Apply to become an Instructor',
  image: heroImage,
} as const;

export const WHY = {
  eyebrow: 'Why NivLearn',
  title: "Don't let your expertise go unnoticed, the right platform is here!",
  stats: [
    { icon: GraduationCap, value: '500k+', label: 'Careers Advanced' },
    { icon: Presentation, value: '2K+', label: 'Qualified Trainers' },
    { icon: Video, value: '400+', label: 'Live Classes per month' },
    { icon: BookOpen, value: '2.5K+', label: 'Courses Offered' },
    { icon: Globe, value: '40+', label: 'Global Accreditations' },
  ] satisfies Stat[],
};

export const BENEFITS: { eyebrow: string; title: string; items: readonly Feature[] } = {
  eyebrow: 'Why us',
  title: 'Why Teach at NivLearn',
  items: [
    {
      icon: Globe,
      title: 'Key Features & Highlights',
      description:
        "How Organization's internal and external factors affect the outcome of the project. Also know the importance of knowledge management, how to maintain and archive lessons learnt documents.",
    },
    {
      icon: Medal,
      title: 'Integrate project activities',
      description: 'Learn the techniques of integrating all the project management processes and activities of a project.',
    },
    {
      icon: Users,
      title: 'Team building',
      description: 'Define team ground rules, build a shared understanding, engage, and support virtual teams, and more.',
    },
    {
      icon: Handshake,
      title: 'Negotiating project agreements',
      description: 'Learn how to empower team members and stakeholders by negotiating project agreements.',
    },
  ],
};
