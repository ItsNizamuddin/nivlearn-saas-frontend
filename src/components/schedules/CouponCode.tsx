'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

/** Coupon code with a copy button. */
export default function CouponCode({ code }: { code: string }) {
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
      className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-prime-yellow bg-prime-yellow/10 px-3 font-mono text-sm font-bold tracking-wider text-prime-dark hover:bg-prime-yellow/20"
    >
      {code}
      {copied ? <Check aria-hidden className="size-4 text-success" /> : <Copy aria-hidden className="size-4 text-text-muted" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : 'Copy code'}
      </span>
    </button>
  );
}
