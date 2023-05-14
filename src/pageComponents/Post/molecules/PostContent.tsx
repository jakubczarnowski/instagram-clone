"use client";
import React from "react";
import { Post } from "~/components/Post/Post";

export const PostContent = ({ id }: { id: string }) => {
  return (
    <div className="flex flex-col p-10">
      <Post className="border border-gray-100" id={id} />
    </div>
  );
};
