import { z } from 'zod';

export const formOptionalSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve conter pelo menos 2 letras.' })
    .max(50, { message: 'O nome deve conter no máximo 50 letras.' }),
});

type OptionalFormValue = z.infer<typeof formOptionalSchema>;

export type { OptionalFormValue };
