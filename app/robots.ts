import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // 禁止抓取API路径
                    '/admin/',         // 禁止抓取后台管理路径
                    '/_next/',         // 禁止抓取Next.js内部文件
                    '/private/',       // 禁止抓取私有内容
                    '/tmp_*/',         // 禁止抓取临时文件
                    '/*.json$',        // 禁止抓取JSON文件
                    '/search?*',       // 禁止抓取搜索结果页面
                ],
                crawlDelay: 1,
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/private/',
                    '/tmp_*/',
                ],
                crawlDelay: 0,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/private/',
                    '/tmp_*/',
                ],
                crawlDelay: 1,
            }
        ],
        sitemap: 'https://zhichixitong.support/sitemap.xml',
        host: 'https://zhichixitong.support',
    }
} 