import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';

const useUploadSingleImage = () => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [img, setImg] = useState<string>('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar um arquivo');
      }
      const file = event.target.files[0];
      const filePath = `${file.name}`;
      if (fileName) {
        await handleRemove(fileName);
      }

      const { data, error: uploadError } = await supabase.storage
        .from('brand-images')
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
      setFileName(data?.path);
      setFileUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brand-images/${data?.path}`,
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleImgChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  };

  const handleRemove = async (key: string | undefined) => {
    if (key) {
      const { error } = await supabase.storage
        .from('brand-images')
        .remove([key]);
      if (error) {
        alert('Erro ao remover a imagem: ' + error.message);
      }
    }
  };

  return {
    handleUpload,
    handleRemove,
    handleImgChange,
    img,
    fileName,
    fileUrl,
    setFileName,
    setFileUrl,
    setImg,
  };
};

export default useUploadSingleImage;
