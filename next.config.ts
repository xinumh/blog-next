/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.pexels.com"], // 配置图片域名白名单
  },
  experimental: {
    serverActions: {}, // 启用服务端操作（Next.js 14 默认开启）
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        source: "/api/:path*",
        destination: isDev
          ? "http://localhost:4000/api/:path*" // 开发环境 API 地址
          : "https://api.wonder.wang/api/:path*", // 生产环境 API 地址
      },
    ];
  },
};

module.exports = nextConfig;
