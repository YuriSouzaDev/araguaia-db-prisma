'use server';

import { USER_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';

export async function userGet() {
  try {
    const token = cookies().get('tokenAraguaia')?.value;
    if (!token) throw new Error('Token não encontrado');
    const { url } = USER_GET();
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error('Erro ao buscar os dados');
    const data = (await response.json()) as User;
    if (!data) {
      throw new Error('Dados não encontrados na resposta');
    }
    console.log(data.role);
    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
