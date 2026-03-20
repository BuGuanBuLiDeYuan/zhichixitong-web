import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CheckIcon } from '@heroicons/react/24/outline';

const ORDER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdGrZITiM1DxWaC5iS8GzmKaFOocRmEIQ6H95LNOTXCbTUUIg/viewform?usp=dialog';

export const metadata: Metadata = {
    title: '购买纸质版 - 支持系统',
    description: '购买《支持系统理论》纸质版，完整收录 200+ 篇文章。支持多档套餐，提交表单后完成支付与发货信息确认。',
    alternates: {
        canonical: 'https://zhichixitong.support/shop',
    },
    openGraph: {
        title: '购买《支持系统理论》纸质版',
        description: '完整收录 200+ 篇文章，支持多档购买套餐。',
        url: 'https://zhichixitong.support/shop',
        type: 'website',
        images: ['https://zhichixitong.support/images/twitter-card.png'],
    },
};

const pricingOptions = [
    {
        title: '电子版',
        price: '0',
        originalPrice: '39.99',
        features: ['随意复制粘贴', '随时随地阅读', 'PDF 和 EPUB 格式任选'],
        href: '/download',
        ctaLabel: '立即下载',
        recommended: false,
    },
    {
        title: '1 本（一帆风顺）',
        price: '29.99',
        originalPrice: '39.99',
        features: ['精装纸质版', '收录 200+ 篇完整文章', '大陆地区包邮'],
        href: ORDER_FORM_URL,
        ctaLabel: '立即购买',
        recommended: false,
    },
    {
        title: '2 本（好事成双）',
        price: '53.99',
        originalPrice: '79.98',
        features: ['2 本精装纸质版', '收录 200+ 篇完整文章', '大陆地区包邮'],
        href: ORDER_FORM_URL,
        ctaLabel: '立即购买',
        recommended: true,
    },
    {
        title: '10 本（十全十美）',
        price: '199.99',
        originalPrice: '399.90',
        features: ['10 本精装纸质版', '收录 200+ 篇完整文章', '大陆地区包邮', '精美书签', '专属交流群'],
        href: ORDER_FORM_URL,
        ctaLabel: '团购购买',
        recommended: false,
    },
    {
        title: '作者签名版',
        price: '1999',
        originalPrice: '2999',
        features: ['精装纸质版', '收录 200+ 篇完整文章', '大陆地区包邮', '精美书签', '专属交流群', '作者亲笔签名', '1 小时作者 1v1 交流'],
        href: ORDER_FORM_URL,
        ctaLabel: '限量发售',
        recommended: false,
    }
];

export default function ShopPage() {
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: '支持系统理论纸质版',
        description: '完整收录 200+ 篇支持系统理论文章的纸质版合集。',
        brand: {
            '@type': 'Brand',
            name: '支持系统',
        },
        offers: pricingOptions
            .filter((item) => item.title !== '电子版')
            .map((item) => ({
                '@type': 'Offer',
                price: item.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: item.href,
                name: item.title,
            })),
    };

    return (
        <>
            <Script id="schema-data-shop" type="application/ld+json">
                {JSON.stringify(productJsonLd)}
            </Script>
            <div className="shop-page">
                <div className="shop-hero">
                    <div className="hero-overlay">
                        <div className="tech-circle tech-circle-1"></div>
                        <div className="tech-circle tech-circle-2"></div>
                        <div className="connection-line line-1"></div>
                        <div className="connection-line line-2"></div>
                    </div>
                    <div className="container">
                        <div className="shop-header">
                            <h1 className="shop-title">购买纸质书</h1>
                            <p className="shop-subtitle">
                                收藏《支持系统理论》精装纸质版，系统阅读 200+ 篇深度文章
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="shop-content">
                        <div className="pricing-section">
                            <h2 className="section-title">选择套餐</h2>
                            <p className="section-intro">提交订单信息后，我们会联系您确认支付与发货细节</p>

                            <div className="pricing-grid">
                                {pricingOptions.map((option) => {
                                    const isExternal = option.href.startsWith('http');

                                    return (
                                        <div
                                            key={option.title}
                                            className={`pricing-card ${option.recommended ? 'recommended-card' : ''}`}
                                        >
                                            {option.recommended && (
                                                <div className="recommended-badge">最受欢迎</div>
                                            )}

                                            <div className="pricing-header">
                                                <h3 className="pricing-title">{option.title}</h3>
                                                <div className="pricing-price-container">
                                                    <div className="pricing-price">
                                                        <span className="currency">USDT</span>
                                                        <span className="amount">{option.price}</span>
                                                    </div>
                                                    <div className="pricing-original">
                                                        <s>{option.originalPrice} USDT</s>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="pricing-features">
                                                {option.features.map((feature) => (
                                                    <li key={feature} className="pricing-feature">
                                                        <CheckIcon className="feature-icon" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {isExternal ? (
                                                <a
                                                    className={`pricing-button ${option.recommended ? 'recommended-button' : ''}`}
                                                    href={option.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {option.ctaLabel}
                                                </a>
                                            ) : (
                                                <Link
                                                    className={`pricing-button ${option.recommended ? 'recommended-button' : ''}`}
                                                    href={option.href}
                                                >
                                                    {option.ctaLabel}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="purchase-info-section">
                            <h2 className="section-title">购买说明</h2>
                            <div className="purchase-info-content">
                                <div className="info-item">
                                    <h3 className="info-title">支付方式</h3>
                                    <p className="info-text">
                                        目前支持 USDT 支付（TRC20 网络），提交表单后请按页面提示联系客服确认交易哈希。
                                    </p>
                                </div>

                                <div className="info-item">
                                    <h3 className="info-title">配送说明</h3>
                                    <p className="info-text">
                                        大陆地区包邮，通常 3-7 个工作日送达。海外配送请先联系客服确认运费与时效。
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="faq-section">
                            <h2 className="section-title">常见问题</h2>
                            <div className="faq-grid">
                                <div className="faq-item">
                                    <h3 className="faq-question">纸质书与网站内容有什么区别？</h3>
                                    <p className="faq-answer">
                                        纸质书收录了网站核心文章，并进行统一编排和排版，适合长时间深度阅读。
                                    </p>
                                </div>

                                <div className="faq-item">
                                    <h3 className="faq-question">如何确认订单和跟踪物流？</h3>
                                    <p className="faq-answer">
                                        付款确认后，我们将通过您填写的联系方式发送订单确认信息。发货后会同步物流信息。
                                    </p>
                                </div>

                                <div className="faq-item">
                                    <h3 className="faq-question">海外地区如何购买？</h3>
                                    <p className="faq-answer">
                                        海外用户可优先下载电子版自行打印，或通过表单留言咨询国际配送方案。
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
