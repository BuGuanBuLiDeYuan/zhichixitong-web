import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata, Viewport } from 'next'
import { ThemeProvider } from './context/ThemeContext'
import Script from 'next/script'
import ClientWrapper from '../components/ClientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export const metadata: Metadata = {
    title: {
        template: '%s | 支持系统',
        default: '支持系统 - 用好支持系统，加速人生起飞',
    },
    description: '探索支持系统理论，构建个人成长网络，突破人生瓶颈。',
    keywords: '支持系统, 个人成长, 自我提升, 人生突破, 成长网络',
    authors: [{ name: '支持系统团队' }],
    category: '个人成长',
    metadataBase: new URL('https://zhichixitong.support'),
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        ],
        apple: [
            { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    openGraph: {
        title: '支持系统 - 个人成长理论与实践',
        description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞',
        url: 'https://zhichixitong.support',
        siteName: '支持系统',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: '支持系统理论简介',
            }
        ],
        locale: 'zh_CN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '支持系统 - 个人成长理论与实践',
        description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞',
        images: ['https://zhichixitong.support/images/twitter-card.png'],
        creator: '@zhichixitong',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://zhichixitong.support',
    },
    verification: {
        google: 'your-google-site-verification',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <meta name="theme-color" content="#2c3e50" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />

                {/* DNS预解析 */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//www.google-analytics.com" />
                <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />

                {/* 预连接重要资源 */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5987578985045497"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                <ClientWrapper />
            </head>
            <body className={inter.className}>
                <ThemeProvider>
                    <div className="site-container">
                        <Header />
                        <main className="main-content">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
} 