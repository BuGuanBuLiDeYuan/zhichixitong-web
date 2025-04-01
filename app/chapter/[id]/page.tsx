import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChapterById, getAllChapters } from '../../../lib/chapters';
import { Suspense } from 'react';
import ChapterContent from '@/components/ChapterContent';

// 生成静态参数
export async function generateStaticParams() {
    const chapters = getAllChapters();
    return chapters.map((chapter) => ({
        id: chapter.id,
    }));
}

// 动态元数据
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const chapter = getChapterById(params.id);

    if (!chapter) {
        return {
            title: '章节未找到 - 支持系统',
            description: '抱歉，您请求的章节不存在。'
        };
    }

    return {
        title: `${chapter.title} - 支持系统`,
        description: chapter.excerpt
    };
}

interface ChapterPageProps {
    params: {
        id: string;
    };
}

export default function ChapterPage({ params }: ChapterPageProps) {
    const chapter = getChapterById(params.id);

    if (!chapter) {
        notFound();
    }

    // 获取所有章节并排序
    const allChapters = getAllChapters().sort((a, b) => {
        const numA = parseInt(a.id);
        const numB = parseInt(b.id);
        return numA - numB;
    });

    // 找到当前章节的索引
    const currentIndex = allChapters.findIndex(ch => ch.id === params.id);

    // 获取上一篇和下一篇
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    return (
        <div className="page-container">
            <article className="chapter-article">
                <div className="container">
                    <div className="chapter-header">
                        <div className="chapter-meta">
                            <Link href="/chapters" className="back-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="icon-small"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                </svg>
                                返回全部文章
                            </Link>
                            <div className="chapter-info">
                                <span className="chapter-id">#{chapter.id}</span>
                                <span className="read-time">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="icon-small"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    {chapter.readTime} 分钟阅读
                                </span>
                            </div>
                        </div>

                        <h1 className="chapter-title">{chapter.title}</h1>

                        <div className="chapter-tags">
                            {chapter.tags.map((tag) => (
                                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                                    <span className="tag">{tag}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Suspense fallback={<div>正在加载文章内容...</div>}>
                        <ChapterContent content={chapter.content} />
                    </Suspense>

                    <div className="chapter-footer">
                        <div className="chapter-navigation">
                            {prevChapter ? (
                                <Link href={`/chapter/${prevChapter.id}`} className="nav-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                                    <span>上一篇：{prevChapter.title}</span>
                                </Link>
                            ) : (
                                <div></div>
                            )}


                            {nextChapter ? (
                                <Link href={`/chapter/${nextChapter.id}`} className="nav-button">
                                    <span>下一篇：{nextChapter.title}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
} 