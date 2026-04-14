import { SignJWT } from "jose";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_UNAUTHED_ERR_MSG,
  COOKIE_NAME,
  ONE_YEAR_MS,
} from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { getSiteContent, updateSiteContent } from "./db";

const siteContentSchema = z.object({
  heroEyebrow: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroSupportingText: z.string().min(1),
  heroPrimaryCta: z.string().min(1),
  heroSecondaryCta: z.string().min(1),
  servicesTitle: z.string().min(1),
  servicesIntro: z.string().min(1),
  aboutTitle: z.string().min(1),
  aboutBody: z.string().min(1),
  trustPointOne: z.string().min(1),
  trustPointTwo: z.string().min(1),
  trustPointThree: z.string().min(1),
  portfolioTitle: z.string().min(1),
  portfolioIntro: z.string().min(1),
  featuredWorkTitle: z.string().min(1),
  featuredWorkDescription: z.string().min(1),
  instagramPostUrl: z.string().url(),
  instagramReelOneUrl: z.string().url(),
  instagramReelTwoUrl: z.string().url(),
  instagramReelThreeUrl: z.string().url(),
  contactTitle: z.string().min(1),
  contactIntro: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  instagramProfileUrl: z.string().url(),
  footerText: z.string().min(1),
});

const adminPasswordSchema = z.object({
  password: z.string().min(1),
});

async function createAdminSessionToken() {
  const secretKey = new TextEncoder().encode(ENV.cookieSecret);
  const expirationSeconds = Math.floor((Date.now() + ONE_YEAR_MS) / 1000);

  return new SignJWT({ scope: "admin-dashboard" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    adminStatus: publicProcedure.query(({ ctx }) => ({ authenticated: ctx.isAdminSession })),
    adminLogin: publicProcedure.input(adminPasswordSchema).mutation(async ({ ctx, input }) => {
      if (!ENV.adminDashboardPassword || input.password !== ENV.adminDashboardPassword) {
        throw new Error(ADMIN_UNAUTHED_ERR_MSG);
      }

      const cookieOptions = getSessionCookieOptions(ctx.req);
      const token = await createAdminSessionToken();

      ctx.res.cookie(ADMIN_SESSION_COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      return { success: true } as const;
    }),
    adminLogout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(ADMIN_SESSION_COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  siteContent: router({
    getPublic: publicProcedure.query(async () => getSiteContent()),
    getAdmin: adminProcedure.query(async () => getSiteContent()),
    update: adminProcedure.input(siteContentSchema).mutation(async ({ input }) => {
      return updateSiteContent(input);
    }),
  }),
});

export type AppRouter = typeof appRouter;
