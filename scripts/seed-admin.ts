import { eq } from "drizzle-orm";
import { getDb } from "../lib/db";
import { hashPassword } from "../lib/password";
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

  const force = /^(1|true|yes)$/i.test(process.env.ADMIN_SEED_FORCE ?? "");

  const db = getDb();
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const passwordHash = await hashPassword(password);

  if (existing.length > 0) {
    if (!force) {
      console.log(
        "Utilizador já existe:",
        email,
        "\nDefine ADMIN_SEED_FORCE=true para repor a senha/nome/role.",
      );
      process.exit(0);
    }
    await db
      .update(users)
      .set({ passwordHash, name, role: "admin" })
      .where(eq(users.email, email));
    console.log("Administrador atualizado:", email);
    return;
  }

  await db.insert(users).values({ email, passwordHash, name, role: "admin" });
  console.log("Administrador criado:", email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
