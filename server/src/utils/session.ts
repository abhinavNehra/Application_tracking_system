import { type Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";
import { users } from "../db/schema";
import env from "../env";

export type UserType = Omit<typeof users.$inferSelect, 'password'>;

export function createPayload(user: UserType) {
  return {
    exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
    ...user,
  };
}

export async function createSession(
  ctx: Context,
  user: UserType
) {
  const payload = createPayload(user);
  const token = await sign(payload, env.JWT_SECRET, "HS256");
  setSession(ctx, token);
}

export function setSession(ctx: Context, token: string) {
  setCookie(ctx, "session", token, {
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict", // prevent XSS attacks  
    maxAge: 60 * 10, // 10 minutes
    domain: env.NODE_ENV === "production" ? env.DOMAIN_NAME : "localhost",
  });
}

export async function getSession(ctx: Context) {
  const token = getCookie(ctx, "session");
  if (!token) return null;
  const payload = await verify(token, env.JWT_SECRET, "HS256");
  return payload;
}

export function deleteSession(ctx: Context) {
  deleteCookie(ctx, "session");
}
