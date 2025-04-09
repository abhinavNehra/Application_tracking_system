import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
};

export const users = pgTable(
  'users',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    username: varchar('username', { length: 50 }).notNull(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 250 }).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex().on(table.email), uniqueIndex().on(table.username)]
);
