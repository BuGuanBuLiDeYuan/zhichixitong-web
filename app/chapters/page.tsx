'use client';

import { getAllChapters, type Chapter } from '@/lib/chapters';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChapterCard from '@/components/ui/ChapterCard';

export default function ChaptersPage() {
    // 使用客户端状态
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 在客户端加载数据
    useEffect(() => {
        try {
            const allChapters = getAllChapters();
            // 按照章节ID数字大小排序
            const sortedChapters = [...allChapters].sort((a, b) => {
                const numA = parseInt(a.id);
                const numB = parseInt(b.id);
                return numA - numB;
            });
            setChapters(sortedChapters);
        } catch (error) {
            console.error('Error loading chapters:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 显示加载状态
    if (isLoading) {
        return (
            <div className="page-container">
                <section className="chapters-section">
                    <div className="container">
                        <div className="section-header">
                            <h1 className="heading-xl">全部文章</h1>
                            <p className="section-description">
                                正在加载文章内容...
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

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
                        <p className="chapters-count">共 <span>{chapters.length}</span> 篇文章</p>
                    </div>

                    <div className="chapters-grid">
                        {chapters.map((chapter) => (
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