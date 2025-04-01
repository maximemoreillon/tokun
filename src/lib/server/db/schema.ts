import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const textsTable = pgTable("texts", {
  id: serial().primaryKey(),
  content: text().notNull().unique(),
});

export const tokensTable = pgTable("tokens", {
  id: serial().primaryKey(),
  surface_form: text().notNull().unique(),
  pos: text().notNull(),
  reading: text(),
});

export const textTokensTable = pgTable("text_tokens", {
  id: serial().primaryKey(),
  text_id: integer()
    .notNull()
    .references(() => textsTable.id, { onDelete: "cascade" }),
  token_id: integer()
    .notNull()
    .references(() => tokensTable.id, { onDelete: "cascade" }),
  position: integer().notNull(),
});
