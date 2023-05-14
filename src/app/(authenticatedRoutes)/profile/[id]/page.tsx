import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/server/api/root";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({ prisma: prisma, user: null });
  const data = await caller.auth.getProfileById({ id: params.id });
  return {
    title: `${data?.username || ""} • Instagram`,
  };
}
export { Profile as default } from "~/pageComponents/Profile/Profile.page";
