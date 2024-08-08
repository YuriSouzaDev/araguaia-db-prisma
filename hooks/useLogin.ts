import { LoginFormValue } from '@/lib/zod/LoginFormSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginRequest } from '../app/actions/login';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [wrongData, setWrongData] = useState<string | undefined>('');
  const router = useRouter();
  const onSubmit = async (data: LoginFormValue) => {
    try {
      setLoading(true);
      const response = await LoginRequest(data);
      if (!response.ok) {
        setWrongData(response.error);
      }
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setWrongData('Invalid username or password');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    onSubmit,
    loading,
    setWrongData,
    wrongData,
  };
};
