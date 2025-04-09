import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';

import { checkDb } from './db/db.ts';
import env from './env.ts';

import { responseHandler } from './middleware/responseHandler.ts';
import { sessionHandler } from './middleware/sessionHandler.ts';
import routes from './routes/@routes.ts';


const app = new Hono();

app
  .use(logger()) // logger
  .use(cors()) // restrict it to certain ip
  .use(csrf()) // CSRF protection :TODO: Need to modify it to add method or url
  .use(prettyJSON()) // With options: prettyJSON({ space: 4 })
  .use(
    '*',
    secureHeaders({
      xFrameOptions: false,
      xXssProtection: false,
    })
  ) // secure the headers
  .use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
      standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      keyGenerator: (c) => c.req.header('cf-connecting-ip') ?? '', // Method to generate custom identifiers for clients.
      // store: ... , // Redis, MemoryStore, etc. See below.
    })
  ) // limit the number of requests
  .use(responseHandler)
  .use(sessionHandler)
  .get('healthcare', async (c) => {
    const result = await checkDb();
    c.json({ result });
  }) // check health of the server
  .route('api', routes); // routes

serve(
  {
    fetch: app.fetch,
    port: env.SERVER_PORT,
  },
  (info) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type AppType = typeof app;
