import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { api } from "~/utils/api";

type Props = {
  liked: boolean;
  postId: string;
};

export const LikeButton = ({ liked, postId }: Props) => {
  const utils = api.useContext();
  const { mutate: likePost } = api.posts.likePost.useMutation({
    onMutate: () => {
      void utils.posts.getPopularPostsInfinite.setInfiniteData({}, (data) => {
        if (!data) return { pages: [], pageParams: [] };
        const newData = data?.pages.map((page) => {
          return page.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likesCount: post.likesCount + 1,
                isLiked: true,
              };
            }
            return post;
          });
        });
        return { ...data, pages: newData };
      });
      void utils.posts.getPostsByFriends.setInfiniteData({}, (data) => {
        // TODO: This is a temporary fix for the infinite data not updating when unliking a post
        if (!data) return { pages: [], pageParams: [] };
        const newData = data?.pages.map((page) => {
          return page.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likesCount: post.likesCount + 1,
                isLiked: true,
              };
            }
            return post;
          });
        });
        return { ...data, pages: newData };
      });
    },
  });
  const { mutate: unlikePost } = api.posts.unlikePost.useMutation({
    onMutate: () => {
      void utils.posts.getPopularPostsInfinite.setInfiniteData({}, (data) => {
        if (!data) return { pages: [], pageParams: [] };
        const newData = data?.pages.map((page) => {
          return page.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likesCount: post.likesCount - 1,
                isLiked: false,
              };
            }
            return post;
          });
        });
        return { ...data, pages: newData };
      });
      void utils.posts.getPostsByFriends.setInfiniteData({}, (data) => {
        // TODO: This is a temporary fix for the infinite data not updating when unliking a post
        if (!data) return { pages: [], pageParams: [] };
        const newData = data?.pages.map((page) => {
          return page.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likesCount: post.likesCount - 1,
                isLiked: false,
              };
            }
            return post;
          });
        });
        return { ...data, pages: newData };
      });
    },
  });
  const handleLikePost = () => {
    if (liked) {
      void unlikePost({ postId });
    } else {
      void likePost({ postId });
    }
  };
  return (
    <button
      onClick={() => handleLikePost()}
      className="flex items-center gap-2 pr-2"
    >
      {liked ? (
        <AiFillHeart fill="red" size="25px" />
      ) : (
        <AiOutlineHeart size="25px" />
      )}
    </button>
  );
};
