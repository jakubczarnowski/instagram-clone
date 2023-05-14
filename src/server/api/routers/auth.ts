import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getProfile: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.profiles.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
  }),
  getProfileById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.profiles.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
