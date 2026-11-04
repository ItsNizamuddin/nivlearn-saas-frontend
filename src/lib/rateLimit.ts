const hits = new Map<string, { count: number; resetAt: number }>();
let callsSinceSweep = 0;

/** Returns true if the request is allowed, false if over limit within windowMs. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();

    if (++callsSinceSweep >= 500) {
        callsSinceSweep = 0;
        for (const [k, v] of hits) {
            if (v.resetAt <= now) hits.delete(k);
        }
    }

    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return true;
    }

    if (entry.count >= limit) return false;

    entry.count += 1;
    return true;
}

