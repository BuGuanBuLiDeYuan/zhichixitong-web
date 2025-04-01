'use client';

import Link from 'next/link';
import Logo from '../../app/components/Logo';
import dynamic from 'next/dynamic';

// 动态导入访客计数器组件，避免服务器渲染问题
const VisitorCounter = dynamic(() => import('../VisitorCounter'), { ssr: false });

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="logo-container">
                            <Link href="/" className="logo-link">
                                <Logo />
                            </Link>
                        </div>
                        <p className="site-description">
                            用好支持系统，加速人生起飞。探索构建个人支持系统的方法，以简单易行而超出想象的方法，帮助你实现成长与突破。
                        </p>
                    </div>

                    <div className="footer-nav">
                        <h3 className="footer-heading">
                            导航
                        </h3>
                        <ul className="footer-links">
                            <li>
                                <Link href="/" className="footer-link">
                                    首页
                                </Link>
                            </li>
                            <li>
                                <Link href="/chapters" className="footer-link">
                                    全部章节
                                </Link>
                            </li>
                            <li>
                                <Link href="/tags" className="footer-link">
                                    标签浏览
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h3 className="footer-heading">
                            相关链接
                        </h3>
                        <ul className="footer-links">
                            <li>
                                <Link href="/shop" className="footer-link">
                                    购买NFT送纸质版
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="footer-link">
                                    关于本站
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#contact" className="footer-link">
                                    联系我们
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p className="copyright-text">
                        &copy; {new Date().getFullYear()} 支持系统. 保留所有权利.
                    </p>
                    <VisitorCounter />
                </div>
            </div>
        </footer>
    );
} 