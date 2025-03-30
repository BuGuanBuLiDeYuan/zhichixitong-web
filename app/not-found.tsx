import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-xl px-4">
                <h1 className="heading-xl mb-6">404 - 页面未找到</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    抱歉，您访问的页面不存在或已被移除。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/" className="btn-primary">
                        返回首页
                    </Link>
                    <Link href="/chapters" className="btn-accent">
                        浏览全部章节
                    </Link>
                </div>
                <div className="mt-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        "每个人都会迷路，但只有不断前行的人才能找到新的方向。" — 支持系统理论
                    </p>
                </div>
            </div>
        </div>
    );
} 