"use client";
import React from "react";
import { Avatar } from "~/components/Avatar/Avatar";
import { Divider } from "~/components/Divider/Divider";
import { FollowButton } from "~/components/FollowButton/FollowButton";
import { PostOverlay } from "~/components/PostOverlay/PostOverlay";
import { useUser } from "~/providers/AuthProvider";
import { api } from "~/utils";

type Props = {
  params: {
    id: string;
  };
};

export const Profile = (props: Props) => {
  const { data } = api.auth.getProfileById.useQuery({ id: props.params.id });
  const { user } = useUser();
  return (
    <section className="flex h-full grow flex-col items-center pt-10">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="relative mr-10 shrink-0 grow">
            <Avatar
              username={data?.username || ""}
              alt="profile"
              avatarUrl={data?.avatarUrl}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <div className="flex grow-[2] flex-col gap-3 ">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-xl">{data?.username}</h1>
              {data?.id && data?.id !== user?.id && (
                <FollowButton
                  size="sm"
                  variant="outline"
                  userId={data?.id}
                  className="text-sm"
                >
                  {data.isFollowing ? "Unfollow" : "Follow"}
                </FollowButton>
              )}
            </div>
            <div className="flex flex-row items-center gap-4">
              <p className="text-base">
                Posts:{" "}
                <span className="font-semibold">{data?._count.posts}</span>
              </p>
              <p className="text-base">
                <span className="font-semibold">
                  {data?._count.userFollowsUserFollowsFollowerIdToprofiles}
                </span>{" "}
                Followers
              </p>
              <p className="text-base">
                Following:{" "}
                <span className="font-semibold">
                  {data?._count.userFollowsUserFollowsUserIdToprofiles}
                </span>
              </p>
            </div>
            <p className="text-sm">
              {data?.bio ||
                "Bio not available: This user's biography is currently enjoying a spontaneous adventure. It will return with tales of heroism, humor, and maybe a few unicorns. Stay tuned!"}
            </p>
          </div>
        </div>
        <Divider className="my-5" />
        <div className="grid w-full grid-cols-3 gap-1">
          {data?.posts.map((post) => (
            <PostOverlay
              key={post.id}
              id={post.id}
              commentCount={post.comments.length}
              imageUrl={post.imageUrl}
              likeCount={post.likesCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
