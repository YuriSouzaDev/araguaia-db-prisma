import { z } from 'zod';

export const formBrandSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve conter pelo menos 2 letras.' })
    .max(10, { message: 'O nome deve conter no máximo 10 letras.' }),
  imageUrl: z.string().min(1, { message: 'Deve conter uma imagem.' }),
  isArchived: z.boolean().default(false),
});

type BrandFormValue = z.infer<typeof formBrandSchema>;

export type { BrandFormValue };
