import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../lib/db";
import { users } from "../lib/db/schema";

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME?.trim() || "Administrador";

  if (!email || !password) {
    console.error(
      "Defina ADMIN_SEED_EMAIL e ADMIN_SEED_PASSWORD no ambiente.\nExemplo: npx tsx --env-file=.env.local scripts/seed-admin.ts",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("ADMIN_SEED_PASSWORD deve ter pelo menos 8 caracteres.");
    process.exit(1);
  }

  const db = getDb();
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    console.log("Utilizador já existe:", email);
    process.exit(0);
  }

  const passwordHash = await hash(password, 12);
  await db.insert(users).values({ email, passwordHash, name, role: "admin" });
  console.log("Administrador criado:", email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
