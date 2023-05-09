import React from "react";
import { Modal } from "~/components/Modal/Modal";
import { Post } from "~/pageComponents/Post/Post.page";

type Props = {
  params: {
    slug: string;
  };
};

const PostModal = (props: Props) => {
  console.log("xrfheruyvreuihilerd");
  return (
    <Modal>
      <Post {...props} />
    </Modal>
  );
};

export default PostModal;
