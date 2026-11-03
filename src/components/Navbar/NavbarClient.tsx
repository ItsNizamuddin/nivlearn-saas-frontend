'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdClose, IoMdMenu, IoIosArrowDown } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';

import { Category } from './types';
import SearchBar from './SearchBar';
import CourseMenu from './CourseMenu';
import ResourcesMenu from './ResourcesMenu';
import MobileMenu from './MobileMenu';

interface NavbarClientProps {
    categories?: Category[];
}

export default function NavbarClient({ categories = [] }: NavbarClientProps) {
    const [activeMenu, setActiveMenu] = useState<'courses' | 'resources' | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        categories[0] ?? null
    );

    const navRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Desktop hover handlers with smooth debounce
    const handleMouseEnter = (menu: 'courses' | 'resources') => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 180);
    };

    const handleCancelLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    // Close menu when clicking outside or pressing Escape
    useEffect(() => {
        if (!activeMenu) return;

        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (navRef.current && !navRef.current.contains(target)) {
                setActiveMenu(null);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveMenu(null);
                setIsMobileSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [activeMenu]);

    return (
        <>
            <nav ref={navRef} className="sticky top-0 z-40 bg-white border-b border-zinc-200">
                <div className="section-container">
                    <div className="flex items-center justify-between h-16 py-3">
                        {/* Mobile In-Navbar Active Search Field */}
                        {isMobileSearchOpen ? (
                            <div className="flex lg:hidden items-center gap-2 w-full animate-in fade-in duration-150">
                                <SearchBar
                                    categories={categories}
                                    autoFocus
                                    className="flex-1"
                                    onSelect={() => setIsMobileSearchOpen(false)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsMobileSearchOpen(false)}
                                    className="px-2 py-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer shrink-0"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            /* Standard Navbar Content */
                            <>
                                {/* Left: Brand + Course Button + Search */}
                                <div className="flex items-center gap-6 flex-1 min-w-0">
                                    <Link href="/" className="flex-shrink-0" onClick={() => setActiveMenu(null)}>
                                        <Image
                                            src="/logo.png"
                                            alt="NivLearn"
                                            width={202}
                                            height={36}
                                            priority
                                            className="h-7 w-[157px] md:h-9 md:w-[202px] object-contain"
                                        />
                                    </Link>

                                    <div className="hidden lg:flex items-center gap-3">
                                        {/* Courses Button: Hover & Click on Desktop */}
                                        <button
                                            type="button"
                                            onMouseEnter={() => handleMouseEnter('courses')}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => setActiveMenu(activeMenu === 'courses' ? null : 'courses')}
                                            className={`rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-colors ${activeMenu === 'courses'
                                                ? 'bg-prime text-white shadow-xs'
                                                : 'bg-prime-dark hover:bg-prime-dark/90 text-white'
                                                }`}
                                        >
                                            <CgMenuGridO size={20} color="white" />
                                            <span className="font-montserrat text-sm font-medium">Courses</span>
                                            <IoIosArrowDown
                                                size={14}
                                                className={`transition-transform duration-200 ${activeMenu === 'courses' ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        {/* Search on Desktop */}
                                        <SearchBar
                                            categories={categories}
                                            onFocus={() => setActiveMenu(null)}
                                        />
                                    </div>
                                </div>

                                {/* Right: Navigation Links */}
                                <div className="hidden lg:flex items-center gap-6">
                                    <Link
                                        href="/corporate"
                                        onClick={() => setActiveMenu(null)}
                                        className="text-sm font-medium font-montserrat text-zinc-800 hover:text-prime-yellow transition-colors"
                                    >
                                        Enterprise
                                    </Link>

                                    <Link
                                        href="/placement-assistance"
                                        onClick={() => setActiveMenu(null)}
                                        className="text-sm font-medium font-montserrat text-zinc-800 hover:text-prime-yellow transition-colors"
                                    >
                                        Placement Assistance
                                    </Link>

                                    <button
                                        type="button"
                                        onMouseEnter={() => handleMouseEnter('resources')}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => setActiveMenu(activeMenu === 'resources' ? null : 'resources')}
                                        className={`flex items-center gap-1 text-sm font-medium font-montserrat cursor-pointer transition-colors py-1 ${activeMenu === 'resources' ? 'text-prime-yellow' : 'text-zinc-800 hover:text-prime-yellow'
                                            }`}
                                    >
                                        <span>Resources</span>
                                        <IoIosArrowDown
                                            size={14}
                                            className={`transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Mobile Icons: Search Icon + Hamburger Menu */}
                                <div className="flex lg:hidden items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveMenu(null);
                                            setIsMobileSearchOpen(true);
                                        }}
                                        aria-label="Search courses"
                                        className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                                    >
                                        <IoSearch size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsMobileOpen(true)}
                                        aria-label="Open menu"
                                        className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                                    >
                                        <IoMdMenu size={24} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Courses Mega Dropdown */}
                {activeMenu === 'courses' && (
                    <CourseMenu
                        categories={categories}
                        selectedCategory={selectedCategory || categories[0] || null}
                        onSelectCategory={(cat) => setSelectedCategory(cat)}
                        onMouseEnter={handleCancelLeave}
                        onMouseLeave={handleMouseLeave}
                        onClose={() => setActiveMenu(null)}
                    />
                )}

                {/* Resources Mega Dropdown */}
                {activeMenu === 'resources' && (
                    <ResourcesMenu
                        onMouseEnter={handleCancelLeave}
                        onMouseLeave={handleMouseLeave}
                        onClose={() => setActiveMenu(null)}
                    />
                )}
            </nav>

            {/* Mobile Drawer Navigation (Smooth slide-in & full courses list) */}
            <MobileMenu
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                categories={categories}
            />
        </>
    );
}
