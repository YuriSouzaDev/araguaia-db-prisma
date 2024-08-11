'use client';

import { BrandColumn } from '@/app/dashboard/(routes)/marcas/components/columns';
import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useUploadSingleImage from '@/hooks/useUploadSingleImage';
import { cn } from '@/lib/utils';
import { BrandFormValue, formBrandSchema } from '@/lib/zod/BrandFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { AlertModal } from './alert-modal';
import { Modal } from './modal';

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: BrandColumn;
}

export const EditBrandModal: React.FC<EditBrandModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}) => {
  const [isMouted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleUpload,
    handleRemove,
    fileName,
    image,
    setImage,
    setFileName,
    handleConfirmRemove,
  } = useUploadSingleImage();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm<BrandFormValue>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: {
      name: data?.name || '',
      imageUrl: data?.imageUrl || '',
      isArchived: data?.isArchived || false,
    },
  });

  useEffect(() => {
    setIsMounted(true);
    setImage(data.imageUrl);
  }, []);

  if (!isMouted) return null;

  const onSubmit = async (value: BrandFormValue) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.put(`/api/v1/brands/${data.id}`, value);
      if (response.status === 200) {
        router.refresh();
        onClose();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        setError(message);
      } else {
        setError('Algo deu errado.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setImage('');
    setFileName(undefined);
    onClose();
  };

  const onDelete = async () => {
    const imageUrl = data.imageUrl;
    const key = imageUrl ? imageUrl.split('/').pop() : undefined;
    if (key) {
      await handleConfirmRemove(key);
      setOpen(false);
    }
  };

  console.log(data.id);
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Modal
        title="Você tem certeza?"
        decription="Esta ação não pode ser desfeita."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 space-x-6 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-7 items-center">
                <div className="flex gap-4 items-center w-full">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="relative w-max">
                        <FormControl>
                          <div
                            className={cn(
                              ' rounded-md relative group cursor-pointer',
                            )}
                          >
                            {image ? (
                              <div className="flex flex-wrap gap-2 p-[10px]">
                                <div className="w-[20px] h-[20px] relative">
                                  <div
                                    className="justify-center items-center h-full w-full gap-3 rounded-md object-cover bg-center bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${image})`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center center',
                                    }}
                                  />
                                </div>
                                <div className="z-10 absolute -right-2 -top-2">
                                  <Button
                                    variant="destructive"
                                    size="iconSmall"
                                    type="button"
                                    className="rounded-full"
                                    onClick={() => {
                                      setOpen(true);
                                    }}
                                  >
                                    <X className="h-2 w-2" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center h-full p-2 gap-3 rounded-md group-hover:border-custom-primary transition outline-dashed outline-1 outline-custom-gray group-hover:outline-custom-primary w-[180px]">
                                <h1 className="text-slate-700 group-hover:text-custom-primary text-sm max-w-max">
                                  Enviar imagem
                                </h1>
                              </div>
                            )}
                            <Input
                              type="file"
                              disabled={loading}
                              className={cn(
                                'h-full opacity-0 absolute top-0 disabled:opacity-0 cursor-pointer',
                              )}
                              accept=".png, .jpeg, .jpg, .webp"
                              onChange={(e) => handleUpload(e, field.onChange)}
                              ref={inputRef}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="absolute -bottom-6 w-max" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative w-full">
                        <FormControl>
                          <InputWithLabel
                            label="Nome da marca"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-6" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Arquivada</FormLabel>
                        <FormDescription>
                          Esta marca ficará desativada e seus items ficaram
                          desativados.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center gap-2">
                <Button
                  type="button"
                  disabled={loading}
                  variant="outline"
                  className="w-[160px]"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <div className="relative">
                  {loading ? (
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-[160px] bg-custom-primary"
                    >
                      Atualizando...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-[160px] bg-custom-primary"
                      onClick={onConfirm}
                      disabled={loading}
                    >
                      Atualizar
                    </Button>
                  )}
                  <p className="text-red-500 absolute w-max text-sm -bottom-6">
                    {error}
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </Modal>{' '}
    </>
  );
};
