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
    return <NavbarClient categories={categories} />;
}

export default function NavBar(props: NavBarProps = {}) {
    return (
        <Suspense fallback={<NavbarFallback />}>
            <NavBarContent {...props} />
        </Suspense>
    );
}
