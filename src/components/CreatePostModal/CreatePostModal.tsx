import React, { useState } from "react";
import { ImagesImage } from "~/assets/ImagesImage";
import { useFilePicker } from "use-file-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageCrop } from "./molecules/ImageCrop";
import { Modal } from "../Modal/Modal";
import Image from "next/image";
import { api } from "~/utils";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../ui/button";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const newPostValidationSchema = z.object({
  imageToUpload: z
    .instanceof(File)
    .nullable()
    .refine((val) => !!val), // Can be null, but throw on submit
  content: z.string().min(1).max(280),
});

export const CreatePostModal = ({ isOpen, handleClose }: Props) => {
  const { data: profile } = api.auth.getProfile.useQuery();
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [openFileSelector, { plainFiles, clear }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 80,
  });

  const { handleSubmit, formState, setValue, register, watch } = useForm<
    z.infer<typeof newPostValidationSchema>
  >({
    defaultValues: {
      content: "",
      imageToUpload: null,
    },
    resolver: zodResolver(newPostValidationSchema),
  });
  const handleCropAccepted = (file: Blob, content: string) => {
    setImageSource(content);
    setValue("imageToUpload", new File([file], "image.png"));
  };
  const handleClear = () => {
    setValue("imageToUpload", null);
    setImageSource(null);
    clear();
  };
  const onSubmit = (data: z.infer<typeof newPostValidationSchema>) => {
    console.log(data);
  };
  const fileUploaded = !!watch("imageToUpload");
  if (!isOpen) return null;
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={handleClose}>
        <div className="flex h-full min-h-[600px] flex-col items-center rounded-xl">
          <h1 className="w-full border-b py-2 text-center text-2xl font-semibold">
            Create a post
          </h1>
          <div className="flex h-full w-full grow flex-col md:flex-row">
            <div className="flex w-full grow flex-col items-center justify-center gap-2">
              {fileUploaded && (
                <div className="flex h-full w-full flex-col gap-2">
                  <div className="relative aspect-square h-full w-full">
                    <Image
                      src={imageSource || ""}
                      fill
                      alt="preview"
                      className="aspect-square"
                    />
                  </div>
                  <div className="flex flex-row justify-end gap-2 pb-2">
                    <Button onClick={handleClear} variant={"outline"}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {!fileUploaded && plainFiles.length > 0 && (
                <ImageCrop
                  file={plainFiles[0] as File}
                  onCropAccepted={handleCropAccepted}
                  aspectRatio={1}
                />
              )}
              {plainFiles.length === 0 && (
                <>
                  <ImagesImage width={100} />
                  <Button
                    variant={"secondary"}
                    onClick={() => openFileSelector()}
                  >
                    Select from computer
                  </Button>
                </>
              )}
            </div>
            <div className="flex w-full max-w-full flex-col  gap-2 p-2 md:max-w-[350px]">
              <div className="flex flex-row items-center gap-1">
                <Avatar
                  avatarUrl={profile?.avatarUrl || ""}
                  username={profile?.username || ""}
                />
                <span className="font-semibold">{profile?.username}</span>
              </div>
              <textarea
                cols={7}
                rows={5}
                placeholder="Add post content..."
                className="w-full rounded-md p-2  text-start outline-none"
                {...register("content")}
              />
              <div className="flex flex-row justify-end gap-2">
                <Button variant={"outline"} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={void handleSubmit(onSubmit)}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
