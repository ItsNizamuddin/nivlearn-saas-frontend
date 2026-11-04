import { env } from './env';

let warnedNotConfigured = false;

/**
 * Verifies a Cloudflare Turnstile token server-side.
 */
export async function verifyTurnstileToken(
    token: string | undefined,
    remoteIp?: string
): Promise<boolean> {
    if (!token) return false;

    if (!env.TURNSTILE_SECRET_KEY) {
        if (!warnedNotConfigured) {
            console.warn('[Turnstile] TURNSTILE_SECRET_KEY not configured; skipping verification.');
            warnedNotConfigured = true;
        }
        return true;
    }

    try {
        const params = new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: token,
        });
        if (remoteIp) params.set('remoteip', remoteIp);

        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });

        const data = await res.json();
        return data.success === true;
    } catch (error) {
        console.error('[Turnstile] Verification error:', error);
        return false;
    }
}

