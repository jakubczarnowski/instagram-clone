import React from "react";
import { ImagesImage } from "~/assets/ImagesImage";
import { useFilePicker } from "use-file-picker";
import Modal from "react-modal";
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const CreatePostModal = ({ isOpen, handleClose }: Props) => {
  const [
    openFileSelector,
    { filesContent, loading, errors, clear, plainFiles },
  ] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 80,
  });
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <div className="flex h-full flex-col items-center rounded-xl">
        <h1 className="w-full border-b py-2 text-center text-2xl font-semibold">
          Create a post
        </h1>
        <div className="flex grow flex-col items-center justify-center gap-2">
          <ImagesImage width={100} />
          <p>Drag and drop files here</p>
          <button
            onClick={() => openFileSelector()}
            className="rounded-md bg-blue-400 p-2 text-white"
          >
            Select from computer
          </button>
        </div>
      </div>
    </Modal>
  );
};
