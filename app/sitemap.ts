import { MetadataRoute } from 'next'
import { getAllChapters, getAllTags } from '../lib/chapters'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zhichixitong.support'
    const currentDate = new Date()

    // 主要页面 - 按重要性和更新频率排序
    const mainPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/chapters`,
            lastModified: currentDate,
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date('2024-12-01'),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/download`,
            lastModified: new Date('2024-12-15'),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date('2024-12-10'),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tags`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.6,
        },
    ]

    // 获取所有章节页面 - 根据内容质量设置优先级
    const chapters = getAllChapters()
    const chapterPages = chapters.map((chapter, index) => {
        // 核心章节优先级更高
        const isCoreChapter = chapter.tags?.includes('支持系统') ||
            chapter.title.includes('支持系统') ||
            index < 20; // 前20篇文章

        return {
            url: `${baseUrl}/chapter/${chapter.id}`,
            lastModified: chapter.lastModified ? new Date(chapter.lastModified) : new Date('2024-01-01'),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: isCoreChapter ? 0.8 : 0.6,
        }
    })

    // 获取所有标签页面 - 热门标签优先级更高
    const tags = getAllTags()
    const popularTags = ['支持系统', '自我成长', '人际关系', '职业发展', '心理健康'];
    const tagPages = Object.keys(tags).map((tag) => {
        const isPopularTag = popularTags.includes(tag);
        const articleCount = tags[tag].length;

        return {
            url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: isPopularTag ? 0.7 : Math.min(0.5 + (articleCount * 0.05), 0.6),
        }
    })

    // 按优先级排序
    const allPages = [...mainPages, ...chapterPages, ...tagPages]
        .sort((a, b) => b.priority - a.priority);

    return allPages;
} 