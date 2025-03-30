import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChaptersByTag, getAllTags } from '../../../lib/chapters';
import ChapterCard from '../../../components/ui/ChapterCard';

// 生成静态参数
export async function generateStaticParams() {
    const tags = getAllTags();
    return Object.keys(tags).map((tag) => ({
        tag: tag,
    }));
}

// 动态元数据
export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
    const tag = decodeURIComponent(params.tag);
    const chapters = getChaptersByTag(tag);

    if (chapters.length === 0) {
        return {
            title: '标签未找到 - 支持系统',
        };
    }

    return {
        title: `${tag} - 支持系统标签`,
        description: `浏览支持系统理论中与"${tag}"相关的全部文章，共 ${chapters.length} 篇。`,
    };
}

export default function TagPage({ params }: { params: { tag: string } }) {
    const tag = decodeURIComponent(params.tag);
    const chapters = getChaptersByTag(tag);

    if (chapters.length === 0) {
        notFound();
    }

    // 相关标签（获取所有标签，并排除当前标签）
    const allTags = getAllTags();
    const relatedTags = Object.keys(allTags)
        .filter(t => t !== tag)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    return (
        <div className="py-10">
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-screen-xl mx-auto">
                    {/* 面包屑导航 */}
                    <div className="mb-8">
                        <nav className="flex text-sm text-gray-500 dark:text-gray-400">
                            <Link href="/" className="hover:text-[#e74c3c]">
                                首页
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/tags" className="hover:text-[#e74c3c]">
                                标签浏览
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-700 dark:text-gray-300">{tag}</span>
                        </nav>
                    </div>

                    {/* 页面标题 */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="heading-xl">{tag}</h1>
                            <span className="bg-[#2c3e50] text-white text-sm px-3 py-1 rounded-full dark:bg-[#3498db]">
                                {chapters.length} 篇文章
                            </span>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            浏览与"{tag}"相关的所有支持系统理论文章
                        </p>
                    </div>

                    {/* 文章列表 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {chapters.map((chapter) => (
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

                    {/* 相关标签 */}
                    <div className="card p-8">
                        <h2 className="heading-md mb-6">相关标签</h2>
                        <div className="flex flex-wrap gap-3">
                            {relatedTags.map((relatedTag) => (
                                <Link
                                    key={relatedTag}
                                    href={`/tag/${encodeURIComponent(relatedTag)}`}
                                    className="tag"
                                >
                                    {relatedTag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 