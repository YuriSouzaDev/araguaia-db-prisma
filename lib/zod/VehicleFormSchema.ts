import { z } from 'zod';

export const formVehicleSchema = z
  .object({
    // nome: z.string().min(2).max(100),
    // versao: z.string().min(2).max(20),
    imagens: z
      .array(
        z
          .instanceof(File)
          .refine(
            (file) => file.size < 2 * 1024 * 1024,
            'File size must be less than 2MB',
          ),
      )
      .min(1, 'At least 1 file is required')
      .refine(
        (files) => files.every((file) => file.size < 2 * 1024 * 1024),
        'File size must be less than 2MB',
      ),
    preco: z.string().min(2).max(9),
    ano: z.string().min(2).max(9),
    cor: z.string().min(2).max(9),
    modelo: z.string().min(2).max(9),
    quilometragem: z.string().min(2).max(9),
    cambio: z.string().min(2).max(20),
    portas: z.string().min(1).max(1),
    potencia: z.string().min(2).max(20),
    combustivel: z.string().min(2).max(9),
    tracao: z.string().min(2).max(20),
    promocao: z.enum(['true', 'false']).default('false').optional(),
    preco_promocional: z.string().optional(),
    // description: z.string().min(2).max(100),
    // guarantee: z.string().min(2).max(20),
  })
  .refine(
    (data) => {
      const preco = parseFloat(data.preco.replace(',', '.'));
      const precoPromocional = parseFloat(
        data.preco_promocional?.replace(',', '.') || '0',
      );
      return !(
        data.promocao === 'true' &&
        (isNaN(precoPromocional) || precoPromocional >= preco)
      );
    },
    {
      message: 'Valor deve ser menor que o preço original do veículo',
      path: ['preco_promocional'],
    },
  );

type VehicleFormValue = z.infer<typeof formVehicleSchema>;

export type { VehicleFormValue };
