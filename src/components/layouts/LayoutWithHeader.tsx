import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { Header } from '@/components/layouts/components/Header';

export const LayoutWithHeader: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export const getLayoutWithHeader = (page: ReactElement) => {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};
