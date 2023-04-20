import { z } from "zod";
import { pusher } from "@/lib/pusher";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const streamRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        image: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await pusher.trigger("object-detection", "object-detection", {
        message: input,
      });
      return true;
    }),
});
