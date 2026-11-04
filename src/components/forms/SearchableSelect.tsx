'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    loading?: boolean;
    onOpen?: () => void;
    icon?: ReactNode;
    label?: string;
    searchable?: boolean;
}

export default function SearchableSelect({
    value,
    onChange,
    options,
    placeholder = "Select...",
    className = "",
    loading = false,
    onOpen,
    label,
    icon,
    searchable
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const isSearchable = searchable ?? (options.length > 5);

    const selectedOption = useMemo(() =>
        options.find(opt => opt.value === value),
        [options, value]);

    const filteredOptions = useMemo(() => {
        if (!isSearchable || !searchTerm) return options;
        const lowerTerm = searchTerm.toLowerCase();
        return options.filter(opt =>
            opt.label.toLowerCase().includes(lowerTerm)
        );
    }, [options, searchTerm, isSearchable]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isOpen || !isSearchable) return;

        onOpen?.();
        const timeoutId = window.setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);

        return () => window.clearTimeout(timeoutId);
    }, [isOpen, onOpen, isSearchable]);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                        setSearchTerm("");
                        return;
                    }
                    setIsOpen(true);
                }}
                className={`
                    relative w-full cursor-pointer rounded-md bg-surface py-2 text-xs ${icon ? 'pl-9' : 'pl-3'} pr-8 text-left border
                    focus:outline-none focus:ring-2 focus:ring-prime/10 focus:border-prime
                    transition-all duration-200
                    ${isOpen ? 'ring-2 ring-prime/10 border-prime' : (value ? 'border-border-muted text-foreground' : 'border-border-muted text-text-muted hover:border-prime/50')}
                `}
            >
                {icon && (
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted">
                        {icon}
                    </span>
                )}
                <span className="block truncate font-medium">
                    {selectedOption?.label || placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted">
                    <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-prime' : ''}`}
                    />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md bg-surface border border-border-muted shadow-xl animate-in fade-in zoom-in-95 duration-100 flex flex-col">
                    {/* Search bar inside dropdown (when searchable) */}
                    {isSearchable && (
                        <div className="p-2 border-b border-border-muted/50 bg-surface-muted sticky top-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-muted" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="w-full rounded-md bg-surface pl-8 pr-7 py-1.5 text-xs border border-border-muted text-foreground placeholder:text-text-muted placeholder:text-xs focus:border-prime focus:outline-none focus:ring-2 focus:ring-prime/20 transition-all"
                                    placeholder={`Search ${label || 'options'}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-2 top-2 text-text-muted hover:text-foreground p-0.5 cursor-pointer"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Options list */}
                    <div className="overflow-y-auto max-h-48 py-1 divide-y divide-border-muted/20">
                        {loading ? (
                            <div className="py-4 text-center text-xs text-text-muted flex items-center justify-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-prime border-t-transparent rounded-full animate-spin" />
                                Loading options...
                            </div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="py-4 text-center text-xs text-text-muted">
                                No matching options found
                            </div>
                        ) : (
                            filteredOptions.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <button
                                        key={option.value || 'empty-opt'}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`
                                            relative flex w-full cursor-pointer items-center justify-between px-3.5 py-2 text-left text-xs transition-colors
                                            ${isSelected ? 'bg-sec-prime text-prime font-semibold' : 'text-foreground hover:bg-sec-prime/70'}
                                        `}
                                    >
                                        <span className="truncate pr-4">{option.label}</span>
                                        {isSelected && (
                                            <Check className="h-3.5 w-3.5 text-prime shrink-0" />
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
