import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';

const useUploadSingleImage = () => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onUrlChange: (url: string) => void,
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar um arquivo');
      }
      const file = event.target.files[0];
      const filePath = `${file.name}`;
      if (fileName) {
        await handleRemove(fileName, onUrlChange);
      }
      const { data, error: uploadError } = await supabase.storage
        .from('brand-images')
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
      const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brand-images/${data?.path}`;
      setFileName(data?.path);
      setFileUrl(uploadedUrl);
      onUrlChange(uploadedUrl);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleManyUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onUrlsChange: (urls: string[]) => void,
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar um arquivo');
      }
      const files = Array.from(event.target.files);
      const uploadedUrls: string[] = [];
      const uploadedFileNames: string[] = [];
      const uploadedImages: string[] = [];
      const file = event.target.files[0];

      for (const file of files) {
        const filePath = `${file.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('brand-images')
          .upload(filePath, file);
        if (uploadError) {
          throw uploadError;
        }

        const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brand-images/${data?.path}`;
        uploadedUrls.push(uploadedUrl);
        uploadedFileNames.push(data?.path || '');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          uploadedImages.push(reader.result as string);
          setImages([...images, ...uploadedImages]);
        };
      }
      setFileNames([...fileNames, ...uploadedFileNames]);
      setFileUrls([...fileUrls, ...uploadedUrls]);
      onUrlsChange([...fileUrls, ...uploadedUrls]);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleRemove = async (
    key: string | undefined,
    onUrlChange: (url: string) => void,
  ) => {
    try {
      if (key) {
        const { error } = await supabase.storage
          .from('brand-images')
          .remove([key]);
        if (error) {
          throw new Error('Erro ao remover a imagem: ' + error.message);
        } else {
          setFileName(undefined);
          onUrlChange('');
          setImage('');
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleConfirmRemove = async (key: string | undefined) => {
    try {
      if (key) {
        const { error } = await supabase.storage
          .from('brand-images')
          .remove([key]);
        if (error) {
          throw new Error('Erro ao remover a imagem: ' + error.message);
        } else {
          setFileName(undefined);

          setImage('');
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return {
    handleUpload,
    handleRemove,
    fileName,
    fileUrl,
    image,
    setImage,
    setFileName,
    handleConfirmRemove,
  };
};

export default useUploadSingleImage;
