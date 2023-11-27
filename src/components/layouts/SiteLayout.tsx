import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { clsx } from 'clsx';
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
    <div className={clsx('flex flex-col min-h-screen', roboto.className)}>
      <Header />

      <main className="flex-grow flex-shrink-0 bg-dark-700">{children}</main>

      <SiteFooter contacts={contacts} />
    </div>
  );
};

// export const getSiteLayout = (page: ReactElement) => {
//   return <SiteLayout contacts={null}>{page}</SiteLayout>;
// };
