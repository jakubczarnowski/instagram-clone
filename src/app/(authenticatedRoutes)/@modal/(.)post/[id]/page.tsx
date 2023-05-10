import React from "react";
import { Modal } from "~/components/Modal/Modal";
import { Post } from "~/components/Post/Post";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = (props: Props) => {
  return (
    <Modal>
      <Post id={props.params.id} />
    </Modal>
  );
};

export default PostModal;
