import {
    CandidateSchema,
    CandidateSearchSchema,
    SearchSchema,
} from "@ats/shared";
import { zValidator } from "@hono/zod-validator";
import type { SQL } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/db";
import { candidate } from "../db/schema/candidate";
import { searchHandler } from "../utils/searchHandler";
import type { App } from "../utils/types";

const app = new Hono<App>()
  .post("/", zValidator("json", CandidateSchema), async (ctx) => {
    const data = ctx.req.valid("json");
    try {
      const result = await db
        .insert(candidate)
        .values(data)
        .returning({ id: candidate.id });
      return ctx.var.success(result);
    } catch (error) {
      return ctx.var.error(error);
    }
  })
  .get(
    "/",
    zValidator("query", SearchSchema.merge(CandidateSearchSchema)),
    async (ctx) => {
      const query = ctx.req.valid("query");

      const filters: SQL[] = [];
      const args = await searchHandler(query, "candidate", filters, ["name"]);

      const result = await db.query.candidate.findMany({
        ...args,
        with: {
          position: true,
        },
      });

      return ctx.var.success(result);
    }
  );

export default app;
