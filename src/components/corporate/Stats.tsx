import Image from 'next/image';
import Marquee from '@/components/ui/Marquee';
import Section from '@/components/ui/Section';
import SpriteLogo from '@/components/ui/SpriteLogo';
import { buttonClass } from '@/components/ui/button';
import { INDUSTRY_LOGOS } from '@/lib/logoSprites';
import { STATS } from './data';
import LeadCta from '@/components/forms/LeadCta';

function Figure({ value, text }: { value: string; text: string }) {
  return (
    <li className="flex items-baseline gap-2 text-sm text-text-muted sm:text-base">
      <span className="min-w-14 font-heading font-bold text-prime tabular-nums">{value}</span>
      {text}
    </li>
  );
}

const half = Math.ceil(INDUSTRY_LOGOS.length / 2);
const COLUMNS = [INDUSTRY_LOGOS.slice(0, half), INDUSTRY_LOGOS.slice(half)];

export default function Stats() {
  const { cards, performance } = STATS;

  return (
    <Section tone="light" containerClassName="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-prime-dark">{card.title}</h3>
              <ul className="mt-4 space-y-2">
                {card.items.map((item) => (
                  <Figure key={item.text} {...item} />
                ))}
              </ul>
              {card.footer.map((f) => (
                <p key={f} className="mt-3 text-sm font-semibold text-prime-dark">
                  {f}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm md:flex-row">
          <Image src={performance.image} alt="" sizes="(min-width: 768px) 280px, 100vw" className="h-56 w-full object-cover md:h-auto md:w-72" />
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="text-lg font-bold text-prime-dark">{performance.title}</h3>
            <ul className="mt-4 space-y-2">
              {performance.items.map((item) => (
                <Figure key={item.text} {...item} />
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-prime-dark">{performance.footer}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LeadCta form="corporateBrochure" className={buttonClass('primary')}>
                Download Brochure
              </LeadCta>
              <LeadCta form="corporate" className={buttonClass('accent')}>
                Request a custom quote
              </LeadCta>
            </div>
          </div>
        </div>
      </div>

      {/* Two vertical logo columns moving in opposite directions (desktop only). */}
      <div className="hidden h-[34rem] grid-cols-2 gap-4 lg:grid" aria-label="Client logos" role="region">
        {COLUMNS.map((logos, i) => (
          <Marquee key={i} direction="y" reverse={i === 1} duration={45} fadeFrom="from-light">
            {logos.map((logo, j) => (
              <span key={j} className="flex h-20 items-center justify-center rounded-xl bg-surface px-3 shadow-sm">
                <SpriteLogo logo={logo} scale={0.6} />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </Section>
  );
}
