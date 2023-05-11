"use client";
import React, { useState } from "react";
import { FollowersPosts } from "./molecules/FollowersPosts";
import { PopularPosts } from "./molecules/PopularPosts";
export const Feed = () => {
  const [showPopularPosts, setShowPopularPosts] = useState(false);
  return (
    <section className="flex h-full grow flex-col items-center justify-center pt-10">
      <FollowersPosts onPostsEnd={() => setShowPopularPosts(true)} />
      {showPopularPosts && <PopularPosts />}
    </section>
  );
};
