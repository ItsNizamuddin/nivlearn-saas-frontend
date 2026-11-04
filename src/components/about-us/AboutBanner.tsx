import Container from '@/components/layout/Container';
import GradientText from '@/components/ui/GradientText';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import Glow from '@/components/ui/Glow';
import SectionHeading from '@/components/ui/SectionHeading';
import { StatGrid } from '@/components/ui/StatCard';
import { BANNER, STATS } from './data';

const BRAND = 'NivLearn';

/** Renders the title with the brand name in the brand gradient. */
function BrandTitle({ text }: { text: string }) {
  const [before, after] = text.split(BRAND);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <GradientText>{BRAND}</GradientText>
      {after}
    </>
  );
}

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-light to-surface py-16 md:py-24">
      <Glow />
      <BrandBackdrop className="hidden md:block" />
      <Container className="relative">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={BANNER.eyebrow}
          title={<BrandTitle text={BANNER.title} />}
          description={BANNER.description}
        />
        <StatGrid stats={STATS} className="mt-12 md:mt-16" />
      </Container>
    </section>
  );
}
