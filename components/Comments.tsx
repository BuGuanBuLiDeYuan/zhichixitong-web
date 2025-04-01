'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../app/context/ThemeContext';
import Giscus from '@giscus/react';

export default function Comments() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 防止服务器端渲染不匹配
    useEffect(() => {
        setMounted(true);
    }, []);

    // 根据当前主题确定Giscus主题
    const giscusTheme = theme === 'dark' ? 'dark_high_contrast' : 'light_high_contrast';

    if (!mounted) return null;

    return (
        <Giscus
            repo="BuGuanBuLiDeYuan/zhichixitong-web"
            repoId="R_kgDOORJVsg"
            category="Announcements"
            categoryId="DIC_kwDOORJVss4CoqXl"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={giscusTheme}
            lang="zh-CN"
            loading="lazy"
        />
    );
} 