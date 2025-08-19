// SEO工具函数

// 生成SEO友好的URL slug
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
        .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
}

// 截取描述文本，确保在指定长度内
export function truncateDescription(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;

    // 在最后一个完整单词处截断
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.8) {
        return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
}

// 提取文章摘要
export function extractSummary(content: string, maxLength: number = 200): string {
    // 移除HTML标签
    const plainText = content.replace(/<[^>]*>/g, '');

    // 移除多余的空白字符
    const cleanText = plainText.replace(/\s+/g, ' ').trim();

    return truncateDescription(cleanText, maxLength);
}

// 生成关键词
export function generateKeywords(title: string, content: string, tags: string[] = []): string {
    const baseKeywords = ['支持系统', '个人成长', '自我提升'];
    const titleWords = title.split(/\s+/).filter(word => word.length > 1);
    const contentKeywords = extractKeywordsFromContent(content);

    const allKeywords = [...baseKeywords, ...titleWords, ...tags, ...contentKeywords];

    // 去重并限制数量
    const uniqueKeywords = [...new Set(allKeywords)].slice(0, 10);

    return uniqueKeywords.join(', ');
}

// 从内容中提取关键词
function extractKeywordsFromContent(content: string): string[] {
    const commonWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没', '看', '好', '自己', '时候', '过', '下', '来', '他', '这', '对', '起', '还', '把', '什么', '让', '如果', '但是', '因为', '所以', '可以', '应该', '能够', '需要', '通过', '进行', '实现', '提高', '帮助', '学习', '工作', '生活', '问题', '方法', '方式', '内容', '文章', '网站', '系统'];

    const words = content
        .replace(/[^\u4e00-\u9fa5\w\s]/g, ' ') // 保留中文、英文和数字
        .split(/\s+/)
        .filter(word =>
            word.length >= 2 &&
            word.length <= 8 &&
            !commonWords.includes(word) &&
            !/^\d+$/.test(word) // 排除纯数字
        );

    // 统计词频
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // 返回出现频率最高的词
    return Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word);
}

// 计算阅读时间
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // 中文阅读速度
    const wordCount = content.length; // 中文按字符数计算
    return Math.ceil(wordCount / wordsPerMinute);
}

// 生成面包屑数据
export function generateBreadcrumbs(path: string): Array<{ name: string, href: string }> {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs: Array<{ name: string, href: string }> = [];

    let currentPath = '';

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        let name = segment;

        // 根据路径段生成友好的名称
        switch (segment) {
            case 'chapters':
                name = '全部章节';
                break;
            case 'chapter':
                name = '章节';
                break;
            case 'tags':
                name = '标签';
                break;
            case 'tag':
                name = '标签';
                break;
            case 'search':
                name = '搜索';
                break;
            case 'about':
                name = '关于';
                break;
            case 'download':
                name = '下载';
                break;
            case 'shop':
                name = '商店';
                break;
            default:
                // 解码URL编码的中文
                name = decodeURIComponent(segment);
        }

        breadcrumbs.push({
            name,
            href: currentPath
        });
    });

    return breadcrumbs;
}

// 验证和清理URL
export function cleanUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.toString();
    } catch {
        return `https://zhichixitong.support${url.startsWith('/') ? url : '/' + url}`;
    }
}

// 生成社交媒体分享文本
export function generateShareText(title: string, description: string): string {
    const maxLength = 140; // Twitter限制
    const baseText = `${title} - ${description}`;

    if (baseText.length <= maxLength) {
        return baseText;
    }

    return truncateDescription(baseText, maxLength - 3) + '...';
}