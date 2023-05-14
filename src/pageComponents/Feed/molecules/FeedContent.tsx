"use client";

import React, { useState } from "react";
import { FollowersPosts } from "./FollowersPosts";
import { PopularPosts } from "./PopularPosts";

export const FeedContent = () => {
  const [showPopularPosts, setShowPopularPosts] = useState(false);

  return (
    <section className="flex h-full grow flex-col items-center justify-center pt-10">
      <FollowersPosts onPostsEnd={() => setShowPopularPosts(true)} />
      {showPopularPosts && <PopularPosts />}
    </section>
  );
};
