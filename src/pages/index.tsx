import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { IGetArticlesResponse } from '@/types/articles/get-articles-response.type';
import { SiteHomePage } from '@/modules/home-module/components/SiteHomePage';
import { getContacts } from '@/modules/contacts-module/api/contacts-api';
import { IContacts } from '@/types';
import { nameLogo } from '@/common/constants';

interface Props {
  posts: IGetArticlesResponse;
  contacts: IContacts;
  time: string;
}

const Home = ({ posts, time, contacts }: Props) => {
  return (
    <>
      <Head>
        <title>{`Home | ${nameLogo}`}</title>
      </Head>

      <SiteLayout contacts={contacts}>
        <SiteHomePage posts={posts} time={time} />
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: posts } = await getArticlesPublic({
    title: '',
    lang: context.locale,
  });

  const { data: contacts } = await getContacts();

  return {
    props: {
      posts,
      time: Date.now(),
      contacts,
    },
    revalidate: 30,
  };
};

export default Home;
