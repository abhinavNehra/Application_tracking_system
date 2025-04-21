import type { SearchSchemaType } from "@ats/shared";
import { and, asc, desc, ilike, or, type SQL } from "drizzle-orm";
import { db } from "../db/db";
import * as schema from "../db/schema";

export async function searchHandler<T extends keyof typeof db.query>(
  query: SearchSchemaType,
  table: T,
  where: (SQL | undefined)[],
  searchableFields?: T extends keyof typeof schema
    ? (keyof (typeof schema)[T])[]
    : never
) {
  const dbTable = schema[table] as Record<string, any>;
  if (searchableFields?.length && query?.search) {
    const search = `%${query.search}%`;
    where.push(
      or(...searchableFields.map((field) => ilike(dbTable[field], search)))
    );
  }

  const orderKey: string = query?.orderKey ? query.orderKey : "createdAt";
  const orderBy =
    query?.orderBy && query.orderBy === "asc"
      ? [asc(dbTable[orderKey])]
      : [desc(dbTable[orderKey])];

  const limit = query?.limit ? query.limit : 10;
  const offset = query?.offset ? query.offset : 0;

  return {
    where: and(...where),
    limit,
    offset,
    orderBy,
    extras: {
        totalCount : db.$count(schema[table], and(...where)).as("totalCount")
    }
  };
}
