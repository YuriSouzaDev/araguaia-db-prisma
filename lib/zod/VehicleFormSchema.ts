import { z } from 'zod';

export const formVehicleSchema = z.object({
  nome: z.string().min(2).max(100),
  // imagens: z
  //   .array(
  //     z
  //       .instanceof(File)
  //       .refine(
  //         (file) => file.size < 2 * 1024 * 1024,
  //         'File size must be less than 2MB',
  //       ),
  //   )
  //   .min(1, 'At least 1 file is required')
  //   .refine(
  //     (files) => files.every((file) => file.size < 2 * 1024 * 1024),
  //     'File size must be less than 2MB',
  //   ),
  // modelo: z.string().min(2).max(50),
  // preco: z.string().min(2),
  // versao: z.string().min(2).max(20),
  // cor: z.string().min(2).max(9),
  // anoFabricacao: z.string().min(4),
  // anoModelo: z.string().min(4),
  marca: z.string().min(1).max(20),
  // opcional: z.array(z.object({ name: z.string().min(2).max(50) })).optional(),
  // quilometragem: z.string().min(2).max(9),
  // cambio: z.string().min(2).max(20),
  // portas: z.string().min(1).max(1),
  // potencia: z.string().min(2).max(20),
  // combustivel: z.string().min(2).max(9),
  // tracao: z.string().min(2).max(20),
  // promocao: z.enum(['true', 'false']).default('false').optional(),
  // preco_promocional: z.string().optional(),
  // description: z.string().min(2).max(100),
  // guarantee: z.string().min(2).max(20),
});
// .refine(
//   (data) => {
//     const anoFabricacao = parseInt(data.anoFabricacao, 10);
//     const anoModelo = parseInt(data.anoModelo, 10);
//     return anoModelo >= anoFabricacao;
//   },
//   {
//     message: 'Ano do modelo não pode ser menor que o ano de fabricação',
//     path: ['anoModelo'],
//   },
// );
// .refine(
//   (data) => {
//     const preco = parseFloat(data.preco.replace(',', '.'));
//     const precoPromocional = parseFloat(
//       data.preco_promocional?.replace(',', '.') || '0',
//     );
//     return !(
//       data.promocao === 'true' &&
//       (isNaN(precoPromocional) || precoPromocional >= preco)
//     );
//   },
//   {
//     message: 'Valor deve ser menor que o preço original do veículo',
//     path: ['preco_promocional'],
//   },
// );

type VehicleFormValue = z.infer<typeof formVehicleSchema>;

export type { VehicleFormValue };
