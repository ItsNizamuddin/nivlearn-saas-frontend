/** Public site origin (no trailing slash). Used for metadataBase and absolute share links. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nivlearn.com').replace(/\/$/, '');
