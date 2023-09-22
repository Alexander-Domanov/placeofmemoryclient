import { Inter } from 'next/font/google';
import Head from 'next/head';
import { getGlobalLayout } from '@/components/layouts/Globalayout';

const inter = Inter({ subsets: ['latin'] });

export function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Head>
        <title>Minsk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-red-400 justify-center align-middle">
        <span className="text-emerald-900">Content</span>
      </div>
    </main>
  );
}

Home.getLayout = getGlobalLayout;

export default Home;
