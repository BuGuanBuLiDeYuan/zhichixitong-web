import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '支持系统理论 - 加速人生起飞的个人成长方法 | 刘明著',
    description: '系统学习支持系统理论。收录 200+ 篇文章，覆盖个人成长、职业发展、人际关系与心理建设，帮助你构建长期有效的支持网络。',
    keywords: ['支持系统理论', '个人成长方法', '人生突破', '职业发展', '人际关系', '自我提升', '刘明'],
    alternates: {
        canonical: 'https://zhichixitong.support',
    },
    openGraph: {
        title: '支持系统理论 - 加速人生起飞的个人成长方法',
        description: '系统学习支持系统理论，构建更强支持网络，提升成长效率与人生韧性。',
        url: 'https://zhichixitong.support',
        siteName: '支持系统',
        locale: 'zh_CN',
        type: 'website',
        images: [
            {
                url: 'https://zhichixitong.support/images/twitter-card.png',
                width: 1200,
                height: 630,
                alt: '支持系统理论 - 个人成长方法',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '支持系统理论 - 加速人生起飞的个人成长方法',
        description: '系统学习支持系统理论，构建更强支持网络，提升成长效率与人生韧性。',
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
    other: {
        'article:author': '刘明',
        'article:publisher': 'https://zhichixitong.support',
    }
};
