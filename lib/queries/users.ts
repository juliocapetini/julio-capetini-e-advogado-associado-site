import { asc, eq } from "drizzle-orm";
import { getDb, users } from "@/lib/db";

export type AdminListItem = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
};

export async function listAdmins(): Promise<AdminListItem[]> {
  const db = getDb();
  return db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "admin"))
    .orderBy(asc(users.email));
}

export async function countAdmins(): Promise<number> {
  const rows = await listAdmins();
  return rows.length;
}
