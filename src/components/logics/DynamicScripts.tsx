import React from 'react';
import Script from 'next/script';
import { fetchFromBackend } from '@/lib/apiProxy';

interface ScriptItem {
  name: string;
  script: string;
  isActive?: boolean;
  location?: string;
  _id?: {
    $oid: string;
  };
}

interface ScriptsResponse {
  _id?: { $oid: string };
  scripts: ScriptItem[];
}

function extractSrc(rawScript: string): string | null {
  const match = rawScript.match(/<script[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function extractInlineContent(rawScript: string): string {
  return rawScript
    .replace(/<script[^>]*>/gi, '')
    .replace(/<\/script>/gi, '')
    .trim();
}

function extractMetaAttributes(rawTag: string): Record<string, string> | null {
  const match = rawTag.match(/<meta\s+([^>]+)\/?>/i);
  if (!match) return null;
  const attrs: Record<string, string> = {};
  const regex = /([a-zA-Z0-9_.:-]+)=["']([^"']*)["']/g;
  let attrMatch;
  while ((attrMatch = regex.exec(match[1])) !== null) {
    attrs[attrMatch[1]] = attrMatch[2];
  }
  return Object.keys(attrs).length > 0 ? attrs : null;
}

export default async function DynamicScripts({
  position = 'head',
}: {
  position?: 'head' | 'body';
}) {
  let activeScripts: ScriptItem[] = [];

  try {
    const response = await fetchFromBackend('/scripts', {
      next: { revalidate: 3600, tags: ['scripts'] },
    });

    if (response.ok) {
      const data: ScriptsResponse = await response.json();
      if (data && Array.isArray(data.scripts)) {
        activeScripts = data.scripts
          .filter((s) => s.isActive !== false)
          .filter((s) => s.name?.toLowerCase() !== 'robots.txt');
      }
    } else {
      console.error('[DynamicScripts] Failed to fetch scripts:', response.status);
    }
  } catch (error) {
    console.error('[DynamicScripts] Error fetching scripts:', error);
  }

  if (activeScripts.length === 0) {
    return null;
  }

  // Check for Google Analytics / GTM
  const googleAnalytics = activeScripts.find(
    (s) =>
      s.name?.toLowerCase().includes('google analytics') ||
      s.name?.toLowerCase().includes('google tag manager') ||
      s.name?.toLowerCase() === 'gtm'
  );
  const otherScripts = activeScripts.filter((s) => s !== googleAnalytics);

  const getGtmId = (scriptContent: string) => {
    const match = scriptContent.match(/GTM-[A-Za-z0-9]+/);
    return match ? match[0] : null;
  };

  const gtmId = googleAnalytics ? getGtmId(googleAnalytics.script) : null;

  // Render <body> specific noscript iframe for GTM as required by Google specification
  if (position === 'body') {
    if (!gtmId) return null;
    return (
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    );
  }

  // Otherwise, render head scripts, meta tags, and GTM script
  return (
    <>
      {/* Google Tag Manager (GTM) Header Script */}
      {gtmId && (
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}

      {/* Dynamic Scripts & Meta tags from CMS */}
      {otherScripts.map((item, index) => {
        const key = item._id?.$oid || `${item.name}-${index}`;
        const raw = item.script?.trim() || '';
        if (!raw) return null;

        // 1. Meta verification tags (e.g. Bing / Google site verification)
        if (raw.startsWith('<meta') || item.name.toLowerCase() === 'bing') {
          const metaAttrs = extractMetaAttributes(raw);
          if (metaAttrs) {
            return <meta key={key} {...metaAttrs} />;
          }
        }

        // 2. External script (contains src="...")
        const src = extractSrc(raw);
        if (src) {
          return (
            <Script
              key={key}
              id={`dyn-ext-${index}`}
              src={src}
              strategy="lazyOnload"
            />
          );
        }

        // 3. Inline script code
        const inlineCode = extractInlineContent(raw);
        if (inlineCode) {
          return (
            <Script
              key={key}
              id={`dyn-inline-${index}`}
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{ __html: inlineCode }}
            />
          );
        }

        return null;
      })}
    </>
  );
}

