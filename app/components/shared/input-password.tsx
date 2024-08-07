import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { CustomInput } from './custom-input';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="group">
        <div className="flex items-center gap-4 max-h-[58px] w-full border-none focus-within:outline-none focus-within:ring-0 ring-0 transition-all relative bg-white">
          <CustomInput
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'bg-white placeholder:text-slate-400 text-base font-normal leading-5 w-full focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-inherit border-0 focus-within:ring-offset-inherit',
              className,
            )}
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowPassword((prev) => !prev)}
            className="bg-white absolute right-0 top-0 h-full px-3 py-2 hover:bg-white opacity-0 group-focus-within:opacity-100"
          >
            {showPassword ? (
              <EyeIcon
                className="h-4 w-4 transition group-focus-within:text-red-700 cursor-pointer"
                aria-hidden="true"
              />
            ) : (
              <EyeOffIcon
                className="h-4 w-4 transition group-focus-within:text-red-700 cursor-pointer"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
              {showPassword ? 'Esconder senha' : 'Mostrar senha'}
            </span>
          </Button>
        </div>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
