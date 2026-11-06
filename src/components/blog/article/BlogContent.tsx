'use client';

import { useEffect, useRef } from 'react';

interface BlogContentProps {
  content: string;
  className?: string;
}

/**
 * CMS article HTML, rendered as written (styled by skilldeck-rich-text.min.css,
 * loaded in app/layout.tsx). Embedded <script>s run once after mount.
 */
export default function BlogContent({ content, className }: BlogContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Keep scripts inert while the HTML is parsed; they are run once below (also after client-side navigation).
  const html = (content || '').replace(/<script(?![^>]*\btype=)/gi, '<script type="text/plain" data-run');

  useEffect(() => {
    ref.current?.querySelectorAll('script[data-run]').forEach((old) => {
      const script = document.createElement('script');
      for (const { name, value } of Array.from(old.attributes)) {
        if (name !== 'type' && name !== 'data-run') script.setAttribute(name, value);
      }
      script.textContent = old.textContent;
      old.replaceWith(script);
    });
  }, [html]);

  return (
    <article className={className ? `max-w-none ${className}` : 'max-w-none'}>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
