import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';

interface DataType {
  value: string;
  label: string;
}

interface CustomRadioGroupProps {
  form: UseFormReturn<any> | null;
  name: string;
  disabled: boolean;
  options: DataType[];
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  form,
  name,
  disabled,
  options,
}) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              disabled={disabled}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-2 space-y-1 w-full h-full items-center border-2 px-4 py-2 border-custom-bgLight rounded-[4px] hover:border-custom-primary"
            >
              Selecione o tipo:
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center gap-2"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel>{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomRadioGroup;
