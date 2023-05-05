import React from "react";
import withPrivateRoute from "~/shared/hocs/withPrivateRoute";

const FeedPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <p>teststs</p>
    </main>
  );
};
export const Feed = withPrivateRoute(FeedPage);
