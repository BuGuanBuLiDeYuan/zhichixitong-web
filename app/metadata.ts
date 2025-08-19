import { Metadata } from 'next';

// 首页元数据 - SEO优化版本
export const metadata: Metadata = {
    title: '支持系统理论 - 加速人生起飞的个人成长方法 | 刘明著',
    description: '支持系统理论创始人刘明亲授，200篇实战文章教你构建强大支持网络。已帮助10万+人突破瓶颈，实现人生跃迁。免费学习个人成长、职业发展、人际关系核心方法。',
    keywords: '支持系统理论, 个人成长方法, 人生突破, 职业发展, 人际关系, 自我提升, 成长网络, 刘明, 个人成长书籍, 免费学习',
    alternates: {
        canonical: 'https://zhichixitong.support',
    },
    openGraph: {
        title: '支持系统理论 - 加速人生起飞的个人成长方法',
        description: '支持系统理论创始人刘明亲授，200篇实战文章教你构建强大支持网络。已帮助10万+人突破瓶颈，实现人生跃迁。',
        url: 'https://zhichixitong.support',
        siteName: '支持系统',
        locale: 'zh_CN',
        type: 'website',
        images: [
            {
                url: 'https://zhichixitong.support/images/og-home.jpg',
                width: 1200,
                height: 630,
                alt: '支持系统理论 - 个人成长方法',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '支持系统理论 - 加速人生起飞的个人成长方法',
        description: '支持系统理论创始人刘明亲授，200篇实战文章教你构建强大支持网络。已帮助10万+人突破瓶颈。',
        images: ['https://zhichixitong.support/images/twitter-home.jpg'],
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
    other: {
        'article:author': '刘明',
        'article:publisher': 'https://zhichixitong.support',
        'og:locale:alternate': 'en_US',
    }
}; 