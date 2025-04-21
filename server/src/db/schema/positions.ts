import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    varchar,
} from "drizzle-orm/pg-core";

import { ACTIVE, STATUS_VALUES } from "@ats/shared";
import { relations } from "drizzle-orm";
import { candidate } from "./candidate";
import { id, timestamps } from "./common";
import { users } from "./user";

export const status = pgEnum("status", STATUS_VALUES);

export const position = pgTable("position", {
  id,
  name: varchar().notNull().unique(),
  active: boolean().default(true),
  status: status().default(ACTIVE),
  managerId: integer().references(() => users.id),
  positions: integer(),
  ...timestamps,
});

export const positionRelation = relations(position, ({ one }) => ({
  manager: one(users, {
    fields: [position.managerId],
    references: [users.id],
  }),
}));

export const positionCollection = pgTable("positionCollection", {
  id,
  positionId: integer().references(() => position.id),
  candidateId: integer().references(() => candidate.id),
  //status_id:
});

export const positionCollectionRelation = relations(
  positionCollection,
  ({ one }) => ({
    position: one(position, {
      fields: [positionCollection.positionId],
      references: [position.id],
    }),
    candidate: one(candidate, {
      fields: [positionCollection.candidateId],
      references: [candidate.id],
    }),
  })
);
