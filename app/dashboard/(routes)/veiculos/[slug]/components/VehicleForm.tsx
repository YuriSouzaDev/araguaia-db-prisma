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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  formVehicleSchema,
  VehicleFormValue,
} from '@/lib/zod/VehicleFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface VehicleFormProps {
  brands: Brand[];
  // optionals: Optional[];
}

const VehicleForm: React.FC<VehicleFormProps> = ({ brands }) => {
  const form = useForm<VehicleFormValue>({
    resolver: zodResolver(formVehicleSchema),
    defaultValues: {
      nome: '',
      marca: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const MAX_LIMIT_MIEAGE = 1000000;
  const MAX_LIMIT_PLATE = 10;
  const date = new Date();
  const year = date.getFullYear();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: VehicleFormValue) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post('/api/v1/vehicles', data);
      if (response.status === 200) {
        router.refresh();
        form.reset();
        toast.success('Veiculo criado com sucesso!');
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
        className="space-y-8 w-full bg-white p-5"
      >
        <div className="grid grid-cols-3 gap-8">
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
          {/* <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CurrencyWithLabel
                    label="Preço"
                    id="preco"
                    loading={loading}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
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
          <FormField
            control={form.control}
            name="cor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    label="Cor do veículo"
                    disabled={loading}
                    loading={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="anoFabricacao"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CurrencyWithLabel
                      thousandSeparator=""
                      label="Ano de Fabricação"
                      id="anoFabricacao"
                      decimalScale={0}
                      loading={loading}
                      isAllowed={(values: any) => {
                        if (!values.value) return true;
                        const { floatValue } = values;
                        return floatValue < year + 1;
                      }}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
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
                      label="Ano do Modelo"
                      thousandSeparator=""
                      decimalScale={0}
                      id="anoModelo"
                      loading={loading}
                      isAllowed={(values: any) => {
                        if (!values.value) return true;
                        const { floatValue } = values;
                        return floatValue < year + 2;
                      }}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>*/}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            {/* <FormField
              control={form.control}
              name="opcional"
              render={({ field }) => (
                <FormItem>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
          )}{' '}
          <p className="text-red-500 absolute w-max text-sm -bottom-6">
            {error}
          </p>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
