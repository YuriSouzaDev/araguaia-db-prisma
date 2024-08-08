'use client';

import { CustomInput } from '@/components/shared/custom-input';
import { PasswordInput } from '@/components/shared/input-password';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useLogin } from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { formSchema, LoginFormValue } from '@/lib/zod/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { onSubmit, loading, wrongData, setWrongData } = useLogin();

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <CustomInput
                  label="Nome de Usuário"
                  className={cn(
                    loading && 'cursor-not-allowed text-slate-700 bg-slate-100',
                  )}
                  onChangeCapture={() => setWrongData('')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormControl>
                <PasswordInput
                  onChangeCapture={() => setWrongData('')}
                  className={cn(
                    loading && 'cursor-not-allowed text-slate-700 bg-slate-100',
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {wrongData ? (
          <p
            className={cn(
              'opacity-0 text-red-500 text-sm mb-4',
              wrongData && 'opacity-100',
            )}
          >
            {wrongData}
          </p>
        ) : (
          <p className="text-sm mb-4">&nbsp;</p>
        )}
        <div className="flex justify-between items-center">
          <Link
            className={cn(
              'text-white',
              loading && 'cursor-not-allowed opacity-50',
            )}
            href="#"
          >
            Problemas de acesso?
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="space-y-5 hover:bg-red-700/80 px-8 bg-red-700"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
