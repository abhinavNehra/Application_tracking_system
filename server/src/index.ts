import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { rateLimiter } from "hono-rate-limiter";

import { checkDb } from "./db/db.ts";

import routes from "./routes/@routes.js";

const app = new Hono();

app.use(logger());
app.use(cors()); // restrict it to certain ip
app.use(csrf()); // CSRF protection :TODO: Need to modify it to add method or url
app.use(prettyJSON()); // With options: prettyJSON({ space: 4 })
app.use(
  "*",
  secureHeaders({
    xFrameOptions: false,
    xXssProtection: false,
  })
);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
  })
);
app.route("api", routes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("healthcare", async (c) => {
  const result = await checkDb();
  c.json({ result });
});

app.use(async (c, next) => {
  await checkDb();
  await next();
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
