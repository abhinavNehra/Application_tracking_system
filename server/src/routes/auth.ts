import { LoginSchema, SignupSchema } from "@ats/shared";
import { zValidator } from "@hono/zod-validator";
import { compare, hash } from "bcrypt";
import { eq, or } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/db";
import { users } from "../db/schema/user";
import { createSession } from "../utils/session";
import type { App } from "../utils/types";

const app = new Hono<App>();

app
  .post("/login", zValidator("json", LoginSchema), async (ctx) => {
    const { username, password } = ctx.req.valid("json");

    const user = await db.query.users.findFirst({
      where: or(eq(users.username, username), eq(users.email, username)),
    });

    if (!user) {
      return ctx.var.error("User not found", 404);
    }

    const { password: userPassword, ...userDetails } = user;

    const isPasswordValid = await compare(password, userPassword);

    if (!isPasswordValid) {
      return ctx.var.error("Invalid password", 401);
    }
    
    await createSession(ctx, userDetails);

    return ctx.json({
      message: "Login success",
    });
  })
  .post("/sign-up", zValidator("json", SignupSchema), async (ctx) => {
    const {
      password,
      verifyPassword: _verifyPassword,
      ...userDetails
    } = ctx.req.valid("json");

    const user = await db.query.users.findFirst({
      where: or(
        eq(users.email, userDetails.email),
        eq(users.username, userDetails.username)
      ),
    });

    if (user) {
      return ctx.var.error("User already exists", 400);
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db
      .insert(users)
      .values({ ...userDetails, password: hashedPassword })
      .returning({ username: users.username });

    return ctx.var.success({
      message: "signup success",
      data: newUser,
    });
  });

export default app;
