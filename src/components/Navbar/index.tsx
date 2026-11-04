import Link from 'next/link';
import React from 'react';
import { getCategories } from '@/services/catalog.service';
import NavbarClient from './NavbarClient';
import { Category } from './types';

export * from './types';

interface NavBarProps {
    initialCategories?: Category[];
}

export default async function NavBar(props: NavBarProps = {}) {
    const categories = props.initialCategories ?? (await getCategories());

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
