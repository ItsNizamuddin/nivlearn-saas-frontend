'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, XCircle, ChevronRight, GraduationCap } from 'lucide-react';
import { Category, Course } from './types';

interface SearchCourse extends Course {
  catslug: string;
}

interface SearchBarProps {
  categories?: Category[];
  onFocus?: () => void;
  onSelect?: () => void;
  className?: string;
  dropdownClassName?: string;
  autoFocus?: boolean;
}

/** Highlights matching search query substring inside course title */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <span>{text}</span>;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className="text-prime font-bold bg-prime/10 px-0.5 rounded"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

export default function SearchBar({
  categories = [],
  onFocus,
  onSelect,
  className = 'w-full w-80 lg:w-62',
  dropdownClassName,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // 200ms Debounce Handler
  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery('');
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const [searchResults, setSearchResults] = useState<SearchCourse[]>([]);

  // Search courses on-demand via API
  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults([]);
      return;
    }

    let isMounted = true;
    fetch(`/api/courses?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setSearchResults((data.courses || []).slice(0, 8));
      })
      .catch((err) => console.error('Search error:', err));

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const filtered = searchResults;

  // Handle outside clicks to close search dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      onSelect?.();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          {isSearching ? (
            <svg
              className="animate-spin h-3.5 w-3.5 text-prime"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <Search size={16} />
          )}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length >= 1) setIsOpen(true);
            onFocus?.();
          }}
          onClick={() => {
            onFocus?.();
            if (query.trim().length >= 1) setIsOpen(true);
          }}
          placeholder="What do you want to learn today?"
          className="w-full py-1.5 pl-9 pr-5 border border-border-muted/60 rounded-md text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs focus:outline-none focus:border-prime focus:ring-1 focus:ring-prime/20 bg-surface transition-all"
        />

        {/* Clear Button */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-prime-dark cursor-pointer"
            aria-label="Clear search"
          >
            <XCircle size={16} />
          </button>
        )}
      </form>

      {/* Results Dropdown: Matches exact width of input box */}
      {isOpen && debouncedQuery.length >= 1 && (
        <div
          className={`absolute z-50 left-0 right-0 w-full top-full mt-1.5 bg-surface border border-border-muted/60 rounded-lg shadow-xl overflow-hidden ${dropdownClassName || ''
            }`}
        >
          {filtered.length > 0 ? (
            <div className="py-1 max-h-72 overflow-y-auto custom-scrollbar divide-y divide-border-muted/20">
              {filtered.map((course) => (
                <Link
                  key={`${course.catslug}-${course.slug}`}
                  href={`/${course.catslug}/${course.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    onSelect?.();
                  }}
                  className="group flex items-start justify-between gap-2 px-3.5 py-2.5 text-xs sm:text-sm text-prime-dark hover:bg-sec-prime hover:text-prime transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <Search className="text-text-muted h-3.5 w-3.5 shrink-0 mt-1 group-hover:text-prime transition-colors" />
                    <span className="font-medium leading-snug break-words">
                      <HighlightMatch text={course.name} query={debouncedQuery} />
                    </span>
                  </div>
                  <ChevronRight className="text-zinc-300 group-hover:text-prime h-4 w-4 shrink-0 mt-0.5 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            /* No Results Found State */
            <div className="p-5 text-center">
              <GraduationCap className="mx-auto text-zinc-300 h-8 w-8 mb-1.5" />
              <p className="text-xs font-medium text-zinc-700">
                No courses found matching &quot;{debouncedQuery}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
