import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

type Props = {
  id: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
};

export const PostOverlay = ({
  commentCount,
  imageUrl,
  likeCount,
  id,
}: Props) => {
  return (
    <div className="group relative aspect-square w-full">
      <Image
        src={imageUrl}
        fill
        alt="Post Image"
        className="aspect-square object-fill"
      />
      <Link
        href={`/post/${id}`}
        className="invisible absolute bottom-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-60 group-hover:visible"
      >
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center gap-1">
            <AiFillHeart fill={"white"} size={16} />
            <p className="text-white">{likeCount}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <FaComment fill={"white"} size={16} />
            <p className="text-white">{commentCount}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
