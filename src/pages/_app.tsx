import { ReactElement, ReactNode, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import '@/styles/globals.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import AuthProtection from '@/components/auth-protection/AuthProtection';
import theme from '@/theme/themeConfig';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProtection>
          <ConfigProvider theme={theme}>
            <StyleProvider hashPriority="high">
              {getLayout(<Component {...pageProps} />)}
            </StyleProvider>
          </ConfigProvider>
        </AuthProtection>
      </Hydrate>

      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}
