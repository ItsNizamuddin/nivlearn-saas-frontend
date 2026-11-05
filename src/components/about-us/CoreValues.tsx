import Link from 'next/link';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClass } from '@/components/ui/button';
import { CORE_VALUES, CORE_VALUES_INTRO, type CoreValue } from './data';

function ValueCard({ title, description, icon: Icon }: CoreValue) {
  return (
    <li className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-prime/15 bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-prime/25 hover:shadow-card md:p-8">
      {/* Brand accent line, grows in on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
      />
      <span aria-hidden className="flex size-16 items-center justify-center rounded-2xl bg-prime-yellow/10 text-prime-yellow">
        <Icon className="size-8" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-prime-dark">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-text-muted">{description}</p>
    </li>
  );
}

export default function CoreValues() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={CORE_VALUES_INTRO.eyebrow} title={CORE_VALUES_INTRO.title} />
          <Link
            href="/contact-us"
            className={buttonClass('accent', 'md', 'shrink-0 self-start sm:self-auto')}
          >
            Get in touch with us
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
          {CORE_VALUES.map((value) => (
            <ValueCard key={value.id} {...value} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
