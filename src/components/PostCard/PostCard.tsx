import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";
import { BsSend, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LikeButton } from "./molecules/LikeButton";
import { CommentInput } from "./molecules/CommentInput";
import { api } from "~/utils/api";
import { PostIcons } from "./organisms/PostIcons";

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
  const { mutate: follow } = api.posts.followUser.useMutation();
  return (
    <div className="flex h-full w-full max-w-[468px] flex-col gap-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            alt={username}
            src={avatarUrl}
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="text-sm font-semibold">{username}</h2>•
          <p className="text-sm text-gray-500">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
          {!isFollowed && (
            <>
              •
              <a
                onClick={() => follow({ userId })}
                className=" cursor-pointer text-sm font-bold text-blue-600"
              >
                Follow
              </a>
            </>
          )}
        </div>
        <button>
          <BsThreeDots size={"25px"} />
        </button>
      </div>
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
        <h2 className="cursor-pointer text-sm text-gray-500">
          See all comments: {commentsAmount}
        </h2>
        <CommentInput postId={id} />
      </div>
      <hr className="h-1 w-full" />
    </div>
  );
};
