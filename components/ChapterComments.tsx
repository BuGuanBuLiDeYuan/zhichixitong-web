'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// 动态导入Giscus组件
const GiscusComments = dynamic(
    () => import('./Comments'),
    { ssr: false, loading: () => <div className="text-center py-6">正在加载评论区...</div> }
);

export default function ChapterComments() {
    return (
        <div className="comments-section mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">读者评论。留言分享也是打造支持系统的一部分。</h3>
            <GiscusComments />
        </div>
    );
} 