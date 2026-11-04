declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        gtag?: (...args: unknown[]) => void;
    }
}

function getPageInfo() {
    if (typeof window === "undefined") return { page_location: "", page_path: "" };
    return {
        page_location: window.location.href,
        page_path: window.location.pathname,
    };
}

export function trackFormStart(formId: string, formName: string) {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    const payload = {
        event: "nivlearn_form_start",
        form_id: formId,
        form_name: formName,
        form_destination: window.location.href,
        ...getPageInfo(),
        ...(process.env.NODE_ENV !== "production" ? { debug_mode: true } : {}),
    };

    window.dataLayer.push(payload);
}

export function trackFormSubmit(formId: string, formName: string) {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    const payload = {
        event: "nivlearn_form_submit",
        form_id: formId,
        form_name: formName,
        form_destination: window.location.href,
        ...getPageInfo(),
        ...(process.env.NODE_ENV !== "production" ? { debug_mode: true } : {}),
    };

    window.dataLayer.push(payload);
}

