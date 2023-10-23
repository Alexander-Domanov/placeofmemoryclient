import Head from 'next/head';
import { Roboto } from '@next/font/google';
import { getGlobalLayout, getHomeLayout } from '@/components';
import { HomePage } from '@/modules/home-module';
// main font
const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between ${roboto.className} font-sans`}
    >
      <Head>
        <title>MOGILKI</title>
        <meta name="description" content="Mogilki" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </main>
  );
}

Home.getLayout = getHomeLayout;

export default Home;
