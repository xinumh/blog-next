import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// 单例模式确保只有一个数据库连接
const globalForDb = globalThis as unknown as {
  conn: Database.Database | undefined;
};

const conn = globalForDb.conn ?? new Database("sqlite.db");
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
