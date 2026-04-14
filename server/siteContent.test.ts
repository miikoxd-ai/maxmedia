import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import { defaultSiteContent } from "./db";

const { getSiteContentMock, updateSiteContentMock } = vi.hoisted(() => ({
  getSiteContentMock: vi.fn(),
  updateSiteContentMock: vi.fn(),
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    getSiteContent: getSiteContentMock,
    updateSiteContent: updateSiteContentMock,
  };
});

const { appRouter } = await import("./routers");

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(role: "admin" | "user" | null): TrpcContext {
  const user: AuthenticatedUser | null =
    role === null
      ? null
      : {
          id: 1,
          openId: "sample-user",
          email: "sample@example.com",
          name: "Sample User",
          loginMethod: "manus",
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        };

  return {
    user,
    isAdminSession: role === "admin",
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("siteContent router", () => {
  beforeEach(() => {
    getSiteContentMock.mockReset();
    updateSiteContentMock.mockReset();
  });

  it("returns public site content for anonymous visitors", async () => {
    getSiteContentMock.mockResolvedValue(defaultSiteContent);
    const caller = appRouter.createCaller(createContext(null));

    const result = await caller.siteContent.getPublic();

    expect(result.heroHeadline).toBe(defaultSiteContent.heroHeadline);
    expect(getSiteContentMock).toHaveBeenCalledTimes(1);
  });

  it("allows admins to update site content", async () => {
    const { key: _key, ...input } = defaultSiteContent;
    const updated = {
      key: "main",
      ...input,
      heroHeadline: "Updated headline",
      updatedAt: new Date(),
    };

    updateSiteContentMock.mockResolvedValue(updated);

    const caller = appRouter.createCaller(createContext("admin"));
    const result = await caller.siteContent.update({
      ...input,
      heroHeadline: "Updated headline",
    });

    expect(updateSiteContentMock).toHaveBeenCalledWith({
      ...input,
      heroHeadline: "Updated headline",
    });
    expect(result.heroHeadline).toBe("Updated headline");
  });

  it("blocks non-admin users from updating site content", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    const { key: _key, ...input } = defaultSiteContent;

    await expect(caller.siteContent.update(input)).rejects.toThrow();
    expect(updateSiteContentMock).not.toHaveBeenCalled();
  });
});
