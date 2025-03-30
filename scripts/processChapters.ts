import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// 章节数据类型定义
interface Chapter {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    readTime: number;
    tags: string[];
}

// 章节源目录路径
const chaptersDir = path.join(process.cwd(), '../chapters');
// 输出目录
const outputDir = path.join(process.cwd(), 'public/data');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 处理单个章节文件
function processChapterFile(filePath: string): Chapter | null {
    const fileName = path.basename(filePath);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // 从文件名中提取编号和标题
    const match = fileName.match(/^(\d+)(.+)\.md$/);
    if (!match) return null;

    const number = match[1];
    const title = match[2];

    // 使用gray-matter解析Markdown内容
    const { content } = matter(fileContents);

    // 计算阅读时间
    const readTime = readingTime(content);

    // 提取内容的前150个字符作为摘要
    const excerpt = content.replace(/\n/g, ' ').slice(0, 150) + '...';

    // 为章节分配标签（这里用简单算法根据内容关键词）
    const tags = assignTags(content, title);

    return {
        id: number,
        slug: `${number}-${title}`,
        title,
        content,
        excerpt,
        readTime: Math.ceil(readTime.minutes),
        tags
    };
}

// 简单的标签分配算法
function assignTags(content: string, title: string): string[] {
    const tags: string[] = [];
    const contentLower = content.toLowerCase();

    // 根据关键词分配标签
    if (contentLower.includes('支持系统') || title.includes('支持系统')) tags.push('支持系统');
    if (contentLower.includes('自我') || contentLower.includes('成长')) tags.push('自我成长');
    if (contentLower.includes('人际') || contentLower.includes('关系') || contentLower.includes('朋友')) tags.push('人际关系');
    if (contentLower.includes('工作') || contentLower.includes('职业') || contentLower.includes('事业')) tags.push('职业发展');
    if (contentLower.includes('思想') || contentLower.includes('哲学') || contentLower.includes('思考')) tags.push('思想哲学');
    if (contentLower.includes('心态') || contentLower.includes('情绪') || contentLower.includes('心理')) tags.push('心理健康');
    if (contentLower.includes('生活') || contentLower.includes('习惯') || contentLower.includes('日常')) tags.push('生活方式');

    // 确保至少有一个标签
    if (tags.length === 0) tags.push('其他');

    return tags;
}

// 主函数
async function main() {
    console.log('开始处理章节文件...');

    try {
        // 读取所有章节文件
        const files = fs.readdirSync(chaptersDir)
            .filter(file => file.endsWith('.md'))
            .sort(); // 确保按文件名排序

        const chapters: Chapter[] = [];
        const tagMap: Record<string, string[]> = {};

        // 处理每个文件
        for (const file of files) {
            const filePath = path.join(chaptersDir, file);
            const chapterData = processChapterFile(filePath);

            if (chapterData) {
                chapters.push(chapterData);

                // 更新标签映射
                chapterData.tags.forEach(tag => {
                    if (!tagMap[tag]) tagMap[tag] = [];
                    tagMap[tag].push(chapterData.id);
                });
            }
        }

        // 保存章节数据
        fs.writeFileSync(
            path.join(outputDir, 'chapters.json'),
            JSON.stringify(chapters, null, 2)
        );

        // 保存标签映射
        fs.writeFileSync(
            path.join(outputDir, 'tags.json'),
            JSON.stringify(tagMap, null, 2)
        );

        console.log(`成功处理 ${chapters.length} 个章节文件`);
        console.log(`找到 ${Object.keys(tagMap).length} 个独特标签`);
    } catch (error) {
        console.error('处理章节文件时出错:', error);
    }
}

main(); 