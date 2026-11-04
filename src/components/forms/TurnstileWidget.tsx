'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface TurnstileRenderOptions {
    sitekey: string;
    size: 'compact' | 'normal';
    callback: (token: string) => void;
    'error-callback': () => void;
    'expired-callback': () => void;
    theme: 'light';
}

interface TurnstileApi {
    render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
    remove: (widgetId: string) => void;
}

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
    isInteracted?: boolean;
}

const SITE_KEY = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '').trim().replace(/^['"]|['"]$/g, '');

export default function TurnstileWidget({
    onVerify,
    onError,
    onExpire,
    isInteracted = true
}: TurnstileWidgetProps) {
    const turnstileRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(
        () => typeof window !== 'undefined' && Boolean(window.turnstile)
    );

    const onVerifyRef = useRef(onVerify);
    const onErrorRef = useRef(onError);
    const onExpireRef = useRef(onExpire);

    useEffect(() => {
        onVerifyRef.current = onVerify;
        onErrorRef.current = onError;
        onExpireRef.current = onExpire;
    }, [onVerify, onError, onExpire]);

    useEffect(() => {
        if (!isInteracted || !scriptLoaded || !SITE_KEY) return;

        const renderTurnstile = () => {
            if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
                try {
                    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                        sitekey: SITE_KEY,
                        size: 'normal',
                        callback: (token: string) => {
                            if (onVerifyRef.current) onVerifyRef.current(token);
                        },
                        'error-callback': () => {
                            if (onErrorRef.current) onErrorRef.current();
                        },
                        'expired-callback': () => {
                            if (onExpireRef.current) onExpireRef.current();
                        },
                        theme: 'light',
                    });
                } catch (error) {
                    console.warn('[TurnstileWidget] Render error:', error);
                }
            }
        };

        renderTurnstile();

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                    widgetIdRef.current = null;
                } catch {
                    // Ignore removal error
                }
            }
        };
    }, [isInteracted, scriptLoaded]);

    if (!SITE_KEY) {
        return null;
    }

    return (
        <div>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
                onLoad={() => setScriptLoaded(true)}
            />
            <div ref={turnstileRef} />
        </div>
    );
}

