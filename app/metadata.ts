import { Metadata } from 'next';

// 首页元数据
export const metadata: Metadata = {
    title: '支持系统 - 个人成长理论与实践',
    description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞。200篇实用文章帮助你建立更强大的支持网络。',
    keywords: '支持系统, 个人成长, 人际关系, 心理健康, 自我提升, 职业发展, 学习方法',
    alternates: {
        canonical: 'https://zhichixitong.support',
    },
    openGraph: {
        title: '支持系统 - 个人成长理论与实践',
        description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞。',
        url: 'https://zhichixitong.support',
        siteName: '支持系统',
        locale: 'zh_CN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '支持系统 - 个人成长理论与实践',
        description: '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞。',
    },
    robots: {
        index: true,
        follow: true,
    }
}; 