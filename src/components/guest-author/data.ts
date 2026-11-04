import type { LucideIcon } from 'lucide-react';
import { Bot, Briefcase, ChartLine, CircleCheck, CircleX, Eye, FileText, PenLine, Rocket, Star, Target, Timer, TrendingUp, Users, Wrench } from 'lucide-react';
import type { Feature } from '@/components/ui/FeatureCard';

/** DUMMY — replace with the real submissions address. */
export const SUBMIT_EMAIL = 'reachus@example.com';

export const HERO = {
  eyebrow: 'Write for NivLearn',
  title: 'Become a Guest Author',
  tagline: 'Showcase Your Expertise | Grow Your Reach | Contribute to the Future of Skills',
  description:
    "At NivLearn, we're committed to empowering professionals, educators, and organizations to thrive in today's fast-changing workplace. If you have valuable insights, hands-on experience, or research-based content on career growth, training, digital innovation, or skill development, we'd be excited to showcase your perspective.",
  actionLabel: 'Start Writing Today',
} as const;

export const BENEFITS: { title: string; items: readonly Feature[] } = {
  title: 'Why Write for NivLearn?',
  items: [
    { icon: TrendingUp, title: 'Share Your Expertise', description: 'Engage with a dynamic community of learners, professionals, and educators worldwide.' },
    { icon: Star, title: 'Establish Credibility', description: 'Showcase your knowledge and become a recognized voice in your domain.' },
    { icon: Eye, title: 'Expand Your Reach', description: 'Your content is featured across our social media, newsletters, and partner networks.' },
    { icon: Users, title: 'Join a Knowledge Network', description: 'Collaborate with an active network of contributors, mentors, and industry peers.' },
  ],
};

export const TOPICS: { title: string; description: string; items: readonly Feature[] } = {
  title: "What We're Looking For",
  description: 'We welcome original, high-quality articles on these exciting focus areas:',
  items: [
    { icon: Rocket, title: 'Career Growth & Transitions', description: 'Support individuals in navigating professional shifts and unlocking new opportunities.' },
    { icon: Bot, title: 'Tech, AI & Digital Learning', description: 'Dive into how technology is reshaping education and learning experiences.' },
    { icon: Target, title: 'Corporate Training & Learning Strategy', description: 'Offer ideas and approaches to enhance workplace learning and team development.' },
    { icon: Briefcase, title: 'Freelancing, Remote Work & Independent Careers', description: 'Inspire the evolving landscape of flexible, self-driven work.' },
    { icon: Wrench, title: 'Skills, Certifications & Learning Tools', description: 'Share practical guides and reviews on resources that support continuous upskilling.' },
    { icon: ChartLine, title: 'EdTech, Coaching & Course Success Stories', description: 'Present real-world examples and insights from the learning and development space.' },
    { icon: Timer, title: 'Work Culture, Time Management & Productivity', description: "Highlight tips, tools, and habits to thrive in today's work environment." },
  ],
};

export const GUIDELINES: {
  title: string;
  description: string;
  items: readonly { title: string; icon: LucideIcon; points: readonly string[] }[];
} = {
  title: 'Submission Guidelines',
  description: 'Before submitting your article, please review and follow these essential guidelines:',
  items: [
    {
      title: 'Content Standards',
      icon: FileText,
      points: [
        'Articles should be between 1000–1500 words, offering depth and clarity',
        'Content must be 100% original and unpublished elsewhere (including personal blogs)',
        'Well-organized, fact-checked, and written in clear, reader-friendly English',
        'Support your points with examples, data, or real-life case studies',
        'Use proper subheadings (H2/H3), bullet points, and clear formatting',
      ],
    },
    {
      title: 'Tone & Approach',
      icon: PenLine,
      points: [
        'Maintain a professional but approachable tone',
        'Focus on practical insights and actionable takeaways',
        'Avoid overly promotional content or affiliate links',
      ],
    },
    {
      title: 'Submission Format',
      icon: CircleCheck,
      points: [
        'Send your draft as a Google Doc or Word file',
        'Include a brief author bio (50–80 words) and an optional headshot',
        'You may include one relevant backlink to your site or social profile (DoFollow if editorially appropriate)',
      ],
    },
    {
      title: "What We Don't Publish",
      icon: CircleX,
      points: [
        'Plagiarized or AI-written content without human refinement',
        'Overtly promotional or link-building pieces',
        "Topics that don't relate to learning, career growth, or skill development",
        'Articles previously published on any platform',
      ],
    },
  ],
};

export const HOW_TO_SUBMIT = {
  title: 'How to Submit',
  intro: 'Send your article pitch or completed draft to:',
  listIntro: 'When emailing us, please include the following:',
  steps: [
    { label: 'Subject line:', detail: 'Guest Post Submission – [Your Topic Title]' },
    { label: 'A short introduction about yourself' },
    { label: 'Your proposed topic(s) or full article draft' },
    { label: 'Links to any previous writing samples (if any)' },
  ],
} as const;

export const NEXT_STEPS = {
  title: 'What Happens Next?',
  intro: "Once you've submitted your article, here's what to expect:",
  steps: [
    { label: 'Editorial Review', detail: 'Our content team will evaluate your submission within 7–10 business days.' },
    { label: 'Suggestions & Edits', detail: "If needed, we'll provide feedback or request changes to improve clarity and quality." },
    { label: 'Approval & Scheduling', detail: "After approval, we'll schedule your article and let you know the expected publish date." },
    { label: 'Publication & Promotion', detail: "Once live, we'll promote your content across our platforms and tag you (if social handles are shared)." },
  ],
} as const;

export const CLOSING = {
  title: "Let's Shape the Future of Learning — Together",
  description:
    'Join a growing network of guest contributors, educators, industry experts, and professionals who are redefining how India and the world learn, grow, and build careers.',
  prompt: 'Ready to contribute?',
} as const;
