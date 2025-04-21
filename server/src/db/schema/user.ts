import { relations } from "drizzle-orm";
import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common";
import { position } from "./positions";

export const users = pgTable(
  "users",
  {
    id,
    username: varchar("username", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 250 }).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex().on(table.email), uniqueIndex().on(table.username)]
);

export const userRelations = relations(users, ({ many }) => ({
  position: many(position),
}));
