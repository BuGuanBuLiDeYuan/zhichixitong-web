#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SEO审计工具
class SEOAuditor {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.suggestions = [];
    }

    // 检查页面元数据
    checkMetadata(filePath, content) {
        console.log(`检查文件: ${filePath}`);

        // 检查title
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
        if (!titleMatch) {
            this.issues.push(`${filePath}: 缺少title`);
        } else {
            const title = titleMatch[1];
            if (title.length < 30) {
                this.warnings.push(`${filePath}: title太短 (${title.length}字符)`);
            }
            if (title.length > 60) {
                this.warnings.push(`${filePath}: title太长 (${title.length}字符)`);
            }
            if (!title.includes('支持系统')) {
                this.suggestions.push(`${filePath}: title建议包含"支持系统"关键词`);
            }
        }

        // 检查description
        const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
        if (!descMatch) {
            this.issues.push(`${filePath}: 缺少description`);
        } else {
            const desc = descMatch[1];
            if (desc.length < 120) {
                this.warnings.push(`${filePath}: description太短 (${desc.length}字符)`);
            }
            if (desc.length > 160) {
                this.warnings.push(`${filePath}: description太长 (${desc.length}字符)`);
            }
        }

        // 检查keywords
        const keywordsMatch = content.match(/keywords:\s*['"`]([^'"`]+)['"`]/);
        if (!keywordsMatch) {
            this.suggestions.push(`${filePath}: 建议添加keywords`);
        }

        // 检查canonical URL
        const canonicalMatch = content.match(/canonical:\s*['"`]([^'"`]+)['"`]/);
        if (!canonicalMatch) {
            this.suggestions.push(`${filePath}: 建议添加canonical URL`);
        }

        // 检查Open Graph
        const ogMatch = content.match(/openGraph:\s*{/);
        if (!ogMatch) {
            this.warnings.push(`${filePath}: 缺少Open Graph数据`);
        }
    }

    // 检查图片优化
    checkImages(dirPath) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

        function walkDir(dir) {
            const files = fs.readdirSync(dir);

            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    walkDir(filePath);
                } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
                    const stats = fs.statSync(filePath);
                    const sizeInMB = stats.size / (1024 * 1024);

                    if (sizeInMB > 1) {
                        this.warnings.push(`图片过大: ${filePath} (${sizeInMB.toFixed(2)}MB)`);
                    }

                    if (!file.includes('webp') && !file.includes('avif')) {
                        this.suggestions.push(`建议优化图片格式: ${filePath} -> WebP/AVIF`);
                    }
                }
            });
        }

        if (fs.existsSync(dirPath)) {
            walkDir(dirPath);
        }
    }

    // 检查内部链接
    checkInternalLinks(content, filePath) {
        const linkMatches = content.match(/href=['"`]([^'"`]+)['"`]/g) || [];

        linkMatches.forEach(match => {
            const url = match.match(/href=['"`]([^'"`]+)['"`]/)[1];

            if (url.startsWith('/') && !url.startsWith('//')) {
                // 内部链接
                if (url.includes(' ')) {
                    this.issues.push(`${filePath}: 内部链接包含空格: ${url}`);
                }

                if (!url.startsWith('/') || url.includes('..')) {
                    this.warnings.push(`${filePath}: 可疑的内部链接: ${url}`);
                }
            }
        });
    }

    // 检查结构化数据
    checkStructuredData(content, filePath) {
        const hasStructuredData = content.includes('StructuredData') ||
            content.includes('@context') ||
            content.includes('application/ld+json');

        if (!hasStructuredData) {
            this.suggestions.push(`${filePath}: 建议添加结构化数据`);
        }
    }

    // 运行完整审计
    async runAudit() {
        console.log('🔍 开始SEO审计...\n');

        // 检查页面文件
        const pagesDir = path.join(process.cwd(), 'app');
        this.auditDirectory(pagesDir);

        // 检查图片
        const publicDir = path.join(process.cwd(), 'public');
        this.checkImages(publicDir);

        // 检查配置文件
        this.checkConfigFiles();

        // 输出结果
        this.printResults();
    }

    auditDirectory(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                this.auditDirectory(filePath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const content = fs.readFileSync(filePath, 'utf8');

                // 检查元数据
                if (content.includes('Metadata') || content.includes('generateMetadata')) {
                    this.checkMetadata(filePath, content);
                }

                // 检查内部链接
                this.checkInternalLinks(content, filePath);

                // 检查结构化数据
                this.checkStructuredData(content, filePath);
            }
        });
    }

    checkConfigFiles() {
        // 检查robots.txt
        const robotsPath = path.join(process.cwd(), 'app', 'robots.ts');
        if (!fs.existsSync(robotsPath)) {
            this.issues.push('缺少robots.ts文件');
        }

        // 检查sitemap
        const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
        if (!fs.existsSync(sitemapPath)) {
            this.issues.push('缺少sitemap.ts文件');
        }

        // 检查manifest
        const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
        if (!fs.existsSync(manifestPath)) {
            this.warnings.push('缺少manifest.json文件');
        }

        // 检查next.config.js
        const nextConfigPath = path.join(process.cwd(), 'next.config.js');
        if (fs.existsSync(nextConfigPath)) {
            const content = fs.readFileSync(nextConfigPath, 'utf8');

            if (!content.includes('compress: true')) {
                this.suggestions.push('建议在next.config.js中启用压缩');
            }

            if (!content.includes('headers')) {
                this.suggestions.push('建议在next.config.js中添加安全headers');
            }
        }
    }

    printResults() {
        console.log('\n📊 SEO审计结果:\n');

        if (this.issues.length > 0) {
            console.log('🚨 严重问题:');
            this.issues.forEach(issue => console.log(`  ❌ ${issue}`));
            console.log('');
        }

        if (this.warnings.length > 0) {
            console.log('⚠️  警告:');
            this.warnings.forEach(warning => console.log(`  🟡 ${warning}`));
            console.log('');
        }

        if (this.suggestions.length > 0) {
            console.log('💡 建议:');
            this.suggestions.forEach(suggestion => console.log(`  🔵 ${suggestion}`));
            console.log('');
        }

        const totalIssues = this.issues.length + this.warnings.length;
        const score = Math.max(0, 100 - (totalIssues * 5));

        console.log(`📈 SEO评分: ${score}/100`);

        if (score >= 90) {
            console.log('🎉 优秀! 您的SEO配置很棒!');
        } else if (score >= 70) {
            console.log('👍 良好! 还有一些改进空间。');
        } else if (score >= 50) {
            console.log('⚡ 一般，需要一些优化。');
        } else {
            console.log('🔧 需要大量SEO优化工作。');
        }

        console.log('\n✅ 审计完成!');
    }
}

// 运行审计
if (require.main === module) {
    const auditor = new SEOAuditor();
    auditor.runAudit().catch(console.error);
}

module.exports = SEOAuditor;