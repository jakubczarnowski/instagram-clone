import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Modal from "react-modal";
import { Slider } from "~/components/ui/slider";

interface CropImageModalProps {
  onClose: () => void;
  isOpen: boolean;
  file: File | null;
  onCropAccepted: (file: Blob, content: string) => void;
  aspectRatio: number;
}

export const CropImageModal = ({
  isOpen,
  onClose,
  file,
  onCropAccepted,
  aspectRatio,
}: CropImageModalProps) => {
  const cropperRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1.2);

  const handleCropAccepted = () => {
    if (cropperRef.current) {
      const content = cropperRef.current.getImage().toDataURL();
      cropperRef.current.getImage().toBlob((blob) => {
        if (blob) {
          onCropAccepted(blob, content);
        }
        onClose();
      }, "image/jpeg");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="align-center flex flex-col gap-5">
        <h1>Crop Image</h1>
        <AvatarEditor
          width={300}
          height={300 / aspectRatio}
          scale={scale}
          ref={cropperRef}
          image={file || ""}
        />
        <Slider
          aria-label="crop-slider"
          defaultValue={1.2}
          step={0.01}
          min={1}
          max={3}
          onChange={setScale}
        ></Slider>
        <button onClick={handleCropAccepted}>Crop</button>
      </div>
    </Modal>
  );
};
