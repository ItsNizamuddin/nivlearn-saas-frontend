'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** Live `prefers-reduced-motion` value; `false` during server render. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Index state for an auto-advancing carousel.
 * - Timer restarts whenever the index changes, so manual navigation
 *   always gets a full interval before the next auto-advance.
 * - Never auto-advances while `paused` (e.g. hover / keyboard focus)
 *   or when the user prefers reduced motion.
 */
export function useAutoCarousel(length: number, { intervalMs = 6000, paused = false } = {}) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (length < 2 || paused || reducedMotion) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearTimeout(id);
  }, [index, length, intervalMs, paused, reducedMotion]);

  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);

  return { index, next, prev, setIndex };
}
