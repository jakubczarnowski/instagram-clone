import Image, { type ImageProps } from "next/image";
import React from "react";
import { cn } from "~/utils/cn";
import { RxAvatar } from "react-icons/rx";
type Props = {
  className?: string;
  avatarUrl?: string | null;
  username: string;
} & Omit<Partial<ImageProps>, "src">;

export const Avatar = ({
  className,
  avatarUrl,
  username,
  ...imageProps
}: Props) => {
  return (
    <>
      {!!avatarUrl ? (
        <Image
          alt={username}
          src={avatarUrl}
          width={32}
          height={32}
          className={cn("rounded-full", className)}
          {...imageProps}
        />
      ) : (
        <RxAvatar
          width={32 || imageProps.width}
          height={32 || imageProps.height}
          size={imageProps.height}
          className={cn("rounded-full", className)}
        />
      )}
    </>
  );
};
