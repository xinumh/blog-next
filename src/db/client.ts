import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import * as schema from "./schema";

const tursoClient = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
});

export const db = drizzle(tursoClient, { schema });
