import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/layouts/components/Header';
import { Footer } from '@/components';
import { SiteFooter } from '@/components/layouts/components/SiteFooter';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';

export const LayoutWithHeader: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export const getLayoutWithHeader = (page: ReactElement) => {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};
