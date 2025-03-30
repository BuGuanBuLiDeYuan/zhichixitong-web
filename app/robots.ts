import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',      // 禁止抓取API路径
                '/admin/',    // 禁止抓取后台管理路径
                '/_next/',    // 禁止抓取Next.js内部文件
                '/private/',  // 禁止抓取私有内容
            ],
        },
        sitemap: 'https://zhichixitong.com/sitemap.xml',
        host: 'https://zhichixitong.com',
    }
} 