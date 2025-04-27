// drizzle.config.ts
import type { Config } from "drizzle-kit";
import { join } from "path";

const isProd = process.env.NODE_ENV === "production";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite", // 关键变更：不再需要 driver 字段
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true, // 可选：显示详细日志
  strict: true, // 可选：严格模式
} satisfies Config;
