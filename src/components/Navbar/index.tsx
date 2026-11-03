import Link from 'next/link';
import React, { Suspense } from 'react';
import { getCategories } from '@/lib/categories';
import NavbarClient from './NavbarClient';
import NavbarFallback from './NavbarFallback';
import { Category } from './types';

export * from './types';

interface NavBarProps {
    initialCategories?: Category[];
}

async function NavBarContent({ initialCategories }: NavBarProps) {
    const categories = initialCategories ?? (await getCategories());
    return (
        <>
            {/* Interactive client navbar */}
            <NavbarClient categories={categories} />

            {/* Semantic Server-Side Rendered link directory for SEO crawlers (Googlebot, Bingbot) */}
            <nav aria-label="Course Catalog Directory" className="sr-only">
                <h2>All Programs and Learning Paths</h2>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat.slug}>
                            <Link href={`/${cat.slug}`}>{cat.name}</Link>
                            {cat.courses && cat.courses.length > 0 && (
                                <ul>
                                    {cat.courses.map((course) => (
                                        <li key={course.slug}>
                                            <Link href={`/${course.catslug || cat.slug}/${course.slug}`}>
                                                {course.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default function NavBar(props: NavBarProps = {}) {
    return (
        <Suspense fallback={<NavbarFallback />}>
            <NavBarContent {...props} />
        </Suspense>
    );
}
