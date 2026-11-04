import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClass } from '@/components/ui/button';
import { BANNER, COURSES_ID, ENQUIRY_ID, OVERVIEW } from './data';

export default function Banner() {
  return (
    <Section tone="fade" glow className="pb-10 md:pb-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading as="h1" eyebrow={BANNER.eyebrow} title={BANNER.title} description={BANNER.description} />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`#${COURSES_ID}`} className={buttonClass('accent', 'lg')}>
              {BANNER.primaryAction}
            </a>
            <Link href={`#${ENQUIRY_ID}`} className={buttonClass('outline', 'lg')}>
              {BANNER.secondaryAction}
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {BANNER.highlights.map((h) => (
              <li key={h.label} className="flex items-center gap-2 text-sm font-medium text-prime-dark">
                <Image src={h.icon} alt="" className="size-7" />
                {h.label}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={BANNER.image}
          alt="Corporate training"
          preload
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="mx-auto h-auto w-full max-w-lg"
        />
      </div>

      {/* Overview strip */}
      <div className="mt-12 grid gap-8 rounded-2xl bg-prime-dark p-6 shadow-card sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="font-heading text-xl font-bold text-on-dark sm:text-2xl">{OVERVIEW.title}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-on-dark/85">
            {OVERVIEW.points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-prime-yellow" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:border-l lg:border-on-dark/15 lg:pl-8">
          {OVERVIEW.stats.map((s) => (
            <li key={s.label} className="flex items-center gap-4 sm:flex-col sm:text-center">
              <Image src={s.icon} alt="" className="size-14 shrink-0 object-contain" />
              <div>
                <p className="font-heading text-2xl font-bold text-on-dark tabular-nums">{s.value}</p>
                <p className="text-sm text-on-dark/75">{s.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
