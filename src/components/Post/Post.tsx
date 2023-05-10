"use client";
import { formatDistance } from "date-fns";
import React from "react";
import { api, cn } from "~/utils";
import { CommentInput } from "../PostCard/molecules/CommentInput";
import { PostHead } from "../PostCard/molecules/PostHead";
import { PostIcons } from "../PostCard/organisms/PostIcons";
import { LoadingScreen } from "../Spinner";
import Image from "next/image";
import { Comment } from "../Comment/Comment";

type Props = {
  id: string;
  className?: string;
};

export const Post = ({ id, className }: Props) => {
  const { data, isLoading, error } = api.posts.getPost.useQuery({ postId: id });
  if (error) return <p>There has been an error</p>;
  if (isLoading || !data) return <LoadingScreen />;
  return (
    <div
      className={cn(
        "flex max-h-full w-full grow flex-col bg-white md:flex-row",
        className
      )}
    >
      <div className="relative aspect-square h-auto w-full grow">
        <Image
          fill
          alt="Image"
          src={data?.imageUrl || ""}
          style={{ objectFit: "fill", aspectRatio: "1/1" }}
        />
      </div>
      <div className="flex min-w-fit max-w-full flex-col items-center justify-between p-3 sm:max-h-[600px] md:max-h-full md:max-w-[500px]">
        <div className="flex max-h-full w-full flex-col gap-2">
          <PostHead
            avatarUrl={data.profiles.avatarUrl || ""}
            createdAt={data.createdAt.toString()}
            isFollowed={data.followingUser}
            userId={data.profiles.id}
            username={data.profiles.username || ""}
          />
          <hr className="my-2 border-b border-gray-100" />
          <Comment
            className="mb-2"
            postId={id}
            likesCount={data.likesCount}
            createdAt={data.createdAt.toString()}
            avatarUrl={data.profiles.avatarUrl || ""}
            username={data.profiles.username || ""}
            content={data.title}
          />
          <div className="flex max-h-[300px] grow flex-col gap-2 overflow-auto md:max-h-full">
            {data.comments.map((comment) => (
              <Comment
                key={comment.id}
                postId={id}
                id={comment.id}
                isLiked={comment.isLiked}
                likesCount={comment._count.commentLikes}
                createdAt={comment.createdAt.toString()}
                avatarUrl={comment.profiles.avatarUrl || ""}
                username={comment.profiles.username || ""}
                content={comment.content}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <hr className="border-b border-gray-100" />
          <div className="flex flex-col gap-1">
            <PostIcons postId={id} isLiked={data.isLiked} />
            <h2 className="text-sm font-semibold">
              Likes amount: {data.likesCount}
            </h2>
            <p className="text-xs font-light">
              {formatDistance(new Date(data.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
            <CommentInput postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
