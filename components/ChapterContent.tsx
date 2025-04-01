interface ChapterContentProps {
    content: string;
}

export default function ChapterContent({ content }: ChapterContentProps) {
    // 将内容文本转换为HTML段落
    const contentHtml = content
        .split('\n\n')
        .map((paragraph, index) => {
            // 处理标题
            if (paragraph.startsWith('# ')) {
                return (
                    <h1 key={index} className="chapter-heading-1">
                        {paragraph.substring(2)}
                    </h1>
                );
            } else if (paragraph.startsWith('## ')) {
                return (
                    <h2 key={index} className="chapter-heading-2">
                        {paragraph.substring(3)}
                    </h2>
                );
            } else if (paragraph.startsWith('### ')) {
                return (
                    <h3 key={index} className="chapter-heading-3">
                        {paragraph.substring(4)}
                    </h3>
                );
            } else if (paragraph.trim() === '') {
                return null;
            } else {
                // 处理加粗文字
                const boldText = paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong>$1</strong>'
                );
                return (
                    <p
                        key={index}
                        className="chapter-paragraph"
                        dangerouslySetInnerHTML={{ __html: boldText }}
                    />
                );
            }
        });

    return <div className="chapter-content">{contentHtml}</div>;
} 