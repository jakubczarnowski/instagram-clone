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
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.profiles.findFirstOrThrow({
        where: {
          id: input.id,
        },

        include: {
          userFollowsUserFollowsFollowerIdToprofiles: {
            where: {
              userId: ctx.user?.id || undefined,
            },
          },
          _count: {
            select: {
              posts: true,
              userFollowsUserFollowsFollowerIdToprofiles: true,
              userFollowsUserFollowsUserIdToprofiles: true,
            },
          },
          posts: {
            include: {
              postLikes: {
                where: {
                  userId: ctx.user?.id || undefined,
                },
              },
              comments: {
                include: {
                  commentLikes: true,
                },
              },
              profiles: {
                include: {
                  userFollowsUserFollowsFollowerIdToprofiles: {
                    where: {
                      userId: ctx.user?.id || undefined,
                    },
                  },
                },
              },
              _count: {
                select: {
                  postLikes: true,
                },
              },
            },
          },
        },
      });

      const parsedData = {
        ...data,
        isFollowing: !!data.userFollowsUserFollowsFollowerIdToprofiles.length,
        posts: data.posts.map((post) => ({
          ...post,
          isLiked: !!post.postLikes.length,
          likesCount: post._count.postLikes,
          followingUser:
            !!post.profiles.userFollowsUserFollowsFollowerIdToprofiles.length,
          comments: post.comments.map((val) => ({
            ...val,
            isLiked: val.commentLikes.length > 0,
          })),
        })),
      };
      return parsedData;
    }),
});
