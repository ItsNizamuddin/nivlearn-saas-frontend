'use client';

import React, { useState } from 'react';

interface FooterDisclaimerProps {
    disclaimer?: string;
}

const TRUNCATE_LIMIT = 200;

export default function FooterDisclaimer({ disclaimer }: FooterDisclaimerProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Use CMS disclaimer text if available; otherwise minimal fallback
    const text = disclaimer?.trim();

    if (!text) {
        return null;
    }

    const isLong = text.length > TRUNCATE_LIMIT;
    const previewText = isLong ? text.slice(0, TRUNCATE_LIMIT).trimEnd() : text;
    const remainingText = isLong ? text.slice(TRUNCATE_LIMIT) : '';

    return (
        <section aria-label="Legal Disclaimer" className="border-t border-on-dark/10 pt-6 text-[11px] sm:text-xs text-on-dark/60 leading-relaxed">
            <p>
                <span>{previewText}</span>
                {isLong && isExpanded && (
                    <span className="inline animate-in fade-in duration-200">{remainingText}</span>
                )}
                {isLong && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-prime-yellow hover:text-prime-yellow/80 hover:underline font-semibold ml-2 inline-block cursor-pointer focus:outline-hidden"
                    >
                        {isExpanded ? 'Read less' : 'Read more...'}
                    </button>
                )}
            </p>
        </section>
    );
}

