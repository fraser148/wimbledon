import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { pushsafer } from "@/server/pushsafer";

export const notifyRouter = createTRPCRouter({

  notify: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const title = `Court Code Update: ${input.id}`
      const res = await pushsafer.sendNotification(title, input.text);
      await ctx.prisma.courtNotification.create({
        data: {
          title,
          message: input.text,
          number: input.id
        },
      });
      return {
        message: `You said: ${input.text}`,
        id: input.id,
        success: res.success,
      };
    }),

  getStatus: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.courtNotification.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
    }),


  getAllStatus: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.courtNotification.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }),




  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
