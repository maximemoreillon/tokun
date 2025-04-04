import { and, count, eq, inArray, isNotNull, not } from "drizzle-orm";
import { db } from "./db";
import { tokensTable } from "./db/schema";
import { validPosList } from "$lib/config";

type ReadTokensOptions = {
  limit?: number;
  offset?: number;
};

export async function readTokens(options: ReadTokensOptions = {}) {
  const { limit = 5, offset = 0 } = options;

  // TODO: pagination
  const tokens = await db
    .select()
    .from(tokensTable)
    .where(
      and(
        inArray(tokensTable.pos, validPosList),
        isNotNull(tokensTable.reading)
      )
    )
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(tokensTable);

  return { total, items: tokens, offset, limit };
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
