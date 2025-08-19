import { NextResponse } from 'next/server';
import { getAllChapters } from '../../lib/chapters';

export async function GET() {
    const baseUrl = 'https://zhichixitong.support';
    const chapters = getAllChapters();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${chapters.map(chapter => {
        const lastModified = chapter.lastModified || '2024-01-01';
        const imageUrl = chapter.image || `${baseUrl}/images/chapter-${chapter.id}.jpg`;

        return `    <url>
        <loc>${baseUrl}/chapter/${chapter.id}</loc>
        <lastmod>${new Date(lastModified).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        <image:image>
            <image:loc>${imageUrl}</image:loc>
            <image:title>${chapter.title}</image:title>
            <image:caption>${chapter.excerpt || chapter.title}</image:caption>
        </image:image>
        <news:news>
            <news:publication>
                <news:name>支持系统</news:name>
                <news:language>zh</news:language>
            </news:publication>
            <news:publication_date>${new Date(lastModified).toISOString()}</news:publication_date>
            <news:title>${chapter.title}</news:title>
            <news:keywords>${chapter.tags?.join(', ') || '支持系统,个人成长'}</news:keywords>
        </news:news>
    </url>`;
    }).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}