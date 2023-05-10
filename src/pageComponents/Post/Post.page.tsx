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
    <div className="flex flex-col p-10">
      <Post className="border border-gray-100" id={id} />
    </div>
  );
};
