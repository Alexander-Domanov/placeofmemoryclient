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
    <section
      className={twMerge(
        'w-full text-base px-4 mx-auto',
        className,
        clsx(
          className,
          types === 'auth' && 'flex px-0 justify-center items-center h-screen'
        )
      )}
    >
      {children}
    </section>
  );
};
