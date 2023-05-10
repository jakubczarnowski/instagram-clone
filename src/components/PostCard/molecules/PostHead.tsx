import { formatDistance } from "date-fns";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { Avatar } from "~/components/Avatar/Avatar";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

type Props = {
  username: string;
  avatarUrl: string;
  createdAt: string;
  userId: string;
  isFollowed: boolean;
  className?: string;
};

export const PostHead = ({
  username,
  avatarUrl,
  createdAt,
  isFollowed,
  userId,
  className,
}: Props) => {
  const { mutate: follow } = api.posts.followUser.useMutation();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <Avatar avatarUrl={avatarUrl} username={username} />
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
  );
};
