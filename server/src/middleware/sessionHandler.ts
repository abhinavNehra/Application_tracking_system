import { type Context } from "hono";
import { createMiddleware } from "hono/factory";
import { getSession } from "../utils/session";
import type { App } from "../utils/types";

export const sessionHandler = createMiddleware<App>(async(ctx: Context, next) => {
    const session = await getSession(ctx);
    if (!session) {
      return ctx.var.error({ error: "Unauthorized" }, 403);
    }
  
    ctx.set("session", session);
  
    await next();
})