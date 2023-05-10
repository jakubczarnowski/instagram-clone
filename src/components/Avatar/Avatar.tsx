import Image from "next/image";
import React from "react";
import { cn } from "~/utils/cn";

type Props = {
  className?: string;
  avatarUrl: string;
  username: string;
};

export const Avatar = ({ className, avatarUrl, username }: Props) => {
  return (
    <Image
      alt={username}
      src={avatarUrl}
      width={32}
      height={32}
      className={cn("rounded-full", className)}
    />
  );
};
