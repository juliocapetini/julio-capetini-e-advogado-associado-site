import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let db: Db | null = null;

export function getDb(): Db {
  if (db) return db;
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "POSTGRES_URL não está definido. Configure em .env.local (local) ou nas variáveis do projeto na Vercel.",
    );
  }
  const client = postgres(url, { prepare: false, max: 1 });
  db = drizzle(client, { schema });
  return db;
}

export * from "./schema";
