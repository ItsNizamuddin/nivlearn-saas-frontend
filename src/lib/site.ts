/** Public site origin (no trailing slash). Used for metadataBase and absolute share links. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nivlearn.com').replace(/\/$/, '');

/** SkillDeck LMS origin (no trailing slash), where self-paced programs are bought and taken. */
export const LMS_URL = (process.env.NEXT_PUBLIC_LMS_URL || 'https://learn.nivlearn.com').replace(/\/$/, '');

/** A self-paced program's page on the LMS (its route is /courses/:id, by program id). */
export const lmsProgramUrl = (programId: string) => `${LMS_URL}/courses/${encodeURIComponent(programId)}`;
