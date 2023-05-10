import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LikeButton } from "../molecules/LikeButton";
import Link from "next/link";

type Props = {
  postId: string;
  isLiked: boolean;
};

export const PostIcons = ({ isLiked, postId }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <LikeButton liked={isLiked} postId={postId} />
      <button className="flex items-center gap-2 p-2">
        <Link href={`/post/${postId}`}>
          <FaRegComment size="20px" />
        </Link>
      </button>
    </div>
  );
};
