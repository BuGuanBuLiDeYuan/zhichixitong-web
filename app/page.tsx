import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import type { Metadata } from 'next';
import { type Chapter, getAllChapters } from '@/lib/chapters';
import ChapterCard from '../components/ui/ChapterCard';
import { metadata as homeMetadata } from './metadata';

export const metadata: Metadata = homeMetadata;

export default function Home() {
    const allChapters = getAllChapters();
    const chapters: Chapter[] = allChapters.slice(0, 3);
    const totalChapters = allChapters.length;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': 'https://zhichixitong.support/#website',
                name: '支持系统',
                url: 'https://zhichixitong.support',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://zhichixitong.support/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                }
            },
            {
                '@type': 'Organization',
                '@id': 'https://zhichixitong.support/#organization',
                name: '支持系统',
                url: 'https://zhichixitong.support',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://zhichixitong.support/icon.png'
                }
            },
            {
                '@type': 'Book',
                '@id': 'https://zhichixitong.support/#book',
                name: '支持系统理论',
                author: {
                    '@type': 'Person',
                    name: '刘明'
                },
                inLanguage: 'zh-CN',
                numberOfPages: totalChapters,
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url: 'https://zhichixitong.support/download'
                }
            }
        ]
    };

    return (
        <>
            <Script id="schema-data-home" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
            <div className="page-container">
                <section className="hero-section">
                    <div className="container">
                        <div className="hero-svg-background">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="hero-wave">
                                <path fill="rgba(255,255,255,0.05)" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="hero-wave hero-wave-2">
                                <path fill="rgba(255,255,255,0.08)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <div className="hero-container">
                            <h1 className="hero-title">用好支持系统，加速人生起飞</h1>
                            <p className="hero-subtitle">探索支持系统理论，构建个人成长网络，突破人生瓶颈</p>
                            <div className="hero-buttons">
                                <Link href="/chapters" className="primary-button">开始阅读</Link>
                                <Link href="/download" className="secondary-button">免费下载电子版</Link>
                                <Link href="/shop" className="secondary-button">购买纸质版</Link>
                            </div>
                        </div>
                        <div className="hero-tech-circles">
                            <div className="tech-circle tech-circle-1"></div>
                            <div className="tech-circle tech-circle-2"></div>
                            <div className="tech-circle tech-circle-3"></div>
                        </div>
                    </div>
                </section>

                <section className="intro-section">
                    <div className="container">
                        <h2 className="section-title">什么是支持系统?</h2>
                        <p className="intro-text">
                            支持系统是一种思想框架，帮助你识别和构建周围的支持网络，使你能够更好地应对挑战，实现个人成长。通过有效利用支持系统，你可以加速实现目标，突破边界，达成自我价值。
                        </p>

                        <div className="feature-grid">
                            <div className="feature-card">
                                <div className="feature-number">1</div>
                                <h3 className="feature-title">识别支持系统</h3>
                                <p className="feature-description">了解你已有的支持网络，评估其强度与弱点，找出需要加强的领域。</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-number">2</div>
                                <h3 className="feature-title">构建支持系统</h3>
                                <p className="feature-description">有策略地扩展你的支持网络，建立互惠关系，创造更多可能性。</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-number">3</div>
                                <h3 className="feature-title">运用支持系统</h3>
                                <p className="feature-description">学习如何有效地利用你的支持网络，实现个人与职业目标。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="recommended-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="heading-lg">今日推荐</h2>
                            <Link href="/chapters" className="view-all-link">
                                查看全部 {totalChapters} 篇文章 →
                            </Link>
                        </div>

                        <div className="chapters-grid">
                            {chapters.map((chapter) => (
                                <ChapterCard
                                    key={chapter.id}
                                    id={chapter.id}
                                    title={chapter.title}
                                    excerpt={chapter.excerpt}
                                    readTime={chapter.readTime}
                                    tags={chapter.tags}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="donation-section">
                    <div className="container">
                        <div className="donation-container">
                            <div className="donation-header">
                                <h2 className="donation-title">欢迎打赏支持</h2>
                                <p className="donation-subtitle">
                                    我们做了这个网站分享支持系统理论，所有内容版权都属于作者刘明。
                                    如果您觉得内容对您有所帮助，欢迎通过加密货币打赏支持我们继续创作。
                                </p>
                            </div>

                            <div className="wallet-addresses">
                                <div className="wallet-card">
                                    <div className="wallet-qr">
                                        <Image src="/images/evm-qr.jpg" alt="EVM 打赏二维码" width={150} height={150} />
                                    </div>
                                    <div className="wallet-info">
                                        <p className="wallet-note">
                                            EVM 地址，支持 ETH、USDT 和其他 ERC-20 代币
                                        </p>
                                    </div>
                                </div>

                                <div className="wallet-card">
                                    <div className="wallet-qr">
                                        <div className="qr-placeholder">
                                            <div className="qr-image">
                                                <Image src="/images/sol-qr.JPG" alt="SOL 打赏二维码" width={150} height={150} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wallet-info">
                                        <p className="wallet-note">
                                            SOL 地址，支持 SOL 和其他 SPL 代币
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
