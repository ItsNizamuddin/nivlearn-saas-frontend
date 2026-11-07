'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { X } from 'lucide-react';

interface RibbonBannerClientProps {
  id: string;
  html: string;
  type: 'header' | 'footer';
  isSticky: boolean;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export default function RibbonBannerClient({
  id,
  html,
  type,
  isSticky,
}: RibbonBannerClientProps) {
  const [userDismissed, setUserDismissed] = useState(false);

  // Subscribe to session storage state safely without triggering cascading renders or hydration mismatches
  const isStoredDismissed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return sessionStorage.getItem(`ribbon_dismissed_${id}`) === 'true';
      } catch {
        return false;
      }
    },
    () => false
  );

  const dismissed = userDismissed || isStoredDismissed;

  const handleDismiss = () => {
    setUserDismissed(true);
    try {
      sessionStorage.setItem(`ribbon_dismissed_${id}`, 'true');
    } catch {
      // Ignore
    }
  };

  if (dismissed || !html) return null;

  // Header vs Footer positioning classes
  // Using pure sticky CSS: stays in natural document flow initially (zero layout shift/CLS),
  // and stays pinned at top/bottom when scrolling!
  const positionClass =
    type === 'header'
      ? isSticky
        ? 'sticky top-0 z-[100]'
        : 'relative z-30'
      : isSticky
        ? 'sticky bottom-0 z-[100]'
        : 'relative z-30';

  return (
    <aside
      id={`${type}-ribbon`}
      aria-label="Announcement"
      className={`w-full ${positionClass} transition-all duration-300 shadow-xs`}
    >
      <div className="relative w-full overflow-hidden">
        {/* Ribbon Content Container */}
        <div
          className="w-full overflow-x-auto overflow-y-hidden max-w-full text-center ribbon-scroll-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Subtle Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/10 hover:bg-black/20 text-current transition-colors cursor-pointer z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

