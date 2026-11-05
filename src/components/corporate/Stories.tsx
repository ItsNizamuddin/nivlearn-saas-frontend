'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import TabList from '@/components/ui/TabList';
import { STORIES } from './data';

const idOf = (category: string) => category.toLowerCase().replace(/\s+/g, '-');

export default function Stories() {
  const [active, setActive] = useState(idOf(STORIES.items[0].category));
  const story = STORIES.items.find((s) => idOf(s.category) === active)!;

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={STORIES.eyebrow} title={STORIES.title} />
      <TabList
        className="mt-8"
        idPrefix="story"
        label="Industries"
        active={active}
        onChange={setActive}
        items={STORIES.items.map((s) => ({
          id: idOf(s.category),
          label: s.category,
          icon: <s.icon aria-hidden className="size-5" />,
        }))}
      />

      <div
        role="tabpanel"
        id={`story-panel-${active}`}
        aria-labelledby={`story-tab-${active}`}
        className="mt-8 grid gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-surface p-6 shadow-sm">
            <h3 className="flex items-center gap-3 text-lg font-bold text-prime-dark">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-prime/10 text-prime">
                <story.icon className="size-5" />
              </span>
              {story.category}
            </h3>
            <p className="mt-3 leading-relaxed text-text-muted">{story.description}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {(
              [
                ['Challenge', story.challenge],
                ['Solution', story.solution],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className="rounded-2xl bg-surface p-6 shadow-sm">
                <h4 className="text-sm font-semibold tracking-[0.15em] text-prime uppercase">{label}</h4>
                <p className="mt-2 leading-relaxed text-text-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={STORIES.image}
          alt=""
          sizes="(min-width: 1024px) 30vw, 0px"
          className="hidden h-full w-full rounded-2xl object-cover lg:block"
        />
      </div>
    </Section>
  );
}
