import CtaBanner from '@/components/ui/CtaBanner';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import BlogExplorer from './BlogExplorer';
import { BLOG_HERO } from './data';
import ctaImage from '../../../public/CourseCat/cta1.webp';

/** /blog — hero, category explorer and a closing CTA. */
export default function BlogHome() {
  return (
    <>
      <PageHero align="center" eyebrow={BLOG_HERO.eyebrow} title={BLOG_HERO.title} description={BLOG_HERO.description} />

      <Section>
        <BlogExplorer eyebrow="Blogs" title="Explore by Category" />
      </Section>

      <Section tone="muted">
        <CtaBanner
          title="Not sure which course is right for you?"
          description="Talk to our learning advisors and get a personalised recommendation."
          actionLabel="Talk to an Advisor"
          href="/contact-us"
          image={ctaImage}
        />
      </Section>
    </>
  );
}
