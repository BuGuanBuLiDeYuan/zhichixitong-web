// 章节数据类型定义
export type Chapter = {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    readTime: number;
    tags: string[];
};

// 默认章节数据，在无法加载chapters.json时使用
const defaultChapters: Chapter[] = [
    {
        id: "1",
        slug: "introduction",
        title: "支持系统理论介绍",
        content: "支持系统是帮助个人成长的重要框架...",
        excerpt: "了解支持系统的基本概念和重要性",
        readTime: 5,
        tags: ["理论", "入门"]
    },
    {
        id: "2",
        slug: "identify-support-system",
        title: "识别你的支持系统",
        content: "如何识别你已经拥有的支持系统...",
        excerpt: "学习如何分析和识别你现有的支持网络",
        readTime: 7,
        tags: ["方法论", "分析"]
    },
    {
        id: "3",
        slug: "build-support-system",
        title: "构建强大的支持系统",
        content: "构建有效支持系统的实用策略...",
        excerpt: "学习构建和扩展你的支持网络的具体方法",
        readTime: 10,
        tags: ["实践", "策略"]
    }
];

// 同步加载数据
let chaptersData: Chapter[] = defaultChapters;
let tagsData: Record<string, string[]> = {
    "理论": ["1"],
    "入门": ["1"],
    "方法论": ["2"],
    "分析": ["2"],
    "实践": ["3"],
    "策略": ["3"]
};

// 加载实际数据
if (typeof window === 'undefined') {
    // 服务器端执行
    try {
        // 使用require同步加载，而不是异步import
        const loadedChaptersData = require('../public/data/chapters.json');
        const loadedTagsData = require('../public/data/tags.json');

        if (loadedChaptersData && Array.isArray(loadedChaptersData)) {
            chaptersData = loadedChaptersData;
        }

        if (loadedTagsData && typeof loadedTagsData === 'object') {
            tagsData = loadedTagsData;
        }
    } catch (error) {
        console.error('Failed to load data files in server environment:', error);
        // 使用默认数据，已在上面设置
    }
} else {
    // 客户端执行
    // 客户端使用的是预加载的数据，不需要额外处理
}

// 获取所有章节
export function getAllChapters(): Chapter[] {
    return chaptersData;
}

// 获取特定章节的数据
export function getChapterById(id: string): Chapter | null {
    return chaptersData.find(chapter => chapter.id === id) || null;
}

// 获取所有标签和对应的章节ID
export function getAllTags(): Record<string, string[]> {
    return tagsData;
}

// 获取随机章节（不重复）
export function getRandomChapters(count: number = 3): Chapter[] {
    const shuffled = [...chaptersData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 根据标签获取章节
export function getChaptersByTag(tag: string): Chapter[] {
    const chapterIds = tagsData[tag] || [];
    return chaptersData.filter(chapter => chapterIds.includes(chapter.id));
}

// 搜索章节
export function searchChapters(query: string): Chapter[] {
    if (!query || query.trim() === '') {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    return chaptersData.filter(chapter =>
        chapter.title.toLowerCase().includes(normalizedQuery) ||
        chapter.content.toLowerCase().includes(normalizedQuery)
    );
} 