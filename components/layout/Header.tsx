'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Logo from '../../app/components/Logo';
import { useTheme } from '../../app/context/ThemeContext';

const navigation = [
    { name: '首页', href: '/' },
    { name: '全文', href: '/chapters' },
    { name: '搜索', href: '/search' },
    { name: '下载', href: '/download' },
    { name: '购买', href: '/shop' },
    { name: '关于', href: '/about' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <nav className="nav-container" aria-label="Global">
                <div className="header-content">
                    <div className="logo-container">
                        <Link href="/" className="logo-link">
                            <Logo />
                        </Link>
                    </div>

                    <div className="mobile-menu-button">
                        <button
                            type="button"
                            className="icon-button"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only"></span>
                            <Bars3Icon className="icon" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="desktop-nav">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="nav-link"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="theme-toggle-desktop">
                        <button
                            onClick={toggleTheme}
                            className="theme-button"
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="icon" />
                            ) : (
                                <MoonIcon className="icon" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 移动端菜单 */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mobile-menu-overlay"
                >
                    <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
                    <div className="mobile-menu-container">
                        <div className="mobile-menu-header">
                            <Link href="/" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
                                <Logo />
                            </Link>
                            <button
                                type="button"
                                className="close-button"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">关闭菜单</span>
                                <XMarkIcon className="icon" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mobile-menu-content">
                            <div className="mobile-nav-container">
                                <div className="mobile-nav-links">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="mobile-nav-link"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mobile-nav-footer">
                                    <button
                                        onClick={() => {
                                            toggleTheme();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="mobile-theme-toggle"
                                    >
                                        {theme === 'dark' ? (
                                            <>
                                                <SunIcon className="icon" />
                                                切换到亮色模式
                                            </>
                                        ) : (
                                            <>
                                                <MoonIcon className="icon" />
                                                切换到暗色模式
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
} 