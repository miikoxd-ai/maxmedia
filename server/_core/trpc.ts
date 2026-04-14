import { initTRPC, TRPCError } from "@trpc/server";
import { ADMIN_UNAUTHED_ERR_MSG, UNAUTHED_ERR_MSG } from "../../shared/const";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

const requireAdminSession = t.middleware(async ({ ctx, next }) => {
  if (!ctx.isAdminSession) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: ADMIN_UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      isAdminSession: true,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);
export const adminProcedure = t.procedure.use(requireAdminSession);
