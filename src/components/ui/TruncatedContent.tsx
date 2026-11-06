'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TruncatedContentProps {
  content: string;
  maxLines?: number;
  className?: string;
  expandText?: string;
  collapseText?: string;
}

export default function TruncatedContent({
  content,
  maxLines = 3,
  className = '',
  expandText = 'Read More',
  collapseText = 'Read Less',
}: TruncatedContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(() => {
    if (!content) return false;
    const plainText = content.replace(/<[^>]+>/g, '').trim();
    return plainText.length > maxLines * 70;
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkHeight = () => {
      if (el) {
        setNeedsTruncation(el.scrollHeight > el.clientHeight + 4);
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [content, maxLines]);

  if (!content) return null;

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-300 leading-relaxed [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_span]:!text-inherit ${
            !isExpanded ? (maxLines === 2 ? 'line-clamp-2' : maxLines === 3 ? 'line-clamp-3' : 'line-clamp-4') : ''
          } ${className}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Subtle Fade Overlay when collapsed and needs truncation */}
        {!isExpanded && needsTruncation && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        )}
      </div>

      {needsTruncation && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-prime text-xs font-semibold cursor-pointer underline underline-offset-4 decoration-slate-300 hover:decoration-prime transition-colors py-0.5"
        >
          <span>{isExpanded ? collapseText : expandText}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
