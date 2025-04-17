import { Metadata } from 'next';
import { CheckIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: '购买 NFT，送《支持系统理论》打印版',
    description: '购买支持系统理论精装纸质版，收录完整的211篇文章，大陆地区包邮，优惠多多。',
};

// 价格选项
const pricingOptions = [
    {
        title: '电子版',
        price: '0',
        originalPrice: '39.99',
        features: [
            '随意复制粘贴',
            '随时随地阅读',
            'PDF 和 EPUB 格式任选',
        ],
        cta: <a href="/download">立即下载</a>,
        recommended: false,
    },
    {
        title: '1 本（一帆风顺）',
        price: '29.99',
        originalPrice: '39.99',
        features: [
            '精装纸质版',
            '收录211篇完整文章',
            '大陆地区包邮',
        ],
        cta: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGrZITiM1DxWaC5iS8GzmKaFOocRmEIQ6H95LNOTXCbTUUIg/viewform?usp=dialog">立即购买</a>,
        recommended: false,
    },
    {
        title: '2 本（好事成双）',
        price: '53.99',
        originalPrice: '79.98',
        features: [
            '2本精装纸质版',
            '收录211篇完整文章',
            '大陆地区包邮',
        ],
        cta: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGrZITiM1DxWaC5iS8GzmKaFOocRmEIQ6H95LNOTXCbTUUIg/viewform?usp=dialog">立即购买</a>,
        recommended: true,
    },
    {
        title: '10 本（十全十美）',
        price: '199.99',
        originalPrice: '399.90',
        features: [
            '10本精装纸质版',
            '收录200篇完整文章',
            '大陆地区包邮',
            '精美书签',
            '专属交流群',
        ],
        cta: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGrZITiM1DxWaC5iS8GzmKaFOocRmEIQ6H95LNOTXCbTUUIg/viewform?usp=dialog">团购购买</a>,
        recommended: false,
    },
    {
        title: '作者签名版',
        price: '1999',
        originalPrice: '2999',
        features: [
            '精装纸质版',
            '收录211篇完整文章',
            '大陆地区包邮',
            '精美书签',
            '专属交流群',
            '作者亲笔签名',
            '1小时作者1v1交流',
        ],
        cta: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGrZITiM1DxWaC5iS8GzmKaFOocRmEIQ6H95LNOTXCbTUUIg/viewform?usp=dialog">限量发售</a>,
        recommended: false,
    }
];

export default function ShopPage() {
    return (
        <div className="shop-page">
            {/* 顶部背景元素 */}
            <div className="shop-hero">
                <div className="hero-overlay">
                    <div className="tech-circle tech-circle-1"></div>
                    <div className="tech-circle tech-circle-2"></div>
                    <div className="connection-line line-1"></div>
                    <div className="connection-line line-2"></div>
                </div>
                <div className="container">
                    {/* 页面标题 */}
                    <div className="shop-header">
                        <h1 className="shop-title">购买纸质书</h1>
                        <p className="shop-subtitle">
                            收藏《支持系统理论》精装纸质版，随时翻阅211篇深度好文，助你加速人生起飞
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="shop-content">
                    {/* 价格选项卡 */}
                    <div className="pricing-section">
                        <h2 className="section-title">选择套餐</h2>
                        <p className="section-intro">选择最适合您的价格方案，所有套餐均含精美包装和快递配送</p>

                        <div className="pricing-grid">
                            {pricingOptions.map((option) => (
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

                                    <button className={`pricing-button ${option.recommended ? 'recommended-button' : ''}`}>
                                        {option.cta}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 购买说明 */}
                    <div className="purchase-info-section">
                        <h2 className="section-title">购买说明</h2>
                        <div className="purchase-info-content">
                            <div className="info-item">
                                <h3 className="info-title">支付方式</h3>
                                <p className="info-text">
                                    目前支持USDT支付（TRC20网络），支付完成后请联系客服提供交易哈希。
                                </p>
                            </div>

                            <div className="info-item">
                                <h3 className="info-title">配送说明</h3>
                                <p className="info-text">
                                    大陆地区包邮，通常3-7个工作日送达。海外配送请联系客服获取详细信息。
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* 常见问题 */}
                    <div className="faq-section">
                        <h2 className="section-title">常见问题</h2>
                        <div className="faq-grid">
                            <div className="faq-item">
                                <h3 className="faq-question">纸质书与网站内容有什么区别？</h3>
                                <p className="faq-answer">
                                    纸质书收录了网站上的全部200篇文章，但经过专业编辑润色和重新排版，阅读体验更佳。
                                </p>
                            </div>

                            <div className="faq-item">
                                <h3 className="faq-question">如何确认订单和跟踪物流？</h3>
                                <p className="faq-answer">
                                    付款成功后，我们将通过电子邮件发送订单确认信息。书籍发货后，您将收到包含物流跟踪号的发货通知。
                                </p>
                            </div>

                            <div className="faq-item">
                                <h3 className="faq-question">海外地区如何购买？</h3>
                                <p className="faq-answer">
                                    其实海内外的用户都可以下载电子版自己打印……本网站提供了PDF和EPUB格式。
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 