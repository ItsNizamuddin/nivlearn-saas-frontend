'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** Current selected value. Pass `''` for the placeholder state. */
  value: string;
  /** Called with the new value when user selects an option. */
  onChange: (value: string) => void;
  /** All selectable options. */
  options: DropdownOption[];
  /** Placeholder text shown when value is empty. */
  placeholder?: string;
  /** Icon rendered to the left of the label. */
  icon?: ReactNode;
  /** Accessible label (read by screen readers). */
  label: string;
  /** Additional classes on the trigger button. */
  className?: string;
}

/**
 * Dropdown
 *
 * A fully custom-styled select replacement that matches the brand design system.
 * - Keyboard navigable (Arrow keys, Enter, Escape, Home, End)
 * - ARIA combobox / listbox pattern
 * - Closes on outside click or Escape
 * - Supports an optional leading icon and placeholder
 *
 * Usage:
 * ```tsx
 * <Dropdown
 *   label="Month"
 *   icon={<CalendarDays className="size-4" />}
 *   placeholder="Any month"
 *   value={month}
 *   onChange={setMonth}
 *   options={months}
 * />
 * ```
 */
export default function Dropdown({ value, onChange, options, placeholder = 'Select…', icon, label, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(-1);
  const id = useId();
  const listId = `${id}-list`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const isActive = !!value;

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* ── Scroll focused item into view ── */
  useEffect(() => {
    if (!open || focused < 0) return;
    const item = listRef.current?.children[focused] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [focused, open]);

  /* ── Reset focus index when opening ── */
  const toggle = () => {
    setOpen((prev) => {
      if (!prev) setFocused(options.findIndex((o) => o.value === value));
      return !prev;
    });
  };

  const select = (val: string) => {
    onChange(val);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
        setFocused(options.findIndex((o) => o.value === value));
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocused((f) => Math.min(f + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocused((f) => Math.max(f - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocused(0);
        break;
      case 'End':
        e.preventDefault();
        setFocused(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focused >= 0) select(options[focused].value);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex min-h-10 items-center gap-2 rounded-lg border px-3 pr-8 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prime/30',
          isActive
            ? 'border-prime bg-prime text-on-dark'
            : 'border-border-muted bg-surface text-text-body hover:border-prime/50',
          open && !isActive && 'border-prime/50',
          className,
        )}
      >
        {icon && <span aria-hidden className={cn('shrink-0', isActive ? 'text-on-dark' : 'text-text-muted')}>{icon}</span>}
        <span className="truncate">
          {selected ? selected.label : <span className={isActive ? 'text-on-dark' : 'text-text-muted'}>{placeholder}</span>}
        </span>
        <ChevronDown
          aria-hidden
          className={cn('pointer-events-none absolute right-2.5 size-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* ── Popover list ── */}
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          onKeyDown={handleKeyDown}
          className={cn(
            'absolute left-0 top-[calc(100%+6px)] z-50 min-w-full max-h-64 overflow-y-auto',
            'rounded-xl border border-border-muted bg-surface shadow-xl',
            'py-1',
            // Scroll-bar styling (uses the tailwind-scrollbar plugin already in the project)
            'scrollbar-thin scrollbar-thumb-scrollbar-thumb scrollbar-track-transparent',
          )}
        >
          {/* "Any / placeholder" option */}
          <li
            role="option"
            aria-selected={value === ''}
            onClick={() => select('')}
            onMouseEnter={() => setFocused(-1)}
            className={cn(
              'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
              value === ''
                ? 'bg-prime/8 font-semibold text-prime'
                : 'text-text-muted hover:bg-sec-prime hover:text-prime-dark',
              focused === -1 && 'bg-sec-prime',
            )}
          >
            {value === '' && <Check aria-hidden className="size-3.5 shrink-0 text-prime" />}
            <span className={value === '' ? '' : 'pl-[1.375rem]'}>{placeholder}</span>
          </li>

          {/* Thin divider */}
          <li role="separator" className="mx-3 my-1 h-px bg-border-muted" aria-hidden />

          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isFocused = focused === i;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(opt.value)}
                onMouseEnter={() => setFocused(i)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                  isSelected ? 'font-semibold text-prime' : 'text-text-body',
                  isFocused ? 'bg-sec-prime' : 'hover:bg-sec-prime hover:text-prime-dark',
                )}
              >
                {isSelected ? (
                  <Check aria-hidden className="size-3.5 shrink-0 text-prime" />
                ) : (
                  <span aria-hidden className="size-3.5 shrink-0" />
                )}
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

