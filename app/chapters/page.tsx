import { getAllChapters } from '@/lib/chapters';
import Link from 'next/link';

export default function ChaptersPage() {
    const chapters = getAllChapters();

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

                    <div className="chapters-grid-full">
                        {chapters.map((chapter) => (
                            <div key={chapter.id} className="chapter-card">
                                <div className="chapter-card-content">
                                    <div className="chapter-meta">
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

                                    <Link href={`/chapter/${chapter.id}`} className="chapter-title-link">
                                        <h3 className="chapter-title">{chapter.title}</h3>
                                    </Link>

                                    <p className="chapter-excerpt">{chapter.excerpt.length > 150
                                        ? `${chapter.excerpt.substring(0, 150)}...`
                                        : chapter.excerpt}
                                    </p>

                                    <div className="chapter-tags">
                                        {chapter.tags.slice(0, 4).map((tag) => (
                                            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                                                <span className="tag">{tag}</span>
                                            </Link>
                                        ))}
                                        {chapter.tags.length > 4 && (
                                            <span className="tag-more">+{chapter.tags.length - 4}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
} 