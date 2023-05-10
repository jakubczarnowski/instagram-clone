import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const POSTS_LIMIT = 5;

export const postsRouter = createTRPCRouter({
  createPost: privateProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getPopularPostsInfinite: privateProcedure
    .input(z.object({ cursor: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.posts.findMany({
        where: {
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          },
        },
        orderBy: {
          postLikes: {
            _count: "desc",
          },
        },
        include: {
          postLikes: {
            where: {
              userId: ctx.user.id,
            },
          },
          comments: true,
          profiles: {
            include: {
              userFollowsUserFollowsFollowerIdToprofiles: {
                where: {
                  userId: ctx.user.id,
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
        skip: input.cursor ? 1 : 0,
        take: POSTS_LIMIT,
        cursor: input.cursor ? { id: input.cursor } : undefined,
      });
      const parsedData = data.map((val) => ({
        ...val,
        isLiked: val.postLikes.length > 0,
        likesCount: val._count.postLikes,
        followingUser:
          val.profiles.userFollowsUserFollowsFollowerIdToprofiles.length > 0,
      }));
      return parsedData;
    }),
  likePost: privateProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.postLikes.create({
        data: {
          postId: input.postId,
          userId: ctx.user.id,
        },
      });
    }),
  unlikePost: privateProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.postLikes.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.user.id,
          },
        },
      });
    }),
  addComment: privateProcedure
    .input(z.object({ postId: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.create({
        data: {
          postId: input.postId,
          userId: ctx.user.id,
          content: input.text,
        },
      });
    }),
  followUser: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.userFollows.create({
        data: {
          userId: ctx.user.id,
          followerId: input.userId,
        },
      });
    }),
  getPost: privateProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.posts.findFirstOrThrow({
        where: {
          id: input.postId,
        },
        include: {
          postLikes: {
            where: {
              userId: ctx.user.id,
            },
          },
          comments: {
            include: {
              profiles: true,
              commentLikes: {
                where: {
                  userId: ctx.user.id,
                },
              },
              _count: {
                select: {
                  commentLikes: true,
                },
              },
            },
          },
          profiles: {
            include: {
              userFollowsUserFollowsFollowerIdToprofiles: {
                where: {
                  userId: ctx.user.id,
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
      });
      const parsedData = {
        ...data,
        isLiked: !!data.postLikes.length,
        likesCount: data._count.postLikes,
        followingUser:
          !!data.profiles.userFollowsUserFollowsFollowerIdToprofiles.length,
        comments: data.comments.map((val) => ({
          ...val,
          isLiked: val.commentLikes.length > 0,
        })),
      };
      return parsedData;
    }),
  likeComment: privateProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.commentLikes.create({
        data: {
          commentId: input.commentId,
          userId: ctx.user.id,
        },
      });
    }),
  unlikeComment: privateProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.commentLikes.delete({
        where: {
          userId_commentId: {
            commentId: input.commentId,
            userId: ctx.user.id,
          },
        },
      });
    }),
});
