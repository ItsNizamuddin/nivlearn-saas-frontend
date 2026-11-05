import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import FeatureCard from '@/components/ui/FeatureCard';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClass } from '@/components/ui/button';
import { FORM, FREE_PLATFORM, HERO, HIRE_FORM_ID, JOB_ROLES, TALENT, WHY_HIRE } from './data';
import LeadCta from '@/components/forms/LeadCta';
import InlineLeadForm from '@/components/forms/InlineLeadForm';


export default function HireFromUs() {
  return (
    <>
      <PageHero
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={HERO.description}
        image={HERO.image}
        imageAlt="Smiling young professional holding a laptop"
        actions={
          <LeadCta form="hire" className={buttonClass('accent', 'lg')}>
            {HERO.actionLabel}
          </LeadCta>
        }
      />

      <Section tone="muted">
        <SectionHeading eyebrow={WHY_HIRE.eyebrow} title={WHY_HIRE.title} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_HIRE.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow={JOB_ROLES.eyebrow} title={JOB_ROLES.title} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOB_ROLES.items.map((role) => (
            <li
              key={role.title}
              className="flex items-center gap-4 rounded-2xl border border-prime/10 bg-surface p-4 shadow-sm transition-all duration-200 hover:border-prime/25 hover:shadow-card"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-light">
                <Image src={role.icon} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="font-semibold text-prime-dark">{role.title}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeading eyebrow={TALENT.eyebrow} title={TALENT.title} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TALENT.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <LeadCta form="hire" className={buttonClass('accent', 'lg')}>
            Start Hiring <ChevronRight aria-hidden className="size-4" />
          </LeadCta>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl bg-prime-dark p-6 shadow-card sm:flex-row sm:p-8">
          <Image src={FREE_PLATFORM.image} alt="" sizes="160px" className="h-auto w-32 shrink-0 sm:w-40" />
          <p className="text-center text-base leading-relaxed text-on-dark/90 sm:text-left sm:text-lg">{FREE_PLATFORM.text}</p>
        </div>
      </Section>

      <Section id={HIRE_FORM_ID}>
        <div className="grid gap-10 rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <SectionHeading eyebrow={FORM.eyebrow} title={FORM.title} description={FORM.description} />
          <InlineLeadForm form="hire" />
        </div>
      </Section>
    </>
  );
}
