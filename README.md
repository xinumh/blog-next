This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

开发环境:

```bash
yarn dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 添加 `.env` 和 `.env.production` 文件

```shell
#.env

# 本地开发的 SQLite 数据库文件路径
TURSO_DB_AUTH_TOKEN=your-turbo-token
TURSO_DB_URL=libsql://xxxxxxx.aws-us-east-1.turso.io
NODE_ENV=development
NEXT_PUBLIC_BASE_API_URL=http://localhost:3000
```

`.env.production` 文件变量同 `.env` 一样，这俩文件是不提交 `git` 的，这里用来在本地开发的时候可以方便连 production 的 Turbo。线上部署在 `vercel` ，在 `vercel` 设置 `环境变量` `TURSO_DB_AUTH_TOKEN`、`TURSO_DB_URL`。所以线上环境连接的是 `vercel` 配置的 `Turbo`。

> 环境变量在以下位置按顺序查找，一旦找到变量即停止。⚠️

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local`（当 `NODE_ENV` 为 `test` 时不检查。）
4. `.env.$(NODE_ENV)`
5. `.env`

[x] 自定义标题、代码高亮、图片样式、blockquote 等

[ ] :::danger 会被映射为
[ ] MDX 中可嵌入任意组件（如视频、图表等）
[ ] toc.ts 自动生成目录（基于 h2 / h3）
[ ] 支持 tag、category 页面
[ ] 评论系统（Giscus 或 Cusdis）
[ ] 动态 sitemap、RSS Feed
[ ] 字体：复古 serif +现代 mono 组合
