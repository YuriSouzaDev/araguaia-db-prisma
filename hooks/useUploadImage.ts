import React, { useState } from 'react';

const useUploadImage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onSubmitImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files) {
      const newImages = Array.from(target.files);
      const newUrls = Array.from(target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      updateInputFiles(updatedImages);
      return updatedImages;
    });
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const updateInputFiles = (files: File[]) => {
    const inputElement = document.getElementById('imagens') as HTMLInputElement;

    if (inputElement) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      inputElement.files = dataTransfer.files;
    } else {
      console.error("Input element with ID 'imagens' not found.");
    }
  };

  return { onSubmitImage, removeImage, images, imageUrls };
};

export default useUploadImage;
