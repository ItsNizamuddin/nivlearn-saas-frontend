import { cn } from '@/lib/utils';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

/** Initials avatar (placeholder until authors have photos). */
export default function AuthorAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-light text-xs font-bold text-prime ring-1 ring-prime/15',
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
