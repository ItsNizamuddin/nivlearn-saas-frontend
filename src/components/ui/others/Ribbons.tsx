import React from 'react';
import { sanitizeHtml } from '@/lib/sanitizeHtml';
import type { RibbonResponse } from '@/services/content.service';
import RibbonBannerClient from './RibbonBannerClient';

export default function Ribbons({
  response,
  type,
}: {
  response: RibbonResponse | null;
  type: 'header' | 'footer';
}) {
  if (!response?.data || !Array.isArray(response.data)) {
    return null;
  }
  // Find active ribbon matching requested type
  const ribbon = response.data.find(
    (r) => r.Type?.toLowerCase() === type.toLowerCase() && r.isActive
  );

  if (!ribbon || !ribbon.RibbonContent) {
    return null;
  }

  // Server-side sanitization: Strips scripts/XSS safely without bundling heavy sanitizer to client
  const safeHtml = sanitizeHtml(ribbon.RibbonContent);
  if (!safeHtml.trim()) return null;

  const isSticky = ribbon.Position?.toLowerCase() === 'sticky';

  return (
    <RibbonBannerClient
      id={ribbon._id || `${type}-${ribbon.name || 'banner'}`}
      html={safeHtml}
      type={type}
      isSticky={isSticky}
    />
  );
}
