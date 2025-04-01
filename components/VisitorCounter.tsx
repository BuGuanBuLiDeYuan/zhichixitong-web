'use client';

import { useEffect } from 'react';

export default function VisitorCounter() {
    useEffect(() => {
        // 防止重复加载
        if (document.getElementById('counter-dev-script')) return;

        const script = document.createElement('script');
        script.id = 'counter-dev-script';
        script.src = 'https://cdn.counter.dev/script.js';
        script.setAttribute('data-id', 'f6eb4a83-6b33-4fa7-9607-a5ba9a61bf31');
        script.setAttribute('data-utcoffset', '8');
        script.async = true;

        document.body.appendChild(script);

        return () => {
            // 清理函数
            const scriptElement = document.getElementById('counter-dev-script');
            if (scriptElement) document.body.removeChild(scriptElement);
        };
    }, []);

    return (
        <div className="visitor-counter">
            <span className="counter-text">访客统计由 </span>
            <a
                href="https://counter.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="counter-link"
            >
                Counter.dev
            </a>
            <span className="counter-text"> 提供</span>
        </div>
    );
} 