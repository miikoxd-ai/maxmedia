import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { ENV } from "./_core/env";
import { ADMIN_SESSION_COOKIE_NAME, ADMIN_UNAUTHED_ERR_MSG } from "../shared/const";

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createContext(isAdminSession = false): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    isAdminSession,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx, cookies };
}

describe("auth.adminLogin", () => {
  beforeEach(() => {
    expect(ENV.adminDashboardPassword).toBeTruthy();
  });

  it("accepts the configured admin dashboard password and issues the admin session cookie", async () => {
    const { ctx, cookies } = createContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.adminLogin({
      password: ENV.adminDashboardPassword,
    });

    expect(result).toEqual({ success: true });
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe(ADMIN_SESSION_COOKIE_NAME);
    expect(cookies[0]?.value).toBeTruthy();
    expect(cookies[0]?.options).toMatchObject({
      httpOnly: true,
      sameSite: "none",
      path: "/",
      secure: true,
    });
  });

  it("rejects an invalid admin dashboard password", async () => {
    const { ctx } = createContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.adminLogin({
        password: `${ENV.adminDashboardPassword}-invalid`,
      })
    ).rejects.toThrow(ADMIN_UNAUTHED_ERR_MSG);
  });
});
