import Image from 'next/image';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { WHY_CHOOSE_US, WHY_CHOOSE_US_POINTS } from './data';

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card lg:aspect-[4/5]">
          <Image
            src={WHY_CHOOSE_US.image}
            alt="Why Choose Us"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-overlay/40 to-transparent" />
        </div>

        <div>
          <SectionHeading
            eyebrow={WHY_CHOOSE_US.eyebrow}
            title={WHY_CHOOSE_US.title}
            description={WHY_CHOOSE_US.description}
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {WHY_CHOOSE_US_POINTS.map((point) => (
              <li
                key={point.title}
                className="rounded-2xl border border-prime/15 bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/25 hover:shadow-card"
              >
                <div className="flex items-center gap-3.5">
                  <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-prime/10 text-prime sm:size-14">
                    <point.icon className="size-6 sm:size-7" />
                  </span>
                  <h3 className="text-lg font-bold text-prime-dark">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
