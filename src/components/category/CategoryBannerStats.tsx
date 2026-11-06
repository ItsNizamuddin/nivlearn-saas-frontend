import React from 'react';

const STAT_SPRITES = ['bg-catstats1', 'bg-catstats2', 'bg-catstats3', 'bg-catstats4'];

export default function CategoryBannerStats({
  stats,
}: {
  stats?: Array<{ id?: number | string; value: string; title: string }>;
}) {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="section-container border-y border-border-muted/60 py-6 my-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-between">
        {stats.map((stat, index) => (
          <div key={stat.id || index} className="flex flex-col items-center text-center space-y-1">
            <div className={`${STAT_SPRITES[index % STAT_SPRITES.length]} scale-90 sm:scale-100 transition-transform`} />
            <span className="font-heading text-lg sm:text-xl 2xl:text-2xl font-black text-prime-dark">
              {stat.value}
            </span>
            <span className="text-text-muted text-xs sm:text-sm font-medium">
              {stat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

