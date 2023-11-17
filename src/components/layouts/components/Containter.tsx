import { FC, PropsWithChildren } from 'react';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ContainerVariant = 'auth';

interface ContainerProps {
  className?: string;
  types?: ContainerVariant;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className,
  types,
}) => {
  return (
    <div
      className={twMerge(
        'text-light-300 bg-dark-700 text-base',
        className,
        clsx(
          className,
          types === 'auth'
            ? 'text-light-300 lg:pt-[28px] lg:pb-[48px] min-h-[calc(100vh-65px)]'
            : 'px-10'
        )
      )}
    >
      {children}
    </div>
  );
};
