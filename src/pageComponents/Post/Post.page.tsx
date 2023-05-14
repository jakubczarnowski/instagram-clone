import React from "react";
import { PostContent } from "./molecules/PostContent";

type Props = {
  params: {
    id: string;
  };
};

export const PostPage = ({ params: { id } }: Props) => {
  return <PostContent id={id} />;
};
