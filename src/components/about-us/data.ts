import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BookOpen,
  CalendarClock,
  Globe,
  GraduationCap,
  Headset,
  Lightbulb,
  MapPin,
  Presentation,
  SlidersHorizontal,
  Users,
  Wrench,
} from 'lucide-react';
import type { StaticImageData } from 'next/image';

import mission1 from '../../../public/aboutus/mission1.webp';
import mission2 from '../../../public/aboutus/mission2.webp';
import mission3 from '../../../public/aboutus/mission3.webp';
import mission4 from '../../../public/aboutus/mission4.webp';
import mission5 from '../../../public/aboutus/mission5.webp';
import mission6 from '../../../public/aboutus/mission6.webp';
import whyChooseUsImage from '../../../public/aboutus/whychooseus.webp';
import perksVideoPoster from '../../../public/aboutus/banvideo.webp';

/* ---------------------------------- Banner --------------------------------- */

export const BANNER = {
  eyebrow: 'About Us',
  title: 'Welcome to NivLearn Global Pvt. Ltd',
  description:
    "A leading provider of professional course trainings designed to empower individuals and organizations with the knowledge and skills needed to thrive in today's dynamic business landscape. With a focus on excellence and practical application, we are committed to delivering high-quality training programs that drive professional growth and success.",
} as const;

export type { Stat } from '@/components/ui/StatCard';
import type { Stat } from '@/components/ui/StatCard';

export const STATS: readonly Stat[] = [
  { icon: Presentation, value: '10+', label: 'Industry Experts' },
  { icon: Users, value: '100K+', label: 'Learners' },
  { icon: BookOpen, value: '60+', label: 'In-Demand Courses' },
  { icon: MapPin, value: '90+', label: 'Cities Covered' },
  { icon: Globe, value: '55+', label: 'Countries Covered' },
];

/* --------------------------------- Mission --------------------------------- */

export interface MissionImage {
  image: StaticImageData;
  title: string;
  location: string;
}

export const MISSION_IMAGES: readonly MissionImage[] = [
  { image: mission1, title: 'Professional Training', location: 'Bangalore Branch' },
  { image: mission2, title: 'Corporate Excellence', location: 'Mumbai Branch' },
  { image: mission3, title: 'Skill Development', location: 'Delhi Branch' },
  { image: mission4, title: 'Leadership Programs', location: 'Pune Branch' },
  { image: mission5, title: 'Technical Training', location: 'Chennai Branch' },
  { image: mission6, title: 'Soft Skills', location: 'Hyderabad Branch' },
];

export const MISSION_IMAGES_PER_PAGE = 3;

export const MISSION_SLIDES = [
  {
    title: 'Advantage',
    description:
      'NivLearn Bootcamps offer several advantages compared to traditional courses. Firstly, Bootcamps are intensive, typically shorter in duration, and focused on practical, job-ready skills, making them ideal for quick career entry or upskilling. They often provide hands-on experience and real-world projects, bridging the gap between theory and application. Additionally, Bootcamps are frequently taught by industry professionals, ensuring the most up-to-date knowledge and networking opportunities. Flexibility is another key benefit, as many Bootcamps offer online or part-time options, accommodating various schedules. Lastly, the immersive nature of Bootcamps fosters a collaborative learning environment, fostering teamwork and problem-solving skills essential in today competitive job market.',
  },
  {
    title: 'Learning',
    description:
      'At NivLearn, our approach to learning is rooted in practical, hands-on experience that prepares students for real-world challenges. We emphasize project-based learning where students work on actual industry problems, gaining valuable experience while building their portfolios. Our curriculum is regularly updated to reflect the latest industry trends and technologies, ensuring that our graduates are always market-ready. Small class sizes allow for personalized attention and support, while our experienced instructors bring their industry expertise directly to the classroom. We also incorporate collaborative learning environments that mirror workplace settings, preparing students for team-based professional environments.',
  },
  {
    title: 'Placement',
    description:
      "NivLearn's placement services are designed to bridge the gap between education and employment. Our dedicated placement team works closely with industry partners to secure opportunities for our students. We provide comprehensive career support including resume building, interview preparation, and networking events with potential employers. Our industry connections span across various sectors, offering diverse opportunities for our graduates. Many of our courses include internship components that often lead to full-time positions. We pride ourselves on our high placement rates and the success stories of our alumni who have launched rewarding careers after completing our programs.",
  },
] as const;

/* ------------------------------- Core values ------------------------------- */

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const CORE_VALUES_INTRO = {
  eyebrow: 'What drives us',
  title: 'Core Values',
} as const;

// The source page repeated "Expertise" and "Excellence" a second time with
// identical text; duplicates removed.
export const CORE_VALUES: readonly CoreValue[] = [
  {
    id: 1,
    title: 'Expertise',
    description:
      'We are dedicated to offering training programs that are led by industry experts and seasoned professionals. Our instructors bring a wealth of knowledge and experience to the classroom, ensuring that learners receive the most up-to-date and relevant insights. We believe in the power of expertise to inspire and empower individuals.',
    icon: GraduationCap,
  },
  {
    id: 2,
    title: 'Excellence',
    description:
      'We maintain a strong commitment to excellence in all aspects of our training programs. From course design and instructional delivery to customer service and support, we consistently strive for the highest quality standards. Our goal is to exceed the expectations of our learners and provide them with an exceptional learning experience.',
    icon: Award,
  },
  {
    id: 3,
    title: 'Flexibility',
    description:
      'Recognizing the diverse needs and schedules of our learners, we offer flexible training options. Our courses are available in different formats, including in-person sessions, live virtual classrooms, and self-paced online modules. We believe in providing accessible and convenient learning opportunities that fit the busy lifestyles of professionals.',
    icon: CalendarClock,
  },
];

/* ---------------------------------- Perks ---------------------------------- */

export const PERKS_VIDEO = {
  poster: perksVideoPoster,
  src: 'https://www.youtube.com/embed/A-y-PXFigPI?si=w-MSY6_RcH6BxVOX',
  title: 'Video',
} as const;

export const PERKS_INTRO = {
  eyebrow: 'Life at NivLearn',
  title: 'Perks & Benefits',
} as const;

export const PERKS_FAQ = [
  {
    id: 1,
    title: 'What benefits do we offer?',
    content: 'We provide competitive salaries, flexible work hours, and professional development opportunities.',
  },
  {
    id: 2,
    title: 'Do we support remote work?',
    content: 'Yes! We offer remote work options and hybrid schedules to support work-life balance.',
  },
] as const;

/* ------------------------------ Why choose us ------------------------------ */

export const WHY_CHOOSE_US = {
  eyebrow: 'Why choose us',
  image: whyChooseUsImage,
  title: 'NivLearn Global',
  description:
    'At NivLearn Global Pvt. Ltd, we are passionate about helping individuals and organizations thrive in the professional world.',
} as const;

export interface WhyChooseUsPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US_POINTS: readonly WhyChooseUsPoint[] = [
  {
    icon: Lightbulb,
    title: 'Expertise',
    description:
      'Our team consists of industry experts and seasoned professionals who bring extensive knowledge and practical experience to our consulting and bootcamp programs.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Customization',
    description:
      "We understand that every organization and individual has unique needs and goals. That's why our consulting services and bootcamp programs are highly customizable.",
  },
  {
    icon: Wrench,
    title: 'Practical Approach',
    description:
      'We believe in the power of hands-on learning and real-world application. Our programs are designed to provide practical skills and strategies that can be immediately implemented in the workplace.',
  },
  {
    icon: Headset,
    title: 'Continuous Support',
    description:
      'Our commitment to your success extends beyond the duration of our consulting engagements and bootcamp programs. We provide ongoing support and resources.',
  },
];
