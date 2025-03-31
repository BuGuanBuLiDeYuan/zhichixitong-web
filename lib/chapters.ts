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

// 导入实际数据
let chaptersData: Chapter[] = [];
let tagsData: Record<string, string[]> = {};

try {
    // 尝试导入章节数据
    import('../public/data/chapters.json')
        .then(module => {
            chaptersData = module.default as Chapter[];
        })
        .catch(error => {
            console.error('Failed to load chapters.json:', error);
            chaptersData = defaultChapters;
        });

    // 尝试导入标签数据
    import('../public/data/tags.json')
        .then(module => {
            tagsData = module.default as Record<string, string[]>;
        })
        .catch(error => {
            console.error('Failed to load tags.json:', error);
            // 为默认章节生成标签数据
            tagsData = {
                "理论": ["1"],
                "入门": ["1"],
                "方法论": ["2"],
                "分析": ["2"],
                "实践": ["3"],
                "策略": ["3"]
            };
        });
} catch (error) {
    console.error('Failed to import data files:', error);
    chaptersData = defaultChapters;
    tagsData = {
        "理论": ["1"],
        "入门": ["1"],
        "方法论": ["2"],
        "分析": ["2"],
        "实践": ["3"],
        "策略": ["3"]
    };
}

// 获取所有章节
export function getAllChapters(): Chapter[] {
    return chaptersData.length > 0 ? chaptersData : defaultChapters;
}

// 获取特定章节的数据
export function getChapterById(id: string): Chapter | null {
    return chaptersData.find(chapter => chapter.id === id) || defaultChapters.find(chapter => chapter.id === id) || null;
}

// 获取所有标签和对应的章节ID
export function getAllTags(): Record<string, string[]> {
    return Object.keys(tagsData).length > 0 ? tagsData : {
        "理论": ["1"],
        "入门": ["1"],
        "方法论": ["2"],
        "分析": ["2"],
        "实践": ["3"],
        "策略": ["3"]
    };
}

// 获取随机章节（不重复）
export function getRandomChapters(count: number = 3): Chapter[] {
    const availableChapters = chaptersData.length > 0 ? chaptersData : defaultChapters;
    const shuffled = [...availableChapters].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 根据标签获取章节
export function getChaptersByTag(tag: string): Chapter[] {
    const chapterIds = tagsData[tag] || [];
    return chaptersData.filter(chapter => chapterIds.includes(chapter.id)) ||
        defaultChapters.filter(chapter => {
            return chapter.tags.includes(tag);
        });
}

// 搜索章节
export function searchChapters(query: string): Chapter[] {
    if (!query || query.trim() === '') {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const availableChapters = chaptersData.length > 0 ? chaptersData : defaultChapters;

    return availableChapters.filter(chapter =>
        chapter.title.toLowerCase().includes(normalizedQuery) ||
        chapter.content.toLowerCase().includes(normalizedQuery)
    );
} 