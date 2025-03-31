'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchChapters } from '../../lib/chapters';
import ChapterCard from '../../components/ui/ChapterCard';

// 客户端搜索组件
function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams ? searchParams.get('q') || '' : '';

    const [searchQuery, setSearchQuery] = useState(query);
    const [isSearching, setIsSearching] = useState(false);

    // 搜索结果
    const searchResults = query ? searchChapters(query) : [];

    // 处理搜索
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        // 跳转到带有搜索参数的当前页面
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);

        // 重置搜索状态
        setTimeout(() => {
            setIsSearching(false);
        }, 500);
    };

    // 热门搜索关键词
    const popularSearchTerms = ['支持系统', '人际关系', '自我成长', '心理健康', '思想哲学', '职业发展', '家庭关系'];

    return (
        <div className="search-page">
            {/* 顶部背景元素 */}
            <div className="search-hero">
                <div className="hero-overlay">
                    <div className="tech-circle tech-circle-1"></div>
                    <div className="tech-circle tech-circle-2"></div>
                    <div className="connection-line line-1"></div>
                    <div className="connection-line line-2"></div>
                </div>
                <div className="container">
                    {/* 页面标题 */}
                    <div className="search-header">
                        <h1 className="search-title">搜索文章</h1>
                        <p className="search-subtitle">
                            探索支持系统的丰富内容，找到对你最有价值的知识和见解
                        </p>
                    </div>

                    {/* 搜索框 */}
                    <div className="search-form-container">
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="search-input-wrapper">
                                <div className="search-icon">
                                    <MagnifyingGlassIcon className="search-icon-svg" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="输入关键词或短语..."
                                    className="search-input"
                                />
                                <button
                                    type="submit"
                                    className="search-button"
                                    disabled={isSearching}
                                >
                                    {isSearching ? '搜索中...' : '搜索'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="search-content">
                    {/* 搜索结果 */}
                    {query && (
                        <div className="search-results-section">
                            <h2 className="section-title">
                                {searchResults.length > 0
                                    ? `找到 ${searchResults.length} 个结果`
                                    : '未找到匹配结果'}
                            </h2>

                            {searchResults.length === 0 && (
                                <div className="no-results-message">
                                    <p className="no-results-text">
                                        请尝试使用不同的关键词或更简短的短语进行搜索。
                                    </p>
                                    <div className="search-suggestions">
                                        <h3 className="suggestion-title">您可以尝试：</h3>
                                        <ul className="suggestion-list">
                                            <li>使用更简短、更常见的词语</li>
                                            <li>检查拼写是否正确</li>
                                            <li>尝试使用相近的同义词</li>
                                            <li>尝试下方的热门搜索词</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {searchResults.length > 0 && (
                                <div className="search-results-grid">
                                    {searchResults.map((chapter) => (
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
                            )}
                        </div>
                    )}

                    {/* 搜索建议 */}
                    <div className="popular-searches-section">
                        <h2 className="section-title">热门搜索</h2>
                        <p className="section-intro">以下是读者经常搜索的热门关键词：</p>
                        <div className="popular-searches-cloud">
                            {popularSearchTerms.map((term, index) => (
                                <button
                                    key={term}
                                    onClick={() => {
                                        setSearchQuery(term);
                                        router.push(`/search?q=${encodeURIComponent(term)}`);
                                    }}
                                    className={`popular-search-term term-${index % 5}`}
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 搜索技巧 */}
                    <div className="search-tips-section">
                        <h2 className="section-title">搜索小技巧</h2>
                        <div className="search-tips-content">
                            <p className="search-tips-text">
                                使用精确的关键词可以帮助您更快找到想要的内容。您可以尝试：
                            </p>
                            <ul className="search-tips-list">
                                <li>使用特定概念或术语（如"支持系统理论"而非仅"支持"）</li>
                                <li>结合多个相关词（如"职场 人际关系"）</li>
                                <li>尝试不同表述（如"心理健康"、"心理平衡"）</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 搜索页面，使用Suspense包装SearchContent
export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="search-loading">
                <div className="container">
                    <div className="search-header">
                        <h1 className="search-title">搜索文章</h1>
                        <p className="search-subtitle">正在加载搜索功能...</p>
                    </div>
                </div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}