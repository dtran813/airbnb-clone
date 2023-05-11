'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="oviyk5bb"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              className="relative flex flex-col justify-center items-center gap-4 p-20 border-dashed border-2 border-neutral-300 text-neutral-600 transition cursor-pointer hover:opacity-70"
              onClick={() => open?.()}
            >
              <TbPhotoPlus size={50} />
              <p className="font-semibold text-lg">Click to upload</p>
              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={value}
                    alt="Upload"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
