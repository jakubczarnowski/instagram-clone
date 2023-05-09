import React from "react";
import { BsSend } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LikeButton } from "../molecules/LikeButton";

type Props = {
  postId: string;
  isLiked: boolean;
};

export const PostIcons = ({ isLiked, postId }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <LikeButton liked={isLiked} postId={postId} />
      <button className="flex items-center gap-2 p-2">
        <FaRegComment size="20px" />
      </button>
      <button className="flex items-center gap-2 p-2">
        <BsSend size="20px" />
      </button>
    </div>
  );
};
