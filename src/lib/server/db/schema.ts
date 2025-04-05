import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const textsTable = pgTable("texts", {
  id: serial().primaryKey(),
  content: text().notNull().unique(),
  timestamp: timestamp().notNull().defaultNow(),
});

export const tokensTable = pgTable("tokens", {
  id: serial().primaryKey(),
  surface_form: text().notNull().unique(),
  pos: text().notNull(),
  reading: text(),
  // Custom additions
  meaning: text(), // Currently unused
  score: integer().default(0).notNull(), // unused
  known: boolean(),
  ignored: boolean(),
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

// Relations (Only needed for db.query)
export const textsRelations = relations(textsTable, ({ many }) => ({
  textTokens: many(textTokensTable),
}));

export const tokensRelations = relations(tokensTable, ({ many }) => ({
  textTokens: many(textTokensTable),
}));

export const textsTokenRelations = relations(textTokensTable, ({ one }) => ({
  token: one(tokensTable, {
    fields: [textTokensTable.token_id],
    references: [tokensTable.id],
  }),
  text: one(textsTable, {
    fields: [textTokensTable.text_id],
    references: [textsTable.id],
  }),
}));
