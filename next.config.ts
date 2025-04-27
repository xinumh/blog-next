/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.pexels.com"], // 配置图片域名白名单
  },
  experimental: {
    serverActions: true, // 启用服务端操作（Next.js 14 默认开启）
  },
};

module.exports = nextConfig;
