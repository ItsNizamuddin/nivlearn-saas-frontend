import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Phone, Mail } from 'lucide-react';
import { FooterColumn, PopularCategory, PopularCourse } from './types';

const NOFOLLOW_PATHS = new Set([
    '/about-us',
    '/contact-us',
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/cancellation-and-refund-policy',
]);

function isNofollow(url?: string): boolean {
    if (!url) return false;
    const clean = url.toLowerCase().replace(/\/$/, '');
    return NOFOLLOW_PATHS.has(clean);
}

interface FooterNavColumnsProps {
    columns: FooterColumn[];
    categories?: PopularCategory[];
    courses?: PopularCourse[];
    phone?: string;
    email?: string;
}

export default function FooterNavColumns({
    columns = [],
    categories = [],
    courses = [],
    phone,
    email,
}: FooterNavColumnsProps) {
    // 1. Programs column (Dynamic from CMS categories)
    const programsLinks = categories.map((cat) => ({ label: cat.name, url: `/${cat.slug}` }));

    // 2. Company column (Dynamic from CMS)
    const companyCol = columns.find((c) => c.title.toLowerCase().includes('company'));
    const companyLinks = companyCol?.links || [];

    // 3. Legal column (Dynamic from CMS)
    const legalCol = columns.find((c) => c.title.toLowerCase().includes('legal'));
    const legalLinks = legalCol?.links || [];

    // 4. Popular Courses (Dynamic from CMS, top 6)
    const featuredCourses = courses.slice(0, 6).map((crs) => ({
        label: crs.course_name,
        url: `/${crs.category_slug || 'trainings'}/${crs.slug}`,
    }));

    return (
        <div className="contents">
            {/* Desktop Navigation Layout: 8 columns divided cleanly into 3 sections (2 + 3 + 3 = 8) */}

            {/* Section A: Programs & Legal (lg:col-span-2) */}
            <div className="hidden lg:block lg:col-span-2 space-y-6">
                {programsLinks.length > 0 && (
                    <nav aria-label="Programs" className="space-y-3.5">
                        <div className="space-y-1.5">
                            <h3 className="text-on-dark text-xs font-bold tracking-wider uppercase">
                                Programs
                            </h3>
                            <div className="h-0.5 w-6 rounded-full bg-prime-yellow" />
                        </div>
                        <ul className="space-y-2.5">
                            {programsLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.url}
                                        className="group inline-flex items-center gap-1.5 text-on-dark/80 hover:text-prime-yellow text-xs transition-colors"
                                    >
                                        <ChevronRight size={14} className="text-on-dark/40 group-hover:text-prime-yellow transition-transform group-hover:translate-x-0.5 shrink-0" />
                                        <span className="leading-snug">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {legalLinks.length > 0 && (
                    <nav aria-label="Legal" className="space-y-3.5 pt-2">
                        <div className="space-y-1.5">
                            <h3 className="text-on-dark text-xs font-bold tracking-wider uppercase">
                                Legal
                            </h3>
                            <div className="h-0.5 w-6 rounded-full bg-prime-yellow" />
                        </div>
                        <ul className="space-y-2.5">
                            {legalLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.url}
                                        rel="nofollow"
                                        className="group inline-flex items-center gap-1.5 text-on-dark/80 hover:text-prime-yellow text-xs transition-colors"
                                    >
                                        <ChevronRight size={14} className="text-on-dark/40 group-hover:text-prime-yellow transition-transform group-hover:translate-x-0.5 shrink-0" />
                                        <span className="leading-snug">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>

            {/* Section B: Top Certification Courses (lg:col-span-3) */}
            <div className="hidden lg:block lg:col-span-3 space-y-4">
                <nav aria-label="Popular Courses" className="space-y-3.5">
                    <div className="space-y-1.5">
                        <h3 className="text-on-dark text-xs font-bold tracking-wider uppercase">
                            Popular Courses
                        </h3>
                        <div className="h-0.5 w-6 rounded-full bg-prime-yellow" />
                    </div>
                    <ul className="space-y-2.5">
                        {featuredCourses.map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.url}
                                    className="group inline-flex items-center gap-1.5 text-on-dark/80 hover:text-prime-yellow text-xs transition-colors"
                                >
                                    <ChevronRight size={14} className="text-on-dark/40 group-hover:text-prime-yellow transition-transform group-hover:translate-x-0.5 shrink-0" />
                                    <span className="leading-snug">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Section C: Company Links & Admissions Support Card (lg:col-span-3) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
                {companyLinks.length > 0 && (
                    <nav aria-label="Company" className="space-y-3.5">
                        <div className="space-y-1.5">
                            <h3 className="text-on-dark text-xs font-bold tracking-wider uppercase">
                                Company
                            </h3>
                            <div className="h-0.5 w-6 rounded-full bg-prime-yellow" />
                        </div>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-2.5">
                            {companyLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.url}
                                        rel={isNofollow(link.url) ? 'nofollow' : undefined}
                                        className="group inline-flex items-center gap-1 text-on-dark/80 hover:text-prime-yellow text-xs transition-colors"
                                    >
                                        <ChevronRight size={14} className="text-on-dark/40 group-hover:text-prime-yellow transition-transform group-hover:translate-x-0.5 shrink-0" />
                                        <span className="leading-snug">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {/* Dedicated Admissions & Help Card */}
                <div className="rounded-xl border border-on-dark/10 bg-on-dark/5 p-4 space-y-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-on-dark uppercase tracking-wider">
                            Admissions Support
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open
                        </span>
                    </div>

                    <div className="space-y-2 text-xs">
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                className="flex items-center gap-2.5 text-on-dark hover:text-prime-yellow transition-colors font-medium group"
                            >
                                <span className="p-1.5 rounded-md bg-on-dark/10 text-prime-yellow group-hover:bg-prime-yellow/20 transition-colors shrink-0">
                                    <Phone size={13} />
                                </span>
                                <span>{phone}</span>
                            </a>
                        )}
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-2.5 text-on-dark/80 hover:text-on-dark transition-colors truncate group"
                            >
                                <span className="p-1.5 rounded-md bg-on-dark/10 text-prime-yellow group-hover:bg-prime-yellow/20 transition-colors shrink-0">
                                    <Mail size={13} />
                                </span>
                                <span className="truncate">{email}</span>
                            </a>
                        )}
                    </div>

                    <p className="text-[11px] text-on-dark/60 leading-tight pt-1.5 border-t border-on-dark/10">
                        Mon – Sat: 9:00 AM – 7:30 PM IST
                    </p>
                </div>
            </div>

            {/* Mobile / Tablet Accordion (Semantic HTML5 <details>) */}
            <div className="lg:hidden col-span-1 md:col-span-2 space-y-2 pt-2">
                {programsLinks.length > 0 && (
                    <details className="group rounded-xl border border-on-dark/10 bg-on-dark/5 overflow-hidden open:bg-on-dark/10 transition-colors">
                        <summary className="w-full flex items-center justify-between p-4 cursor-pointer select-none text-xs sm:text-sm font-semibold tracking-wide uppercase text-on-dark list-none [&::-webkit-details-marker]:hidden">
                            <span>Programs</span>
                            <ChevronDown size={16} className="text-on-dark/60 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 pt-1 border-t border-on-dark/10 space-y-2.5">
                            {programsLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className="flex items-center gap-2 text-xs text-on-dark/80 hover:text-prime-yellow transition-colors py-1"
                                >
                                    <ChevronRight size={14} className="text-on-dark/40" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </details>
                )}

                {featuredCourses.length > 0 && (
                    <details className="group rounded-xl border border-on-dark/10 bg-on-dark/5 overflow-hidden open:bg-on-dark/10 transition-colors">
                        <summary className="w-full flex items-center justify-between p-4 cursor-pointer select-none text-xs sm:text-sm font-semibold tracking-wide uppercase text-on-dark list-none [&::-webkit-details-marker]:hidden">
                            <span>Popular Courses</span>
                            <ChevronDown size={16} className="text-on-dark/60 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 pt-1 border-t border-on-dark/10 space-y-2.5">
                            {featuredCourses.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className="flex items-center gap-2 text-xs text-on-dark/80 hover:text-prime-yellow transition-colors py-1"
                                >
                                    <ChevronRight size={14} className="text-on-dark/40" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </details>
                )}

                {companyLinks.length > 0 && (
                    <details className="group rounded-xl border border-on-dark/10 bg-on-dark/5 overflow-hidden open:bg-on-dark/10 transition-colors">
                        <summary className="w-full flex items-center justify-between p-4 cursor-pointer select-none text-xs sm:text-sm font-semibold tracking-wide uppercase text-on-dark list-none [&::-webkit-details-marker]:hidden">
                            <span>Company</span>
                            <ChevronDown size={16} className="text-on-dark/60 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 pt-1 border-t border-on-dark/10 space-y-2.5">
                            {companyLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    rel={isNofollow(link.url) ? 'nofollow' : undefined}
                                    className="flex items-center gap-2 text-xs text-on-dark/80 hover:text-prime-yellow transition-colors py-1"
                                >
                                    <ChevronRight size={14} className="text-on-dark/40" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </details>
                )}

                {legalLinks.length > 0 && (
                    <details className="group rounded-xl border border-on-dark/10 bg-on-dark/5 overflow-hidden open:bg-on-dark/10 transition-colors">
                        <summary className="w-full flex items-center justify-between p-4 cursor-pointer select-none text-xs sm:text-sm font-semibold tracking-wide uppercase text-on-dark list-none [&::-webkit-details-marker]:hidden">
                            <span>Legal</span>
                            <ChevronDown size={16} className="text-on-dark/60 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 pt-1 border-t border-on-dark/10 space-y-2.5">
                            {legalLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    rel="nofollow"
                                    className="flex items-center gap-2 text-xs text-on-dark/80 hover:text-prime-yellow transition-colors py-1"
                                >
                                    <ChevronRight size={14} className="text-on-dark/40" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </details>
                )}

                {/* Mobile Admissions Card */}
                {(phone || email) && (
                    <div className="rounded-xl border border-on-dark/10 bg-on-dark/5 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-dark uppercase tracking-wider">
                                Admissions Support
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 pt-1 text-xs">
                            {phone && (
                                <a
                                    href={`tel:${phone.replace(/\s+/g, '')}`}
                                    className="flex items-center gap-2 text-on-dark font-medium hover:text-prime-yellow"
                                >
                                    <Phone size={13} className="text-prime-yellow" />
                                    <span>{phone}</span>
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-2 text-on-dark/80 hover:text-on-dark truncate"
                                >
                                    <Mail size={13} className="text-prime-yellow shrink-0" />
                                    <span className="truncate">{email}</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
