import React from "react";
import { InterceptionModal } from "~/components/InterceptionModal/InterceptionModal";
import { Post } from "~/components/Post/Post";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = (props: Props) => {
  return (
    <InterceptionModal>
      <Post id={props.params.id} />
    </InterceptionModal>
  );
};

export default PostModal;
