import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { Header } from '@/components';
import { SiteFooter } from '@/components/layouts/components/SiteFooter';
import { IContacts } from '@/types';

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

interface Props {
  contacts: IContacts;
}

export const SiteLayout: NextPage<PropsWithChildren<Props>> = ({
  children,
  contacts,
}) => {
  return (
    <>
      <Header />

      <main className={roboto.className}>{children}</main>

      <SiteFooter contacts={contacts} />
    </>
  );
};

// export const getSiteLayout = (page: ReactElement) => {
//   return <SiteLayout contacts={null}>{page}</SiteLayout>;
// };
