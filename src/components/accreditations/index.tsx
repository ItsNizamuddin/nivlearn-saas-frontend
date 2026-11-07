import Image from 'next/image';
import CheckList from '@/components/ui/CheckList';
import FeatureCard from '@/components/ui/FeatureCard';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { BENEFITS, BODIES, HERO, PARTNERSHIPS, PROGRAMS, STANDARDS } from './data';

export default function Accreditations() {
  return (
    <>
      <PageHero title={HERO.title} description={HERO.description} backgroundImage={HERO.backgroundImage} />

      {/* Partnerships overview */}
      <Section>
        <div className="grid items-center gap-10 rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:p-14">
          <div>
            <SectionHeading eyebrow={PARTNERSHIPS.eyebrow} title={PARTNERSHIPS.title} description={PARTNERSHIPS.description} />
            <CheckList items={PARTNERSHIPS.points} className="mt-8" />
          </div>
          <Image src={PARTNERSHIPS.image} alt="Sample accredited certificate" sizes="(min-width: 1024px) 400px, 90vw" className="mx-auto h-auto w-full max-w-sm" />
        </div>
      </Section>

      {/* Accreditation bodies */}
      <Section tone="muted">
        <SectionHeading title={BODIES.title} />
        <ul className="mt-10 flex flex-wrap gap-6">
          {BODIES.logos.map((logo) => (
            <li
              key={logo.alt}
              className="flex h-32 w-64 items-center justify-center rounded-2xl border border-prime/10 bg-surface p-8 shadow-sm transition-all duration-200 hover:border-prime/30 hover:shadow-card"
            >
              <Image src={logo.src} alt={logo.alt} width={200} height={60} sizes="200px" className="h-auto max-h-20 w-auto" />
            </li>
          ))}
        </ul>
        <p className="mt-10 font-semibold text-prime-dark">{BODIES.repStatement}</p>
        <p className="mt-3 max-w-4xl leading-relaxed text-text-muted">{BODIES.description}</p>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeading title={BENEFITS.title} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {BENEFITS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
      </Section>

      {/* Accredited programs */}
      <Section tone="dark" glow containerClassName="grid gap-10 lg:grid-cols-3 lg:items-center">
        <SectionHeading tone="dark" title={PROGRAMS.title} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {PROGRAMS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} tone="dark" icon={<Icon />} title={title} description={description} />
          ))}
        </ul>
      </Section>

      {/* Maintaining standards */}
      <Section tone="light">
        <SectionHeading eyebrow={STANDARDS.eyebrow} title={STANDARDS.title} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {STANDARDS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
      </Section>
    </>
  );
}
