'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, CheckCircle2 } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import LeadForm from './LeadForm';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import type { CourseOptionItem } from './types';

interface LeadModalProps {
    courses?: CourseOptionItem[];
}

export default function LeadModal({ courses }: LeadModalProps = {}) {
    const pathname = usePathname();
    const pathSegments = (pathname || '').split('/').filter(Boolean);
    const isCoursePage = pathSegments.length >= 2 && pathSegments[0] !== 'blog' && pathSegments[0] !== 'api';
    const activeCourseSlug = isCoursePage ? pathSegments[1] : undefined;

    const { isOpen, closeModal, modalConfig, courses: contextCourses } = useLeadModal();
    const effectiveCourses = courses || modalConfig.courses || contextCourses;

    const resolvedCourseSlug =
        modalConfig.defaultValues?.courseSlug ||
        modalConfig.courseSlug ||
        (isCoursePage ? activeCourseSlug : undefined);

    const [visible, setVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Keep mounted during exit animation
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setIsSuccess(false);
        } else {
            const timer = setTimeout(() => {
                setVisible(false);
                setIsSuccess(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useBodyScrollLock(visible);

    if (!visible) return null;

    const title = modalConfig.formTitle || 'Talk to Learning Advisor';
    const description = modalConfig.formDescription;

    return (
        <div
            className={`fixed z-50 inset-0 flex items-center justify-center overflow-y-auto bg-overlay/60 backdrop-blur-xs p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`relative flex items-center bg-surface p-3 sm:p-4 md:p-5 rounded-md shadow-2xl transition-all duration-300 transform max-w-md sm:max-w-lg lg:max-w-3xl w-full border border-border-muted/50 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Floating Close Button at Top-Right */}
                <div className="absolute -top-3 -right-3 z-50">
                    <button
                        type="button"
                        onClick={closeModal}
                        aria-label="Close modal"
                        className="bg-surface rounded-full p-1 shadow-md text-text-muted hover:text-prime-dark hover:bg-sec-prime border border-border-muted transition-all duration-200 cursor-pointer flex items-center justify-center"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Thank You Section */}
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center w-full py-8 px-4 text-center bg-light/50 rounded-md">
                        <div className="w-14 h-14 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-prime-dark mb-1.5">Thank You!</h2>
                        <p className="text-text-muted text-xs sm:text-sm max-w-sm mb-5">
                            Your inquiry has been received. A NivLearn learning advisor will get in touch with you shortly.
                        </p>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-2 bg-prime hover:bg-prime-outline text-on-dark font-semibold rounded-md shadow-xs transition-colors text-xs sm:text-sm cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    /* Main Form Content Section */
                    <div className="flex w-full flex-col md:flex-row items-center gap-3 md:gap-5">
                        {/* Left Section: Logo + Heading + Visual Image (Desktop) */}
                        <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2">
                            <div className="flex justify-center mb-2.5">
                                <Image
                                    src="/logo.svg"
                                    alt="NivLearn"
                                    width={150}
                                    height={36}
                                    priority
                                    className="object-contain h-8 w-auto"
                                />
                            </div>
                            <h2 className="text-sm md:text-base font-bold text-prime-dark mb-1 text-center">
                                {title}
                            </h2>
                            {description && (
                                <p className="text-[11px] text-center text-text-muted mb-2 max-w-xs">
                                    {description}
                                </p>
                            )}
                            <div className="mt-1 flex justify-center">
                                <Image
                                    src="/Forms/lead-advisor-photo.webp"
                                    alt="Smiling learning advisor with a headset waving hello"
                                    width={280}
                                    height={280}
                                    priority
                                    className="mx-auto aspect-square w-full max-w-[240px] rounded-xl object-cover shadow-md"
                                />
                            </div>
                        </div>

                        {/* Mobile Header (Shown on small screens only) */}
                        <div className="flex md:hidden flex-col items-center w-full pt-0.5 pb-2 border-b border-border-muted/50">
                            <Image
                                src="/logo.svg"
                                alt="NivLearn"
                                width={130}
                                height={32}
                                priority
                                className="object-contain h-6 w-auto mb-1"
                            />
                            <h2 className="text-xs sm:text-sm font-bold text-prime-dark text-center">
                                {title}
                            </h2>
                        </div>

                        {/* Right Section: Interactive Form */}
                        <div className="w-full md:w-1/2 px-1">
                            <LeadForm
                                layout="compact"
                                formTitle={null}
                                formDescription={null}
                                courses={effectiveCourses}
                                config={{
                                    budget: modalConfig.config?.budget ?? false,
                                    participants: modalConfig.config?.participants ?? modalConfig.participants ?? false,
                                    hearAbout: modalConfig.config?.hearAbout ?? false,
                                    subject: modalConfig.config?.subject ?? false,
                                    purpose: modalConfig.config?.purpose ?? false,
                                    showCourse: isCoursePage ? false : (modalConfig.config?.showCourse ?? true),
                                    showMessage: modalConfig.config?.showMessage ?? true,
                                    company: modalConfig.config?.company ?? false,
                                    designation: modalConfig.config?.designation ?? false,
                                    isReferral: modalConfig.config?.isReferral ?? false,
                                }}
                                defaultValues={{
                                    leadSource: modalConfig.defaultValues?.leadSource ?? modalConfig.source ?? 'cta-popup-form',
                                    ...modalConfig.defaultValues,
                                    ...(resolvedCourseSlug ? { courseSlug: resolvedCourseSlug } : {}),
                                }}
                                extraFields={modalConfig.extraFields}
                                submitButtonText={modalConfig.submitButtonText ?? "Submit Inquiry"}
                                onSuccess={() => {
                                    setIsSuccess(true);
                                    if (modalConfig.onSuccess) {
                                        modalConfig.onSuccess();
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
