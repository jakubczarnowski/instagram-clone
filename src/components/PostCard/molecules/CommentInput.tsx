import React, { useState } from "react";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";

type Props = {
  postId: string;
};

export const CommentInput = ({ postId }: Props) => {
  const [comment, setComment] = useState("");
  const utils = api.useContext();
  const { mutate: addComment, isLoading } = api.posts.addComment.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      setComment("");
    },
  });
  return (
    <div className="flex flex-row items-center gap-1">
      <input
        placeholder="Add an comment..."
        onChange={(e) => setComment(e.currentTarget.value)}
        value={comment}
        className="grow py-2 outline-none"
      />
      {!!comment && (
        <button
          disabled={isLoading}
          className="font-semibold text-blue-600"
          onClick={() => addComment({ postId, text: comment })}
        >
          Post
        </button>
      )}
      {isLoading && <Spinner styles="h-4 w-4" />}
    </div>
  );
};
