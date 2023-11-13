import { FC } from 'react';
import { HomeHero } from './pages-block/HomeHero';
import { IGetArticlesResponse } from '@/types';
import { HomeArticles } from './pages-block/HomeArticles';
import { HomeMap } from '@/modules/home-module/components/pages-block/HomeMap';

interface Props {
  posts: IGetArticlesResponse;
  time: string;
}

export const SiteHomePage: FC<Props> = ({ posts }) => {
  return (
    <>
      <HomeHero />

      <HomeArticles posts={posts} />

      <HomeMap />
    </>
  );
};
