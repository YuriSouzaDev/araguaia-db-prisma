'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  formVehicleSchema,
  VehicleFormValue,
} from '@/lib/zod/VehicleFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import axios from 'axios';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface VehicleFormProps {
  brands: Brand[];
}

const VehicleForm: React.FC<VehicleFormProps> = ({ brands }) => {
  const form = useForm<VehicleFormValue>({
    resolver: zodResolver(formVehicleSchema),
    defaultValues: {
      nome: '',
      marca: '',
      images: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const router = useRouter();

  // Função para lidar com a seleção de imagens
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const newImageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
      setImageFiles((prevFiles) => [...prevFiles, ...newImages]);

      field.onChange([...field.value, ...newImages]);
    }
  };

  // Função para remover imagens
  const removeImage = (index: number, field: any) => {
    const newImageUrls = imageUrls.filter((_, urlIndex) => urlIndex !== index);
    const newImageFiles = imageFiles.filter(
      (_, fileIndex) => fileIndex !== index,
    );

    setImageUrls(newImageUrls);
    setImageFiles(newImageFiles);

    field.onChange(newImageFiles);
  };

  const onSubmit = async (data: VehicleFormValue) => {
    try {
      setError('');
      setLoading(true);
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('marca', data.marca);
      data.images.forEach((file: File) => {
        formData.append('images', file);
      });
      const response = await axios.post('/api/v1/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/dashboard/veiculos');
      router.refresh();
      form.reset();
      setImageUrls([]);
      toast.success('Veículo criado com sucesso!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        toast.error(message);
        setError(message);
      } else {
        toast.error('Algo deu errado.');
        setError('Algo deu errado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full bg-white p-5"
      >
        <div className="grid grid-cols-3 gap-8">
          <div>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2 group mb-4">
                      <div className="flex gap-1 items-center">
                        {imageUrls.length === 0 ? (
                          <h1 className="text-lg font-semibold">
                            Enviar imagens do veículo:
                          </h1>
                        ) : (
                          <h1 className="text-lg font-semibold">
                            {imageUrls.length} imagens selecionadas
                          </h1>
                        )}
                      </div>
                      <div
                        className={cn(
                          'w-full outline-dashed outline-1 outline-custom-gray rounded-md relative',
                          imageUrls.length > 0 ? 'h-full' : 'h-[156px]',
                        )}
                      >
                        {imageUrls.length > 0 ? (
                          <div className="flex flex-wrap p-7 gap-2">
                            {imageUrls.map((url, index) => (
                              <div
                                className="relative w-[100px] h-[100px] rounded-md overflow-hidden"
                                key={index}
                              >
                                <div className="z-10 absolute top-1 right-1">
                                  <Button
                                    variant="destructive"
                                    size="iconmd"
                                    type="button"
                                    onClick={() => removeImage(index, field)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Image
                                  className="absolute justify-center items-center h-full w-full gap-3 rounded-md object-cover"
                                  width={2400}
                                  height={1600}
                                  sizes="100vw"
                                  src={url}
                                  alt={`uploaded ${index}`}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="absolute flex justify-center items-center h-[156px] w-full gap-3 rounded-md">
                            <div className="p-[.625rem] rounded-[.5rem] border border-custom-gray bg-white text-center group-hover:border-custom-primary transition h-[2.375rem] w-[2.375rem]">
                              <Upload className="w-[1.125rem] h-[1.125rem] text-slate-700 group-hover:text-custom-primary" />
                            </div>
                            <div className="flex items-center justify-center flex-col">
                              <p className=" text-sm font-semibold text-custom-primary leading-[1.25rem]">
                                Arraste uma foto ou clique para enviar
                              </p>
                              <span className="text-xs font-normal leading-6">
                                Arquivos aceitos PNG, JPEG, JPG, e WEBP
                              </span>
                            </div>
                          </div>
                        )}
                        <Input
                          id="imagens"
                          type="file"
                          className="w-full h-full opacity-0 absolute top-0"
                          multiple
                          accept=".png, .jpeg, .jpg, .webp"
                          onChange={(e) => handleImageChange(e, field)}
                          value={''}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="Modelo"
                    id="modelo"
                    loading={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {' '}
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={String(brand.id)}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
          )}
          <p className="text-red-500 absolute w-max text-sm -bottom-6">
            {error}
          </p>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
