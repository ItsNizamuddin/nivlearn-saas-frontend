'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
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
      className="bg-prime-dark py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-prime-yellow uppercase sm:text-sm">
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
                    ? 'bg-prime text-on-dark'
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
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  <span className="text-prime-yellow">NivLearn</span> <span className="text-prime">{slide.title}</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-on-dark/85">{slide.description}</p>
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
                  i === index ? 'w-12 bg-prime-yellow' : 'w-6 bg-on-dark/25',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
