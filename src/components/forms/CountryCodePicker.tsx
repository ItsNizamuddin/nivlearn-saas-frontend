'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { DIAL_CODES } from '@/lib/countryCodes';

interface CountryCodePickerProps {
    value?: string;
    onChange: (dialCode: string) => void;
    name?: string;
}

interface EnrichedCountry {
    iso: string;
    dial: string;
    name: string;
}

const POPULAR_ISOS = ['IN', 'AE', 'US', 'GB', 'SA', 'CA', 'AU', 'SG'];

export default function CountryCodePicker({
    value = '+91',
    onChange,
    name = 'dialCode'
}: CountryCodePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Enrich DIAL_CODES with localized readable names
    const countries: EnrichedCountry[] = useMemo(() => {
        let regionNames: Intl.DisplayNames | null = null;
        try {
            regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        } catch {
            // fallback
        }

        return DIAL_CODES.map((c) => {
            let countryName = c.iso;
            if (regionNames) {
                try {
                    countryName = regionNames.of(c.iso) || c.iso;
                } catch {
                    countryName = c.iso;
                }
            }
            return {
                iso: c.iso,
                dial: c.dial,
                name: countryName,
            };
        });
    }, []);

    // Resolve current selected country
    const currentCountry = useMemo(() => {
        return (
            countries.find((c) => c.dial === value) ||
            countries.find((c) => c.iso === 'IN') ||
            countries[0]
        );
    }, [countries, value]);

    // Filtered list based on search term
    const filteredCountries = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            // Put popular countries at top when search is empty
            const popular = countries.filter((c) => POPULAR_ISOS.includes(c.iso));
            const others = countries.filter((c) => !POPULAR_ISOS.includes(c.iso));
            return [...popular, ...others];
        }
        return countries.filter(
            (c) =>
                c.name.toLowerCase().includes(query) ||
                c.dial.toLowerCase().includes(query) ||
                c.iso.toLowerCase().includes(query)
        );
    }, [countries, search]);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    const handleSelect = (dialCode: string) => {
        onChange(dialCode);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div ref={containerRef} className="relative h-full shrink-0">
            {/* Hidden Input for Form Data Serialization */}
            <input type="hidden" name={name} value={value} />

            {/* Trigger Button with Flag Image + Code + Arrow (Slimline Compact) */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-1.5 sm:px-2 h-full bg-surface-muted/60 hover:bg-sec-prime border-r border-border-muted/70 text-xs text-foreground font-medium transition-colors cursor-pointer select-none shrink-0"
                aria-label="Select country dial code"
                aria-expanded={isOpen}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`https://flagcdn.com/16x12/${currentCountry.iso.toLowerCase()}.png`}
                    alt={currentCountry.name}
                    width={16}
                    height={12}
                    className="w-4 h-3 object-cover rounded-2xs shrink-0 shadow-2xs"
                    loading="eager"
                    onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                    }}
                />
                <span className="tabular-nums font-semibold text-foreground text-[11px] sm:text-xs">
                    {value || '+91'}
                </span>
                <ChevronDown
                    className={`w-2.5 h-2.5 text-text-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Floating Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 sm:w-72 max-h-52 bg-surface rounded-lg shadow-2xl border border-border-muted/80 z-[70] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    {/* Search Bar */}
                    <div className="p-2 border-b border-border-muted/60 bg-surface-muted/40">
                        <div className="relative flex items-center">
                            <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 pointer-events-none" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search country or code..."
                                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-surface border border-border-muted rounded-md text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-prime focus:ring-1 focus:ring-prime"
                            />
                        </div>
                    </div>

                    {/* Country List */}
                    <div className="overflow-y-auto flex-1 divide-y divide-border-muted/20 py-1">
                        {filteredCountries.length === 0 ? (
                            <div className="py-4 text-center text-xs text-text-muted">
                                No countries found
                            </div>
                        ) : (
                            filteredCountries.map((c) => {
                                const isSelected = c.dial === value;
                                return (
                                    <button
                                        key={`${c.iso}-${c.dial}`}
                                        type="button"
                                        onClick={() => handleSelect(c.dial)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                                            isSelected
                                                ? 'bg-prime/10 text-prime font-semibold'
                                                : 'hover:bg-sec-prime text-foreground'
                                        }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://flagcdn.com/20x15/${c.iso.toLowerCase()}.png`}
                                            alt={c.iso}
                                            width={20}
                                            height={15}
                                            className="w-5 h-3.5 object-cover rounded-2xs shrink-0 shadow-2xs"
                                            loading="lazy"
                                            onError={(e) => {
                                                (e.target as HTMLElement).style.display = 'none';
                                            }}
                                        />
                                        <span className="flex-1 truncate font-medium">
                                            {c.name}
                                        </span>
                                        <span className="text-text-muted tabular-nums shrink-0 text-[11px]">
                                            {c.dial}
                                        </span>
                                        {isSelected && (
                                            <Check className="w-3.5 h-3.5 text-prime shrink-0" />
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

