import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  multiple?: boolean;
  loading?: boolean;
  name?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, type, label, id, multiple, loading, name, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          multiple
          name={name}
          type={type}
          className={cn(
            'peer w-full border-2 border-custom-borderLight placeholder:text-transparent bg-white rounded-[4px] py-2 px-4 focus-visible:outline-custom-primary text-sm hover:border-custom-primary disabled:border-slate-400 disabled:bg-white disabled:text-slate-400',
            loading && 'cursor-not-allowed ',
            className,
          )}
          disabled={loading}
          ref={ref}
          placeholder=""
          id={id}
          {...props}
        />
        <label
          className="absolute left-0 -translate-y-2 ml-4 bg-white px-1 text-xs leading-4 duration-100 ease-linear peer-placeholder-shown:translate-y-[6px] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[28px] peer-placeholder-shown:text-gray-900 peer-focus:ml-4 peer-focus:-translate-y-2 peer-focus:px-1 peer-focus:text-xs peer-focus-visible:text-custom-primary peer-invalid:translate-y-[6px] peer-disabled:text-slate-400"
          htmlFor={id}
        >
          {label} <span className="text-sm text-red-500">*</span>
        </label>
      </div>
    );
  },
);
InputWithLabel.displayName = 'Input';

export { InputWithLabel };
