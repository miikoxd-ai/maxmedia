import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { parse as parseCookieHeader } from "cookie";
import { jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import { ADMIN_SESSION_COOKIE_NAME } from "../../shared/const";
import { ENV } from "./env";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  isAdminSession: boolean;
};

type AdminSessionPayload = {
  scope: "admin-dashboard";
};

async function getAdminSession(req: CreateExpressContextOptions["req"]) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return false;

  const cookies = parseCookieHeader(cookieHeader);
  const token = cookies[ADMIN_SESSION_COOKIE_NAME];
  if (!token) return false;

  try {
    const secretKey = new TextEncoder().encode(ENV.cookieSecret);
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const scope = (payload as Partial<AdminSessionPayload>).scope;
    return scope === "admin-dashboard";
  } catch {
    return false;
  }
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch {
    user = null;
  }

  const isAdminSession = await getAdminSession(opts.req);

  return {
    req: opts.req,
    res: opts.res,
    user,
    isAdminSession,
  };
}
