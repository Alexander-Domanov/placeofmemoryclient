import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import Image from 'next/image';
import { routes } from '@/common/routing/routes';
import { IGetArticlesResponse } from '@/types';

interface Props {
  posts: IGetArticlesResponse;
}

export const ArticlesMain: FC<Props> = ({ posts }) => {
  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
          <Link href={routes.main} className="cursor-pointer">
            <AiOutlineHome size={22} />
          </Link>

          <div>/</div>

          <span className="text-accent-100">Артыкулы</span>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4">
          <h2 className="text-light-300 text-5xl sm:text-3xl">Артыкулы</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          {posts?.items.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-2 gap-8 mb-5 last:mb-0 lg:gap-5 lg:grid-cols-[4fr_6fr] sm:grid-cols-1 sm:gap-10"
            >
              <div>
                <Link
                  href={routes.articles.getArticle(post.slug)}
                  className="relative aspect-[532/244] block"
                >
                  <Image
                    src={post.photos[0]?.versions.huge.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>

              <div>
                <h2 className="text-4xl lg:text-3xl">
                  <Link href={routes.articles.getArticle(post.slug)}>
                    {post.title}
                  </Link>
                </h2>

                <div className="mt-8 text-base lg:mt-4">{post.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
