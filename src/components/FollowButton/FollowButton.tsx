import React from "react";
import { useUser } from "~/providers/AuthProvider";
import { api } from "~/utils";
import { Button, type ButtonProps } from "../ui/button";

type Props = ButtonProps & {
  userId: string;
};

export const FollowButton = ({
  className,
  children,
  userId,
  ...props
}: Props) => {
  const utils = api.useContext();
  const { user } = useUser();
  const { mutate: follow } = api.posts.followUser.useMutation({
    onSuccess: () => {
      utils.auth.getProfileById.setData({ id: userId }, (data) => {
        if (!data) return;
        return {
          ...data,
          isFollowing: true,
          _count: {
            ...data._count,
            userFollowsUserFollowsUserIdToprofiles:
              data._count.userFollowsUserFollowsUserIdToprofiles + 1,
          },
        };
      });
      utils.auth.getProfileById.setData({ id: user?.id || "" }, (data) => {
        if (!data) return;
        return {
          ...data,
          _count: {
            ...data._count,
            userFollowsUserFollowsFollowerIdToprofiles:
              data._count.userFollowsUserFollowsFollowerIdToprofiles + 1,
          },
        };
      });
    },
  });
  return (
    <Button onClick={() => follow({ userId })} className={className} {...props}>
      {children}
    </Button>
  );
};
