import { relations } from "drizzle-orm";
import { jsonb, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common";
import { positionCollection } from "./positions";

export const candidate = pgTable(
  "candidate",
  {
    id,
    name: varchar().notNull(),
    email: varchar().notNull(),
    summary: varchar(),
    url: varchar(),
    phone: varchar(),
    address: varchar(),
    education: jsonb(),
    skills: jsonb(),
    featuredSkills: jsonb(),
    workExperiences: jsonb(),
    projects: jsonb(),
    ...timestamps,
  },
  (table) => [uniqueIndex().on(table.email)]
);

export const candidateRelation = relations(candidate, ({ one }) => ({
  position: one(positionCollection),
}));
