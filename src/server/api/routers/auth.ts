import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  deleteAccount: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getProfile: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.profiles.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
