import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { useDebounce, useOnClickOutside } from 'usehooks-ts';
import { routes } from '@/common/routing/routes';
import { IArticle, IGetArticlesResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/constants/articles-constants';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { useArticlesPublic } from '@/modules/articles-module/hooks/useArticlesPublic';
import { useTranslation } from '@/components/internationalization';
import { NoDataComponent } from '@/components';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';

interface Props {
  articles: IGetArticlesResponse;
}

export const ArticlesMain: FC<Props> = ({ articles }) => {
  const router = useRouter();
  const lang = router.locale?.toLowerCase();
  const { t } = useTranslation();

  const [searchResults, setSearchResults] = useState<IArticle[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const title = useDebounce(inputValue, 500);

  const { foundArticles } = useArticlesPublic({
    title: title.toLowerCase(),
    pageSize: 5,
    lang,
  });

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  useEffect(() => {
    if (lang) {
      router.push(`${routes.articles.page(Number(1))}`);
    }
  }, [lang]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setSearchResults(foundArticles?.items || []);
    } else {
      setSearchResults([]);
    }
  }, [foundArticles]);

  const onPageChange = (page: number) => {
    router.push(`${routes.articles.page(page)}`);
  };

  const isDropdownOpen = searchResults.length > 0;

  const { title: titleT, article: articleT, search: searchT } = t.articles.page;

  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <BreadcrumbMain items={[{ text: titleT }]} />

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">{articleT}</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="flex justify-end md:justify-center md:flex-wrap mt-10">
          <div className="relative w-96 md:w-80 sm:w-full" ref={ref}>
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BsSearch />
            </span>

            <input
              placeholder={searchT}
              type="text"
              title={inputValue}
              className={`h-10 sm:h-8 w-96 md:w-80 sm:w-full flex-shrink-0 bg-dark-300 shadow-md hover:shadow-icon px-12 sm:px-10 outline-none ${
                isSearchOpen && isDropdownOpen
                  ? 'rounded-tl-2xl rounded-tr-2xl  bg-dark-400'
                  : 'rounded-full'
              }`}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onFocus={() => setIsSearchOpen(true)}
              list="titles"
            />

            {searchResults.length > 0 && isSearchOpen && (
              <div className="absolute bg-dark-300 rounded-bl-2xl rounded-br-2xl shadow-md overflow-hidden z-20 w-full">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-2 cursor-pointer hover:bg-dark-150"
                  >
                    <div className="grid grid-cols-[60px_1fr] items-center">
                      <Image
                        src={result.photos[0]?.versions.medium.url}
                        alt={result.title}
                        width={40}
                        height={40}
                        className="rounded-sm"
                      />

                      <Link href={routes.articles.article(result.slug)}>
                        <span className="text-light-300 ">{result.title}</span>
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
            {articles?.items.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-2 gap-8 mb-10 last:mb-0 lg:gap-5 lg:grid-cols-[4fr_6fr] sm:grid-cols-1 sm:gap-10"
              >
                <div>
                  <Link
                    href={routes.articles.article(post.slug)}
                    className="relative aspect-[532/244] block"
                  >
                    <Image
                      src={post.photos[0]?.versions.huge.url || pictureBackup}
                      alt={post.photos[0]?.alt || post.title}
                      fill
                      className="object-cover rounded-lg hover:shadow-iconHover shadow-lg"
                    />
                  </Link>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-xl">
                    <Link href={routes.articles.article(post.slug)}>
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

          {articles?.items.length === 0 ? (
            <NoDataComponent />
          ) : (
            <div className="mt-20 md:mt-10">
              <AntPagination
                page={Number(router.query.page) || 1}
                pageSize={SITE_ARTICLES_PER_PAGE}
                total={articles.totalCount}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
