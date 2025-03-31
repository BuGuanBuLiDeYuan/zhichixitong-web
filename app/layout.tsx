import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export const metadata: Metadata = {
    title: {
        default: '支持系统 - 个人成长理论与实践',
        template: '%s | 支持系统'
    },
    description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞',
    keywords: '支持系统, 个人成长, 人际关系, 心理健康, 思想哲学, 职业发展, 自我提升',
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
                <div className="site-container">
                    <Header />
                    <main className="main-content">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    )
} 