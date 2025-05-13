/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.pexels.com", "gips3.baidu.com"], // 配置图片域名白名单
  },
  experimental: {
    serverActions: {}, // 启用服务端操作（Next.js 14 默认开启）
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/proxy/:path*", // 生产中转到本地代理函数
      },
    ];
  },
};

module.exports = nextConfig;
