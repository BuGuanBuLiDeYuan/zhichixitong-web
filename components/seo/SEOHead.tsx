import Head from 'next/head';

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    noindex?: boolean;
}

export default function SEOHead({
    title,
    description,
    keywords,
    canonical,
    ogImage = '/images/og-default.jpg',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author = '刘明',
    noindex = false
}: SEOHeadProps) {
    const fullTitle = title.includes('支持系统') ? title : `${title} | 支持系统`;
    const fullCanonical = canonical || `https://zhichixitong.support`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://zhichixitong.support${ogImage}`;

    return (
        <Head>
            {/* 基础SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author} />
            <link rel="canonical" href={fullCanonical} />

            {/* Robots */}
            <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
            <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="支持系统" />
            <meta property="og:locale" content="zh_CN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />
            <meta name="twitter:creator" content="@zhichixitong" />

            {/* Article specific */}
            {ogType === 'article' && (
                <>
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    <meta property="article:author" content={author} />
                    <meta property="article:section" content="个人成长" />
                </>
            )}

            {/* 移动端优化 */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="format-detection" content="telephone=no" />

            {/* DNS预解析 */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />

            {/* 预加载关键资源 */}
            <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        </Head>
    );
}