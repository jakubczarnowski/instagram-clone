import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "~/components/ui/slider";

interface CropImageModalProps {
  file: File | null;
  onCropAccepted: (file: Blob, content: string) => void;
  aspectRatio: number;
}

export const ImageCrop = ({
  file,
  onCropAccepted,
  aspectRatio,
}: CropImageModalProps) => {
  const cropperRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1.2);

  const handleCropAccepted = () => {
    if (!cropperRef.current) {
      return;
    }
    const content = cropperRef.current.getImage().toDataURL();
    cropperRef.current.getImage().toBlob((blob) => {
      if (blob) {
        onCropAccepted(blob, content);
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex grow flex-col items-center justify-center gap-2">
      <AvatarEditor
        width={300}
        height={300 / aspectRatio}
        scale={scale}
        ref={cropperRef}
        image={file || ""}
      />
      <Slider
        aria-label="crop-slider"
        defaultValue={[1.2]}
        step={0.01}
        min={1}
        max={3}
        onValueChange={(val) => setScale(val[0] || 1)}
      ></Slider>
      <button
        className="rounded-md bg-secondary p-2"
        onClick={handleCropAccepted}
      >
        Crop
      </button>
    </div>
  );
};
