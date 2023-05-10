import { formatDistance } from "date-fns";
import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { cn } from "~/utils/cn";
import { api } from "~/utils/api";

type Props = {
  id?: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  likesCount: number;
  className?: string;
  isLiked?: boolean;
  postId: string;
};

export const Comment = ({
  id,
  username,
  createdAt,
  avatarUrl,
  content,
  likesCount,
  className,
  postId,
  isLiked,
}: Props) => {
  const utils = api.useContext();
  const { mutate: likeComment, isLoading: likeLoading } =
    api.posts.likeComment.useMutation({
      onMutate: () => {
        void utils.posts.getPost.setData({ postId }, (data) => {
          if (!data) return;
          return {
            ...data,
            comments: data.comments.map((comment) => {
              if (comment.id === id) {
                return {
                  ...comment,
                  _count: {
                    commentLikes: comment._count.commentLikes + 1,
                  },
                  isLiked: true,
                };
              }
              return comment;
            }),
          };
        });
      },
    });
  const { mutate: unlikeComment, isLoading: isUnlikeLoading } =
    api.posts.unlikeComment.useMutation({
      onMutate: () => {
        void utils.posts.getPost.setData({ postId }, (data) => {
          if (!data) return;
          return {
            ...data,
            comments: data.comments.map((comment) => {
              if (comment.id === id) {
                return {
                  ...comment,
                  _count: {
                    commentLikes: comment._count.commentLikes - 1,
                  },
                  isLiked: false,
                };
              }
              return comment;
            }),
          };
        });
      },
    });
  const handleLike = () => {
    if (!id) return;
    if (isUnlikeLoading || likeLoading) return;
    if (isLiked) {
      unlikeComment({ commentId: id });
      return;
    }
    likeComment({ commentId: id });
  };
  return (
    <div className={cn("flex flex-row gap-2", className)}>
      <div className="relative flex items-center">
        <Avatar avatarUrl={avatarUrl} username={username} />
      </div>
      <div className="flex max-w-full grow flex-col gap-1 md:max-w-[300px]">
        <div className="flex  items-center gap-1">
          <h2 className="break-all text-sm">
            <span className="mr-1 font-semibold">{username}</span>
            {content}
          </h2>
        </div>
        <div className="flex grow flex-row items-center gap-1">
          <p className="text-xs">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
          {id && (
            <>
              <p className="text-xs font-semibold">{likesCount} likes</p>
              <button className="text-xs font-semibold">Respond</button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {id && (
          <button
            onClick={() => handleLike()}
            className="text-sm font-semibold"
          >
            {isLiked ? (
              <AiFillHeart fill="red" size="20px" />
            ) : (
              <AiOutlineHeart size="20px" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
