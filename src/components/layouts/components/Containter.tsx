import { FC, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

type ContainerVariant = 'auth';

interface Props {
  className?: string;
  types?: ContainerVariant;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  types,
}) => {
  return (
    <section
      className={clsx(
        'max-w-7xl w-full px-4 mx-auto',
        className,
        types === 'auth' &&
          'flex px-0 justify-between max-w-full items-center h-screen'
      )}
    >
      {children}
    </section>
  );
};
