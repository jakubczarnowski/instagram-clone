import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "~/components/PostCard/PostCard";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils";

export const FollowersPosts = ({ onPostsEnd }: { onPostsEnd: () => void }) => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    api.posts.getPostsByFriends.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id }
    );
  const notifiedPostsEnded = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) {
        void fetchNextPage();
      }
    },
  });
  if (hasNextPage === false && !notifiedPostsEnded.current) {
    notifiedPostsEnded.current = true;
    onPostsEnd();
  }
  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-4">
        {data?.pages.map((page) =>
          page.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              avatarUrl={post.profiles.avatarUrl || ""}
              commentsAmount={post.comments.length}
              createdAt={post.createdAt.toString()}
              isLiked={post.isLiked}
              likesAmount={post.likesCount}
              postImageUrl={post.imageUrl}
              title={post.title}
              userId={post.profiles.id}
              username={post.profiles.username || ""}
              isFollowed={post.followingUser}
            />
          ))
        )}
        {(isFetchingNextPage || isLoading) && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div style={{ visibility: "hidden" }} ref={ref} />
        {hasNextPage === false && (
          <p className="mb-5 text-sm text-gray-500">
            That&apos;s it! No more posts from your followers!
          </p>
        )}
      </div>
    </>
  );
};
