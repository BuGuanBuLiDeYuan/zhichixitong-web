import { Chapter } from './chapters';

// 网站结构化数据
export function getWebsiteStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "支持系统",
        "alternateName": "支持系统理论与实践",
        "url": "https://zhichixitong.support",
        "description": "学习支持系统理论，构建个人成长网络，突破人生瓶颈，加速人生起飞。200篇实用文章帮助你建立更强大的支持网络。",
        "inLanguage": "zh-CN",
        "author": {
            "@type": "Person",
            "name": "刘明",
            "url": "https://zhichixitong.support/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "支持系统",
            "url": "https://zhichixitong.support",
            "logo": {
                "@type": "ImageObject",
                "url": "https://zhichixitong.support/images/logo.png",
                "width": 512,
                "height": 512
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://zhichixitong.support/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "sameAs": [
            "https://weibo.com/zhichixitong",
            "https://space.bilibili.com/zhichixitong"
        ]
    };
}

// 文章结构化数据
export function getArticleStructuredData(chapter: Chapter) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": chapter.title,
        "description": chapter.summary || chapter.content.substring(0, 160),
        "image": chapter.image || "https://zhichixitong.support/images/default-article.jpg",
        "author": {
            "@type": "Person",
            "name": "刘明",
            "url": "https://zhichixitong.support/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "支持系统",
            "logo": {
                "@type": "ImageObject",
                "url": "https://zhichixitong.support/images/logo.png",
                "width": 512,
                "height": 512
            }
        },
        "datePublished": chapter.publishDate || "2024-01-01",
        "dateModified": chapter.lastModified || chapter.publishDate || "2024-01-01",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://zhichixitong.support/chapter/${chapter.id}`
        },
        "articleSection": chapter.tags?.[0] || "个人成长",
        "keywords": chapter.tags?.join(", ") || "支持系统,个人成长",
        "wordCount": chapter.content.length,
        "inLanguage": "zh-CN",
        "isPartOf": {
            "@type": "WebSite",
            "name": "支持系统",
            "url": "https://zhichixitong.support"
        }
    };
}

// 面包屑导航结构化数据
export function getBreadcrumbStructuredData(items: Array<{ name: string, url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

// FAQ结构化数据
export function getFAQStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "什么是支持系统理论？",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "支持系统理论是一种指导个人成长和突破的实用框架，通过构建有效的支持网络来加速个人发展和目标实现。"
                }
            },
            {
                "@type": "Question",
                "name": "如何构建个人支持系统？",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "构建个人支持系统需要识别关键支持者、建立互惠关系、维护支持网络，并根据不同目标调整支持系统的结构。"
                }
            },
            {
                "@type": "Question",
                "name": "支持系统理论适合哪些人？",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "支持系统理论适合所有希望加速个人成长、突破人生瓶颈、提升生活质量的人，特别是职场人士、创业者和学生群体。"
                }
            }
        ]
    };
}

// 课程/书籍结构化数据
export function getCourseStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "支持系统理论完整教程",
        "description": "全面学习支持系统理论，掌握个人成长的核心方法，200篇文章系统性讲解理论与实践。",
        "provider": {
            "@type": "Organization",
            "name": "支持系统",
            "url": "https://zhichixitong.support"
        },
        "instructor": {
            "@type": "Person",
            "name": "刘明"
        },
        "courseMode": "online",
        "inLanguage": "zh-CN",
        "isAccessibleForFree": true,
        "educationalLevel": "beginner",
        "teaches": [
            "支持系统理论基础",
            "个人成长方法",
            "人际关系建设",
            "目标实现策略"
        ]
    };
}

// 组织结构化数据
export function getOrganizationStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "支持系统",
        "url": "https://zhichixitong.support",
        "logo": "https://zhichixitong.support/images/logo.png",
        "description": "专注于支持系统理论研究与实践的教育平台",
        "foundingDate": "2024",
        "founder": {
            "@type": "Person",
            "name": "刘明"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@zhichixitong.support"
        },
        "sameAs": [
            "https://weibo.com/zhichixitong",
            "https://space.bilibili.com/zhichixitong"
        ]
    };
}