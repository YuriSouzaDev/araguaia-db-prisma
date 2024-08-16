'use client';

import { Combobox } from '@/components/shared/combobox';
import { CurrencyWithLabel } from '@/components/shared/currency-with-label';
import CustomRadioGroup from '@/components/shared/custom-radio';
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
import { cn } from '@/lib/utils';
import {
  formVehicleSchema,
  VehicleFormValue,
} from '@/lib/zod/VehicleFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const marcasData = [
  {
    value: '1',
    label: 'Ford',
  },
  {
    value: '2',
    label: 'Honda',
  },
  {
    value: '3',
    label: 'Honda ',
  },
  {
    value: '5',
    label: 'BMW',
  },
  {
    value: '6',
    label: 'Jeep',
  },
];

const transmissaoData = [
  {
    value: 'Manual',
    label: 'Manual',
  },
  {
    value: 'Automático',
    label: 'Automático',
  },
  {
    value: 'Semi-Automático',
    label: 'Semi-Automático',
  },
];

const motorData = [
  {
    value: '1.0',
    label: '1.0',
  },
  {
    value: '1.3',
    label: '1.3',
  },
  {
    value: '1.4',
    label: '1.4',
  },
  {
    value: '1.6',
    label: '1.6',
  },
  {
    value: '1.8',
    label: '1.8',
  },
];

const typeVehicle = [
  { value: 'moto', label: 'Moto' },
  { value: 'carro', label: 'Carro' },
];

const fuelOptions = [
  { value: 'flex', label: 'Flex' },
  { value: 'gasolina', label: 'Gasolina' },
  { value: 'diesel', label: 'Diesel' },
];

interface NewVehicleFormProps {
  closeDrawer: () => void;
}

const NewVehicleForm: React.FC<NewVehicleFormProps> = ({ closeDrawer }) => {
  const form = useForm<VehicleFormValue>({
    resolver: zodResolver(formVehicleSchema),
    defaultValues: {
      nome: '',
      marca: '',
      images: [],
      modelo: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const router = useRouter();
  const year = new Date().getFullYear();
  const MAX_LIMIT_MILEAGE = 1000000;
  const MAX_LIMIT_DOOR = 5;
  const MAX_LIMIT_PLATE = 10;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

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
      if (response.status !== 201) {
        closeDrawer();
        router.refresh();
        form.reset();
        setImageUrls([]);
        toast.success('Veículo criado com sucesso!');
      }
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
        onKeyDown={handleKeyDown}
        className="space-y-8 w-full bg-white"
      >
        <div className="flex items-start gap-[10px] w-full">
          <Button
            onClick={closeDrawer}
            disabled={loading}
            className="flex justify-center items-center my-auto bg-transparent hover:bg-transparent"
          >
            <ArrowLeft className="text-custom-primary w-6 h-6" />
            <span className="sr-only">Close</span>
          </Button>
          <h1 className="text-[32px] font-semibold leading-[46px]">
            Novo Veículo
          </h1>
        </div>
        <div>
          <h2 className="text-2xl mb-2">
            Campos Obrigatórios (<span className="text-red-500">*</span>)
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2 group">
                        <div className="flex gap-1 items-center">
                          {imageUrls.length === 0 ? (
                            <h1 className="text-lg font-semibold">
                              Enviar imagens do veículo:{' '}
                              <span className="text-red-500">*</span>
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
                                      disabled={loading}
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
                            disabled={loading}
                            id="imagens"
                            type="file"
                            className="w-full h-full opacity-0 absolute top-0 disabled:opacity-0"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomRadioGroup
                form={form}
                options={typeVehicle}
                name="type"
                disabled={loading}
              />
              <Combobox
                disabled={loading}
                form={form}
                placeholder="Selecione uma combustível"
                name="combustivel"
                noResult="Nenhum combustível encontrado"
                data={fuelOptions}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="modelo"
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
              <Combobox
                disabled={loading}
                form={form}
                placeholder="Selecione uma marca"
                name="marca"
                noResult="Nenhuma marca encontrada"
                data={marcasData}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="anoFabricacao"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyWithLabel
                        decimalScale={0}
                        label="Ano de fabricação"
                        id="anoFabricacao"
                        loading={loading}
                        thousandSeparator=""
                        isAllowed={(values: any) => {
                          if (!values.value) return true;
                          const { floatValue } = values;
                          return floatValue < year + 1;
                        }}
                        value={field.value}
                        onValueChange={(value) => field.onChange(String(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="anoModelo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyWithLabel
                        decimalScale={0}
                        label="Ano do Modelo"
                        id="anoModelo"
                        loading={loading}
                        thousandSeparator=""
                        isAllowed={(values: any) => {
                          if (!values.value) return true;
                          const { floatValue } = values;
                          return floatValue < year + 2;
                        }}
                        value={field.value}
                        onValueChange={(value) => field.onChange(String(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="quilometragem"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyWithLabel
                        name="quilometragem"
                        label="Quilometragem"
                        id="quilometragem"
                        loading={loading}
                        decimalScale={0}
                        isAllowed={(values: any) => {
                          if (!values.value) return true;
                          const { floatValue } = values;
                          return floatValue < MAX_LIMIT_MILEAGE;
                        }}
                        value={field.value}
                        onValueChange={(value) => field.onChange(String(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finalPlaca"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyWithLabel
                        name="finalPlaca"
                        label="Final da placa"
                        id="finalPlaca"
                        loading={loading}
                        decimalScale={0}
                        isAllowed={(values: any) => {
                          if (!values.value) return true;
                          const { floatValue } = values;
                          return floatValue < MAX_LIMIT_PLATE;
                        }}
                        value={field.value}
                        onValueChange={(value) => field.onChange(String(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Cor"
                        id="cor"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="versao"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Versão"
                        id="versao"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Combobox
                data={motorData}
                disabled={loading}
                form={form}
                placeholder="Selecione capacidade do motor"
                name="motor"
                noResult="Nenhuma capacidade encontrada"
              />
              <FormField
                control={form.control}
                name="potencia"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Potência"
                        id="potencia"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Combobox
                data={transmissaoData}
                disabled={loading}
                form={form}
                placeholder="Selecione tipo de transmissão"
                name="transmissao"
                noResult="Nenhuma transmissão encontrada"
              />
              <FormField
                control={form.control}
                name="portas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyWithLabel
                        label="Portas"
                        id="portas"
                        name="portas"
                        loading={loading}
                        decimalScale={0}
                        isAllowed={(values: any) => {
                          if (!values.value) return true;
                          const { floatValue } = values;
                          return floatValue < MAX_LIMIT_DOOR;
                        }}
                        value={field.value}
                        onValueChange={(value) => field.onChange(String(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Cor"
                        id="cor"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="versao"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Versão"
                        id="versao"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Cor"
                        id="cor"
                        loading={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="versao"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Versão"
                        id="versao"
                        loading={loading}
                        {...field}
                      />
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
        </div>
      </form>
    </Form>
  );
};

export default NewVehicleForm;
