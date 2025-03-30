/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // 确保支持App Router
    experimental: {
        appDir: true,
    },
    // 设置输出目录
    distDir: '.next',
}

module.exports = nextConfig 