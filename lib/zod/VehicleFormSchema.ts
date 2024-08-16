import { z } from 'zod';

export const formVehicleSchema = z
  .object({
    nome: z.string().min(2).max(100),
    marca: z.string().min(1).max(20),
    images: z
      .array(
        z
          .instanceof(File)
          .refine(
            (file) => file.size < 2 * 1024 * 1024,
            'File size must be less than 2MB',
          ),
      )
      .min(1, 'At least 1 file is required'),
    type: z.enum(['moto', 'carro'], {
      required_error: 'You need to select a notification type.',
    }),
    modelo: z.string().min(2).max(50),
    anoFabricacao: z
      .string()
      .min(4, 'Ano de fabricação deve ter 4 dígitos')
      .max(4, 'Ano de fabricação deve ter 4 dígitos'),
    anoModelo: z
      .string()
      .min(4, 'Ano do modelo deve ter 4 dígitos')
      .max(4, 'Ano do modelo deve ter 4 dígitos'),
    quilometragem: z.string().min(2).max(9),
    finalPlaca: z.string().min(1),
    versao: z.string().min(2).max(20),
    cor: z.string().min(2).max(9),
    motor: z.string().min(1),
    potencia: z
      .string()
      .min(1)
      .max(3)
      .refine((val) => /^[0-9]+$/.test(val), {
        message: 'Potência inválida',
      }),
    transmissao: z.string().min(2).max(20),
    portas: z.string().min(1).max(1),
    combustivel: z.string().min(1),
    // preco: z.string().min(2),
    // opcional: z.array(z.object({ name: z.string().min(2).max(50) })).optional(),
    // tracao: z.string().min(2).max(20),
    // promocao: z.enum(['true', 'false']).default('false').optional(),
    // preco_promocional: z.string().optional(),
    // description: z.string().min(2).max(100),
    // guarantee: z.string().min(2).max(20),
  })
  .refine(
    (data) => {
      const anoFabricacao = parseInt(data.anoFabricacao);
      const anoModelo = parseInt(data.anoModelo);
      return anoFabricacao <= anoModelo;
    },
    {
      message: 'Ano do modelo não pode ser menor que o ano de fabricação',
      path: ['anoModelo'],
    },
  );
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
