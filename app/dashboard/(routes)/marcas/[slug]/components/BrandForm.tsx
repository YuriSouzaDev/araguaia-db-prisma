import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Trash, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const BrandForm = () => {
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
      if (response.status === 200) router.push('/dashboard/marcas');
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
        <div
          className="grid grid-cols-1 1250:grid-cols-5 gap-4 bg-custom-white p-5"
          style={{ gridTemplateColumns: '1fr 3fr 2fr' }}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'outline-dashed outline-1 outline-custom-gray rounded-md relative w-[132px] h-[132px] group',
                    )}
                  >
                    {image ? (
                      <div className="flex flex-wrap p-7 gap-2">
                        <div className="relative w-[100px] h-[100px] rounded-md">
                          <div className="z-10 absolute -top-5 -right-5">
                            <Button
                              variant="destructive"
                              size="iconSmall"
                              type="button"
                              onClick={() => {
                                handleRemove(fileName, field.onChange);
                                setImage('');
                                if (inputRef.current) {
                                  inputRef.current.value = '';
                                }
                              }}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="w-[75px] h-[75px]">
                            <div
                              className="justify-center items-center h-full w-full gap-3 rounded-md object-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute flex justify-center items-center h-full p-4 gap-3 rounded-md">
                        <div className="p-3 rounded-[.5rem] border border-custom-gray bg-white text-center group-hover:border-custom-primary transition">
                          <Upload className="w-[75px] h-[75px] text-slate-700 group-hover:text-custom-primary" />
                        </div>
                      </div>
                    )}
                    <Input
                      type="file"
                      disabled={loading}
                      className="h-full opacity-0 absolute top-0"
                      accept=".png, .jpeg, .jpg, .webp"
                      onChange={(e) => handleUpload(e, field.onChange)}
                      ref={inputRef}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel label="Nome da marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <FormLabel>Arquivado</FormLabel>
                  <FormDescription>
                    Os produtos desta marca não aparecerão em nenhum lugar da
                    loja.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <p>{error}</p>
        {loading ? (
          <Button disabled={loading} type="submit">
            Cadastrando...
          </Button>
        ) : (
          <Button type="submit">Cadastrar</Button>
        )}
      </form>
    </Form>
  );
};

export default BrandForm;
