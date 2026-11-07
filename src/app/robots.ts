import { MetadataRoute } from 'next';
import { fetchFromBackend } from '@/lib/apiProxy';
import { SITE_URL } from '@/lib/site';

interface ScriptItem {
  name: string;
  script: string;
  isActive?: boolean;
}

interface ScriptsResponse {
  scripts: ScriptItem[];
}

interface ParsedRules {
  userAgent: string | string[];
  allow?: string[];
  disallow?: string[];
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const rules: ParsedRules[] = [];
  const sitemaps: string[] = [`${SITE_URL}/sitemap.xml`];

  try {
    const response = await fetchFromBackend('/scripts', {
      next: { revalidate: 3600, tags: ['scripts'] },
    });

    if (response.ok) {
      const data: ScriptsResponse = await response.json();
      if (data && Array.isArray(data.scripts)) {
        const robotsScript = data.scripts.find(
          (s) => s.name?.toLowerCase() === 'robots.txt' && s.isActive !== false
        );

        if (robotsScript && robotsScript.script) {
          const lines = robotsScript.script.split('\n');
          let currentUserAgents: string[] = [];
          let currentAllows: string[] = [];
          let currentDisallows: string[] = [];

          const flushRule = () => {
            if (currentUserAgents.length > 0) {
              rules.push({
                userAgent: currentUserAgents,
                allow: currentAllows.length > 0 ? currentAllows : undefined,
                disallow: currentDisallows.length > 0 ? currentDisallows : undefined,
              });
            }
            currentUserAgents = [];
            currentAllows = [];
            currentDisallows = [];
          };

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) continue;

            const match = trimmedLine.match(/[:;]/);
            if (!match) continue;
            const separatorIndex = match.index!;

            const key = trimmedLine.substring(0, separatorIndex).trim().toLowerCase();
            const value = trimmedLine.substring(separatorIndex + 1).trim();

            if (key === 'user-agent') {
              if (currentAllows.length > 0 || currentDisallows.length > 0) {
                flushRule();
              }
              currentUserAgents.push(value);
            } else if (key === 'allow') {
              if (currentUserAgents.length === 0) currentUserAgents.push('*');
              currentAllows.push(value);
            } else if (key === 'disallow') {
              if (currentUserAgents.length === 0) currentUserAgents.push('*');
              currentDisallows.push(value);
            } else if (key === 'sitemap') {
              if (!sitemaps.includes(value)) sitemaps.push(value);
            }
          }
          flushRule();
        }
      }
    }
  } catch (error) {
    console.error('[robots.ts] Error fetching robots script:', error);
  }

  if (rules.length === 0) {
    rules.push({
      userAgent: '*',
      allow: ['/'],
    });
  }

  return {
    rules,
    sitemap: sitemaps,
  };
}

