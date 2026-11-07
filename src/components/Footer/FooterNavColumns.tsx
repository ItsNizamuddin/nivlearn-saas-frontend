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

function NavColumnList({
    title,
    links,
    twoColumnGrid = false,
}: {
    title: string;
    links: { label: string; url: string }[];
    twoColumnGrid?: boolean;
}) {
    if (!links || links.length === 0) return null;

    return (
        <nav aria-label={title} className="space-y-3.5">
            <div className="space-y-1.5">
                <h3 className="text-on-dark text-xs font-bold tracking-wider uppercase">
                    {title}
                </h3>
                <div className="h-0.5 w-6 rounded-full bg-prime-yellow" />
            </div>
            <ul className={twoColumnGrid ? 'grid grid-cols-2 gap-x-2 gap-y-2.5' : 'space-y-2.5'}>
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            href={link.url}
                            rel={isNofollow(link.url) ? 'nofollow' : undefined}
                            className="group inline-flex items-center gap-1.5 text-on-dark/80 hover:text-prime-yellow text-xs transition-colors"
                        >
                            <ChevronRight
                                size={14}
                                className="text-on-dark/40 group-hover:text-prime-yellow transition-transform group-hover:translate-x-0.5 shrink-0"
                            />
                            <span className="leading-snug">{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function FooterNavColumns({
    columns = [],
    categories = [],
    courses = [],
    phone,
    email,
}: FooterNavColumnsProps) {
    // 1. Dynamic Programs column from categories
    const programsLinks = categories.map((cat) => ({ label: cat.name, url: `/${cat.slug}` }));

    // 2. Dynamic Popular Courses column (top 6)
    const featuredCourses = courses.slice(0, 6).map((crs) => ({
        label: crs.course_name,
        url: `/${crs.category_slug || 'trainings'}/${crs.slug}`,
    }));

    // 3. All dynamic navigation columns from CMS that contain links (sorted by order)
    const cmsNavColumns = columns
        .filter((col) => col.links && col.links.length > 0)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    // Distribute CMS columns across 3 desktop slots:
    // Slot 1 (Col 1): cmsNavColumns[0] (typically Company) + Programs if present
    // Slot 2 (Col 2): cmsNavColumns[1] (typically Legal) + Courses if present
    // Slot 3 (Col 3): Remaining CMS columns (e.g. Partner with Us, etc.) + Admissions Card
    const firstCol = cmsNavColumns[0];
    const secondCol = cmsNavColumns[1];
    const remainingCols = cmsNavColumns.slice(2);

    return (
        <div className="contents">
            {/* Desktop Navigation Layout: 8 columns divided cleanly into 3 sections (2 + 3 + 3 = 8) */}

            {/* Section A: Programs & First CMS Column (lg:col-span-2) */}
            <div className="hidden lg:block lg:col-span-2 space-y-6">
                {programsLinks.length > 0 && (
                    <NavColumnList title="Programs" links={programsLinks} />
                )}
                {firstCol && (
                    <NavColumnList title={firstCol.title} links={firstCol.links} />
                )}
            </div>

            {/* Section B: Popular Courses & Second CMS Column (lg:col-span-3) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
                {featuredCourses.length > 0 && (
                    <NavColumnList title="Popular Courses" links={featuredCourses} />
                )}
                {secondCol && (
                    <NavColumnList title={secondCol.title} links={secondCol.links} />
                )}
            </div>

            {/* Section C: Remaining CMS Columns (e.g. Partner with Us) & Admissions Card (lg:col-span-3) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
                {remainingCols.map((col, idx) => (
                    <NavColumnList key={idx} title={col.title} links={col.links} />
                ))}

                {/* Dedicated Admissions & Help Card */}
                {(phone || email) && (
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
                )}
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

                {/* All dynamic CMS columns with links */}
                {cmsNavColumns.map((col, idx) => (
                    <details key={idx} className="group rounded-xl border border-on-dark/10 bg-on-dark/5 overflow-hidden open:bg-on-dark/10 transition-colors">
                        <summary className="w-full flex items-center justify-between p-4 cursor-pointer select-none text-xs sm:text-sm font-semibold tracking-wide uppercase text-on-dark list-none [&::-webkit-details-marker]:hidden">
                            <span>{col.title}</span>
                            <ChevronDown size={16} className="text-on-dark/60 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 pt-1 border-t border-on-dark/10 space-y-2.5">
                            {col.links.map((link, i) => (
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
                ))}

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
