import { InputWithLabel } from '@/components/shared/input-with-label';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  formOptionalSchema,
  OptionalFormValue,
} from '@/lib/zod/OptionalFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const OptionalFormClient = () => {
  const form = useForm<OptionalFormValue>({
    resolver: zodResolver(formOptionalSchema),
    defaultValues: {
      name: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (value: OptionalFormValue) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post('/api/v1/optionals', value);
      if (response.status === 200) {
        router.refresh();
        form.reset();
        toast.success('Opcional criado com sucesso!');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        toast.error(message);
        console.log(message);
        setError(message);
      } else {
        toast.error('Algo deu errado.');
        setError('Algo deu errado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <InputWithLabel
                    onChangeCapture={() => setError('')}
                    label="Nome do opcional"
                    {...field}
                    className="w-[300px] border-gray-300 border"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-6" />
              </FormItem>
            )}
          />
          <div className="relative">
            {loading ? (
              <Button
                disabled={loading}
                type="submit"
                className="w-[160px] bg-custom-primary"
              >
                Cadastrando...
              </Button>
            ) : (
              <Button type="submit" className="w-[160px] bg-custom-primary">
                Cadastrar
              </Button>
            )}{' '}
            <p className="text-red-500 absolute w-max text-sm -bottom-6">
              {error}
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OptionalFormClient;
