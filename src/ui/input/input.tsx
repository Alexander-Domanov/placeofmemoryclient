import * as React from 'react';

import { FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/common/utils/cn';
import s from './Input.module.scss';

export type InputProps = {
  label?: string;
  error?: string | FieldValues | any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, className, type, id, label, ...props }, ref) => {
    const newLabelClass =
      'absolute text-dark-150 top-0 text-xs duration-300 ml-3 px-2 origin-0 absolute top-[12px] duration-300 origin-0';
    const newInputClass = 'block appearance-none focus:outline-none';
    return (
      <div className={cn('flex relative flex-col gap-2', s.container)}>
        <input
          id={id}
          type={type}
          className={cn(
            'flex h-10 w-full pr-4 rounded-md bg-dark-700 border border-dark-300 focus:outline-0 px-3 py-2 text-xs',
            className,
            newInputClass
          )}
          placeholder={placeholder || ''}
          autoComplete={type === 'email' ? 'on' : 'off'}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            ' font-extra-light capitalize leading-3',
            newLabelClass
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <div className="block h-6">
          <span
            className={twMerge(
              'text-xs text-red-500',
              error
                ? 'transform opacity-1 transition-all duration-700 ease-in-out'
                : 'opacity-0 transition-all duration-700 ease-in-out'
            )}
          >
            {error || ''}
          </span>
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
