'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { cn } from '@/lib/utils';

export interface BottomDrawerProps {
  /** Controls open/closed state. Pass `null` or `false` to close. */
  open: boolean;
  /** Called when the drawer should close (backdrop click, Escape, close button). */
  onClose: () => void;
  /**
   * Title rendered in the sticky header next to the close button.
   * Can be a string or any ReactNode for custom heading markup.
   */
  title?: ReactNode;
  /** Content rendered inside the scrollable body. */
  children: ReactNode;
  /**
   * Extra classes applied to the inner content wrapper (body padding area).
   * Default: `'px-5 pb-5 sm:px-7 sm:pb-7'`
   */
  contentClassName?: string;
  /**
   * Maximum width on sm+ screens (centered modal mode).
   * Default: `'sm:max-w-2xl'`
   */
  maxWidthClassName?: string;
  /** aria-labelledby id — point this at the element that labels the drawer. */
  labelledBy?: string;
}

/**
 * BottomDrawer
 *
 * Mobile  → full-width sheet that slides up from the bottom of the screen.
 * sm+     → standard centred modal dialog.
 *
 * Uses the native `<dialog>` element for built-in focus trap, Escape handling,
 * backdrop click-to-close, and accessibility.
 *
 * Usage:
 * ```tsx
 * <BottomDrawer open={!!item} onClose={() => setItem(null)} title="Details">
 *   <p>Your content here</p>
 * </BottomDrawer>
 * ```
 */
export default function BottomDrawer({
  open,
  onClose,
  title,
  children,
  contentClassName,
  maxWidthClassName = 'sm:max-w-2xl',
  labelledBy,
}: BottomDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useBodyScrollLock(open);

  /* Sync open prop → native dialog open/close */
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      /* Clicking the backdrop (the dialog itself, not its children) closes it */
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby={labelledBy}
      className={cn(
        // ── Shared ──────────────────────────────────────────────────────────
        'bg-surface p-0 text-text-body shadow-2xl',
        'backdrop:bg-overlay/60',
        // ── Mobile: bottom sheet ─────────────────────────────────────────────
        'mx-0 mb-0 mt-auto w-full max-w-none max-h-[92dvh] overflow-y-auto',
        'rounded-t-2xl rounded-b-none',
        'open:animate-[slide-up_0.35s_cubic-bezier(0.32,0.72,0,1)]',
        // ── sm+: centred modal ───────────────────────────────────────────────
        'sm:m-auto sm:rounded-2xl sm:w-[calc(100%-2rem)]',
        maxWidthClassName,
      )}
    >
      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-surface">
        {/* Single row: [spacer] [pill] [close] all vertically centered */}
        <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center px-5 pt-3 pb-2 sm:px-7 sm:pt-4">
          {/* Left spacer mirrors close-button width so pill is truly centred */}
          <span aria-hidden />

          {/* Drag-handle pill — mobile only */}
          <div className="flex justify-center sm:hidden" aria-hidden>
            <div className="h-1 w-10 rounded-full bg-border-muted" />
          </div>
          <span className="hidden sm:block" aria-hidden />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-danger hover:bg-danger/10"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        {/* Optional title row */}
        {title && (
          <div className="min-w-0 truncate px-5 pb-2 sm:px-7">{title}</div>
        )}
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────────────── */}
      <div className={contentClassName ?? 'px-5 pb-5 sm:px-7 sm:pb-7'}>{children}</div>
    </dialog>
  );
}

