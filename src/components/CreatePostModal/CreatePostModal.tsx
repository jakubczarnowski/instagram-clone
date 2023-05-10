import React, { useRef, useState } from "react";
import { ImagesImage } from "~/assets/ImagesImage";
import { useFilePicker } from "use-file-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CropImageModal } from "./molecules/CropImageModal";
import { Modal } from "../Modal/Modal";
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const newPostValidationSchema = z.object({
  imageToUpload: z.instanceof(File).nullable(),
  content: z.string().min(1).max(280),
});

export const CreatePostModal = ({ isOpen, handleClose }: Props) => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 80,
  });
  const previousFiles = useRef({ filesContent, plainFiles });
  if (
    filesContent.length > 0 &&
    plainFiles.length > 0 &&
    previousFiles.current.filesContent !== filesContent &&
    previousFiles.current.plainFiles !== plainFiles
  ) {
    previousFiles.current = { filesContent, plainFiles };
    console.log(
      "filesContent",
      filesContent,
      "plainFiles",
      plainFiles,
      "previousFiles",
      previousFiles.current
    );

    setCropModalOpen(true);
  }
  const { handleSubmit, formState, setValue } = useForm<
    z.infer<typeof newPostValidationSchema>
  >({
    defaultValues: {
      imageToUpload: null,
      content: "",
    },
    resolver: zodResolver(newPostValidationSchema),
  });
  const handleCropAccepted = (file: Blob, content: string) => {
    setImageSource(content);
    setValue("imageToUpload", new File([file], "image.png"));
  };
  if (!isOpen) return null;
  return (
    <>
      <CropImageModal
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        file={plainFiles.length > 0 ? (plainFiles[0] as File) : null}
        onCropAccepted={handleCropAccepted}
        aspectRatio={1}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={{ content: { padding: 0 } }}
      >
        {imageSource ? (
          <div className="flex h-full flex-col items-center rounded-xl">
            <h1 className="w-full border-b py-2 text-center text-2xl font-semibold">
              Create a post
            </h1>
            <div className="flex grow flex-col items-center justify-center gap-2">
              <img src={imageSource} alt="preview" />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center rounded-xl">
            <h1 className="w-full border-b py-2 text-center text-2xl font-semibold">
              Create a post
            </h1>
            <div className="flex grow flex-col items-center justify-center gap-2">
              <ImagesImage width={100} />
              <button
                onClick={() => openFileSelector()}
                className="rounded-md bg-blue-400 p-2 text-white"
              >
                Select from computer
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
