import Accordion from '@/components/ui/Accordion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import PerksVideo from './PerksVideo';
import { PERKS_FAQ, PERKS_INTRO } from './data';

export default function Perks() {
  return (
    <section className="bg-prime-yellow/5 py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <PerksVideo />
        <div>
          <SectionHeading eyebrow={PERKS_INTRO.eyebrow} title={PERKS_INTRO.title} />
          <Accordion items={PERKS_FAQ} className="mt-8 space-y-4" />
        </div>
      </Container>
    </section>
  );
}
