// 'use client';

// import CurrencyFieldCustom from '@/components/shared/CurrencyFieldCustom';
// import FormFieldCustom from '@/components/shared/FormFIeldCustom';
// import PromotionalFieldCustom from '@/components/shared/PromotionalFieldCustom';
// import SelectFieldCustom from '@/components/shared/SelectFieldCustom';
// import { Button } from '@/components/ui/button';
// import { Form, FormField } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import useUploadImage from '@/hooks/useUploadImage';
// import { useVehicle } from '@/hooks/useVehicle';
// import { cn } from '@/lib/utils';
// import {
//   formVehicleSchema,
//   VehicleFormValue,
// } from '@/lib/zod/VehicleFormSchema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';

// const gearOptions = [
//   { name: 'Manual' },
//   { name: 'Automático' },
//   { name: 'Semi-Automático' },
// ];

// const fuelOptions = [
//   { name: 'Gasolina' },
//   { name: 'Álcool' },
//   { name: 'Flex' },
//   { name: 'Diesel' },
// ];

// const tractionOptions = [
//   { name: 'Dianteira' },
//   { name: 'Traseira' },
//   { name: '4x4' },
// ];

// const VehicleForm = () => {
//   const form = useForm<VehicleFormValue>({
//     resolver: zodResolver(formVehicleSchema),
//     defaultValues: {
//       // nome: '',
//       preco: '',
//       ano: '',
//       cor: '',
//       modelo: '',
//       quilometragem: '',
//       portas: '',
//       cambio: '',
//       potencia: '',
//       combustivel: '',
//       tracao: '',
//       promocao: 'false',
//       preco_promocional: '',
//     },z
//     .array(
//       z
//         .instanceof(File)
//         .refine((file) => file.size < 2 * 1024 * 1024, 'File size must be less than 2MB'),
//     )
//     .min(1, 'At least 1 file is required')
//     .refine(
//       (files) => files.every((file) => file.size < 2 * 1024 * 1024),
//       'File size must be less than 2MB',
//     )
//   });

//   const { onSubmit, loading, wrongData, setWrongData } = useVehicle();
//   const { onSubmitImage, imageUrl } = useUploadImage();
//   const [promotion, setPromotion] = useState(false);

//   useEffect(() => {
//     form.setValue('promocao', promotion ? 'true' : 'false');
//     if (!promotion) {
//       form.setValue('preco_promocional', '');
//     }
//   }, [promotion, form]);

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <div className="bg-custom-white p-5 flex flex-col gap-4">
//             {/* <FormFieldCustom
//               form={form}
//               name="nome"
//               id="nome"
//               label="Nome do Veículo no Anúncio"
//               onChangeCapture={() => setWrongData('')}
//               loading={loading}
//             /> */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <FormFieldCustom
//                 form={form}
//                 name="modelo"
//                 id="modelo"
//                 label="Modelo"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <FormFieldCustom
//                 form={form}
//                 name="ano"
//                 id="ano"
//                 label="Ano"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//               <FormFieldCustom
//                 form={form}
//                 name="cor"
//                 id="cor"
//                 label="Cor"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <CurrencyFieldCustom
//                 decimalScale={0}
//                 form={form}
//                 name="quilometragem"
//                 id="quilometragem"
//                 label="Quilometragem"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//               <SelectFieldCustom
//                 form={form}
//                 loading={loading}
//                 name="cambio"
//                 data={gearOptions}
//                 placeholder="Selecione um câmbio"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <FormFieldCustom
//                 form={form}
//                 name="portas"
//                 id="portas"
//                 label="Quantidade de portas"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//               <FormFieldCustom
//                 form={form}
//                 name="potencia"
//                 id="potencia"
//                 label="Potência do Motor"
//                 onChangeCapture={() => setWrongData('')}
//                 loading={loading}
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <SelectFieldCustom
//                 form={form}
//                 loading={loading}
//                 name="combustivel"
//                 data={fuelOptions}
//                 placeholder="Selecione um combustível"
//               />
//               <SelectFieldCustom
//                 form={form}
//                 loading={loading}
//                 name="tracao"
//                 data={tractionOptions}
//                 placeholder="Selecione uma tração"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <PromotionalFieldCustom
//                 form={form}
//                 loading={loading}
//                 promotion={promotion}
//                 setPromotion={setPromotion}
//                 name="preco_promocional"
//               />
//               <CurrencyFieldCustom
//                 form={form}
//                 name="preco"
//                 id="preco"
//                 label="Preço"
//                 loading={loading}
//               />
//             </div>
//           </div>
//           <div className="bg-custom-white">
//             <div className="h-[200px] w-[200px]"></div>
//             <FormField
//               control={form.control}
//               name="imagens"
//               render={({ field }) => {
//                 return (
//                   <Input
//                     type="file"
//                     className=" border-slate-300"
//                     onChange={(e) => {
//                       const filesArray = Array.from(e.target.files || []);
//                       field.onChange(filesArray);
//                     }}
//                     multiple
//                   />
//                 );
//               }}
//             />
//             {wrongData ? (
//               <p
//                 className={cn(
//                   'opacity-0 text-red-500 text-sm mb-4',
//                   wrongData && 'opacity-100',
//                 )}
//               >
//                 {wrongData}
//               </p>
//             ) : (
//               <p className="text-sm mb-4">&nbsp;</p>
//             )}
//             <Button type="submit" disabled={loading}>
//               Cadastrar
//             </Button>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default VehicleForm;
