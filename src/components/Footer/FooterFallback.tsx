import React from 'react';

export default function FooterFallback() {
    return (
        <footer
            aria-label="Site Footer"
            className="w-full bg-prime-dark text-white mt-16 lg:mt-24 pt-14 lg:pt-16 border-t border-white/10 min-h-[320px]"
        >
            <div className="section-container pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 animate-pulse">
                    <div className="lg:col-span-4 space-y-4">
                        <div className="h-10 w-44 bg-white/10 rounded-lg" />
                        <div className="h-3.5 w-3/4 bg-white/5 rounded" />
                        <div className="h-3.5 w-1/2 bg-white/5 rounded" />
                    </div>
                    <div className="hidden lg:block lg:col-span-2 space-y-3">
                        <div className="h-4 w-20 bg-white/10 rounded" />
                        <div className="h-3 w-28 bg-white/5 rounded" />
                        <div className="h-3 w-24 bg-white/5 rounded" />
                    </div>
                    <div className="hidden lg:block lg:col-span-3 space-y-3">
                        <div className="h-4 w-28 bg-white/10 rounded" />
                        <div className="h-3 w-40 bg-white/5 rounded" />
                        <div className="h-3 w-36 bg-white/5 rounded" />
                    </div>
                    <div className="hidden lg:block lg:col-span-3 space-y-3">
                        <div className="h-4 w-24 bg-white/10 rounded" />
                        <div className="h-24 w-full bg-white/5 rounded-xl" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

