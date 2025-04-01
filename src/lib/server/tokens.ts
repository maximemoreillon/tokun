import { eq } from "drizzle-orm";
import { db } from "./db";
import { tokensTable } from "./db/schema";

export async function readTokens() {
  const tokens = await db.select().from(tokensTable);

  return { items: tokens };
}

export async function readToken(id: number) {
  const [token] = await db
    .select()
    .from(tokensTable)
    .where(eq(tokensTable.id, id));

  return token;
}

export async function updateToken(id: number, properties: any) {
  const [token] = await db
    .update(tokensTable)
    .set(properties)
    .where(eq(tokensTable.id, id))
    .returning();

  return token;
}
