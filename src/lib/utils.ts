/**
 * Utility functions for NivLearn SaaS frontend
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Extracts and cleans a list of text items from raw HTML or formatted text
 * Returns an array of clean string items suitable for mapping into <li> elements.
 */
export function parseToListItems(content: string): string[] {
  if (!content || typeof content !== 'string') return [];

  const decoded = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // 1. If content contains <li>...</li> tags
  if (/<li[^>]*>/i.test(decoded)) {
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    const items: string[] = [];
    let match;
    while ((match = liRegex.exec(decoded)) !== null) {
      const clean = match[1].replace(/<[^>]+>/g, '').trim();
      if (clean) items.push(clean);
    }
    if (items.length > 0) return items;
  }

  // 2. If content contains multiple <p>...</p> tags
  if (/<p[^>]*>/i.test(decoded)) {
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    const items: string[] = [];
    let match;
    while ((match = pRegex.exec(decoded)) !== null) {
      const clean = match[1].replace(/<[^>]+>/g, '').trim();
      if (clean) items.push(clean);
    }
    if (items.length > 1) return items;
  }

  // 3. Fallback: split by breaks or newlines
  return decoded
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.replace(/^[•\-\*\d\.\)\s]+/, '').trim())
    .filter(Boolean);
}

/**
 * Smoothly scrolls to an in-page section target with an optional offset.
 * Updates history hash cleanly without triggering abrupt page jumps.
 */
export function smoothScrollTo(target: string, e?: React.MouseEvent): void {
  if (e) e.preventDefault();
  if (typeof window === 'undefined') return;

  const selector = target.startsWith('#') ? target : `#${target}`;
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', selector);
  }
}
