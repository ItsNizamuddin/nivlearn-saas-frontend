import React from 'react';
import FooterBrand from './FooterBrand';
import FooterNavColumns from './FooterNavColumns';
import FooterPopular from './FooterPopular';
import FooterDisclaimer from './FooterDisclaimer';
import FooterBottom from './FooterBottom';
import { FooterData } from './types';

interface FooterClientProps {
    data: FooterData;
}

export default function FooterClient({ data }: FooterClientProps) {
    const columns = data.footer_columns || [];
    const categories = data.popular_categories || [];
    const courses = data.popular_courses || [];
    const numbers = data.numbers || [];
    const social = data.social || [];
    const primaryPhone = numbers.length > 0 ? numbers[0] : undefined;

    // Extract dynamic about content / emails from CMS
    const aboutCol = columns.find((c) => c.title.toLowerCase().includes('about'));
    const dynamicBio = aboutCol?.content?.trim();

    // Contact Email: use dynamic email from CMS if provided, otherwise static NivLearn fallback
    const emailMatch = dynamicBio?.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    const primaryEmail = emailMatch && emailMatch.length > 0 ? emailMatch[emailMatch.length - 1] : 'admissions@nivlearn.com';

    return (
        <footer
            role="contentinfo"
            aria-label="Site Footer"
            className="relative bg-prime-dark text-on-dark font-sans mt-16 lg:mt-24 pt-14 lg:pt-16 border-t border-on-dark/10"
        >
            {/* Main Content Container */}
            <div className="section-container pb-12 space-y-12">
                {/* 12-Column Responsive Balanced Grid: fills width, zero empty gaps on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Col 1: Brand (lg:col-span-4) */}
                    <div className="lg:col-span-4">
                        <FooterBrand description={dynamicBio} socialLinks={social} />
                    </div>

                    {/* Cols 2, 3, 4: Dynamic Programs, Courses, Company & Admissions Support (lg:col-span-8) */}
                    <FooterNavColumns
                        columns={columns}
                        categories={categories}
                        courses={courses}
                        phone={primaryPhone}
                        email={primaryEmail}
                    />
                </div>

                {/* Dynamic Popular Programs & Categories from CMS (Balanced 2-col full width) */}
                <FooterPopular categories={categories} courses={courses} />

                {/* Regulatory / Trademark Disclaimer */}
                <FooterDisclaimer disclaimer={data.disclaimer} />

                {/* Bottom Ribbon */}
                <FooterBottom bottomRibbon={data.bottom_ribbon} />
            </div>
        </footer>
    );
}
