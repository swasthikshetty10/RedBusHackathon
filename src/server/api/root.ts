import { createTRPCRouter } from "@/server/api/trpc";
import { streamRouter } from "@/server/api/routers/stream";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  stream: streamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
