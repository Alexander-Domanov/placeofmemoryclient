import { NextPage } from 'next';
import { PropsWithChildren, ReactElement } from 'react';
import { Container, LayoutWithHeader } from '@/components';

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <Container>
        <div className="pt-[120px] md:pt-[58px] md:pb-[48px] pb-[120px]">
          <div className="container">{children}</div>
        </div>
      </Container>
    </LayoutWithHeader>
  );
};
export const getGlobalLayout = (page: ReactElement, contacts: string) => {
  return <GlobalLayout>{page}</GlobalLayout>;
};
