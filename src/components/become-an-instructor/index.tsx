import Link from 'next/link';
import CtaBanner from '@/components/ui/CtaBanner';
import FeatureCard from '@/components/ui/FeatureCard';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import TrustedBy from '@/components/ui/TrustedBy';
import { buttonClass } from '@/components/ui/button';
import { StatGrid } from '@/components/ui/StatCard';
import ctaImage from '../../../public/CourseCat/cta1.webp';
import { BENEFITS, HERO, WHY } from './data';

export default function BecomeAnInstructor() {
  return (
    <>
      <PageHero
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={HERO.description}
        image={HERO.image}
        imageAlt="NivLearn instructor"
        actions={
          <Link href="/contact-us" className={buttonClass('accent', 'lg')}>
            {HERO.actionLabel}
          </Link>
        }
      />

      <Section tone="fade">
        <SectionHeading eyebrow={WHY.eyebrow} title={WHY.title} />
        <StatGrid stats={WHY.stats} className="mt-10" />
      </Section>

      <Section tone="light">
        <SectionHeading align="center" eyebrow={BENEFITS.eyebrow} title={BENEFITS.title} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {BENEFITS.items.map(({ icon: Icon, title, description }) => (
            <FeatureCard key={title} layout="row" icon={<Icon />} iconTone="orange" title={title} description={description} />
          ))}
        </ul>
        <CtaBanner
          className="mt-16"
          title="Get exclusive offers!"
          description="Kickstart Your Career in Agile & Project Management Today!"
          actionLabel="Avail Now!"
          href="/contact-us"
          image={ctaImage}
        />
      </Section>

      <TrustedBy />
    </>
  );
}
