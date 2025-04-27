import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite", // 关键变更：不再需要 driver 字段
  dbCredentials: {
    url: "sqlite:///tmp/db/prod.db", // 使用绝对路径
  },
  verbose: true, // 可选：显示详细日志
  strict: true, // 可选：严格模式
} satisfies Config;
