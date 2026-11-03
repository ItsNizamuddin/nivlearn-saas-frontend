import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { CORE_VALUES, CORE_VALUES_INTRO, CORE_VALUES_SPRITE_URL, type CoreValue } from './data';

function ValueCard({ title, description, sprite }: CoreValue) {
  return (
    <li className="flex h-full flex-col rounded-2xl border border-prime/15 bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-card md:p-8">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-prime-yellow/10">
        <span
          aria-hidden
          style={{
            width: sprite.width,
            height: sprite.height,
            background: `url(${CORE_VALUES_SPRITE_URL}) -${sprite.x}px -${sprite.y}px`,
          }}
        />
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
            className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-lg bg-prime-yellow px-6 text-sm font-semibold text-prime-dark transition-colors duration-200 hover:bg-prime-yellow/90 sm:self-auto"
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
