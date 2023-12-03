import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import '../styles/globals.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProtection from '@/components/auth-protection/AuthProtection';
import theme from '@/theme/themeConfig';
import { useLoader } from '@/common/hooks/useLoader/useLoader';
import '@/styles/nprogress.css';

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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);
  useLoader();
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
