import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "../db/db";
import { candidate, position, positionCollection } from "../db/schema";

import {
    CreatePosition,
    ParamSchema,
    PositionCollectionSchema,
    PositionSearchSchema,
    SearchSchema,
} from "@ats/shared";
import { eq, SQL } from "drizzle-orm";
import { searchHandler } from "../utils/searchHandler";
import { type App } from "../utils/types";

const app = new Hono<App>()
  .post("/", zValidator("json", CreatePosition), async (ctx) => {
    const data = ctx.req.valid("json");
    try {
      const result = await db
        .insert(position)
        .values({ name: data.name, managerId: data.managerId })
        .returning({ id: position.id });
      return ctx.var.success(result);
    } catch (error) {
      return ctx.var.error(error);
    }
  })
  .get(
    "/",
    zValidator("query", SearchSchema.merge(PositionSearchSchema)),
    async (ctx) => {
      const query = ctx.req.valid("query");

      const filters: SQL[] = [];
      if (query?.status) filters.push(eq(position.status, query.status));
      if (query?.managerId)
        filters.push(eq(position.managerId, query.managerId));

      const condition = await searchHandler(query, "position", filters, [
        "name",
      ]);
      const result = await db.query.position.findMany({
        ...condition,
        with: {
          manager: true,
        },
      });
      return ctx.var.success(result);
    }
  )
  .get("/:id", zValidator("param", ParamSchema), async (ctx) => {
    const param = ctx.req.valid("param");
    if (!param?.id) return ctx.var.error("Id is missing", 404);

    const result = await db.query.position.findFirst({
      where: eq(position.id, param.id),
      with: {
        manager: true,
      },
    });

    return ctx.var.success(result);
  })
  .post(
    "add/candidate",
    zValidator("json", PositionCollectionSchema),
    async (ctx) => {
      const data = ctx.req.valid("json");

      if (!data?.positionId || !data?.candidateId)
        return ctx.var.error("Id missing", 404);

      const details = await Promise.all([
        db.query.position.findFirst({
          where: eq(position.id, data.positionId),
        }),
        db.query.candidate.findFirst({
          where: eq(candidate.id, data.candidateId),
        }),
      ]);

      if (!details[0]?.id || !details[1]?.id) {
        return ctx.var.error("Id not found", 404);
      }

      try {
        const result = await db
          .insert(positionCollection)
          .values(data)
          .returning();

        return ctx.var.success(result);
      } catch (error) {
        return ctx.var.error(error);
      }
    }
  );

export default app;
