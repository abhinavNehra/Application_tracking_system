import { Hono } from "hono";
import { sessionHandler } from "../middleware/sessionHandler";
import type { App } from "../utils/types";

const app = new Hono<App>();
app.use(sessionHandler)
.get("/", (ctx) => {
  const user = ctx.var.session;
  return ctx.var.success({ message: "Success", user });
});

export default app;
