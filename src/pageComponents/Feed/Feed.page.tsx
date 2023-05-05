import React from "react";
import withPrivateRoute from "~/shared/hocs/withPrivateRoute";

const FeedPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>teststs</p>
    </main>
  );
};
export const Feed = withPrivateRoute(FeedPage);
