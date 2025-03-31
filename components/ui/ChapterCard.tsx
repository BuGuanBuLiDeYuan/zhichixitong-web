'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';

type ChapterCardProps = {
    id: string;
    title: string;
    excerpt: string;
    readTime: number;
    tags: string[];
};

export default function ChapterCard({ id, title, excerpt, readTime, tags }: ChapterCardProps) {
    // 标签点击跟踪
    const handleTagClick = useCallback((tag: string) => {
        // 这里可以添加标签点击统计逻辑，例如使用谷歌分析或自定义事件跟踪
        console.log(`Tag clicked: ${tag}`);
    }, []);

    // 确保章节ID始终是3位数（仅用于显示）
    const formattedId = id.padStart(3, '0');

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="chapter-card"
        >
            <div className="chapter-card-content">
                <div className="chapter-meta">
                    <span className="chapter-id">
                        {formattedId}
                    </span>
                    <span className="read-time">
                        <ClockIcon className="icon-small" />
                        <span>{readTime} 分钟阅读</span>
                    </span>
                </div>

                <Link href={`/chapter/${id}`} className="chapter-title-link">
                    <h3 className="chapter-title">
                        {title}
                    </h3>
                </Link>

                <p className="chapter-excerpt">
                    {excerpt}
                </p>

                <div className="chapter-tags">
                    {tags.slice(0, 3).map((tag) => (
                        <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag} onClick={() => handleTagClick(tag)}>
                            <span className="tag">
                                {tag}
                            </span>
                        </Link>
                    ))}
                    {tags.length > 3 && (
                        <span className="tag-more">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
} 