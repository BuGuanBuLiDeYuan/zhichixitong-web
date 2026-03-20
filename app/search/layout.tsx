import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '搜索 - 支持系统',
    description: '搜索支持系统理论相关文章。',
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: 'https://zhichixitong.support/search',
    },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
