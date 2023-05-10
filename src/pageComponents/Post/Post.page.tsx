"use client";

import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";
import { Comment } from "~/components/Comment/Comment";
import { CommentInput } from "~/components/PostCard/molecules/CommentInput";
import { PostHead } from "~/components/PostCard/molecules/PostHead";
import { PostIcons } from "~/components/PostCard/organisms/PostIcons";
import { LoadingScreen } from "~/components/Spinner";
import { api } from "~/utils/api";

type Props = {
  params: {
    id: string;
  };
};

export const Post = ({ params: { id } }: Props) => {
  console.log(id);
  const { data, isLoading, error } = api.posts.getPost.useQuery({ postId: id });
  if (error) return <p>There has been an error</p>;
  if (isLoading || !data) return <LoadingScreen />;
  return (
    <div className="flex h-full w-full grow flex-row bg-white">
      <div className="relative h-full w-full grow">
        <Image
          fill
          alt="Image"
          src={data?.imageUrl || ""}
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className="flex min-w-fit max-w-[500px] flex-col items-center justify-between p-3">
        <div className="flex w-full flex-col gap-2">
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
