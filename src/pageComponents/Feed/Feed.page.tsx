import React from "react";
import withPrivateRoute from "~/shared/hocs/withPrivateRoute";
const FeedPage = () => {
  return (
    <main className="flex h-full grow items-center justify-center">
      FEEEEEEEEEED
    </main>
  );
};
export const Feed = withPrivateRoute(FeedPage);
