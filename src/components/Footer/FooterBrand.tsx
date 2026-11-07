import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/BrandLogo';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { SocialLink } from './types';

interface FooterBrandProps {
    description?: string;
    socialLinks?: SocialLink[];
}

function SocialIcon({ label }: { label?: string }) {
    const l = (label || '').toLowerCase();
    if (l.includes('linkedin')) {
        return (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
        );
    }
    if (l.includes('x') || l.includes('twitter')) {
        return (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    }
    if (l.includes('insta')) {
        return (
            <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        );
    }
    if (l.includes('youtube')) {
        return (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        );
    }
    if (l.includes('face')) {
        return (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        );
    }
    return <span className="text-[10px] font-bold">{(label || '').charAt(0)}</span>;
}

export default function FooterBrand({ description, socialLinks = [] }: FooterBrandProps) {
    const text = description?.trim()

    return (
        <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block group focus:outline-hidden" aria-label="NivLearn Home">
                <BrandLogo variant="full" className="h-24 sm:h-28 transition-opacity group-hover:opacity-90" />
            </Link>

            {/* Dynamic Value Proposition */}
            <p className="text-on-dark/80 text-xs sm:text-sm leading-relaxed max-w-sm">
                {text}
            </p>

            {/* Dynamic Social Links */}
            {socialLinks.length > 0 && (
                <div className="space-y-2.5">
                    <span className="block text-on-dark text-xs font-semibold tracking-wider uppercase">
                        Connect With Us
                    </span>
                    <div className="flex items-center gap-2">
                        {socialLinks.map((soc, idx) => (
                            <a
                                key={idx}
                                href={soc.link}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label={soc.label || soc.name || 'Social Link'}
                                className="h-8 w-8 rounded-lg bg-on-dark/5 border border-on-dark/10 flex items-center justify-center text-on-dark/80 hover:text-on-dark hover:bg-prime hover:border-prime transition-all hover:scale-105 shadow-xs"
                            >
                                <SocialIcon label={soc.label || soc.name} />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Payment & Security Badges */}
            <div className="space-y-2.5 pt-1 border-t border-on-dark/10">
                <span className="block text-on-dark/60 text-[11px] font-semibold tracking-wider uppercase">
                    Secure Payment Partners
                </span>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-on-dark/5 border border-on-dark/10 text-xs text-on-dark/80" title="Credit / Debit Cards">
                        <CreditCard className="w-3.5 h-3.5 text-on-dark" />
                        <span className="text-[11px] font-medium">Cards Accepted</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-on-dark/5 border border-on-dark/10 text-xs text-on-dark/80" title="Secure SSL Encryption">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] font-medium">SSL Encrypted</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
