import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata, Viewport } from 'next'
import { ThemeProvider } from './context/ThemeContext'

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
    openGraph: {
        title: '支持系统 - 个人成长理论与实践',
        description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞',
        url: 'https://zhichixitong.com',
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
        images: ['/images/twitter-image.jpg'],
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
        canonical: 'https://zhichixitong.com',
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