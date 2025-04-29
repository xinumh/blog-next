/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.pexels.com"], // 配置图片域名白名单
  },
  experimental: {
    serverActions: {}, // 启用服务端操作（Next.js 14 默认开启）
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // 目标地址
      },
    ];
  },
};

module.exports = nextConfig;
