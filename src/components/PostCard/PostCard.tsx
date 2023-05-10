import Image from "next/image";
import React from "react";
import { CommentInput } from "./molecules/CommentInput";
import { PostIcons } from "./organisms/PostIcons";
import Link from "next/link";
import { PostHead } from "./molecules/PostHead";

type Props = {
  id: string;
  postImageUrl: string;
  title: string;
  likesAmount: number;
  commentsAmount: number;
  avatarUrl: string;
  userId: string;
  username: string;
  createdAt: string;
  isLiked: boolean;
  isFollowed: boolean;
};

export const PostCard = ({
  id,
  avatarUrl,
  commentsAmount,
  createdAt,
  isLiked,
  likesAmount,
  postImageUrl,
  title,
  userId,
  username,
  isFollowed,
}: Props) => {
  return (
    <div className="flex h-full w-full max-w-[468px] flex-col gap-2">
      <PostHead
        avatarUrl={avatarUrl}
        createdAt={createdAt}
        className="mb-2"
        isFollowed={isFollowed}
        userId={userId}
        username={username}
      />
      <div className="relative flex h-[584px] w-full max-w-[468px]">
        <Image
          alt={title}
          src={postImageUrl}
          fill
          className="rounded-sm object-fill"
        />
      </div>
      <PostIcons postId={id} isLiked={isLiked} />
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold">Likes amount: {likesAmount}</h2>
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold">{username}</h2>
          <p className="text-sm">{title}</p>
        </div>
        <Link
          href={`/post/${id}`}
          className="cursor-pointer text-sm text-gray-500"
        >
          See all comments: {commentsAmount}
        </Link>
        <CommentInput postId={id} />
      </div>
      <hr className="h-1 w-full" />
    </div>
  );
};
