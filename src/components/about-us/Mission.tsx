'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import GradientText from '@/components/ui/GradientText';
import Glow from '@/components/ui/Glow';
import { useAutoCarousel } from '@/hooks/useAutoCarousel';
import { cn } from '@/lib/utils';
import { MISSION_IMAGES, MISSION_IMAGES_PER_PAGE, MISSION_SLIDES } from './data';

// Chunk the gallery into pages once, at module load.
const IMAGE_PAGES = Array.from(
  { length: Math.ceil(MISSION_IMAGES.length / MISSION_IMAGES_PER_PAGE) },
  (_, page) => MISSION_IMAGES.slice(page * MISSION_IMAGES_PER_PAGE, (page + 1) * MISSION_IMAGES_PER_PAGE),
);

export default function Mission() {
  const [paused, setPaused] = useState(false);
  const { index, setIndex } = useAutoCarousel(MISSION_SLIDES.length, { paused });
  const imagePage = index % IMAGE_PAGES.length;

  return (
    <section
      className="relative overflow-hidden bg-prime-dark py-10 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Glow />
      <Container className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image gallery (tablet and up) */}
        <div className="hidden overflow-hidden rounded-2xl md:block" aria-hidden>
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${imagePage * 100}%)` }}
          >
            {IMAGE_PAGES.map((images, pageIdx) => (
              <div key={pageIdx} className="grid w-full shrink-0 grid-cols-3 gap-3">
                {images.map((img) => (
                  <figure key={img.title} className="relative aspect-[3/5] overflow-hidden rounded-xl">
                    <Image
                      src={img.image}
                      alt=""
                      sizes="(min-width: 1024px) 15vw, 30vw"
                      className="h-full w-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-overlay/70 to-transparent p-3 pt-10 text-xs font-bold tracking-wide text-on-dark uppercase sm:text-sm">
                      {img.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="text-on-dark">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-prime-yellow uppercase sm:text-sm">
            <span aria-hidden className="h-0.5 w-6 rounded-full bg-brand-orange" />
            Our Training Approach
          </p>

          {/* Tabs */}
          <div role="tablist" aria-label="Training approach" className="mb-6 flex flex-wrap gap-2">
            {MISSION_SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                id={`mission-tab-${i}`}
                aria-selected={i === index}
                aria-controls={`mission-panel-${i}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'min-h-11 cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors duration-200',
                  i === index
                    ? 'bg-prime text-on-dark shadow-lg shadow-prime/30'
                    : 'border border-on-dark/20 text-on-dark/80 hover:border-on-dark/40 hover:text-on-dark',
                )}
              >
                {slide.title}
              </button>
            ))}
          </div>

          {/* All panels share one grid cell, so the block is as tall as the
              longest text and nothing below it jumps when the tab changes. */}
          <div className="grid">
            {MISSION_SLIDES.map((slide, i) => (
              <div
                key={slide.title}
                role="tabpanel"
                id={`mission-panel-${i}`}
                aria-labelledby={`mission-tab-${i}`}
                inert={i !== index}
                className={cn(
                  'col-start-1 row-start-1 transition-opacity duration-500',
                  i === index ? 'opacity-100' : 'invisible opacity-0',
                )}
              >
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  <GradientText tone="orange">NivLearn</GradientText>{' '}
                  {/* sky blue: --prime is too dark to read on navy */}
                  <span className="text-prime1">{slide.title}</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-on-dark/85">{slide.description}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-8 flex gap-2" aria-hidden>
            {MISSION_SLIDES.map((slide, i) => (
              <span
                key={slide.title}
                className={cn(
                  'h-1 rounded-full transition-all duration-300',
                  i === index ? 'w-12 bg-brand-orange' : 'w-6 bg-on-dark/25',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
