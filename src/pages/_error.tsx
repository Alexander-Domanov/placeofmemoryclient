import Head from 'next/head';
import { Header } from '@/components';
import { nameLogo } from '@/common/constants';

const Error = ({ statusCode }: any) => {
  return (
    <>
      <Head>
        <title>
          {statusCode || 404} | {nameLogo}
        </title>
      </Head>
      <Header />
      <div className="bg-dark-700 h-screen relative">
        <div className="container">
          <div className="flex justify-center items-center text-base min-h-[575px]">
            <p>
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
