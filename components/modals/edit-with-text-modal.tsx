'use client';

import { Modal } from '@/components/modals/modal';
import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  formOptionalSchema,
  OptionalFormValue,
} from '@/lib/zod/OptionalFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { OptionalColumn } from '../../app/dashboard/(routes)/opcionais/components/columns';

interface EditWithTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: OptionalColumn;
}

export const EditWithTextModal: React.FC<EditWithTextModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data,
}) => {
  const [isMouted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<OptionalFormValue>({
    resolver: zodResolver(formOptionalSchema),
    defaultValues: {
      name: data?.name || '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMouted) return null;

  const onSubmit = async (value: OptionalFormValue) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.patch(`/api/v1/optionals/${data.id}`, value);
      if (response.status === 200) {
        router.refresh();
        onClose();
        toast.success('Atualizado com sucesso!');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        setError(message);
        toast.error('Algo deu errado.');
      } else {
        setError('Algo deu errado.');
        toast.error('Algo deu errado.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <>
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
