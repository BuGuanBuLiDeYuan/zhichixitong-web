/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // 设置输出目录
    distDir: '.next',
    // 图片域名配置
    images: {
        domains: [],
        unoptimized: process.env.NODE_ENV === 'development'
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig 