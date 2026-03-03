import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// TODO: unique on content and user_id

export const textsTable = pgTable("texts", {
  id: serial().primaryKey(),
  content: text().notNull(),
  timestamp: timestamp().notNull().defaultNow(),
  user_id: text().notNull(),
});

// TODO: unique on surface_form and user_id
// TODO: consider having known, important in separate user table
export const tokensTable = pgTable("tokens", {
  id: serial().primaryKey(),
  surface_form: text().notNull(),
  pos: text().notNull(),
  reading: text(),
  // Custom additions
  meaning: text(), // Currently unused
  known: boolean(),
  ignored: boolean(),
  important: boolean(),
  user_id: text().notNull(),
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
