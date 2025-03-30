import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 确保Next.js能够找到所有静态资源
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // 更好的错误处理
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 4,
  }
};

export default nextConfig;
