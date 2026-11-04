'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DIAL_CODES } from '@/lib/countryCodes';
import SearchableSelect from './SearchableSelect';

interface FloatingFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea';
    required?: boolean;
    id?: string;
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
    className?: string;
    rows?: number;
    pattern?: string;
    maxLength?: number;
    title?: string;
    min?: string | number;
    icon?: React.ReactNode;
    minHeight?: number;
    dialCode?: string;
    onDialCodeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    searchable?: boolean;
}

export default function FloatingField({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    id,
    placeholder,
    options = [],
    className = "",
    rows = 2,
    pattern,
    maxLength,
    title,
    min,
    icon,
    minHeight = 100,
    dialCode,
    onDialCodeChange,
    searchable
}: FloatingFieldProps) {
    const fieldId = id || name;

    const containerClasses = `relative group ${className}`;
    
    const inputBaseClasses = `w-full ${icon ? 'pl-9 pr-3' : 'px-3'} py-2 bg-surface border border-border-muted rounded-md text-xs  text-foreground placeholder:text-text-muted/60 placeholder:text-xs focus:outline-none focus:border-prime focus:ring-2 focus:ring-prime/10 transition-all`;
    const activePlaceholder = placeholder || label;

    const renderIcon = (alignTop = false) => icon && (
        <div className={`absolute left-3 ${alignTop ? 'top-2.5' : 'inset-y-0'} flex items-center pointer-events-none text-text-muted`}>
            {icon}
        </div>
    );

    return (
        <div className={containerClasses}>
            {type === 'select' ? (
                <>
                    <input type="hidden" name={name} value={value} />
                    <SearchableSelect
                        value={value}
                        onChange={(val) => {
                            onChange({
                                target: { name, value: val },
                            } as unknown as React.ChangeEvent<HTMLSelectElement>);
                        }}
                        options={options}
                        placeholder={activePlaceholder}
                        label={label}
                        icon={icon}
                        searchable={searchable}
                    />
                </>
            ) : type === 'textarea' ? (
                <>
                    {renderIcon(true)}
                    <textarea
                        name={name}
                        id={fieldId}
                        required={required}
                        value={value}
                        onChange={onChange}
                        rows={rows}
                        placeholder={activePlaceholder}
                        style={{ minHeight: `${minHeight}px` }}
                        className={`${inputBaseClasses} resize-none`}
                    />
                </>
            ) : type === 'tel' && dialCode !== undefined ? (
                /* Phone Field with Country Dial Code prefix */
                <div className="flex w-full rounded-md border border-border-muted bg-surface focus-within:border-prime focus-within:ring-2 focus-within:ring-prime/10 transition-all">
                    <div className="relative shrink-0 flex items-center">
                        <select
                            name="dialCode"
                            value={dialCode}
                            onChange={onDialCodeChange || (onChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void)}
                            aria-label="Country code"
                            className="appearance-none w-14 bg-surface-muted/70 hover:bg-sec-prime text-xs text-foreground font-medium px-1.5 py-2 rounded-l-md border-r border-border-muted/70 cursor-pointer focus:outline-none"
                        >
                            {DIAL_CODES.map((c) => (
                                <option key={c.iso} value={c.dial}>
                                    {c.iso} {c.dial}
                                </option>
                            ))}
                        </select>
                        {/* <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-text-muted">
                            <ChevronDown className="w-3.5 h-3.5" />
                        </div> */}
                    </div>
                    <input
                        type="tel"
                        name={name}
                        id={fieldId}
                        required={required}
                        value={value}
                        onChange={onChange}
                        placeholder={activePlaceholder}
                        pattern={pattern}
                        maxLength={maxLength}
                        title={title}
                        className="w-full px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs bg-transparent focus:outline-none rounded-r-md"
                    />
                </div>
            ) : type === 'tel' && dialCode !== undefined ? (
                /* Phone Field with Country Dial Code prefix */
                <div className="flex w-full rounded-md border border-border-muted bg-surface focus-within:border-prime focus-within:ring-2 focus-within:ring-prime/10 transition-all">
                    <div className="relative shrink-0 flex items-center">
                        <select
                            name="dialCode"
                            value={dialCode}
                            onChange={onDialCodeChange || (onChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void)}
                            aria-label="Country code"
                            className="appearance-none bg-surface-muted/70 hover:bg-sec-prime text-xs sm:text-sm text-foreground font-medium pl-2.5 pr-6 py-2 rounded-l-md border-r border-border-muted/70 cursor-pointer focus:outline-none"
                        >
                            {DIAL_CODES.map((c) => (
                                <option key={c.iso} value={c.dial}>
                                    {c.iso} ({c.dial})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-text-muted">
                            <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <input
                        type="tel"
                        name={name}
                        id={fieldId}
                        required={required}
                        value={value}
                        onChange={onChange}
                        placeholder={activePlaceholder}
                        pattern={pattern}
                        maxLength={maxLength}
                        title={title}
                        className="w-full px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs bg-transparent focus:outline-none rounded-r-md"
                    />
                </div>
            ) : (
                <>
                    {renderIcon()}
                    <input
                        type={type}
                        name={name}
                        id={fieldId}
                        required={required}
                        value={value}
                        onChange={onChange}
                        placeholder={activePlaceholder}
                        pattern={pattern}
                        maxLength={maxLength}
                        title={title}
                        min={min}
                        className={inputBaseClasses}
                    />
                </>
            )}
        </div>
    );
}
