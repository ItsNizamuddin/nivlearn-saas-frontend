import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter, FaGooglePay, FaPaypal, FaCreditCard } from 'react-icons/fa6';
import { SocialLink } from './types';

interface FooterBrandProps {
    description?: string;
    socialLinks?: SocialLink[];
}

function getSocialIcon(label?: string) {
    const l = (label || '').toLowerCase();
    if (l.includes('linkedin')) return FaLinkedinIn;
    if (l.includes('x') || l.includes('twitter')) return FaXTwitter;
    if (l.includes('insta')) return FaInstagram;
    if (l.includes('youtube')) return FaYoutube;
    if (l.includes('face')) return FaFacebookF;
    return null;
}

export default function FooterBrand({ description, socialLinks = [] }: FooterBrandProps) {
    const text = description?.trim() ||
        "NivLearn is a global technology training and career accelerator. We empower ambitious professionals to master in-demand skills through real-world mentorship, capstone projects, and industry-recognized certifications.";

    return (
        <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block group focus:outline-hidden" aria-label="NivLearn Home">
                <Image
                    src="/logo-with-tagline.png"
                    alt="NivLearn - A New Way to Learn"
                    width={202}
                    height={46}
                    priority={false}
                    className="h-10 w-[176px] sm:h-11 sm:w-[193px] object-contain transition-opacity group-hover:opacity-90"
                />
            </Link>

            {/* Dynamic Value Proposition */}
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                {text}
            </p>

            {/* Dynamic Social Links (Rendered only if CMS configured) */}
            {socialLinks.length > 0 && (
                <div className="space-y-2.5">
                    <span className="block text-white text-xs font-semibold tracking-wider uppercase">
                        Connect With Us
                    </span>
                    <div className="flex items-center gap-2">
                        {socialLinks.map((soc, idx) => {
                            const IconComponent = getSocialIcon(soc.label || soc.name);
                            return (
                                <a
                                    key={idx}
                                    href={soc.link}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    aria-label={soc.label || soc.name || 'Social Link'}
                                    className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-prime hover:border-prime transition-all hover:scale-105 shadow-xs"
                                >
                                    {IconComponent ? (
                                        <IconComponent className="text-xs" />
                                    ) : (
                                        <span className="text-[10px] font-bold">{(soc.label || soc.name || '').charAt(0)}</span>
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Payment & Security Badges */}
            <div className="space-y-2.5 pt-1 border-t border-white/10">
                <span className="block text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
                    Secure Payment Partners
                </span>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-200" title="Google Pay">
                        <FaGooglePay className="text-lg text-white" />
                        <span className="text-[11px] font-medium">GPay</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-200" title="Credit / Debit Cards">
                        <FaCreditCard className="text-xs text-white" />
                        <span className="text-[11px] font-medium">Cards</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-200" title="PayPal">
                        <FaPaypal className="text-xs text-[#0079C1]" />
                        <span className="text-[11px] font-medium">PayPal</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
