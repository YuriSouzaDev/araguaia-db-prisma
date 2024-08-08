'use server';

import { BRAND_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export default async function brandPost(value: any) {
  const token = cookies().get('tokenAraguaia')?.value;

  try {
    if (!token) {
      throw new Error('Acesso negado!');
    }

    const { url } = BRAND_POST();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
