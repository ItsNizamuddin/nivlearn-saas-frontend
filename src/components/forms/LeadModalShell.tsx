'use client';

import { X, GraduationCap } from 'lucide-react';
import LeadForm from './LeadForm';
import type { LeadModalShellProps } from './types';

export default function LeadModalShell({
    onClose,
    badge = 'ACCELERATE YOUR TECH CAREER',
    heading,
    description,
    perks,
    leadFormProps,
    afterForm,
}: LeadModalShellProps) {
    return (
        <>
            {/* Close Button */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 z-50 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface hover:bg-sec-prime text-text-muted hover:text-prime-dark transition-all border border-border-muted shadow-xs cursor-pointer"
            >
                <X size={18} strokeWidth={2.2} />
            </button>

            {/* Left Promotional Panel (Desktop only) */}
            <aside className="hidden lg:flex relative w-[42%] shrink-0 bg-prime-dark overflow-hidden flex-col">
                <div className="absolute inset-0 bg-linear-to-b from-prime-dark via-[#071f4c] to-prime-outline" />
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-prime-yellow/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-prime1/20 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full min-h-0 overflow-y-auto px-7 py-7">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-1.5 mb-5">
                        <span className="text-2xl font-black tracking-tight text-on-dark">
                            Niv<span className="text-prime-yellow">Learn</span>
                        </span>
                    </div>

                    {/* Badge */}
                    {badge && (
                        <div className="mb-4">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-on-dark/10 border border-on-dark/15 px-3 py-1">
                                <GraduationCap size={13} className="text-prime-yellow" />
                                <span className="text-[11px] font-bold tracking-wider uppercase text-prime-yellow">
                                    {badge}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Heading */}
                    <h2 className="text-xl xl:text-2xl font-black leading-tight text-on-dark mb-2.5">
                        {heading}
                    </h2>

                    {/* Description */}
                    <p className="text-xs text-on-dark/75 leading-relaxed mb-6">
                        {description}
                    </p>

                    {/* Perks List */}
                    <div className="space-y-3.5 mt-auto">
                        {perks.map(({ icon: Icon, text }, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-7 h-7 shrink-0 rounded-lg bg-on-dark/10 border border-on-dark/10 flex items-center justify-center text-prime-yellow">
                                    <Icon size={14} strokeWidth={2.2} />
                                </div>
                                <span className="text-xs font-medium text-on-dark/90">
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Right Form Panel */}
            <section className="flex-1 min-w-0 min-h-0 bg-surface overflow-y-auto max-h-[85vh] lg:max-h-[600px] flex flex-col justify-center">
                <div className="w-full my-auto">
                    <LeadForm layout="compact" {...leadFormProps} />
                    {afterForm}
                </div>
            </section>
        </>
    );
}
