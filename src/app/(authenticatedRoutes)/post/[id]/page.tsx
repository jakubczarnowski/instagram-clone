import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/server/api/root";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({ prisma: prisma, user: null });
  const data = await caller.posts.getPost({ postId: params.id });
  return {
    title: `${data.title} • Instagram`,
  };
}

export { PostPage as default } from "~/pageComponents/Post/Post.page";
