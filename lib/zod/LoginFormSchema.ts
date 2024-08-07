import { z } from 'zod';

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'O nome de usuário deve conter pelo menos 2 letras.' })
    .max(30, { message: 'O nome de usuário deve conter no máximo 30 letras.' }),
  password: z
    .string()
    .min(2, { message: 'A senha deve conter pelo menos 2 letras.' })
    .max(20, { message: 'A senha deve conter no máximo 20 letras.' }),
});

type LoginFormValue = z.infer<typeof formSchema>;

export type { LoginFormValue };
