import React, { FC, ForwardedRef, forwardRef, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import style from './Input-with-eye.module.scss';
import { Input } from '@/ui';

interface PropsType {
  id: string;
  label: string;
  placeholder: string;
  error: string | FieldValues | any;
}

export const InputWithEye: FC<Partial<PropsType>> = forwardRef(
  (
    { label, id, placeholder, error, ...restProps },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPass, setShowPass] = useState(false);

    return (
      <div className={style.container}>
        <Input
          type={showPass ? 'text' : 'password'}
          id={id || ''}
          label={label || ''}
          placeholder={placeholder || ''}
          error={error || ''}
          ref={ref}
          {...restProps}
        />

        <button
          type="button"
          className={style.iconBtn}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? (
            <IoMdEyeOff className="fill-dark-900" size={24} />
          ) : (
            <IoMdEye className="fill-dark-900" size={24} />
          )}
        </button>
      </div>
    );
  }
);
