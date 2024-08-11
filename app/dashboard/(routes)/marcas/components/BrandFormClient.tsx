import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const BrandFormClient = () => {
  const form = useForm<BrandFormValue>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      isArchived: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const { handleUpload, handleRemove, fileName, image, setImage } =
    useUploadSingleImage();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (value: BrandFormValue) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post('/api/v1/brands', value);
      if (response.status === 200) {
        router.refresh();
        form.reset();
        setImage('');
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="relative w-max">
                <FormControl>
                  <div
                    className={cn(' rounded-md relative group cursor-pointer')}
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
                              handleRemove(fileName, field.onChange);
                              setImage('');
                              if (inputRef.current) {
                                inputRef.current.value = '';
                              }
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
              <FormItem className="relative">
                <FormControl>
                  <InputWithLabel
                    label="Nome da marca"
                    {...field}
                    className="w-[300px]"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-6" />
              </FormItem>
            )}
          />
          <div className="relative">
            {loading ? (
              <Button
                disabled={loading}
                type="submit"
                className="w-[160px] bg-custom-primary"
              >
                Cadastrando...
              </Button>
            ) : (
              <Button type="submit" className="w-[160px] bg-custom-primary">
                Cadastrar
              </Button>
            )}{' '}
            <p className="text-red-500 absolute w-max text-sm -bottom-6">
              {error}
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BrandFormClient;
