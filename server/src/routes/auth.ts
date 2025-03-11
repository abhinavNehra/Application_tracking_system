import { Hono } from "hono";

const app = new Hono();

app
  .post("/login", (ctx) => {
    return ctx.json({
      message: "Login success",
    });
  })
  .post("/sign-up", (ctx) => {
    return ctx.json({
      message: "signup success",
    });
  });

export default app;
