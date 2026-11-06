import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { BlogAuthor } from './types';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

/** Author photo, or initials when the author has none. Decorative: the name is always shown next to it. */
export default function AuthorAvatar({ author, className }: { author: BlogAuthor; className?: string }) {
  const base = cn('relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-prime/15', className);
  if (author.photo) {
    return (
      <span aria-hidden className={cn(base, 'bg-light')}>
        <Image src={author.photo} alt="" fill sizes="40px" className="object-cover" />
      </span>
    );
  }
  return (
    <span aria-hidden className={cn(base, 'bg-light text-xs font-bold text-prime')}>
      {initials(author.name)}
    </span>
  );
}
