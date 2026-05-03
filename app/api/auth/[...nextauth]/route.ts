import { handlers } from "@/auth";

/** `argon2` usa addon nativo; não é compatível com Edge. */
export const runtime = "nodejs";

export const { GET, POST } = handlers;
