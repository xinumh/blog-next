// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  },
} satisfies Config;
