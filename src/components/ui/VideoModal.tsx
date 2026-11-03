'use client';

import { useEffect } from 'react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}

/** Fullscreen overlay with an embedded video. The iframe only mounts while open. */
export default function VideoModal({ open, onClose, src, title = 'Video' }: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/50 p-4"
    >
      <div className="relative w-full max-w-2xl rounded-lg 2xl:max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute -top-10 right-0 text-3xl text-on-dark hover:text-on-dark/70"
        >
          ×
        </button>
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute inset-0 h-full w-full rounded-lg"
            src={src}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
