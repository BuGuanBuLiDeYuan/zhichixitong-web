'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// 发送性能数据到分析服务
function sendToAnalytics(metric: any) {
    // 发送到Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
        });
    }

    // 发送到自定义分析服务
    if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/web-vitals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: metric.name,
                value: metric.value,
                id: metric.id,
                url: window.location.href,
                timestamp: Date.now(),
            }),
        }).catch(console.error);
    }
}

export default function WebVitals() {
    useEffect(() => {
        // 监控 Core Web Vitals
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);

        // 监控自定义性能指标
        if (typeof window !== 'undefined' && 'performance' in window) {
            // 监控资源加载时间
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

                // DOM加载时间
                const domLoadTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
                sendToAnalytics({
                    name: 'DOM_LOAD_TIME',
                    value: domLoadTime,
                    id: 'dom-load-' + Date.now(),
                });

                // 页面完全加载时间
                const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
                sendToAnalytics({
                    name: 'PAGE_LOAD_TIME',
                    value: pageLoadTime,
                    id: 'page-load-' + Date.now(),
                });
            });

            // 监控长任务
            if ('PerformanceObserver' in window) {
                try {
                    const longTaskObserver = new PerformanceObserver((list) => {
                        list.getEntries().forEach((entry) => {
                            sendToAnalytics({
                                name: 'LONG_TASK',
                                value: entry.duration,
                                id: 'long-task-' + Date.now(),
                            });
                        });
                    });
                    longTaskObserver.observe({ entryTypes: ['longtask'] });
                } catch (e) {
                    console.warn('Long task observer not supported');
                }
            }
        }
    }, []);

    return null;
}