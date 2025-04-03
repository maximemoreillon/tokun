import { validPosList } from "./config";
import type { tokensTable } from "./server/db/schema";

export function tokenIsValid(token: typeof tokensTable.$inferSelect) {
  return validPosList.includes(token.pos);
}
