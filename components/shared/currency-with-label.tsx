import { cn } from '@/lib/utils';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface CurrencyWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  decimalScale?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  loading: boolean;
  isAllowed?: (values: any) => boolean;
  thousandSeparator?: string;
  span?: string;
}

const CurrencyWithLabel = React.forwardRef<
  HTMLInputElement,
  CurrencyWithLabelProps
>(
  (
    {
      className,
      label,
      id,
      decimalScale = 2,
      loading,
      value,
      onValueChange,
      isAllowed,
      thousandSeparator = '.',
      span = ' *',
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <NumericFormat
          value={value}
          allowLeadingZeros
          onValueChange={({ value }) => onValueChange && onValueChange(value)}
          allowNegative={false}
          decimalSeparator=","
          thousandSeparator={thousandSeparator}
          thousandsGroupStyle="thousand"
          fixedDecimalScale={true}
          decimalScale={decimalScale}
          placeholder="0,00"
          id={id}
          disabled={loading}
          className={cn(
            'peer w-full border-2 border-custom-borderLight placeholder:text-transparent bg-white rounded-[4px] py-2 px-4 focus-visible:outline-custom-primary text-sm disabled:border-slate-400 disabled:bg-white disabled:text-slate-400 hover:border-custom-primary',
            loading && 'cursor-not-allowed ',
            className,
          )}
          isAllowed={isAllowed}
          type="text"
        />
        <label
          className="absolute left-0 -translate-y-2 ml-4 bg-white px-1 text-xs leading-4 duration-100 ease-linear peer-placeholder-shown:translate-y-[6px] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[28px] peer-placeholder-shown:text-gray-900 peer-focus:ml-4 peer-focus:-translate-y-2 peer-focus:px-1 peer-focus:text-xs peer-focus-visible:text-custom-primary peer-invalid:-translate-y-0 peer-disabled:text-slate-400"
          htmlFor={id}
        >
          {label}
          <span className="text-sm text-red-500">{span}</span>
        </label>
      </div>
    );
  },
);

CurrencyWithLabel.displayName = 'CurrencyWithLabel';

export { CurrencyWithLabel };
