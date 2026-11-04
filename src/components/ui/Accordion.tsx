'use client';

import { useId, useState, type ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface AccordionEntry {
  id: string | number;
  title: string;
  content: ReactNode | string[];
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  /** Index open on first render; `null` starts all closed. */
  defaultOpenIndex?: number | null;
  /** Wrapper classes — use `space-y-*` to set the gap between items. */
  className?: string;
}

export default function Accordion({ items, defaultOpenIndex = 0, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-xl border bg-surface transition-[border-color,box-shadow] duration-300',
              isOpen ? 'border-prime/30 shadow-card' : 'border-border-muted/70 hover:border-prime/30',
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-semibold text-prime-dark">{item.title}</span>
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm transition-all duration-300',
                    isOpen ? 'rotate-180 bg-prime text-on-dark' : 'bg-prime/10 text-prime',
                  )}
                >
                  <FaChevronDown aria-hidden />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 px-5 pb-5 text-sm leading-relaxed text-text-muted md:text-base">
                  {Array.isArray(item.content)
                    ? item.content.map((line, j) => <p key={j}>{line}</p>)
                    : <p>{item.content}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
