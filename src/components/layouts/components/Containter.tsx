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
        'max-w-7xl w-full text-base px-4 mx-auto',
        className,
        clsx(
          className,
          types === 'auth' &&
            'flex max-w-screen-xl px-0 justify-center items-center h-screen'
        )
      )}
    >
      {children}
    </section>
  );
};
