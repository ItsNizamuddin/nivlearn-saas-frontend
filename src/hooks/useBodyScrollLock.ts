'use client';

import { useEffect } from 'react';

/**
 * Reference-counted body scroll lock.
 * Ensures the body only unlocks once every overlay (LeadModal, MobileMenu, etc.)
 * has closed.
 */
let lockCount = 0;
let previousOverflow: string | null = null;

function lock() {
    if (typeof document === 'undefined') return;

    if (lockCount === 0) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }

    lockCount += 1;
}

function unlock() {
    if (typeof document === 'undefined') return;

    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0) {
        document.body.style.overflow = previousOverflow ?? '';
        previousOverflow = null;
    }
}

export default function useBodyScrollLock(active: boolean) {
    useEffect(() => {
        if (!active) return;

        lock();
        return () => unlock();
    }, [active]);
}

