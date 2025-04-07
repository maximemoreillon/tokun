import { and, count, eq, inArray, isNotNull, not } from "drizzle-orm";
import { db } from "./db";
import { textTokensTable, tokensTable } from "./db/schema";
import { validPosList } from "$lib/config";

type ReadTokensOptions = {
  user_id: string;
  limit?: number;
  offset?: number;
};

export async function readTokens(options: ReadTokensOptions) {
  const { user_id, limit = 100, offset = 0 } = options;

  const tokens = await db
    .select()
    .from(tokensTable)
    .where(
      and(
        inArray(tokensTable.pos, validPosList),
        isNotNull(tokensTable.reading),
        eq(tokensTable.user_id, user_id)
      )
    )
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(tokensTable)
    .where(eq(tokensTable.user_id, user_id));

  const [{ count: known }] = await db
    .select({ count: count() })
    .from(tokensTable)
    .where(and(eq(tokensTable.known, true), eq(tokensTable.user_id, user_id)));

  return { total, items: tokens, offset, limit, known };
}

export async function readToken(id: number) {
  const [token] = await db
    .select()
    .from(tokensTable)
    .where(eq(tokensTable.id, id));

  const [{ count: occurences }] = await db
    .select({ count: count() })
    .from(textTokensTable)
    .where(eq(textTokensTable.token_id, id));

  return { ...token, occurences };
}

export async function updateToken(id: number, properties: any) {
  const [token] = await db
    .update(tokensTable)
    .set(properties)
    .where(eq(tokensTable.id, id))
    .returning();

  return token;
}
