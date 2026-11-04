import type { StaticImageData } from 'next/image';
import type { Feature } from '@/components/ui/FeatureCard';

import banner from '../../../public/corporate/banner.webp';
import xpIcon from '../../../public/corporate/xp.webp';
import careerIcon from '../../../public/corporate/career.webp';
import bulbIcon from '../../../public/corporate/bulb.webp';
import proIcon from '../../../public/corporate/pro.webp';
import partIcon from '../../../public/corporate/part.webp';
import globIcon from '../../../public/corporate/glob.webp';
import transformImage from '../../../public/corporate/transform.webp';
import assessIcon from '../../../public/corporate/assess.webp';
import upskillIcon from '../../../public/corporate/upskill.webp';
import analyzeIcon from '../../../public/corporate/analy.webp';
import scaleIcon from '../../../public/corporate/sale.webp';
import performImage from '../../../public/corporate/perform.webp';
import ctaImage from '../../../public/corporate/CTA.webp';
import benefit1 from '../../../public/corporate/benfits/Overlay+Border.webp';
import benefit2 from '../../../public/corporate/benfits/Overlay+Border-1.webp';
import benefit3 from '../../../public/corporate/benfits/Background+Border-1.webp';
import benefit4 from '../../../public/corporate/benfits/Background+Border-2.webp';
import benefit5 from '../../../public/corporate/benfits/Background+Border.webp';
import storyTech from '../../../public/corporate/Story/Link.webp';
import storyRetail from '../../../public/corporate/Story/Link-1.webp';
import storyLife from '../../../public/corporate/Story/Link-2.webp';
import storyConsulting from '../../../public/corporate/Story/Link-3.webp';
import storyPharma from '../../../public/corporate/Story/Link-4.webp';
import storyFinance from '../../../public/corporate/Story/Link-6.webp';
import storyImage from '../../../public/corporate/Story/img.webp';
import whyImage from '../../../public/corporate/why.webp';
import why1 from '../../../public/corporate/why1.webp';
import why2 from '../../../public/corporate/why2.webp';
import why3 from '../../../public/corporate/why3.webp';
import why4 from '../../../public/corporate/why4.webp';
import global1 from '../../../public/corporate/g/img1.webp';
import global2 from '../../../public/corporate/g/img2.webp';
import global3 from '../../../public/corporate/g/img3.webp';
import global4 from '../../../public/corporate/g/img4.webp';

export const COURSES_ID = 'courses';
export const ENQUIRY_ID = 'enquiry';

/* --------------------------------- Banner --------------------------------- */

export const BANNER = {
  eyebrow: 'Corporate training',
  title: 'Elevate Your Career with Cutting-Edge Skills',
  description:
    "Empower your professional journey with our immersive online courses designed for today's workplace challenges.",
  primaryAction: 'Explore Courses',
  secondaryAction: 'Speak to an Expert',
  highlights: [
    { icon: xpIcon, label: 'Experience' },
    { icon: careerIcon, label: 'Career Experts' },
    { icon: bulbIcon, label: 'Top Skilled' },
  ],
  image: banner,
} as const;

/* -------------------------------- Overview -------------------------------- */

export const OVERVIEW = {
  title: 'Revolutionize Your Learning Experience',
  points: ['Interactive Modules', 'Hands-On Projects', 'Collaborative Environments', 'Flexible Learning'],
  stats: [
    { icon: proIcon, value: '50,000+', label: 'Professionals upskilled' },
    { icon: partIcon, value: '500+', label: 'Corporate partnerships' },
    { icon: globIcon, value: '40+', label: 'Global markets served' },
  ],
} as const;

/* -------------------------------- Transform ------------------------------- */

export interface TransformTab {
  id: string;
  label: string;
  icon: StaticImageData;
  title: string;
  description: string;
  points: readonly string[];
}

export const TRANSFORM = {
  eyebrow: 'Workforce transformation',
  title: 'Transform your workforce for the future',
  image: transformImage,
  tabs: [
    {
      id: 'assess',
      label: 'Assess',
      icon: assessIcon,
      title: "Discover your team's strengths and weaknesses",
      description: 'Get visibility into what your teams know, where their skills stand today and where they need to skill up.',
      points: [
        "Measure your team's skills",
        'Do they have the skills to succeed in critical roles?',
        'Upskilling for Success',
        'Targeted Skill Development',
        'Diverse Learning Opportunities',
        'Network and Collaborate',
        'Apply New Skills',
      ],
    },
    {
      id: 'upskill',
      label: 'Upskill',
      icon: upskillIcon,
      title: 'Upskilling for Success',
      description: 'Help your teams build the skills they need to advance in their careers and your organization.',
      points: ['Targeted Skill Development', 'Diverse Learning Opportunities'],
    },
    {
      id: 'analyze',
      label: 'Analyze',
      icon: analyzeIcon,
      title: 'Track Progress and Identify Gaps',
      description: 'Understand where your teams excel and where they need additional support.',
      points: ['Network and Collaborate', 'Apply New Skills'],
    },
    {
      id: 'scale',
      label: 'Scale',
      icon: scaleIcon,
      title: "Scale Your Workforce's Capabilities",
      description: 'Build a culture of continuous learning and adaptability to stay ahead in the market.',
      points: ['Expand Learning Initiatives', 'Ensure Future-Ready Talent'],
    },
  ] satisfies TransformTab[],
};

/* --------------------------------- Courses -------------------------------- */

export const COURSES = {
  eyebrow: 'How we are helping companies',
  title: 'Future-proof your teams with our in-demand courses',
  /** How many courses to show in the grid. */
  limit: 8,
} as const;

/* ---------------------------------- Stats --------------------------------- */

export const STATS = {
  cards: [
    {
      title: 'Corporate Reach & Global Impact',
      items: [
        { value: '400+', text: 'Companies partnered across geographies' },
        { value: '3000+', text: 'Companies Transformed and growing' },
        { value: '100%', text: 'Compliance with company & country regulations' },
      ],
      footer: ['Comprehensive Pre & Post Training Support'],
    },
    {
      // Old page repeated "Corporate Reach & Global Impact" as this card's title too.
      title: 'Learning Programs & Expertise',
      items: [
        { value: '20+', text: 'Trending Technologies sourced for corporate training' },
        { value: '10+', text: 'Industry Certifications making an impact' },
      ],
      footer: ['Tailored Learning Programs customized for enterprises', 'Platform-Based Training for seamless access'],
    },
  ],
  performance: {
    image: performImage,
    title: 'Performance & Efficiency Growth',
    items: [
      { value: '30%', text: 'Work Satisfaction & Capability Improvement' },
      { value: '30%', text: 'Boost in Efficiency through structured learning' },
    ],
    footer: 'Vast Network of Experts to meet every corporate need',
  },
} as const;

/* ----------------------------------- CTA ---------------------------------- */

export const CTA = {
  eyebrow: 'Booking Appointment',
  title: 'Ready to transform your workforce?',
  image: ctaImage,
} as const;

/* -------------------------------- Benefits -------------------------------- */

export const BENEFITS = {
  eyebrow: 'Measured impact',
  title: 'Benefits of Upskilling your team',
  chartTitle: 'Average improvement after training',
  items: [
    { label: 'Productivity', title: 'Productivity Increased By 30%', subtitle: 'Best price guaranteed', percent: 30, icon: benefit1 },
    { label: 'Retention Rate', title: 'Retention Rate Increased By 25%', subtitle: 'Limited-time offers', percent: 25, icon: benefit2 },
    { label: 'Employee Satisfaction', title: 'Employee Satisfaction Improved 40%', subtitle: 'Experts worldwide', percent: 40, icon: benefit5 },
    { label: 'Sales', title: "Company's Sales Up By 50%", subtitle: 'Full refund policy', percent: 50, icon: benefit3 },
    { label: 'Team Spirit', title: 'Team Spirit & Collaboration Grown up to 25%', subtitle: 'Flexible scheduling', percent: 25, icon: benefit4 },
  ],
} as const;

/* --------------------------------- Stories -------------------------------- */

export interface Story {
  category: string;
  icon: StaticImageData;
  description: string;
  challenge: string;
  solution: string;
}

const HEALTH_STORY = {
  description: 'Healthcare organizations are using data analytics to improve patient outcomes and optimize operations.',
  challenge: 'Needed to upskill 500 medical professionals in data-driven decision-making.',
  solution: 'A customized training program focusing on data analytics for healthcare professionals was developed.',
};

export const STORIES = {
  eyebrow: 'Customer stories',
  title: 'How we assist companies in ensuring the future readiness of their teams.',
  image: storyImage,
  // Old page listed "Finance" twice; the duplicate is removed.
  items: [
    {
      category: 'Technology',
      icon: storyTech,
      description:
        'To succeed, retailers must correctly anticipate what their customers want and then provide those things. Big data and analytics provide retailers the insights they need to keep their customers happy and returning to their stores. In an IBM study, 62% of retail respondents claimed that insights provided by analytics and information provided them with competitive advantages. A top retailer required data scientists and analysts who could navigate massive amounts of data to produce insights that inform business decisions.',
      challenge: 'The organization wanted to transform 400 employees into data scientists who could put their newly acquired skills into action immediately.',
      solution: 'We launched the Data Science 400 Challenge, a reskilling program that uses assessments to determine data needs, pinpoint skill gaps, and skill employees into data roles.',
    },
    {
      category: 'Retail',
      icon: storyRetail,
      description: 'Financial institutions are leveraging AI and machine learning to enhance risk assessment and fraud detection.',
      challenge: 'The company needed to train 300 analysts in advanced risk modeling techniques.',
      solution: 'A comprehensive training program on AI-driven risk management was deployed.',
    },
    { category: 'Life Science', icon: storyLife, ...HEALTH_STORY },
    { category: 'Consulting', icon: storyConsulting, ...HEALTH_STORY },
    { category: 'Finance', icon: storyFinance, ...HEALTH_STORY },
    { category: 'Pharmaceuticals', icon: storyPharma, ...HEALTH_STORY },
  ] satisfies Story[],
};

/* --------------------------------- Why us --------------------------------- */

export const WHY_US = {
  eyebrow: 'Get to know us',
  title: 'Why Corporates Prefer NivLearn To Upskill Their Teams',
  description:
    'As a one-stop training service provider, we strive to be versatile and scalable to the needs of our clients with vast experience in the industry. Our hands-on approach is the most effective way to ensure the quality of our services. We work with a large number of companies who extensively appreciate the high-quality work delivered by us and the top-notch training we provide.',
  image: whyImage,
  items: [
    {
      icon: why1,
      title: '730+ Globally Acclaimed SMEs',
      description:
        'NivLearn, catering to over 730 worldwide SMEs, has been a trustworthy provider of high-quality tailor-made training programs for companies working in different sectors around the globe.',
    },
    {
      icon: why3,
      title: 'Proven Track Record',
      description:
        "With a history of successful training programs, helping 300k+ professionals to graduate, we have added value to these companies' workforce.",
    },
    {
      icon: why2,
      title: 'Approved by Industry Experts',
      description:
        'Through our strategic interactions with eminent corporations and industry bodies, we can assure that our training programs are contemporary, in-depth, and dedicated to the latest industry trends approved by industry experts.',
    },
    { icon: why4, title: 'Experienced Guide', description: 'Our team is available 24/7 to assist you with any queries or concerns.' },
  ],
} as const;

export type WhyUsItem = (typeof WHY_US.items)[number];

/* ------------------------------ Certifications ---------------------------- */

export const CERTIFICATIONS = {
  title: 'Internationally Accredited Certifications',
} as const;

/* ---------------------------------- Global -------------------------------- */

/** ⚠ Placeholder content carried over from the old site (all six cards say "TCS CSM Training"). */
export const GLOBAL = {
  eyebrow: 'Featured',
  title: 'Find out why Global Corporates love NivLearn',
  items: [
    { image: global1, title: 'TCS CSM Training', subtitle: 'For 200+ Employees', rating: '5.0' },
    { image: global2, title: 'TCS CSM Training', subtitle: 'For 200+ Employees', rating: '5.0' },
    { image: global3, title: 'TCS CSM Training', subtitle: 'For 200+ Employees', rating: '5.0' },
    { image: global4, title: 'TCS CSM Training', subtitle: 'For 200+ Employees', rating: '5.0' },
  ],
} as const;

export type { Feature };
