import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getProfile: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.profiles.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
