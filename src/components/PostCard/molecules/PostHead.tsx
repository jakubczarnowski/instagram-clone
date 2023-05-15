import { formatDistance } from "date-fns";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { Avatar } from "~/components/Avatar/Avatar";
import { FollowButton } from "~/components/FollowButton/FollowButton";
import { useUser } from "~/providers/AuthProvider";
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
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <Avatar avatarUrl={avatarUrl} username={username} />
        <Link href={`/profile/${userId}`} className="text-sm font-semibold ">
          {username}
        </Link>
        •
        <p className="text-sm text-gray-500">
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
        </p>
        {!isFollowed && (
          <>
            •
            <FollowButton
              variant="ghost"
              userId={userId}
              className=" cursor-pointer text-sm font-bold text-blue-600"
            >
              Follow
            </FollowButton>
          </>
        )}
      </div>
      <button>
        <BsThreeDots size={"25px"} />
      </button>
    </div>
  );
};
