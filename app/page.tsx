'use client';

import Link from 'next/link';
import { getAllChapters } from '../lib/chapters';
import ChapterCard from '../components/ui/ChapterCard';
import Script from 'next/script';
import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';

export default function Home() {
    // 使用useState和useEffect确保客户端渲染一致性
    const [isClient, setIsClient] = useState(false);

    // 在客户端加载完成后设置isClient为true
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 获取章节 - 使用固定的前3篇文章，而不是随机章节，避免水合错误
    const allChapters = getAllChapters();
    const featuredChapters = allChapters.slice(0, 3);
    // 获取总章节数
    const totalChapters = allChapters.length;

    // 预先计算星星位置，避免服务器和客户端渲染不一致
    const starPositions = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
            animationDelay: `${(i * 0.1) % 5}s`,
            animationDuration: `${3 + (i * 0.3) % 7}s`
        }));
    }, []);

    // 预先计算连接线位置
    const linePositions = useMemo(() => {
        return Array.from({ length: 10 }).map((_, i) => ({
            left: `${(i * 10) % 100}%`,
            top: `${(i * 9) % 100}%`,
            width: `${50 + (i * 15) % 150}px`,
            transform: `rotate(${(i * 36) % 360}deg)`,
            animationDelay: `${(i * 0.5) % 5}s`
        }));
    }, []);

    // JSON-LD结构化数据
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': '支持系统',
        'url': 'https://zhichixitong.com',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://zhichixitong.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        },
        'description': '学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞',
        'publisher': {
            '@type': 'Organization',
            'name': '支持系统团队',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://zhichixitong.com/logo.png'
            }
        },
        'mainEntity': {
            '@type': 'Book',
            'name': '支持系统理论',
            'author': {
                '@type': 'Person',
                'name': '支持系统团队'
            },
            'numberOfPages': totalChapters,
            'offers': {
                '@type': 'Offer',
                'price': '19.99',
                'priceCurrency': 'USD',
                'availability': 'https://schema.org/InStock'
            }
        }
    };

    return (
        <>
            <Script id="schema-data" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
            <div className="page-container">
                {/* 英雄区域 */}
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
                        <div className="hero-constellation">
                            {isClient && starPositions.map((style, i) => (
                                <div key={i} className="star" style={style}></div>
                            ))}
                            {isClient && linePositions.map((style, i) => (
                                <div key={i + 'line'} className="connection-line" style={style}></div>
                            ))}
                        </div>
                        <div className="hero-container">
                            <h1 className="hero-title">用好支持系统，加速人生起飞</h1>
                            <p className="hero-subtitle">探索支持系统理论，构建个人成长网络，突破人生瓶颈</p>
                            <div className="hero-buttons">
                                <Link href="/chapters" className="primary-button">开始阅读</Link>
                                <Link href="/download" className="secondary-button">下载电子版</Link>
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

                {/* 简介区域 */}
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

                {/* 每日推荐 */}
                <section className="recommended-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="heading-lg">今日推荐</h2>
                            <Link href="/chapters" className="view-all-link">
                                查看全部 {totalChapters} 篇文章 →
                            </Link>
                        </div>

                        <div className="chapters-grid">
                            {featuredChapters.map((chapter) => (
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

                {/* 打赏区域 */}
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
                                        <Image src="/images/evm-qr.jpg" alt="evm QR Code" width={150} height={150} />
                                    </div>
                                    <div className="wallet-info">
                                        <p className="wallet-note">
                                            EVM 地址，支持ETH、USDT和其他ERC-20代币
                                        </p>
                                    </div>
                                </div>

                                <div className="wallet-card">
                                    <div className="wallet-qr">
                                        <div className="qr-placeholder">
                                            <div className="qr-image">
                                                <Image src="/images/sol-qr.JPG" alt="SOL QR Code" width={150} height={150} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wallet-info">
                                        <p className="wallet-note">
                                            SOL 地址，支持SOL和其他SPL代币
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