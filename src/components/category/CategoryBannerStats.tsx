import React from 'react';

const STAT_SPRITES = ['bg-catstats1', 'bg-catstats2', 'bg-catstats3', 'bg-catstats4'];

// Accent colors cycling through 4 brand-consistent tones
const ACCENT_COLORS = [
  'bg-prime/10 text-prime border-prime/20',
  'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'bg-purple-500/10 text-purple-700 border-purple-500/20',
];

export default function CategoryBannerStats({
  stats,
}: {
  stats?: Array<{ id?: number | string; value: string; title: string }>;
}) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="section-container">
      {/* Thin divider top */}
      <div className="border-t border-border-muted/50" />

      {/* ===== MOBILE LAYOUT: 2-col scrollable grid ===== */}
      <div className="lg:hidden py-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className={`flex items-center gap-3 p-3 rounded-xl border ${ACCENT_COLORS[index % ACCENT_COLORS.length]} bg-opacity-50`}
            >
              {/* Sprite Icon */}
              <div
                className={`${STAT_SPRITES[index % STAT_SPRITES.length]} shrink-0`}
                role="img"
                aria-hidden="true"
              />
              {/* Text */}
              <div className="min-w-0">
                <p className="font-heading text-base font-black text-prime-dark leading-tight truncate">
                  {stat.value}
                </p>
                <p className="text-[11px] font-medium text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT: Horizontal strip ===== */}
      <div className="hidden lg:block py-6">
        {/* Equal columns that wrap onto a second row instead of overflowing (CMS can send 7+ stats) */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-x-4 gap-y-5">
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className="flex items-start gap-2.5 min-w-0 group"
            >
              {/* Sprite Icon with subtle hover ring */}
              <div
                className={`${STAT_SPRITES[index % STAT_SPRITES.length]} shrink-0 group-hover:scale-110 transition-transform duration-200`}
                role="img"
                aria-hidden="true"
              />
              {/* Text */}
              <div className="min-w-0">
                <p className="font-heading text-lg xl:text-xl font-black text-prime-dark leading-tight">
                  {stat.value}
                </p>
                <p className="text-xs xl:text-sm font-medium text-slate-500 leading-snug mt-0.5 text-balance">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thin divider bottom */}
      <div className="border-b border-border-muted/50" />
    </div>
  );
}
