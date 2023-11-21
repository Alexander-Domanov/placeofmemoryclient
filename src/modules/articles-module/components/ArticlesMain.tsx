import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { useDebounce } from 'usehooks-ts';
import { routes } from '@/common/routing/routes';
import { IArticle, IGetArticlesResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { useArticlesPublic } from '@/modules/articles-module/hooks/useArticlesPublic';

const titles = [
  { title: 'Каталіцкія могілкі', id: 1, slug: 'catholic-cemeteries' },
  { title: 'Працэстанцкія могілкі', id: 2, slug: 'protestant-cemeteries' },
  { title: 'Савецкія могілкі', id: 3, slug: 'soviet-cemeteries' },
  { title: 'Іншыя могілкі', id: 4, slug: 'other-cemeteries' },
];

interface Props {
  posts: IGetArticlesResponse;
}

export const ArticlesMain: FC<Props> = ({ posts }) => {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<IArticle[]>([]);
  const [inputValue, setInputValue] = useState('');

  const title = useDebounce(inputValue, 500);

  const { articles, isLoading } = useArticlesPublic({
    title,
  });

  useEffect(() => {
    if (inputValue.length > 0) {
      setSearchResults(articles?.items || []);
    } else {
      setSearchResults([]);
    }
  }, [articles]);

  const onPageChange = (page: number) => {
    if (page === 1) {
      router.push(routes.articles.index);
    } else {
      router.push(`${routes.articles.index}/page/${page}`);
    }
  };

  const isDropdownOpen = searchResults.length > 0;

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[28px] pb-[60px] pl-[60px] pr-[60px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <BreadcrumbMain items={[{ text: 'Артыкулы' }]} />

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">Артыкулы</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="flex justify-end md:justify-center md:flex-wrap mt-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BsSearch />
            </span>

            <input
              placeholder="ЗНАЙСЦІ"
              type="text"
              title={inputValue}
              className={`w-80 h-10 flex-shrink-0 bg-dark-300 shadow-md hover:shadow-icon px-12 sm:w-60 sm:h-8 sm:px-10 outline-none ${
                isDropdownOpen ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-lg'
              }`}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              list="titles"
            />

            {searchResults.length > 0 && (
              <div className="absolute w-80 bg-dark-300 rounded-bl-lg rounded-br-lg shadow-md overflow-hidden z-20">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      console.log(result);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Image
                          src={result.photos[0]?.versions.medium.url}
                          alt={result.title}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>

                      <Link href={routes.articles.getArticle(result.slug)}>
                        <span className="text-light-300">{result.title}</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <div>
            {posts?.items.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-2 gap-8 mb-10 last:mb-0 lg:gap-5 lg:grid-cols-[4fr_6fr] sm:grid-cols-1 sm:gap-10"
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
                      className="object-cover rounded-lg hover:shadow-iconHover shadow-lg"
                    />
                  </Link>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-xl">
                    <Link href={routes.articles.getArticle(post.slug)}>
                      {post.title}
                    </Link>
                  </h2>

                  <div className="mt-8 text-base lg:mt-4 text-dark-100">
                    {post.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts?.items.length === 0 ? (
            <div className="flex justify-center mt-10 text-2xl text-dark-100">
              Няма артыкулаў
            </div>
          ) : (
            <div className="mt-10 md:mt-8">
              <AntPagination
                page={Number(router.query.page) || 1}
                pageSize={SITE_ARTICLES_PER_PAGE}
                total={posts.totalCount}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
