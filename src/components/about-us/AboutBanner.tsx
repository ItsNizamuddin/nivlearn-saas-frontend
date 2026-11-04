import Container from '@/components/layout/Container';
import GradientText from '@/components/ui/GradientText';
import Glow from '@/components/ui/Glow';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { BANNER, STATS, type Stat } from './data';

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

function StatCard({ icon: Icon, value, label, className }: Stat & { className?: string }) {
  return (
    <li
      className={cn(
        'group flex flex-col items-center rounded-2xl border border-prime/10 bg-surface/90 px-4 py-6 text-center shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/25 hover:shadow-card',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-prime/10 text-prime transition-colors duration-200 group-hover:bg-prime group-hover:text-on-dark">
        <Icon size={22} aria-hidden />
      </span>
      <p className="mt-4 font-heading text-2xl font-bold text-prime-dark tabular-nums sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-text-muted">{label}</p>
    </li>
  );
}

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-light to-surface py-16 md:py-24">
      <Glow />
      <Container className="relative">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={BANNER.eyebrow}
          title={<BrandTitle text={BANNER.title} />}
          description={BANNER.description}
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-5 md:gap-5">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              // Odd count: let the last card span the row on the 2-column mobile grid.
              className={i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : undefined}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
