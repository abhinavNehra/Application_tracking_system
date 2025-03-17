import { Hono } from "hono";

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.json({ success: false}, 500);
});

export default app;
