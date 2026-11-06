import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import CtaBanner from '@/components/ui/CtaBanner';
import { cn } from '@/lib/utils';
import { getLegalDoc, LEGAL_DOCS, type LegalSlug } from '@/content/legal';
import ctaImage from '../../../public/CourseCat/cta-learner.webp';

/** Sidebar listing every legal page; the current one is highlighted. */
function LegalNav({ current }: { current: LegalSlug }) {
  return (
    <nav aria-label="Policies" className="rounded-2xl bg-prime-dark p-5 shadow-card">
      <p className="mb-4 px-2 text-sm font-semibold tracking-[0.15em] text-prime-yellow uppercase">Policies</p>
      <ul className="space-y-1">
        {LEGAL_DOCS.map((doc) => {
          const active = doc.slug === current;
          return (
            <li key={doc.slug}>
              <Link
                href={`/${doc.slug}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium transition-colors duration-200',
                  active ? 'bg-on-dark/10 text-on-dark' : 'text-on-dark/75 hover:bg-on-dark/5 hover:text-on-dark',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-lg text-xs',
                    active ? 'bg-prime-yellow text-prime-dark' : 'bg-on-dark/10 text-prime1',
                  )}
                >
                  <ChevronRight className="size-3.5" />
                </span>
                {doc.navLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Shared layout for Terms, Privacy, Refund and Grievance pages. */
export default function LegalPage({ slug, children }: { slug: LegalSlug; children?: ReactNode }) {
  const doc = getLegalDoc(slug);

  return (
    <Section tone="fade">
      <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
        {/* On mobile the nav sits under the article; on desktop it's a sticky sidebar. */}
        <aside className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
          <LegalNav current={slug} />
        </aside>

        <article className="order-1 rounded-2xl border border-prime/10 bg-surface p-6 shadow-sm sm:p-10 lg:order-2">
          <h1 className="border-b border-border-muted pb-5 text-3xl font-bold tracking-tight text-prime-dark sm:text-4xl">
            {doc.title}
          </h1>
          {/* Trusted, static content from src/content/legal.ts styled with rich-text & skilldeck-rich-text */}
          <div className="rich-text skilldeck-rich-text mt-6" dangerouslySetInnerHTML={{ __html: doc.html }} />
          {children}
        </article>
      </div>

      <CtaBanner
        className="mt-16"
        title="Get exclusive offers!"
        description="Kickstart Your Career in Agile & Project Management Today!"
        actionLabel="Avail Now!"
        form="advisor"
        image={ctaImage}
      />
    </Section>
  );
}
