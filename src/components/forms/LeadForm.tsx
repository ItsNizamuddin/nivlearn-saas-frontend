'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import LeadFormCourseSelector from './LeadFormCourseSelector';
import FloatingField from './FloatingField';
import TurnstileWidget from './TurnstileWidget';
import { trackFormSubmit } from '@/lib/analytics';
import { getAttributionData } from '@/lib/utm';
import { submitLead } from '@/services/lead.service';
import { DEFAULT_DIAL_CODE, DIAL_CODES } from '@/lib/countryCodes';
import { getCachedGeoLocation } from '@/hooks/useIpLocation';
import type { LeadFormProps } from './types';

export default function LeadForm({
    config = {
        budget: false,
        participants: false,
        hearAbout: false,
        subject: false,
        purpose: false,
        showCourse: true,
        showMessage: true,
        company: false,
        designation: false,
        isReferral: false,
    },
    defaultValues = {
        leadSource: 'NivLearn Home'
    },
    formTitle = 'Get in Touch',
    formDescription = 'Fill out the form below and our career advisor will get back to you shortly.',
    icon,
    fieldIcons,
    submitButtonText = 'Submit Inquiry',
    layout = 'standard',
    coursePlaceholder,
    courses,
    extraFields = [],
    onSuccess
}: LeadFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const pathname = usePathname();
    const pathSegments = (pathname || '').split('/').filter(Boolean);
    const isCoursePage = pathSegments.length >= 2 && pathSegments[0] !== 'blog' && pathSegments[0] !== 'api';
    const courseSlugFromPath = isCoursePage ? pathSegments[1] : undefined;

    const effectiveCourseSlug = defaultValues.courseSlug || (isCoursePage ? courseSlugFromPath : '');
    const initialCourseTitle = effectiveCourseSlug
        ? courses?.find((c) => c.slug === effectiveCourseSlug)?.name ||
        effectiveCourseSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        : '';

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dialCode: defaultValues.dialCode || DEFAULT_DIAL_CODE,
        phone: '',
        message: '',
        budgetRange: '',
        participantsCount: '1',
        hearAboutUs: defaultValues.hearAboutUs || '',
        subject: '',
        courseSlug: effectiveCourseSlug,
        selectedCourse: defaultValues.selectedCourse || initialCourseTitle,
        purpose: defaultValues.purpose || 'Upskilling',
        companyName: defaultValues.companyName || '',
        designation: defaultValues.designation || '',
        friendName: defaultValues.friendName || '',
        friendEmail: defaultValues.friendEmail || '',
        friendPhone: defaultValues.friendPhone || '',
        pagePath: '',
        ...defaultValues
    });

    const initialExtra = useCallback(() => {
        const initial: Record<string, string> = {};
        for (const f of extraFields) {
            initial[f.name] = f.defaultValue ?? '';
        }
        return initial;
    }, [extraFields]);

    const [extraValues, setExtraValues] = useState<Record<string, string>>(initialExtra);

    useEffect(() => {
        setExtraValues(initialExtra());
    }, [initialExtra]);

    // Automatically hide visible course selector on course pages while keeping course data attached
    const shouldShowCourseField = isCoursePage ? false : (config.showCourse !== false);
    const hasManyFields = Boolean(
        shouldShowCourseField ||
        config.purpose ||
        config.company ||
        config.designation ||
        config.showMessage !== false
    );

    const hasTurnstileKey = Boolean((process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '').trim());
    const [turnstileToken, setTurnstileToken] = useState<string>(hasTurnstileKey ? '' : 'dev-bypass');
    const [captchaError, setCaptchaError] = useState(false);
    const formLabel = defaultValues.leadSource || 'Lead Form';
    const formId = formLabel.toLowerCase().replace(/\s+/g, '_');

    useEffect(() => {
        if (!formData.pagePath && typeof window !== 'undefined') {
            setFormData(prev => ({ ...prev, pagePath: window.location.pathname }));
        }

        // Auto-detect country dial code from cached GeoIP if not explicitly provided
        if (!defaultValues.dialCode) {
            const geo = getCachedGeoLocation();
            if (geo?.countryCode) {
                const match = DIAL_CODES.find(
                    (c) => c.iso.toUpperCase() === geo.countryCode.toUpperCase()
                );
                if (match) {
                    setFormData((prev) => ({ ...prev, dialCode: match.dial }));
                }
            }
        }

        const handleGeoUpdated = (e: Event) => {
            if (defaultValues.dialCode) return;
            const detail = (e as CustomEvent<{ countryCode?: string }>).detail;
            const countryCode = detail?.countryCode;
            if (countryCode) {
                const match = DIAL_CODES.find(
                    (c) => c.iso.toUpperCase() === countryCode.toUpperCase()
                );
                if (match) {
                    setFormData((prev) => ({ ...prev, dialCode: match.dial }));
                }
            }
        };

        window.addEventListener('geolocation:updated', handleGeoUpdated);
        return () => window.removeEventListener('geolocation:updated', handleGeoUpdated);
    }, [formData.pagePath, defaultValues.dialCode]);

    const handleCourseChange = useCallback((slug: string, title?: string) => {
        setFormData(prev => ({ ...prev, courseSlug: slug, selectedCourse: title || '' }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (errorMessage) setErrorMessage(null);

        if (name === 'phone' || name === 'friendPhone') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (errorMessage) setErrorMessage(null);
        setExtraValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            const attribution = getAttributionData();
            const geo = getCachedGeoLocation();
            const formattedPhone = formData.phone
                ? `${formData.dialCode} ${formData.phone}`.trim()
                : '';

            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formattedPhone,
                dialCode: formData.dialCode,
                message: formData.message,
                budgetRange: formData.budgetRange,
                courseSlug: formData.courseSlug,
                selectedCourse: formData.selectedCourse,
                participantsCount: formData.participantsCount ? parseInt(formData.participantsCount, 10) : undefined,
                leadSource: formData.leadSource,
                pagePath: formData.pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
                purpose: formData.purpose,
                country: geo?.country,
                countryCode: geo?.countryCode,
                city: geo?.city,
                clientIp: geo?.query,
                customFields: {
                    ...extraValues,
                    hearAboutUs: formData.hearAboutUs,
                    subject: formData.subject,
                    companyName: formData.companyName,
                    designation: formData.designation,
                    friendName: formData.friendName,
                    friendPhone: formData.friendPhone,
                    friendEmail: formData.friendEmail,
                    geoCountry: geo?.country,
                    geoCity: geo?.city,
                    geoTimezone: geo?.timezone,
                },
                turnstileToken,
                ...attribution,
            };

            await submitLead(payload);

            trackFormSubmit(formId, formLabel);
            setSuccess(true);
            setFormData({
                fullName: '',
                email: '',
                dialCode: defaultValues.dialCode || DEFAULT_DIAL_CODE,
                phone: '',
                message: '',
                budgetRange: '',
                participantsCount: '1',
                hearAboutUs: defaultValues.hearAboutUs || '',
                subject: '',
                courseSlug: '',
                selectedCourse: '',
                purpose: defaultValues.purpose || 'Upskilling',
                companyName: '',
                designation: '',
                friendName: '',
                friendPhone: '',
                friendEmail: '',
                pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
                ...defaultValues
            });
            setExtraValues(initialExtra());
            if (onSuccess) onSuccess();
            if (hasTurnstileKey) setTurnstileToken('');
        } catch (error: unknown) {
            console.error('[LeadForm] Submission error:', error);
            const msg = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-surface flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]">
                <div className="w-14 h-14 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-prime-dark mb-2">Inquiry Submitted!</h3>
                <p className="text-text-muted text-xs sm:text-sm max-w-sm mb-6">
                    Thank you for your interest. A NivLearn admissions advisor will get in touch with you shortly.
                </p>
                <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-4 py-2 bg-prime hover:bg-prime-outline text-on-dark font-medium rounded-md shadow-xs transition-colors text-xs sm:text-sm cursor-pointer"
                >
                    Submit Another Inquiry
                </button>
            </div>
        );
    }

    const isCompact = layout === 'compact';

    return (
        <div className="bg-surface">
            {formTitle && formDescription && (
                <div className={`${isCompact ? 'px-3 py-2 sm:px-4' : 'p-4 sm:p-5 pb-2'} border-b border-border-muted/50 bg-surface-muted ${isCompact && icon ? 'flex items-center gap-2' : ''}`}>
                    {icon && (
                        <div className={`${isCompact ? 'w-7 h-7' : 'w-9 h-9 mb-2'} shrink-0 rounded-md bg-prime/10 flex items-center justify-center text-prime`}>
                            {icon}
                        </div>
                    )}
                    <div className={isCompact ? 'min-w-0' : ''}>
                        <h3 className={`${isCompact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'} font-bold text-prime-dark`}>{formTitle}</h3>
                        <p className="text-[11px] text-text-muted mt-0.5">{formDescription}</p>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={isCompact ? 'space-y-2' : 'px-4 py-5 space-y-3.5'}
            >
                {/* Inline Error Banner */}
                {errorMessage && (
                    <div className="p-2.5 rounded-md bg-danger/10 border border-danger/20 text-danger text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Full Name */}
                <FloatingField
                    label="Full Name"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    icon={fieldIcons?.fullName}
                />

                {/* Phone & Email: In a row when multiple fields exist, stacked when short form */}
                <div className={hasManyFields ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5" : "space-y-2"}>
                    <FloatingField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        dialCode={formData.dialCode}
                        onDialCodeChange={handleChange}
                        placeholder="Phone Number"
                        icon={fieldIcons?.phone}
                    />
                    <FloatingField
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        icon={fieldIcons?.email}
                    />
                </div>

                {/* Course & Purpose Selection: paired in a row when both exist */}
                {shouldShowCourseField && config.purpose ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <LeadFormCourseSelector
                            value={formData.courseSlug}
                            onChange={handleCourseChange}
                            defaultSlug={effectiveCourseSlug || defaultValues.courseSlug}
                            placeholder={coursePlaceholder}
                            icon={fieldIcons?.course}
                            courses={courses}
                        />
                        <FloatingField
                            label="Purpose"
                            name="purpose"
                            type="select"
                            required
                            value={formData.purpose}
                            onChange={handleChange}
                            options={[
                                { label: 'Upskilling / Certification', value: 'Upskilling' },
                                { label: 'Job Change / Career Switch', value: 'Job Change' },
                                { label: 'Corporate Training for Team', value: 'Corporate Training' },
                                { label: 'College Student Placement', value: 'College Placement' },
                                { label: 'Other Inquiry', value: 'Other' },
                            ]}
                        />
                    </div>
                ) : (
                    <>
                        {shouldShowCourseField && (
                            <div className="w-full">
                                <LeadFormCourseSelector
                                    value={formData.courseSlug}
                                    onChange={handleCourseChange}
                                    defaultSlug={effectiveCourseSlug || defaultValues.courseSlug}
                                    placeholder={coursePlaceholder}
                                    icon={fieldIcons?.course}
                                    courses={courses}
                                />
                            </div>
                        )}
                        {config.purpose && (
                            <FloatingField
                                label="Purpose"
                                name="purpose"
                                type="select"
                                required
                                value={formData.purpose}
                                onChange={handleChange}
                                options={[
                                    { label: 'Upskilling / Certification', value: 'Upskilling' },
                                    { label: 'Job Change / Career Switch', value: 'Job Change' },
                                    { label: 'Corporate Training for Team', value: 'Corporate Training' },
                                    { label: 'College Student Placement', value: 'College Placement' },
                                    { label: 'Other Inquiry', value: 'Other' },
                                ]}
                            />
                        )}
                    </>
                )}

                {/* Corporate Fields */}
                {(config.company || config.designation) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {config.company && (
                            <FloatingField
                                label="Company Name"
                                name="companyName"
                                required
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Organization / Company"
                            />
                        )}
                        {config.designation && (
                            <FloatingField
                                label="Designation"
                                name="designation"
                                required
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Your Job Title / Role"
                            />
                        )}
                    </div>
                )}

                {/* Page-specific questions */}
                {extraFields.map((field) => (
                    <FloatingField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type ?? 'text'}
                        required={field.required}
                        value={extraValues[field.name] ?? ''}
                        onChange={handleExtraChange}
                        placeholder={field.placeholder}
                        options={field.options}
                        rows={2}
                        minHeight={isCompact ? 65 : 85}
                    />
                ))}

                {/* Message */}
                {config.showMessage !== false && (
                    <FloatingField
                        label="How can we help you?"
                        name="message"
                        type="textarea"
                        value={formData.message}
                        onChange={handleChange}
                        rows={2}
                        minHeight={isCompact ? 65 : 85}
                        placeholder="Tell us about your learning goals or team requirements..."
                        icon={fieldIcons?.message}
                    />
                )}

                {/* Turnstile Captcha (Invisible Mode - zero visual obstruction) */}
                {hasTurnstileKey && (
                    <div className="h-0 w-0 overflow-hidden opacity-0 pointer-events-none">
                        <TurnstileWidget
                            size="invisible"
                            onVerify={(token) => {
                                setTurnstileToken(token);
                                setCaptchaError(false);
                            }}
                            onError={() => setCaptchaError(true)}
                            onExpire={() => {
                                setTurnstileToken('');
                                setCaptchaError(true);
                            }}
                        />
                    </div>
                )}
                {captchaError && (
                    <p className="text-danger text-xs text-center font-medium">
                        Security verification failed. Please try again.
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-3 bg-prime hover:bg-prime-outline text-on-dark font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group text-xs sm:text-sm cursor-pointer"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                        </>
                    ) : (
                        <>
                            <span>{submitButtonText}</span>
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                <p className="text-center text-[11px] text-text-muted pt-1">
                    By submitting, you agree to NivLearn&apos;s{' '}
                    <Link href="/privacy-policy" className="text-prime underline-offset-2 hover:underline">Privacy Policy</Link> and{' '}
                    <Link href="/terms-and-conditions" className="text-prime underline-offset-2 hover:underline">Terms</Link>.
                </p>
            </form>
        </div>
    );
}
