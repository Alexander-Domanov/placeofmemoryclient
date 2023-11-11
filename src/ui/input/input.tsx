import * as React from 'react';

import { FieldValues } from 'react-hook-form';
import { cn } from '@/common/utils/cn';

export type InputProps = {
  label?: string;
  error?: string | FieldValues | any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, className, type, id, label, ...props }, ref) => {
    return (
      <>
        <label
          className="font-extralight text-xs leading-3 uppercase"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          className={cn(
            'flex h-10 w-full pr-4 rounded-md bg-dark-400 focus:border-red-500 focus:outline-0 px-3 py-2 text-sm',
            className
          )}
          placeholder={placeholder}
          autoComplete={type === 'email' ? 'on' : 'off'}
          ref={ref}
          {...props}
        />
        {error && <span className="text-red-500">{error}</span>}
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
