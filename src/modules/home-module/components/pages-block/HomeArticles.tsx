import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { routes } from '@/common/routing/routes';
import { IGetArticlesResponse } from '@/types';

interface Props {
  posts: IGetArticlesResponse;
}

export const HomeArticles: FC<Props> = ({ posts }) => {
  return (
    <>
      {posts && (
        <div className="bg-dark-700 py-36 lg:py-16 sm:py-12">
          <div className="container">
            <div className="relative flex flex-col w-full">
              <div className="absolute top-0 left-0 pt-3 pr-20 pb-10 pl-9 text-[56px] leading-[64px] bg-dark-700 rounded-ee-[20px] lg:py-4 lg:px-6 lg:text-4xl sm:relative sm:p-0 z-10">
                Артыкулы
              </div>

              <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-1 sm:mt-4">
                {posts.items.map((post) => (
                  <div key={post.id} data-id={post.id}>
                    <Link
                      href={routes.articles.getArticle(post.slug)}
                      className="relative aspect-[2.2/1] block"
                    >
                      <Image
                        src={post.photos[0]?.versions?.huge.url}
                        alt=""
                        className="object-cover"
                        fill
                        quality={85}
                      />
                    </Link>
                  </div>
                ))}
              </div>

              <a
                href={routes.articles.index}
                className="absolute top-1/2 -translate-y-1/2 right-[-80px] inline-flex items-center px-10 uppercase
                tracking-[2px] font-bold text-dark-700 h-[72px] bg-white rounded-[100px] shadow-button
                2xl:right-0
                lg:h-14 lg:px-8
                sm:relative sm:right-0 sm:top-0 sm:translate-y-0 sm:h-11 sm:text-sm sm:px-6 sm:mt-6 sm:ml-auto"
              >
                чытаць усе
                <FaArrowRightLong className="ml-4" size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
