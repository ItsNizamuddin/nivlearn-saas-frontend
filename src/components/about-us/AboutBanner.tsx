import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { BANNER, STATS, type Stat } from './data';

function StatCard({ icon: Icon, value, label, className }: Stat & { className?: string }) {
  return (
    <li
      className={cn(
        'flex flex-col items-center rounded-2xl border border-prime/10 bg-surface px-4 py-6 text-center shadow-sm transition-shadow duration-200 hover:shadow-card',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-prime-yellow/10 text-prime-yellow">
        <Icon size={24} aria-hidden />
      </span>
      <p className="mt-4 text-2xl font-bold text-prime-dark tabular-nums sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-text-muted">{label}</p>
    </li>
  );
}

export default function AboutBanner() {
  return (
    <section className="bg-linear-to-b from-light to-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={BANNER.eyebrow}
          title={BANNER.title}
          description={BANNER.description}
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-5 md:gap-6">
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
