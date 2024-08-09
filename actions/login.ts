'use server';

import { LOGIN_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { LoginFormValue } from '@/lib/zod/LoginFormSchema';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function LoginRequest(formData: LoginFormValue) {
  try {
    const { url } = LOGIN_POST();

    const response = await axios.post(url, formData);

    if (response.status === 200) {
      const data = response.data;
      cookies().set('tokenAraguaia', data.token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
        sameSite: 'lax',
        maxAge: 8 * 60 * 60,
        path: '/',
      });

      return { data: null, ok: true, error: '' };
    } else {
      throw new Error(response.data.message || 'Erro de autenticação');
    }
  } catch (error: any) {
    console.error(
      'Login error:',
      error.response?.data || error.message || error,
    );
    return apiError(error);
  }
}
