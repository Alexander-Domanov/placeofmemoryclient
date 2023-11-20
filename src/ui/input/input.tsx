import * as React from 'react';

import { FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
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
        <span
          className={twMerge(
            'text-xs text-red-500',
            clsx(
              error
                ? 'opacity-1'
                : 'opacity-0 transition-opacity duration-900 ease-linear'
            )
          )}
        >
          {error || ''}
        </span>
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
