import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownTrayIcon, BookOpenIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import Script from 'next/script';

export const metadata: Metadata = {
    title: '下载电子版 - 支持系统',
    description: '免费下载支持系统理论的电子版，包括PDF打印版、EPUB微信读书版等多种格式，随时随地学习成长，获取200篇完整文章。',
    keywords: '支持系统电子书, PDF下载, EPUB电子书, 免费电子书, 个人成长, 微信读书导入, 支持系统理论',
    alternates: {
        canonical: 'https://zhichixitong.com/download',
    },
    openGraph: {
        title: '免费下载支持系统理论电子书 - PDF与EPUB格式',
        description: '获取支持系统理论完整电子书，提供多种格式选择，包含200篇系统性文章，帮助你构建个人成长网络。',
        url: 'https://zhichixitong.com/download',
        type: 'website',
        images: [
            {
                url: '/images/ebook-cover.jpg',
                width: 1200,
                height: 630,
                alt: '支持系统理论电子书封面',
            }
        ],
    },
};

// 电子书选项
const downloadOptions = [
    {
        title: 'PDF 标准版',
        description: '适合在电脑或平板上阅读的PDF格式',
        icon: <BookOpenIcon className="download-icon" />,
        features: [
            '完整收录200篇文章',
            'A4尺寸，清晰排版',
            '可在任何设备上阅读',
            '适合打印成纸质版',
            '文件大小：12.5MB',
        ],
        button: '下载 PDF 标准版',
        fileName: '支持系统理论_刘明_2025_zhichixitong.support网站_标准版.pdf'
    },
    {
        title: 'EPUB 阅读版',
        description: '适合导入微信读书、Kindle等阅读器',
        icon: <DevicePhoneMobileIcon className="download-icon" />,
        features: [
            '完整收录200篇文章',
            '适合手机和阅读器',
            '可直接导入微信读书',
            '支持字体大小调整',
            '文件大小：8.3MB',
        ],
        button: '下载 EPUB 版本',
        fileName: '支持系统理论_刘明_2025_zhichixitong.support网站.epub'
    },
    {
        title: 'PDF 打印优化版',
        description: '专为打印设计的优化版本',
        icon: <ArrowDownTrayIcon className="download-icon" />,
        features: [
            '完整收录200篇文章',
            '双面打印优化布局',
            '减少墨水使用量',
            '包含打印指南',
            '文件大小：14.7MB',
        ],
        button: '下载打印优化版',
        fileName: '支持系统理论_刘明_2025_zhichixitong.support网站_打印版.pdf'
    },
];

export default function DownloadPage() {
    // JSON-LD结构化数据
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': '支持系统理论电子书下载',
        'description': '免费下载支持系统理论的电子版，包括PDF与EPUB格式，随时随地学习成长。',
        'publisher': {
            '@type': 'Organization',
            'name': '支持系统团队',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://zhichixitong.com/logo.png'
            }
        },
        'offers': downloadOptions.map(option => ({
            '@type': 'Offer',
            'name': option.title,
            'description': option.description,
            'price': '0',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': `https://zhichixitong.com/downloads/${option.fileName}`
        }))
    };

    return (
        <>
            <Script id="schema-data-download" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
            <div className="download-page">
                {/* 顶部背景元素 */}
                <div className="download-hero">
                    <div className="hero-overlay">
                        <div className="tech-circle tech-circle-1"></div>
                        <div className="tech-circle tech-circle-2"></div>
                        <div className="connection-line line-1"></div>
                        <div className="connection-line line-2"></div>
                    </div>
                    <div className="container">
                        {/* 页面标题 */}
                        <div className="download-header">
                            <h1 className="download-title">下载电子版</h1>
                            <p className="download-subtitle">
                                获取支持系统理论的多种电子版本，随时随地学习成长
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="download-content">
                        {/* 下载选项 */}
                        <div className="download-options-section">
                            <h2 className="section-title">选择格式</h2>
                            <p className="section-intro">我们提供多种格式的电子版，选择最适合您阅读习惯的版本</p>

                            <div className="download-options-grid">
                                {downloadOptions.map((option) => (
                                    <div key={option.title} className="download-option-card">
                                        <div className="download-option-icon">
                                            {option.icon}
                                        </div>
                                        <div className="download-option-content">
                                            <h3 className="download-option-title">{option.title}</h3>
                                            <p className="download-option-description">{option.description}</p>

                                            <ul className="download-option-features">
                                                {option.features.map((feature) => (
                                                    <li key={feature} className="download-feature">
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <a
                                                href={`/downloads/${option.fileName}`}
                                                download
                                                className="download-button"
                                            >
                                                {option.button}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 使用说明 */}
                        <div className="usage-section">
                            <h2 className="section-title">使用指南</h2>
                            <div className="usage-content">
                                <div className="usage-item">
                                    <h3 className="usage-title">如何在微信读书中导入EPUB</h3>
                                    <ol className="usage-steps">
                                        <li>下载EPUB文件到您的设备</li>
                                        <li>打开微信读书应用</li>
                                        <li>点击"书架"底部的"+"按钮</li>
                                        <li>选择"导入本地图书"</li>
                                        <li>找到并选择下载的EPUB文件</li>
                                    </ol>
                                </div>

                                <div className="usage-item">
                                    <h3 className="usage-title">PDF打印建议</h3>
                                    <ol className="usage-steps">
                                        <li>使用双面打印可节约纸张</li>
                                        <li>建议选择A4纸张</li>
                                        <li>打印优化版已调整边距和对比度</li>
                                        <li>可选择黑白打印以节约墨水</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* 版权声明 */}
                        <div className="copyright-section">
                            <h2 className="section-title">版权声明</h2>
                            <div className="copyright-content">
                                <p className="copyright-text">
                                    本电子书仅供个人学习使用，版权归作者所有。未经许可，不得用于商业用途或公开传播。
                                    下载本电子书即表示您同意遵守以上版权条款。
                                </p>
                                <p className="copyright-text">
                                    如需获得更好的阅读体验，推荐购买精装纸质版，包含额外的学习资料和实践指南。
                                    <Link href="/shop" className="copyright-link">查看纸质版详情</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 