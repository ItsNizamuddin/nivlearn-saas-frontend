'use client';

import React from 'react';
import Link from 'next/link';

interface FooterBottomProps {
    bottomRibbon?: string;
}

export default function FooterBottom({ bottomRibbon }: FooterBottomProps) {
    const year = new Date().getFullYear();

    // Dynamic Copyright from backend; static fallback is NivLearn only
    const copyright = bottomRibbon?.trim() || `© ${year} NivLearn. All rights reserved.`;

    return (
        <div className="border-t border-on-dark/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-dark/60">
            {/* Dynamic Copyright from CMS */}
            <p className="text-center md:text-left">
                {copyright}
            </p>

            {/* Platform Attribution */}
            <p className="text-center">
                Powered by{' '}
                <a
                    href="https://skilldeck.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-dark/90 hover:text-prime-yellow transition-colors font-medium"
                >
                    Karyakrama
                </a>
            </p>

            {/* Policy Navigation (SSR links with nofollow) */}
            <nav aria-label="Footer Legal and Policies" className="flex items-center gap-3 sm:gap-4">
                <Link
                    href="/privacy-policy"
                    rel="nofollow"
                    className="hover:text-prime-yellow transition-colors"
                >
                    Privacy Policy
                </Link>
                <span className="text-on-dark/30" aria-hidden="true">•</span>
                <Link
                    href="/terms-and-conditions"
                    rel="nofollow"
                    className="hover:text-prime-yellow transition-colors"
                >
                    Terms & Conditions
                </Link>
                <span className="text-on-dark/30" aria-hidden="true">•</span>
                <Link
                    href="/refund-policy"
                    rel="nofollow"
                    className="hover:text-prime-yellow transition-colors"
                >
                    Refund Policy
                </Link>
            </nav>
        </div>
    );
}
