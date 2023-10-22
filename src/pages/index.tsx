import Head from 'next/head';
import { Roboto } from '@next/font/google';
import { getGlobalLayout } from '@/components';
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
      <div>
        <span className=" bg-dark-light">Content</span>
      </div>
    </main>
  );
}

Home.getLayout = getGlobalLayout;

export default Home;
