import { Star } from 'lucide-react';
import Image from 'next/image';
import Marquee from '@/components/ui/Marquee';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import SpriteLogo from '@/components/ui/SpriteLogo';
import { CERT_LOGOS } from '@/lib/logoSprites';
import { CERTIFICATIONS, GLOBAL, WHY_US, type WhyUsItem } from './data';

function WhyCard({ icon, title, description }: WhyUsItem) {
  return (
    <li className="rounded-2xl border border-prime/15 bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/30 hover:shadow-card">
      <Image src={icon} alt="" className="size-12" />
      <h3 className="mt-4 text-lg font-bold text-prime-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
    </li>
  );
}

/** "Why corporates prefer us" — cards either side of a photo. */
export function WhyUs() {
  return (
    <Section>
      <SectionHeading align="center" eyebrow={WHY_US.eyebrow} title={WHY_US.title} description={WHY_US.description} />
      <div className="mt-12 grid items-center gap-6 lg:grid-cols-3">
        <ul className="space-y-6">
          {WHY_US.items.slice(0, 2).map((item) => (
            <WhyCard key={item.title} {...item} />
          ))}
        </ul>
        <Image src={WHY_US.image} alt="" sizes="(min-width: 1024px) 30vw, 0px" className="hidden h-full w-full rounded-2xl object-cover lg:block" />
        <ul className="space-y-6">
          {WHY_US.items.slice(2).map((item) => (
            <WhyCard key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

const half = Math.ceil(CERT_LOGOS.length / 2);

/** Two certification-logo rows scrolling in opposite directions. */
export function Certifications() {
  return (
    <Section tone="dark" glow>
      <SectionHeading align="center" tone="dark" title={CERTIFICATIONS.title} />
      <div className="mt-12 space-y-6">
        {[CERT_LOGOS.slice(0, half), CERT_LOGOS.slice(half)].map((row, i) => (
          <Marquee key={i} reverse={i === 1} duration={35} fadeFrom="from-prime-dark" label={i === 0 ? 'Certification logos' : undefined}>
            {row.map((logo, j) => (
              <span key={j} className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-surface">
                <SpriteLogo logo={logo} fit={76} />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </Section>
  );
}

/** Featured corporate trainings image grid. */
export function GlobalShowcase() {
  return (
    <Section tone="muted">
      <SectionHeading align="center" eyebrow={GLOBAL.eyebrow} title={GLOBAL.title} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GLOBAL.items.map((item, i) => (
          <li key={i} className="group relative overflow-hidden rounded-2xl shadow-sm">
            <Image
              src={item.image}
              alt=""
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-prime-dark">
              <Star aria-hidden className="size-3.5 fill-current text-prime-yellow" />
              {item.rating}
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-overlay/80 to-transparent p-4 pt-16">
              <p className="font-semibold text-on-dark">{item.title}</p>
              <p className="text-sm text-on-dark/80">{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
