'use server';

import { BRAND_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export default async function brandPost(value: any) {
  const token = cookies().get('tokenAraguaia')?.value;
  console.log(value);

  try {
    if (!token) {
      return { data: null, ok: false, error: 'Acesso negado!' };
    }

    const { url } = BRAND_POST();
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    console.log(data);
    console.log(token);
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        ok: false,
        error: errorData.message || 'Erro na solicitação',
      };
    }

    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
