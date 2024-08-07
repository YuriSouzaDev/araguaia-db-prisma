import { LOGIN_POST } from '@/functions/api';
import { LoginFormValue } from '@/lib/zod/LoginFormSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [wrongData, setWrongData] = useState<string | undefined>('');
  const router = useRouter();

  const onSubmit = async (data: LoginFormValue) => {
    try {
      const { url } = LOGIN_POST();
      setLoading(true);
      const response = await axios.post(url, data);

      if (response.status === 200) {
        router.push('/dashboard');
      } else {
        setWrongData('Invalid username or password');
      }
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
