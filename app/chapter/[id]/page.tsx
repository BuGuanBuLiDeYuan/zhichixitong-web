import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChapterById, getAllChapters } from '../../../lib/chapters';

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
        };
    }

    return {
        title: `${chapter.title} - 支持系统`,
        description: chapter.excerpt,
        openGraph: {
            title: `${chapter.title} - 支持系统`,
            description: chapter.excerpt,
            type: 'article',
        },
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

    // 将内容文本转换为HTML段落
    const contentHtml = chapter.content
        .split('\n\n')
        .map((paragraph, index) => {
            // 处理标题
            if (paragraph.startsWith('# ')) {
                return (
                    <h1 key={index} className="chapter-heading-1">
                        {paragraph.substring(2)}
                    </h1>
                );
            } else if (paragraph.startsWith('## ')) {
                return (
                    <h2 key={index} className="chapter-heading-2">
                        {paragraph.substring(3)}
                    </h2>
                );
            } else if (paragraph.startsWith('### ')) {
                return (
                    <h3 key={index} className="chapter-heading-3">
                        {paragraph.substring(4)}
                    </h3>
                );
            } else if (paragraph.trim() === '') {
                return null;
            } else {
                return (
                    <p key={index} className="chapter-paragraph">
                        {paragraph}
                    </p>
                );
            }
        });

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
                                <span className="chapter-id">{chapter.id}</span>
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
                                    <span>{chapter.readTime} 分钟阅读</span>
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

                    <div className="chapter-content">{contentHtml}</div>

                    <div className="chapter-footer">
                        <div className="chapter-navigation">
                            <Link href="/chapters" className="nav-button">
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
                                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                全部文章
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
} 