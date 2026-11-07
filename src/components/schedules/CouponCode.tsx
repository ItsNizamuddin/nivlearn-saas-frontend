'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CouponCodeProps {
  code: string;
  className?: string;
}

/** Coupon code with a copy button. */
export default function CouponCode({ code, className }: CouponCodeProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the code is still visible to copy by hand.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-prime-yellow bg-prime-yellow/10 px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-prime-dark transition-colors hover:bg-prime-yellow/20',
        className,
      )}
    >
      <span className="truncate">{code}</span>
      {copied ? <Check aria-hidden className="size-4 shrink-0 text-success" /> : <Copy aria-hidden className="size-4 shrink-0 text-text-muted" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : 'Copy code'}
      </span>
    </button>
  );
}
