'use client';

import { useEffect } from 'react';

export default function HeaderRibbonOffsetSync() {
  useEffect(() => {
    const root = document.documentElement;
    const headerRibbon = document.getElementById('header-ribbon');
    const footerRibbon = document.getElementById('footer-ribbon');

    if (!headerRibbon) {
      root.style.setProperty('--sticky-top-offset', '0px');
    }
    if (!footerRibbon) {
      root.style.setProperty('--sticky-bottom-offset', '0px');
    }
    if (!headerRibbon && !footerRibbon) return;

    const observers: ResizeObserver[] = [];

    if (headerRibbon) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        root.style.setProperty('--sticky-top-offset', `${height}px`);
      });
      observer.observe(headerRibbon);
      observers.push(observer);
      requestAnimationFrame(() => {
        root.style.setProperty(
          '--sticky-top-offset',
          `${headerRibbon.getBoundingClientRect().height}px`
        );
      });
    }

    if (footerRibbon) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        root.style.setProperty('--sticky-bottom-offset', `${height}px`);
      });
      observer.observe(footerRibbon);
      observers.push(observer);
      requestAnimationFrame(() => {
        root.style.setProperty(
          '--sticky-bottom-offset',
          `${footerRibbon.getBoundingClientRect().height}px`
        );
      });
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}

