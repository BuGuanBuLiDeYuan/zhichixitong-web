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
}

export const metadata: Metadata = {
    title: {
        template: '%s | 支持系统',
        default: '支持系统理论 - 用好支持系统，加速人生起飞',
    },
    description: '支持系统理论学习平台，系统收录 200+ 篇成长实践文章，帮助你构建个人支持网络，实现长期成长与关键突破。',
    keywords: ['支持系统', '支持系统理论', '个人成长', '自我提升', '人生突破', '成长方法'],
    authors: [{ name: '刘明' }],
    category: '个人成长',
    metadataBase: new URL('https://zhichixitong.support'),
    manifest: '/manifest.json',
    applicationName: '支持系统',
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
        title: '支持系统理论 - 个人成长方法与实践',
        description: '系统学习支持系统理论，构建可持续的个人支持网络，提升成长效率与人生韧性。',
        url: 'https://zhichixitong.support',
        siteName: '支持系统',
        images: [
            {
                url: 'https://zhichixitong.support/images/twitter-card.png',
                width: 1200,
                height: 630,
                alt: '支持系统理论',
            }
        ],
        locale: 'zh_CN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '支持系统理论 - 个人成长方法与实践',
        description: '系统学习支持系统理论，构建可持续的个人支持网络，提升成长效率与人生韧性。',
        images: ['https://zhichixitong.support/images/twitter-card.png'],
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
                    <ClientWrapper />
                </ThemeProvider>
            </body>
        </html>
    )
}
