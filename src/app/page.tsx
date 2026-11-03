import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn In-Demand Tech Skills & Industry Certifications',
  description:
    'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
  keywords: [
    'tech bootcamps',
    'certification training',
    'software engineering',
    'digital marketing',
    'cloud computing',
    'career placement',
    'NivLearn',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NivLearn | Learn In-Demand Tech Skills & Industry Certifications',
    description:
      'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
    url: '/',
    siteName: 'NivLearn',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NivLearn | Learn In-Demand Tech Skills & Industry Certifications',
    description:
      'Accelerate your career with globally accredited bootcamps, hands-on enterprise training, and 1-on-1 career mentoring at NivLearn.',
  },
};

export default function Home() {
  return (
    <div className="w-full bg-slate-50/70 border-b border-zinc-200/60 py-20 lg:py-28">
      <div className="section-container">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.12]">
            Learn In-Demand Skills for Tomorrow&apos;s Jobs
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Experience learning that delivers results. Master emerging technologies and get job-ready, fast.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/courses"
              className="px-6 py-3 rounded-md bg-prime hover:bg-prime-outline text-white font-semibold text-sm transition-colors shadow-xs"
            >
              Explore All Courses
            </Link>
            <Link
              href="/corporate"
              className="px-6 py-3 rounded-md border border-prime-dark/20 hover:bg-zinc-100 text-prime-dark font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              <span>Corporate Training</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
