import { Chapter } from './chapters';

// 搜索索引接口
export interface SearchIndex {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    keywords: string[];
    searchScore: number;
    lastModified: string;
}

// 创建搜索索引
export function createSearchIndex(chapters: Chapter[]): SearchIndex[] {
    return chapters.map(chapter => {
        const keywords = extractSearchKeywords(chapter);
        const searchScore = calculateSearchScore(chapter);

        return {
            id: chapter.id,
            title: chapter.title,
            content: chapter.content,
            excerpt: chapter.excerpt || chapter.content.substring(0, 200),
            tags: chapter.tags || [],
            keywords,
            searchScore,
            lastModified: chapter.lastModified || '2024-01-01'
        };
    });
}

// 提取搜索关键词
function extractSearchKeywords(chapter: Chapter): string[] {
    const keywords = new Set<string>();

    // 从标题提取
    const titleWords = chapter.title.split(/\s+/).filter(word => word.length > 1);
    titleWords.forEach(word => keywords.add(word.toLowerCase()));

    // 从标签提取
    chapter.tags?.forEach(tag => keywords.add(tag.toLowerCase()));

    // 从内容提取高频词
    const contentWords = extractHighFrequencyWords(chapter.content);
    contentWords.forEach(word => keywords.add(word));

    return Array.from(keywords);
}

// 提取高频词
function extractHighFrequencyWords(content: string): string[] {
    const stopWords = new Set(['的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没', '看', '好', '自己', '时候', '过', '下', '来', '他', '这', '对', '起', '还', '把', '什么', '让', '如果', '但是', '因为', '所以', '可以', '应该', '能够', '需要', '通过', '进行', '实现', '提高', '帮助']);

    const words = content
        .replace(/[^\u4e00-\u9fa5\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word =>
            word.length >= 2 &&
            word.length <= 6 &&
            !stopWords.has(word) &&
            !/^\d+$/.test(word)
        );

    // 统计词频
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        wordCount[lowerWord] = (wordCount[lowerWord] || 0) + 1;
    });

    // 返回高频词
    return Object.entries(wordCount)
        .filter(([, count]) => count >= 2)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);
}

// 计算搜索评分
function calculateSearchScore(chapter: Chapter): number {
    let score = 0;

    // 标题权重
    score += chapter.title.length > 0 ? 10 : 0;

    // 内容长度权重
    const contentLength = chapter.content.length;
    if (contentLength > 1000) score += 5;
    if (contentLength > 2000) score += 5;
    if (contentLength > 3000) score += 5;

    // 标签权重
    score += (chapter.tags?.length || 0) * 2;

    // 核心关键词权重
    const coreKeywords = ['支持系统', '个人成长', '自我提升'];
    coreKeywords.forEach(keyword => {
        if (chapter.title.includes(keyword)) score += 15;
        if (chapter.content.includes(keyword)) score += 10;
    });

    // 摘要权重
    if (chapter.excerpt && chapter.excerpt.length > 50) score += 5;

    return score;
}

// 搜索功能
export function searchChapters(
    searchIndex: SearchIndex[],
    query: string,
    options: {
        limit?: number;
        minScore?: number;
        sortBy?: 'relevance' | 'date' | 'title';
    } = {}
): SearchIndex[] {
    const { limit = 20, minScore = 0, sortBy = 'relevance' } = options;

    if (!query.trim()) return [];

    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);

    // 计算相关性得分
    const results = searchIndex.map(item => {
        let relevanceScore = 0;

        queryTerms.forEach(term => {
            // 标题匹配
            if (item.title.toLowerCase().includes(term)) {
                relevanceScore += 20;
            }

            // 标签匹配
            if (item.tags.some(tag => tag.toLowerCase().includes(term))) {
                relevanceScore += 15;
            }

            // 关键词匹配
            if (item.keywords.some(keyword => keyword.includes(term))) {
                relevanceScore += 10;
            }

            // 内容匹配
            const contentMatches = (item.content.toLowerCase().match(new RegExp(term, 'g')) || []).length;
            relevanceScore += Math.min(contentMatches * 2, 10);

            // 摘要匹配
            if (item.excerpt.toLowerCase().includes(term)) {
                relevanceScore += 5;
            }
        });

        return {
            ...item,
            relevanceScore: relevanceScore + item.searchScore
        };
    })
        .filter(item => item.relevanceScore > minScore);

    // 排序
    results.sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
            case 'title':
                return a.title.localeCompare(b.title);
            case 'relevance':
            default:
                return b.relevanceScore - a.relevanceScore;
        }
    });

    return results.slice(0, limit);
}

// 生成搜索建议
export function generateSearchSuggestions(searchIndex: SearchIndex[], query: string): string[] {
    if (!query.trim()) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // 从标题生成建议
    searchIndex.forEach(item => {
        if (item.title.toLowerCase().includes(queryLower)) {
            suggestions.add(item.title);
        }

        // 从标签生成建议
        item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(queryLower)) {
                suggestions.add(tag);
            }
        });

        // 从关键词生成建议
        item.keywords.forEach(keyword => {
            if (keyword.includes(queryLower)) {
                suggestions.add(keyword);
            }
        });
    });

    return Array.from(suggestions).slice(0, 8);
}

// 热门搜索词
export function getPopularSearchTerms(searchIndex: SearchIndex[]): string[] {
    const termFrequency: { [key: string]: number } = {};

    searchIndex.forEach(item => {
        // 统计标签频率
        item.tags.forEach(tag => {
            termFrequency[tag] = (termFrequency[tag] || 0) + 1;
        });

        // 统计关键词频率
        item.keywords.forEach(keyword => {
            termFrequency[keyword] = (termFrequency[keyword] || 0) + 1;
        });
    });

    return Object.entries(termFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([term]) => term);
}