import { CircleCheck, FileText, Mail } from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard';
import Glow from '@/components/ui/Glow';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClass } from '@/components/ui/button';
import { BENEFITS, CLOSING, GUIDELINES, HERO, HOW_TO_SUBMIT, NEXT_STEPS, SUBMIT_EMAIL, TOPICS } from './data';
import LeadCta from '@/components/forms/LeadCta';

const SUBMIT_ID = 'submit';

/** Numbered step list used by the two "submit" cards. */
function Steps({ steps, tone }: { steps: readonly { label: string; detail?: string }[]; tone: 'orange' | 'blue' }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-start gap-4">
          <span
            aria-hidden
            className={
              tone === 'orange'
                ? 'flex size-8 shrink-0 items-center justify-center rounded-full bg-prime-yellow text-sm font-bold text-prime-dark'
                : 'flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-on-dark'
            }
          >
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-prime-dark">{step.label}</p>
            {step.detail && <p className="mt-0.5 text-sm text-text-muted">{step.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function GuestAuthor() {
  return (
    <>
      <PageHero
        align="center"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={
          <>
            <span className="block font-semibold text-on-dark">{HERO.tagline}</span>
            <span className="mt-4 block">{HERO.description}</span>
          </>
        }
        actions={
          <LeadCta form="guestAuthor" className={buttonClass('accent', 'lg')}>
            {HERO.actionLabel}
          </LeadCta>
        }
      />

      <Section>
        <SectionHeading align="center" title={BENEFITS.title} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} title={title} description={description} />
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeading align="center" title={TOPICS.title} description={TOPICS.description} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
      </Section>

      <Section tone="dark" glow>
        <SectionHeading align="center" tone="dark" title={GUIDELINES.title} description={GUIDELINES.description} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {GUIDELINES.items.map(({ icon: Icon, title, points }) => (
            <li key={title} className="rounded-2xl border border-on-dark/15 bg-on-dark/5 p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-xl font-bold text-on-dark">
                <Icon aria-hidden className="size-6 shrink-0 text-prime1" />
                {title}
              </h3>
              <ul className="mt-5 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-on-dark/85 sm:text-base">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-prime-yellow" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id={SUBMIT_ID} tone="fade">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-prime-dark">
              <FileText aria-hidden className="size-6 shrink-0 text-prime" />
              {HOW_TO_SUBMIT.title}
            </h2>
            <p className="mt-4 text-text-body">{HOW_TO_SUBMIT.intro}</p>
            <a
              href={`mailto:${SUBMIT_EMAIL}`}
              className="mt-3 flex items-center gap-3 rounded-xl border border-prime/20 bg-light p-4 font-semibold text-prime transition-colors duration-200 hover:border-prime/40"
            >
              <Mail aria-hidden className="size-5 shrink-0" />
              {SUBMIT_EMAIL}
            </a>
            <p className="mt-6 mb-4 font-semibold text-prime-dark">{HOW_TO_SUBMIT.listIntro}</p>
            <Steps steps={HOW_TO_SUBMIT.steps} tone="orange" />
          </div>

          <div className="rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-prime-dark">
              <CircleCheck aria-hidden className="size-6 shrink-0 text-prime" />
              {NEXT_STEPS.title}
            </h2>
            <p className="mt-4 mb-6 text-text-body">{NEXT_STEPS.intro}</p>
            <Steps steps={NEXT_STEPS.steps} tone="blue" />
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-prime-dark p-8 text-center shadow-card sm:p-12">
          <Glow />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-on-dark sm:text-3xl">{CLOSING.title}</h2>
            <p className="mt-4 text-on-dark/80">{CLOSING.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <span className="font-semibold text-on-dark">{CLOSING.prompt}</span>
              <LeadCta form="guestAuthor" className={buttonClass('accent', 'lg')}>
                Pitch Your Article
              </LeadCta>
              <a href={`mailto:${SUBMIT_EMAIL}`} className="inline-flex items-center gap-2 text-sm font-medium text-on-dark/80 underline-offset-4 hover:text-on-dark hover:underline">
                <Mail aria-hidden className="size-4 shrink-0" /> {SUBMIT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
