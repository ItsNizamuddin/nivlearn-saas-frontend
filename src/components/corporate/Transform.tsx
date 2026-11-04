'use client';

import { useState } from 'react';
import Image from 'next/image';
import CheckList from '@/components/ui/CheckList';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import TabList from '@/components/ui/TabList';
import { TRANSFORM } from './data';

export default function Transform() {
  const [active, setActive] = useState(TRANSFORM.tabs[0].id);
  const tab = TRANSFORM.tabs.find((t) => t.id === active)!;

  return (
    <Section containerClassName="grid items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <Image
        src={TRANSFORM.image}
        alt=""
        sizes="(min-width: 1024px) 35vw, 80vw"
        className="mx-auto h-auto w-full max-w-sm lg:max-w-none"
      />
      <div>
        <SectionHeading eyebrow={TRANSFORM.eyebrow} title={TRANSFORM.title} />
        <TabList
          className="mt-8"
          idPrefix="transform"
          label="Transformation stages"
          active={active}
          onChange={setActive}
          items={TRANSFORM.tabs.map((t) => ({
            id: t.id,
            label: t.label,
            icon: <Image src={t.icon} alt="" width={20} height={20} />,
          }))}
        />
        <div
          role="tabpanel"
          id={`transform-panel-${tab.id}`}
          aria-labelledby={`transform-tab-${tab.id}`}
          className="mt-6 rounded-2xl border border-prime/10 bg-light p-6 sm:p-8"
        >
          <h3 className="text-xl font-bold text-prime-dark">{tab.title}</h3>
          <p className="mt-2 text-text-muted">{tab.description}</p>
          <CheckList items={tab.points} className="mt-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-3" />
        </div>
      </div>
    </Section>
  );
}
