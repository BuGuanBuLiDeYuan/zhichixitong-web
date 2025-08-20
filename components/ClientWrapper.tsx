'use client'

import dynamic from 'next/dynamic'

// 动态导入分析组件，避免构建问题
const GoogleAnalytics = dynamic(() => import('./analytics/GoogleAnalytics'), { ssr: false })
const WebVitals = dynamic(() => import('./performance/WebVitals'), { ssr: false })

export default function ClientWrapper() {
    return (
        <>
            <GoogleAnalytics />
            <WebVitals />
        </>
    )
}