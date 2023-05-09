import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export const Post = ({ params: { slug } }: Props) => {
  console.log(slug);
  return <div>{slug}</div>;
};
