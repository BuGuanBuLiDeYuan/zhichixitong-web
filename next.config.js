/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // 设置输出目录
    distDir: '.next',
    // 图片域名配置
    images: {
        domains: [],
    },
    // 性能优化配置
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 4,
    }
}

module.exports = nextConfig 