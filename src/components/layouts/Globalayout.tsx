import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { Container, LayoutWithHeader } from '@/components';

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <Container>
        <div className="min-h-[calc(100vh-65px)] pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
          <div className=" container">{children}</div>
        </div>
      </Container>
    </LayoutWithHeader>
  );
};
export const getGlobalLayout = (page: ReactElement) => {
  return <GlobalLayout>{page}</GlobalLayout>;
};
