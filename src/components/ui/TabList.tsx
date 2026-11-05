'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabListProps {
  /** Prefix for tab/panel ids: tab = `${idPrefix}-tab-${id}`, panel = `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  label: string;
  items: readonly TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Accessible pill tabs (arrow keys move between tabs).
 * Scrolls horizontally on small screens instead of collapsing into a dropdown.
 */
export default function TabList({ idPrefix, label, items, active, onChange, className }: TabListProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = items.findIndex((t) => t.id === active);
    const next = items[(i + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length];
    onChange(next.id);
    document.getElementById(`${idPrefix}-tab-${next.id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      {items.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            id={`${idPrefix}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200',
              selected
                ? 'border-prime bg-prime text-on-dark shadow-md shadow-prime/25'
                : 'border-border-muted bg-surface text-prime-dark hover:border-prime/40',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
