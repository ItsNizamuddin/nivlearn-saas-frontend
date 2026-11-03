'use client';

import React, { useState } from 'react';

interface FooterDisclaimerProps {
    disclaimer?: string;
}

export default function FooterDisclaimer({ disclaimer }: FooterDisclaimerProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const baseText = disclaimer ||
        "All product names, logos, brands, and registered trademarks displayed on this site are property of their respective owners. NivLearn is an independent digital learning institute and training provider.";

    const expandedText =
        " The curriculum, course outlines, and educational materials provided on this platform are designed strictly for professional upskilling and career development. Course durations, mentor allocation, and hands-on laboratory modules may be updated periodically to adhere to current industry standards. Enrollees are encouraged to review terms of service, prerequisite qualifications, and schedule formats prior to registration. For comprehensive policy guidelines, review our Cancellation & Refund Policy.";

    return (
        <section aria-label="Legal Disclaimer" className="border-t border-white/10 pt-6 text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
            <p>
                <span>{baseText}</span>
                {isExpanded && <span className="inline animate-in fade-in duration-200">{expandedText}</span>}
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-prime-yellow hover:text-prime-yellow/80 hover:underline font-semibold ml-2 inline-block cursor-pointer focus:outline-hidden"
                >
                    {isExpanded ? 'Read less' : 'Read more...'}
                </button>
            </p>
        </section>
    );
}

