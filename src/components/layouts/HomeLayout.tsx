import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { LayoutWithHeader } from '@/components';

export const HomeLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <div>{children}</div>
    </LayoutWithHeader>
  );
};
export const getHomeLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>;
};
