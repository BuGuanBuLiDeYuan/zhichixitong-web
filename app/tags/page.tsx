import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags } from '../../lib/chapters';

export const metadata: Metadata = {
    title: '标签浏览 - 支持系统',
    description: '通过标签浏览支持系统理论的文章，按主题分类，找到感兴趣的内容。',
};

export default function TagsPage() {
    const allTags = getAllTags();
    const tagNames = Object.keys(allTags).sort();

    // 按文章数量排序
    const sortedTags = tagNames.map(tag => ({
        name: tag,
        count: allTags[tag].length
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="tags-page">
            {/* 顶部背景元素 */}
            <div className="tags-hero">
                <div className="hero-overlay">
                    <div className="tech-circle tech-circle-1"></div>
                    <div className="tech-circle tech-circle-2"></div>
                    <div className="connection-line line-1"></div>
                    <div className="connection-line line-2"></div>
                </div>
                <div className="container">
                    {/* 页面标题 */}
                    <div className="tags-header">
                        <h1 className="tags-title">标签浏览</h1>
                        <p className="tags-subtitle">
                            通过标签找到感兴趣的主题和文章，探索支持系统的不同维度
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="tags-content">
                    {/* 标签云 */}
                    <div className="tag-cloud-section">
                        <h2 className="section-title">全部标签</h2>
                        <div className="tag-cloud">
                            {sortedTags.map((tag, index) => (
                                <Link
                                    key={tag.name}
                                    href={`/tag/${encodeURIComponent(tag.name)}`}
                                    className={`tag-item tag-item-${index % 5}`}
                                >
                                    <span className="tag-name">{tag.name}</span>
                                    <span className="tag-count">{tag.count}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 热门标签 */}
                    <div className="popular-tags-section">
                        <h2 className="section-title">热门标签</h2>
                        <p className="section-intro">
                            以下是我们最受欢迎的主题标签，包含了大量有价值的内容：
                        </p>
                        <div className="popular-tags-grid">
                            {sortedTags.slice(0, 6).map((tag, index) => (
                                <Link
                                    key={tag.name}
                                    href={`/tag/${encodeURIComponent(tag.name)}`}
                                    className="popular-tag-card"
                                >
                                    <div className="popular-tag-number">{index + 1}</div>
                                    <div className="popular-tag-content">
                                        <h3 className="popular-tag-title">{tag.name}</h3>
                                        <p className="popular-tag-text">
                                            查看所有与"{tag.name}"相关的文章
                                        </p>
                                        <div className="popular-tag-count">
                                            {tag.count} 篇文章
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 标签分类说明 */}
                    <div className="tag-info-section">
                        <h2 className="section-title">关于标签分类</h2>
                        <div className="tag-info-content">
                            <p className="tag-info-text">
                                标签是我们对支持系统理论内容进行分类的方式，帮助您快速找到感兴趣的主题。
                                每篇文章可能包含多个标签，反映了不同的知识点和应用领域。
                            </p>
                            <p className="tag-info-text">
                                您可以通过点击任意标签，浏览与该主题相关的所有文章，深入了解特定领域的支持系统应用方法。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 