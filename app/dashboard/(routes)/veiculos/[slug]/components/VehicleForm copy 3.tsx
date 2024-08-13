'use client';

import { CurrencyWithLabel } from '@/components/shared/currency-with-label';
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
  formVehicleSchema,
  VehicleFormValue,
} from '@/lib/zod/VehicleFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

interface VehicleFormProps {
  brands: { value: string; label: string }[];
  optionals: { value: string; label: string }[];
}

const VehicleForm: React.FC<VehicleFormProps> = ({ brands }) => {
  const form = useForm<VehicleFormValue>({
    resolver: zodResolver(formVehicleSchema),
    defaultValues: {
      preco: '',
      modelo: '',
      marca: '',
      opcionals: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const MAX_LIMIT_MIEAGE = 1000000;
  const MAX_LIMIT_PLATE = 10;
  const date = new Date();
  const year = date.getFullYear();

  const onSubmit = (data: VehicleFormValue) => {
    console.log(data);
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
          <FormField
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
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderWidth: '2px',
                          borderRadius: '4px',
                          borderColor: '#6B737A',
                          fontSize: '14px',
                          '&:hover': {
                            borderColor: '#6B737A',
                          },
                        }),
                        placeholder: (baseStyles) => ({
                          ...baseStyles,
                          color: '#111827',
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '14px',
                          background: state.isSelected ? '#4880FF' : '#FFFFFF',
                          borderRadius: '0px',
                          borderBottom: '1px solid #6B737A',
                          transition: '.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#d1dbe4',
                            color: 'black',
                          },
                        }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          transition: '.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'red',
                          },
                        }),
                      }}
                      isClearable
                      placeholder="Selecione a marca"
                      isDisabled={loading}
                      value={brands.find((c) => c.value === field.value)}
                      onChange={(val) => field.onChange(val?.value)}
                      options={brands}
                      id="marca"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="opcional"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderWidth: '2px',
                          borderRadius: '4px',
                          borderColor: '#6B737A',
                          fontSize: '14px',
                          '&:hover': {
                            borderColor: '#6B737A',
                          },
                        }),
                        placeholder: (baseStyles) => ({
                          ...baseStyles,
                          color: '#111827',
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '14px',
                          background: state.isSelected ? '#4880FF' : '#FFFFFF',
                          borderRadius: '0px',
                          borderBottom: '1px solid #6B737A',
                          transition: '.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#d1dbe4',
                            color: 'black',
                          },
                        }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          transition: '.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'red',
                          },
                        }),
                      }}
                      isMulti
                      isClearable
                      placeholder="Selecione a marca"
                      isDisabled={loading}
                      value={optionals.find((c) => c.value === field.value)}
                      onChange={(val) => field.onChange(val?.value)}
                      options={optionals}
                      id="marca"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default VehicleForm;
