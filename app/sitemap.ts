import { MetadataRoute } from 'next'
import { getAllChapters, getAllTags } from '../lib/chapters'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zhichixitong.com'

    // 主要页面
    const mainPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/chapters`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tags`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/download`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        },
    ]

    // 获取所有章节页面
    const chapters = getAllChapters()
    const chapterPages = chapters.map((chapter) => ({
        url: `${baseUrl}/chapter/${chapter.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.6,
    }))

    // 获取所有标签页面
    const tags = getAllTags()
    const tagPages = Object.keys(tags).map((tag) => ({
        url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.5,
    }))

    return [...mainPages, ...chapterPages, ...tagPages]
} 