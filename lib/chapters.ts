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

// 导入实际数据
import chaptersDataRaw from '../public/data/chapters.json';
import tagsDataRaw from '../public/data/tags.json';

// 类型转换
const chaptersData: Chapter[] = chaptersDataRaw as Chapter[];
const tagsData: Record<string, string[]> = tagsDataRaw as Record<string, string[]>;

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