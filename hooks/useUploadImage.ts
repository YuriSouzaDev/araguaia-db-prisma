import { supabase } from '@/lib/supabase';
import { useState } from 'react';

const useUploadImage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onSubmitImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files) {
      const newImages = Array.from(target.files);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const uploadedUrls = await Promise.all(
        newImages.map(uploadImageToSupabase),
      );
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    }
  };

  const uploadImageToSupabase = async (file: File) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('vehicle-images')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading image:', error);
      return '';
    }

    // Obter a URL pública da imagem recém-uploadada
    const { data: publicData } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(fileName);

    return publicData?.publicUrl || '';
  };

  const removeImage = async (index: number) => {
    const imageUrlToRemove = imageUrls[index];
    const fileName = imageUrlToRemove.split('/').pop();

    if (fileName) {
      const { error } = await supabase.storage
        .from('vehicle-images')
        .remove([fileName]);

      if (error) {
        console.error('Error removing image:', error);
        return;
      }
    }

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

  return {
    onSubmitImage,
    removeImage,
    images,
    imageUrls,
    uploadImageToSupabase,
  };
};

export default useUploadImage;
