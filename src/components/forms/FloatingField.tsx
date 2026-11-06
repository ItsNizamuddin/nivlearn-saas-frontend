'use client';

import React from 'react';
import SearchableSelect from './SearchableSelect';
import CountryCodePicker from './CountryCodePicker';

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

    // Explicit h-10 ensures equal height across all text/email/number inputs
    const inputBaseClasses = `w-full ${icon ? 'pl-9 pr-3' : 'px-3'} h-10 bg-surface border border-border-muted rounded-md text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs focus:outline-none focus:border-prime focus:ring-2 focus:ring-prime/10 transition-all flex items-center`;
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
                        className={`w-full ${icon ? 'pl-9 pr-3' : 'px-3'} py-2 bg-surface border border-border-muted rounded-md text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs focus:outline-none focus:border-prime focus:ring-2 focus:ring-prime/10 transition-all resize-none`}
                    />
                </>
            ) : type === 'tel' && dialCode !== undefined ? (
                /* Phone Field with Country Flag & Dial Code prefix, exactly matching h-10 height */
                <div className="flex w-full h-10 rounded-md border border-border-muted bg-surface focus-within:border-prime focus-within:ring-2 focus-within:ring-prime/10 transition-all">
                    <CountryCodePicker
                        value={dialCode}
                        onChange={(newDial) => {
                            if (onDialCodeChange) {
                                onDialCodeChange({
                                    target: { name: 'dialCode', value: newDial },
                                } as unknown as React.ChangeEvent<HTMLSelectElement>);
                            } else {
                                onChange({
                                    target: { name: 'dialCode', value: newDial },
                                } as unknown as React.ChangeEvent<HTMLInputElement>);
                            }
                        }}
                    />
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
                        className="w-full h-full min-w-0 px-2 sm:px-2.5 text-xs sm:text-sm text-foreground placeholder:text-text-muted/60 placeholder:text-xs bg-transparent focus:outline-none rounded-r-md"
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
