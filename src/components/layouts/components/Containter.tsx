import { FC, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <section className={clsx('max-w-7xl w-full px-4 mx-auto', className)}>
      {children}
    </section>
  );
};
