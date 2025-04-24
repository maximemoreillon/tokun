import {
  and,
  count,
  eq,
  ilike,
  inArray,
  isNotNull,
  isNull,
  not,
  or,
} from "drizzle-orm";
import { db } from "./db";
import { textsTable, textTokensTable, tokensTable } from "./db/schema";
import { validPosList } from "$lib/config";

type ReadTokensOptions = {
  user_id: string;
  limit?: number;
  offset?: number;
  important?: boolean;
  known?: boolean;
  search?: string;
};

export async function readTokens(options: ReadTokensOptions) {
  const {
    user_id,
    limit = 100,
    offset = 0,
    important,
    known,
    search,
  } = options;

  function importanceFilter() {
    if (important === undefined) return undefined;
    if (important) return eq(tokensTable.important, true);
    else
      return or(
        eq(tokensTable.important, false),
        isNull(tokensTable.important)
      );
  }

  function knownFilter() {
    if (known === undefined) return undefined;
    if (known) return eq(tokensTable.known, true);
    else return or(eq(tokensTable.known, false), isNull(tokensTable.known));
  }

  const where = and(
    inArray(tokensTable.pos, validPosList),
    isNotNull(tokensTable.reading),
    eq(tokensTable.user_id, user_id),
    importanceFilter(),
    knownFilter(),
    search ? ilike(tokensTable.surface_form, `%${search}%`) : undefined
  );

  const tokens = await db
    .select()
    .from(tokensTable)
    .where(where)
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(tokensTable)
    .where(where);

  return { total, items: tokens, offset, limit };
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

  // TODO: for now limited to 10 texts
  const tokenTexts = await db
    .select()
    .from(textTokensTable)
    .where(eq(textTokensTable.token_id, id))
    .innerJoin(textsTable, eq(textTokensTable.text_id, textsTable.id))
    .limit(100);

  // Formatting texts, removing dupicates
  // TODO: find simpler way to do this
  const texts = tokenTexts
    .map(({ texts }) => texts)
    .reduce((acc: (typeof textsTable.$inferSelect)[], t) => {
      if (!acc.find((f) => f.id === t.id)) acc.push(t);
      return acc;
    }, []);

  return { ...token, occurences, texts };
}

export async function updateToken(id: number, properties: any) {
  const [token] = await db
    .update(tokensTable)
    .set(properties)
    .where(eq(tokensTable.id, id))
    .returning();

  return token;
}
