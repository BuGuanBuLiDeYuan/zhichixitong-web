'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

declare global {
    interface Window {
        gtag: (command: string, ...args: any[]) => void;
    }
}

// 页面浏览事件
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

// 自定义事件
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// SEO相关事件
export const trackSEOEvent = (eventName: string, data: Record<string, any>) => {
    event({
        action: eventName,
        category: 'SEO',
        label: JSON.stringify(data),
    });
};

// 内容互动事件
export const trackContentEngagement = (contentType: string, contentId: string, action: string) => {
    event({
        action: action,
        category: 'Content Engagement',
        label: `${contentType}:${contentId}`,
    });
};

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            pageview(url);
        }
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: false,
                            custom_map: {
                                'custom_parameter_1': 'content_type',
                                'custom_parameter_2': 'user_engagement'
                            }
                        });
                    `,
                }}
            />
        </>
    );
}