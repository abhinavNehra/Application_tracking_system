import { Hono } from "hono";

import Auth from "./auth.ts";
import Candidate from "./candidate.ts";
import Position from "./positions.ts";
import User from "./user.ts";

const app = new Hono()
  .route("/auth", Auth)
  .route("/user", User)
  .route("/position", Position)
  .route("/candidate", Candidate);

export default app;
