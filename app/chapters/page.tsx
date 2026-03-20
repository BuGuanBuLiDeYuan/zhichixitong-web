import type { Metadata } from 'next';
import { getAllChapters } from '@/lib/chapters';
import ChapterCard from '@/components/ui/ChapterCard';

export const metadata: Metadata = {
    title: '全部文章 - 支持系统',
    description: '浏览支持系统理论全部文章，系统学习支持网络构建、个人成长、职业发展与人际关系核心方法。',
    alternates: {
        canonical: 'https://zhichixitong.support/chapters',
    },
};

export default function ChaptersPage() {
    const sortedChapters = [...getAllChapters()].sort((a, b) => Number(a.id) - Number(b.id));

    return (
        <div className="page-container">
            <section className="chapters-section">
                <div className="container">
                    <div className="section-header">
                        <h1 className="heading-xl">全部文章</h1>
                        <p className="section-description">
                            探索支持系统理论的完整内容，通过这些文章全面了解如何构建和维护你的个人支持系统
                        </p>
                    </div>

                    <div className="search-filter-bar">
                        <p className="chapters-count">共 <span>{sortedChapters.length}</span> 篇文章</p>
                    </div>

                    <div className="chapters-grid">
                        {sortedChapters.map((chapter) => (
                            <ChapterCard
                                key={chapter.id}
                                id={chapter.id}
                                title={chapter.title}
                                excerpt={chapter.excerpt}
                                readTime={chapter.readTime}
                                tags={chapter.tags}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
