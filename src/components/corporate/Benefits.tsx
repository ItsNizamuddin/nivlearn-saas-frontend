import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { BENEFITS } from './data';

/** Bars are scaled so the largest value fills the track. */
const MAX = Math.max(...BENEFITS.items.map((b) => b.percent));

export default function Benefits() {
  return (
    <Section containerClassName="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <ul className="space-y-3">
        {BENEFITS.items.map((b) => (
          <li key={b.title} className="flex items-center gap-4 rounded-2xl border border-prime/10 bg-surface-muted p-4">
            <Image src={b.icon} alt="" className="size-12 shrink-0" />
            <div>
              <p className="font-semibold text-prime-dark">{b.title}</p>
              <p className="text-sm text-text-muted">{b.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <SectionHeading eyebrow={BENEFITS.eyebrow} title={BENEFITS.title} />
        {/* Single-series magnitude chart: one hue, values labelled, no legend needed. */}
        <figure className="mt-8 rounded-2xl border border-prime/10 bg-light p-6 sm:p-8">
          <figcaption className="font-semibold text-prime-dark">{BENEFITS.chartTitle}</figcaption>
          <ul className="mt-6 space-y-5">
            {BENEFITS.items.map((b) => (
              <li key={b.label} title={`${b.label}: +${b.percent}%`}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-text-body">{b.label}</span>
                  <span className="font-heading font-bold text-prime-dark tabular-nums">+{b.percent}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface" aria-hidden>
                  <div className="h-full rounded-full bg-prime" style={{ width: `${(b.percent / MAX) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </Section>
  );
}
