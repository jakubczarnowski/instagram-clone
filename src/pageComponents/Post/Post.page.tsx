"use client";
import React from "react";
import { Post } from "~/components/Post/Post";

type Props = {
  params: {
    id: string;
  };
};

export const PostPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex h-full grow border border-gray-100 p-10">
      <Post id={id} />
    </div>
  );
};
