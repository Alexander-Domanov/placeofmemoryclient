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
        'max-w-7xl w-full text-light-300 px-10 bg-dark-700 mx-auto text-base',
        className,
        clsx(
          className,
          types === 'auth' && 'flex px-0 justify-center items-center h-screen'
        )
      )}
    >
      {children}
    </div>
  );
};
