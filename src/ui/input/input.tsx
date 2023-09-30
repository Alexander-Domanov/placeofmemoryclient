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
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
