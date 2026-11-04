import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

/** Icon + big number + label. Used in stat rows on About, Instructor, etc. */
export default function StatCard({ icon: Icon, value, label, className }: Stat & { className?: string }) {
  return (
    <li
      className={cn(
        'group flex flex-col items-center rounded-2xl border border-prime/10 bg-surface/90 px-4 py-6 text-center shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-prime/25 hover:shadow-card',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-prime/10 text-prime transition-colors duration-200 group-hover:bg-prime group-hover:text-on-dark">
        <Icon size={22} aria-hidden />
      </span>
      <p className="mt-4 font-heading text-2xl font-bold text-prime-dark tabular-nums sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-text-muted">{label}</p>
    </li>
  );
}

/** Responsive stat row; an odd last card spans the 2-column mobile grid. */
export function StatGrid({ stats, className }: { stats: readonly Stat[]; className?: string }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5', className)}>
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          {...stat}
          className={stats.length % 2 === 1 && i === stats.length - 1 ? 'col-span-2 md:col-span-1' : undefined}
        />
      ))}
    </ul>
  );
}
