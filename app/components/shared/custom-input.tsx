import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="bg-transparent border-none flex items-center shadow-xl">
        <div className="bg-red-700 h-10 w-[25ch] flex items-center justify-center p-2 text-white font-medium relative">
          <div className="h-0 w-0 absolute right-[-16px] border-l-16 border-r-16 border-b-16 border-b-red-700 border-r-transparent border-l-transparent rotate-90" />
          <h1 className="text-sm font-semibold">{label}</h1>
        </div>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full border-none border-input bg-white p-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  border-0 focus-within:ring-offset-inherit focus-visible:ring-transparent focus-visible:ring-offset-transparent focus-visible:',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

CustomInput.displayName = 'Input';

export { CustomInput };
