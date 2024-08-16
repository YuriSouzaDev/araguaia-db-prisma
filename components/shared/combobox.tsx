'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';

const frameworks = [
  {
    value: '1',
    label: 'Ford',
  },
  {
    value: '2',
    label: 'Honda',
  },
  {
    value: '3',
    label: 'Honda',
  },
  {
    value: '5',
    label: 'BMW',
  },
  {
    value: '6',
    label: 'Jeep',
  },
];

interface ComboboxProps {
  form: UseFormReturn<any> | null;
  placeholder: string;
  name: string;
  noResult: string;
  disabled: boolean;
}

export const Combobox: React.FC<ComboboxProps> = ({
  form,
  placeholder,
  name,
  noResult,
  disabled,
}) => {
  if (!form) {
    return null;
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-full justify-between border-2 border-custom-borderLight text-sm disabled:border-slate-400 disabled:bg-white disabled:text-slate-400 hover:border-custom-primary hover:bg-transparent disabled:opacity-100',
                    !field.value && 'border-2 border-custom-borderLight',
                  )}
                >
                  {field.value
                    ? frameworks.find(
                        (framework) => framework.value === field.value,
                      )?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="max-w-full md:w-[390px] p-0">
              <Command className="w-full">
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>{noResult}</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        value={framework.label}
                        key={framework.value}
                        onSelect={() => {
                          form.setValue(name, framework.value);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            framework.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
