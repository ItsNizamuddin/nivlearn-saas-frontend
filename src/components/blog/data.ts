import type { LucideIcon } from 'lucide-react';
import { Brain, ClipboardList, Cpu, Megaphone, RefreshCw } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { AccordionEntry } from '@/components/ui/Accordion';
import scrumKanbanImg from '../../../public/blog/scrum-vs-kanban.webp';
import safeImg from '../../../public/blog/safe-for-beginners.webp';
import retroImg from '../../../public/blog/agile-retrospectives.webp';
import pmpImg from '../../../public/blog/pmp-exam-guide.webp';
import riskImg from '../../../public/blog/risk-management-basics.webp';
import stakeholderImg from '../../../public/blog/stakeholder-communication.webp';
import cloudImg from '../../../public/blog/cloud-computing-careers.webp';
import devopsImg from '../../../public/blog/devops-roadmap.webp';
import genaiImg from '../../../public/blog/generative-ai-for-business.webp';
import promptImg from '../../../public/blog/prompt-engineering-basics.webp';
import seoImg from '../../../public/blog/seo-fundamentals.webp';
import contentImg from '../../../public/blog/content-marketing-strategy.webp';

/*
 * STATIC PLACEHOLDER CONTENT.
 * The blog is UI-only for now: categories, posts, authors and numbers below are
 * dummy data. When the blog API is ready, replace these exports with fetches
 * that return the same shapes — the components don't need to change.
 */

export interface BlogCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  /** Cover photo; posts without one fall back to a branded cover. */
  image?: StaticImageData;
  imageAlt?: string;
  author: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  readMinutes: number;
  views: number;
  /** Trusted HTML (will come from the CMS). Rendered inside `.rich-text`. */
  body: string;
  faqs: AccordionEntry[];
}

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  { id: 'agile', label: 'Agile', icon: RefreshCw },
  { id: 'project-management', label: 'Project Management', icon: ClipboardList },
  { id: 'technology', label: 'Technology', icon: Cpu },
  { id: 'ai', label: 'Artificial Intelligence', icon: Brain },
  { id: 'digital-marketing', label: 'Digital Marketing', icon: Megaphone },
];

export const BLOG_HERO = {
  eyebrow: 'Blog',
  title: 'Expert-driven Insights for Enhanced Growth',
  description:
    "NivLearn's blog features curated content from domain experts — their insights, opinions, experiences and practical know-how across a wide range of subjects, to broaden your understanding and accelerate your growth.",
};

export const LEVEL_UP = {
  title: 'Want to Level Up Your Skills?',
  description:
    'NivLearn is a global training and placement provider helping graduates and professionals pick the right technology trainings and certification programs.',
  prompt: 'Have queries? Get in touch!',
};

/** Same body for every placeholder post; only the title/category vary. */
function placeholderBody(topic: string) {
  return `
<p>${topic} is changing how teams plan, deliver and grow. In this article we break down the core ideas, the mistakes we see most often, and a practical path to getting started.</p>
<h2>Why it matters</h2>
<p>Organisations that invest in the right skills deliver faster, adapt to change with less friction and keep their best people. Whether you are new to the field or refreshing your knowledge, a clear mental model makes every later step easier.</p>
<ul>
  <li><strong>Clarity:</strong> everyone understands the goal and their part in it.</li>
  <li><strong>Feedback:</strong> short cycles surface problems while they are still cheap to fix.</li>
  <li><strong>Growth:</strong> structured learning turns experience into repeatable skill.</li>
</ul>
<h2>Getting started</h2>
<p>Start small. Pick one team or one project, agree on what success looks like, and review progress regularly. Capture what works and share it — momentum builds quickly once people see results.</p>
<h3>Common pitfalls</h3>
<ol>
  <li>Adopting tools before agreeing on the process.</li>
  <li>Measuring activity instead of outcomes.</li>
  <li>Skipping training and expecting people to “figure it out”.</li>
</ol>
<h2>Conclusion</h2>
<p>Mastering ${topic.toLowerCase()} is a journey, not a one-off event. With guidance from experienced practitioners and hands-on practice, you can build skills that stay relevant for years.</p>`;
}

const PLACEHOLDER_FAQS: AccordionEntry[] = [
  {
    id: 'who',
    title: 'Who is this article for?',
    content: 'Beginners and working professionals who want a practical overview before diving into a certification or course.',
  },
  {
    id: 'cert',
    title: 'Do I need a certification to apply these ideas?',
    content: 'No. A certification helps validate your knowledge with employers, but you can start applying these practices right away.',
  },
  {
    id: 'help',
    title: 'How can NivLearn help me learn this?',
    content: 'Our instructor-led programs combine live sessions, real-world projects and mentorship. Contact us and our advisors will suggest the right course.',
  },
];

type PostSeed = Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'categoryId' | 'author' | 'publishedAt' | 'readMinutes' | 'views'>;

const SEEDS: PostSeed[] = [
  { slug: 'scrum-vs-kanban', title: 'Scrum vs Kanban: Choosing the Right Agile Framework', excerpt: 'A side-by-side look at roles, cadences and metrics to help your team pick the framework that fits how it actually works.', categoryId: 'agile', author: 'Priya Sharma', publishedAt: '2026-10-21', readMinutes: 8, views: 1840 },
  { slug: 'safe-for-beginners', title: 'SAFe Explained for Beginners', excerpt: 'What the Scaled Agile Framework is, when large organisations need it, and how its layers fit together.', categoryId: 'agile', author: 'Rahul Verma', publishedAt: '2026-09-30', readMinutes: 10, views: 1325 },
  { slug: 'agile-retrospectives', title: '7 Retrospective Formats That Keep Teams Engaged', excerpt: 'Break the routine with retrospective formats that surface honest feedback and lead to real improvements.', categoryId: 'agile', author: 'Ananya Iyer', publishedAt: '2026-08-14', readMinutes: 6, views: 980 },
  { slug: 'pmp-exam-guide', title: 'The Complete PMP Exam Preparation Guide', excerpt: 'Eligibility, exam structure, study plans and test-day tips to help you pass the PMP on your first attempt.', categoryId: 'project-management', author: 'Vikram Nair', publishedAt: '2026-10-08', readMinutes: 12, views: 2410 },
  { slug: 'risk-management-basics', title: 'Project Risk Management: A Practical Starter Kit', excerpt: 'Identify, assess and respond to project risks with simple tools you can use from day one.', categoryId: 'project-management', author: 'Sneha Kapoor', publishedAt: '2026-09-12', readMinutes: 7, views: 1120 },
  { slug: 'stakeholder-communication', title: 'Stakeholder Communication Plans That Actually Work', excerpt: 'How to map stakeholders, choose the right channels and keep everyone aligned without drowning in meetings.', categoryId: 'project-management', author: 'Arjun Mehta', publishedAt: '2026-07-25', readMinutes: 6, views: 860 },
  { slug: 'cloud-computing-careers', title: 'Cloud Computing Careers: Roles, Skills and Salaries', excerpt: 'An overview of in-demand cloud roles and the certifications that help you land them.', categoryId: 'technology', author: 'Karthik Rao', publishedAt: '2026-10-15', readMinutes: 9, views: 1975 },
  { slug: 'devops-roadmap', title: 'A DevOps Roadmap for 2027', excerpt: 'From version control to observability — the skills to learn, in the order that makes sense.', categoryId: 'technology', author: 'Meera Pillai', publishedAt: '2026-09-04', readMinutes: 11, views: 1460 },
  { slug: 'generative-ai-for-business', title: 'Generative AI for Business Leaders', excerpt: 'Where generative AI creates real value today, where it does not, and how to run a responsible pilot.', categoryId: 'ai', author: 'Rohan Desai', publishedAt: '2026-10-28', readMinutes: 8, views: 2890 },
  { slug: 'prompt-engineering-basics', title: 'Prompt Engineering Basics for Everyday Work', excerpt: 'Simple techniques to get clearer, more reliable results from AI assistants.', categoryId: 'ai', author: 'Divya Menon', publishedAt: '2026-08-29', readMinutes: 5, views: 2105 },
  { slug: 'seo-fundamentals', title: 'SEO Fundamentals Every Marketer Should Know', excerpt: 'Search intent, on-page essentials and technical basics explained without the jargon.', categoryId: 'digital-marketing', author: 'Neha Gupta', publishedAt: '2026-10-02', readMinutes: 7, views: 1530 },
  { slug: 'content-marketing-strategy', title: 'Building a Content Marketing Strategy from Scratch', excerpt: 'Define your audience, plan your topics and measure what matters with this step-by-step framework.', categoryId: 'digital-marketing', author: 'Aditya Joshi', publishedAt: '2026-08-08', readMinutes: 9, views: 1210 },
];

/** Stock photos (Unsplash License) used as placeholder covers. */
const COVERS: Record<string, { image: StaticImageData; imageAlt: string }> = {
  'scrum-vs-kanban': { image: scrumKanbanImg, imageAlt: 'Hand moving a card on a project task board' },
  'safe-for-beginners': { image: safeImg, imageAlt: 'Team planning with sticky notes on a whiteboard' },
  'agile-retrospectives': { image: retroImg, imageAlt: 'Team working together on laptops around a table' },
  'pmp-exam-guide': { image: pmpImg, imageAlt: 'Person taking notes while studying' },
  'risk-management-basics': { image: riskImg, imageAlt: 'Colleagues reviewing a plan on paper next to laptops' },
  'stakeholder-communication': { image: stakeholderImg, imageAlt: 'Person explaining an idea during a laptop meeting' },
  'cloud-computing-careers': { image: cloudImg, imageAlt: 'City lights on Earth seen from space' },
  'devops-roadmap': { image: devopsImg, imageAlt: 'Rows of servers in a data centre' },
  'generative-ai-for-business': { image: genaiImg, imageAlt: '3D AI letters on a digital background' },
  'prompt-engineering-basics': { image: promptImg, imageAlt: 'Small robot reading a tablet on a bench' },
  'seo-fundamentals': { image: seoImg, imageAlt: 'Marketer sketching a plan beside a phone and laptop' },
  'content-marketing-strategy': { image: contentImg, imageAlt: 'Laptop, coffee and notepad on a wooden desk' },
};

export const BLOG_POSTS: readonly BlogPost[] = SEEDS.map((seed) => ({
  ...seed,
  ...COVERS[seed.slug],
  body: placeholderBody(seed.title),
  faqs: PLACEHOLDER_FAQS,
}));

/* ---------- helpers ---------- */

export const getCategory = (id: string) => BLOG_CATEGORIES.find((c) => c.id === id) ?? BLOG_CATEGORIES[0];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

/** Newest first; optionally skip one post (the one being read). */
export const recentPosts = (limit: number, excludeSlug?: string) =>
  [...BLOG_POSTS]
    .filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** Fixed locale + UTC so server and client render the same string. */
export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
export const formatViews = (n: number) => compact.format(n);
