import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
      <span className="text-sm font-bold text-prime uppercase tracking-wider mb-2">
        404 Error
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-prime-dark tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-zinc-600 max-w-md mb-8">
        The page you are looking for does not exist or has been moved to a new URL.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-prime hover:bg-prime-outline text-white font-semibold text-sm transition-colors shadow-xs"
      >
        Back to Home
      </Link>
    </div>
  );
}
