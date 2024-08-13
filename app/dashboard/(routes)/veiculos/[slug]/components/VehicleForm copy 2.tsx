'use client';

import { CurrencyWithLabel } from '@/components/shared/currency-with-label';
import CustomSelect from '@/components/shared/custom-select';
import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import OptionalInput from './OptionalInput';

const gearOptions = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automático', label: 'Automático' },
  { value: 'Semi-Automático', label: 'Semi-Automático' },
];

const fuelOptions = [
  { value: 'Gasolina', label: 'Gasolina' },
  { value: 'Álcool', label: 'Álcool' },
  { value: 'Flex', label: 'Flex' },
  { value: 'Diesel', label: 'Diesel' },
];

const tractionOptions = [
  { value: 'Dianteira', label: 'Dianteira' },
  { value: 'Traseira', label: 'Traseira' },
  { value: '4x4', label: '4x4' },
];

const brandOptions = [
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Ford', label: 'Ford' },
];

const VehicleForm = () => {
  const [loading, setLoading] = useState(false);
  const MAX_LIMIT_MIEAGE = 1000000;
  const MAX_LIMIT_PLATE = 10;
  const date = new Date();
  const year = date.getFullYear();

  return (
    <form>
      <div className="grid grid-cols-1 1250:grid-cols-2 gap-4 bg-custom-white p-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputWithLabel
              name="modelo"
              label="Modelo"
              id="modelo"
              loading={loading}
            />
            <CurrencyWithLabel
              name="preco"
              label="Preço"
              id="preco"
              loading={loading}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CurrencyWithLabel
              thousandSeparator=""
              name="anoFabricacao"
              label="Ano de Fabricação"
              id="anoFabricacao"
              decimalScale={0}
              loading={loading}
              isAllowed={(values: any) => {
                if (!values.value) return true;
                const { floatValue } = values;
                return floatValue < year + 1;
              }}
            />
            <CurrencyWithLabel
              name="anoModelo"
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
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputWithLabel name="cor" label="Cor" id="cor" loading={loading} />
            <InputWithLabel
              name="versao"
              label="Versão"
              id="versao"
              loading={loading}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CurrencyWithLabel
              name="final_placa"
              label="Final da placa"
              id="final_placa"
              loading={loading}
              decimalScale={0}
              isAllowed={(values: any) => {
                if (!values.value) return true;
                const { floatValue } = values;
                return floatValue < MAX_LIMIT_PLATE;
              }}
            />
            <CurrencyWithLabel
              name="quilometragem"
              label="Quilometragem"
              id="quilometragem"
              loading={loading}
              decimalScale={0}
              isAllowed={(values: any) => {
                if (!values.value) return true;
                const { floatValue } = values;
                return floatValue < MAX_LIMIT_MIEAGE;
              }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomSelect
              placeholder="Selecione o combustível"
              data={fuelOptions}
              loading={loading}
              name="combustivel"
              id="combustivel"
            />
            <CustomSelect
              placeholder="Selecione o câmbio"
              data={gearOptions}
              loading={loading}
              name="cambio"
              id="cambio"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomSelect
              placeholder="Selecione a tração"
              data={tractionOptions}
              loading={loading}
              name="tracao"
              id="tracao"
            />
            <CustomSelect
              data={brandOptions}
              name="marca[]"
              id="marca"
              loading={loading}
              placeholder="Selecione uma marca"
            />
          </div>
        </div>
        <div>
          <OptionalInput name="opcional[]" />
          <div className="flex flex-col gap-2 group mb-4">
            <div className="flex gap-1 items-center">
              {/* {imageUrls.length === 0 ? (
                <h1 className="text-lg font-semibold">
                  Enviar imagens dos veículo:
                </h1>
              ) : (
                <h1 className="text-lg font-semibold">
                  Enviando {imageUrls.length} imagens do veículo
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
                      <div className="z-10 absolute top-2 right-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          type="button"
                          onClick={() => removeImage(index)}
                        >
                          <Trash className="h-4 2-4" />
                        </Button>
                      </div>
                      <Image
                        className="absolute justify-center items-center h-full w-full gap-3 rounded-md object-cover"
                        fill
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
              )} */}
              <Input
                name="imagens[]"
                id="imagens[]"
                type="file"
                className="w-full h-full opacity-0 absolute top-0"
                multiple
                accept=".png, .jpeg, .jpg, .webp"
              />
            </div>
          </div>
          {loading ? (
            <Button disabled={loading} type="submit">
              Cadastrando...
            </Button>
          ) : (
            <Button type="submit">Cadastrar</Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;
