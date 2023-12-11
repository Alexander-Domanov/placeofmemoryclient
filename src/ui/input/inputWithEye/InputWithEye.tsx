import React, { FC, ForwardedRef, forwardRef, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Input } from '@/ui';

interface PropsType {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  error: string | FieldValues | any;
  onBlur: () => void;
}

export const InputWithEye: FC<Partial<PropsType>> = forwardRef(
  (
    { label, type, id, placeholder, error, onBlur, ...restProps },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPass, setShowPass] = useState(false);

    return (
      <div className="relative w-full h-full">
        <Input
          type={showPass ? 'text' : type}
          id={id || ''}
          label={label || ''}
          placeholder={placeholder || ''}
          error={error || ''}
          ref={ref}
          {...restProps}
          onBlur={onBlur}
        />
        <button
          type="button"
          className="cursor-pointer absolute right-4 top-2"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? (
            <IoMdEyeOff className="fill-dark-150" size={24} />
          ) : (
            <IoMdEye className="fill-dark-150" size={24} />
          )}
        </button>
      </div>
    );
  }
);
