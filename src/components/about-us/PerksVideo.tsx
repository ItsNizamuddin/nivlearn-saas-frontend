'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import VideoModal from '@/components/ui/VideoModal';
import { PERKS_VIDEO } from './data';

export default function PerksVideo() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-label="Play video"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl shadow-card"
      >
        <Image
          src={PERKS_VIDEO.poster}
          alt=""
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-overlay/20 transition-colors duration-300 group-hover:bg-overlay/30" />
        <span className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-prime-yellow text-prime-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 rounded-full bg-prime-yellow/60 motion-safe:animate-ping" />
          <Play className="relative ml-1 size-8 fill-current" aria-hidden />
        </span>
      </button>

      <VideoModal open={open} onClose={close} src={PERKS_VIDEO.src} title={PERKS_VIDEO.title} />
    </>
  );
}
