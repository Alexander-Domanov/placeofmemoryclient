import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { Roboto } from '@next/font/google';
import { Header } from '@/components';
import { SiteFooter } from '@/components/layouts/components/SiteFooter';

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const SiteLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />

      <main className={roboto.className}>{children}</main>

      <SiteFooter />
    </>
  );
};

export const getSiteLayout = (page: ReactElement) => {
  return <SiteLayout>{page}</SiteLayout>;
};
