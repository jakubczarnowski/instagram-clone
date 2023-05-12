import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Modal } from "~/components/Modal/Modal";
import { Post } from "~/components/Post/Post";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = (props: Props) => {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <Modal
      isOpen={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={onDismiss}
      style={{
        content: {
          height: "fit-content",
          padding: "0",
          margin: "auto auto",
        },
      }}
    >
      <Post id={props.params.id} />
    </Modal>
  );
};

export default PostModal;
