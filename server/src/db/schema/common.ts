import { integer, timestamp } from "drizzle-orm/pg-core";


export const timestamps = {
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  };

export const id = integer('id').primaryKey().generatedAlwaysAsIdentity()
