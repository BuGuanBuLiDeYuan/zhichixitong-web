import { NextResponse } from 'next/server';
import { getAllChapters } from '../../lib/chapters';

export async function GET() {
    const baseUrl = 'https://zhichixitong.support';
    const chapters = getAllChapters();
    const lastmod = new Date('2026-03-20').toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${chapters.map(chapter => {
        const imageUrl = `${baseUrl}/images/twitter-card.png`;

        return `    <url>
        <loc>${baseUrl}/chapter/${chapter.id}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        <image:image>
            <image:loc>${imageUrl}</image:loc>
            <image:title>${chapter.title}</image:title>
            <image:caption>${chapter.excerpt || chapter.title}</image:caption>
        </image:image>
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
