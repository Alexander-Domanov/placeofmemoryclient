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
        'max-w-7xl w-full text-light-300 px-10 bg-dark-700 text-base',
        className,
        clsx(
          className,
          types === 'auth'
            ? 'flex text-light-300 px-0 xl:mx-auto mx-0 lg:pt-[28px] lg:pb-[48px] xl:justify-start justify-center items-center min-h-[calc(100vh-65px)] '
            : 'mx-auto '
        )
      )}
    >
      {children}
    </div>
  );
};
