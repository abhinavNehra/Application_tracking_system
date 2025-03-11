import { serve } from "@hono/node-server";
import { Hono } from "hono";

import routes from './routes/@routes.js'

const app = new Hono();

app.route("api", routes)


app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type AppType = typeof app;
