import React, { type HTMLAttributes } from "react";
import { cn } from "~/utils";

type Props = HTMLAttributes<HTMLHRElement>;

export const Divider = ({ className, ...props }: Props) => {
  return (
    <hr
      className={cn("w-full border-b border-gray-100", className)}
      {...props}
    />
  );
};
