import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';
import { IGetArticlesResponse } from '@/types';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import AntPagination from '@/components/pagination/AntPagination';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';

interface Props {
  posts: IGetArticlesResponse;
}

export const ArticlesMain: FC<Props> = ({ posts }) => {
  const router = useRouter();

  const onPageChange = (page: number) => {
    if (page === 1) {
      router.push(routes.articles.index);
    } else {
      router.push(`${routes.articles.index}/page/${page}`);
    }
  };

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
          <Link href={routes.main} className="cursor-pointer">
            <AiOutlineHome size={isMobile ? 16 : 22} />
          </Link>

          <div>/</div>

          <span className="text-accent-100">Артыкулы</span>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">Артыкулы</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

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
                      className="object-cover rounded-lg shadow-icon"
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

          <AntPagination
            page={Number(router.query.page) || 1}
            pageSize={SITE_ARTICLES_PER_PAGE}
            total={posts.totalCount}
            onPageChange={onPageChange}
          />
          {/* <ConfigProvider */}
          {/*  theme={{ */}
          {/*    components: { */}
          {/*      Pagination: { */}
          {/*        itemSizeSM: isMobile ? 32 : 48, */}
          {/*        itemInputBg: '#565656', */}
          {/*        colorText: '#fafafa', */}
          {/*        // colorPrimary: '#565656', */}
          {/*        // colorBorder: '#565656', */}
          {/*        colorPrimaryHover: '#fafafa', */}
          {/*        fontSize: isMobile ? 14 : 22, */}
          {/*        lineType: 'round', */}
          {/*      }, */}
          {/*    }, */}
          {/*  }} */}
          {/* > */}
          {/*  <Pagination */}
          {/*    pageSize={SITE_ARTICLES_PER_PAGE} */}
          {/*    current={Number(router.query.page) || 1} */}
          {/*    total={posts.totalCount} */}
          {/*    showSizeChanger={false} */}
          {/*    onChange={onPageChange} */}
          {/*    simple */}
          {/*    prevIcon={ */}
          {/*      <button className="mr-56 md:mr-32 sm:mr-16 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"> */}
          {/*        <BsArrowLeftCircleFill className="text-dark-300" /> */}
          {/*        <span className="sr-only">Previous</span> */}
          {/*      </button> */}
          {/*    } */}
          {/*    nextIcon={ */}
          {/*      <button */}
          {/*        type="button" */}
          {/*        className="ml-56 md:ml-32 sm:ml-16 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200" */}
          {/*      > */}
          {/*        <BsArrowRightCircleFill className="text-dark-300" /> */}
          {/*        <span className="sr-only">Next</span> */}
          {/*      </button> */}
          {/*    } */}
          {/*  /> */}
          {/* </ConfigProvider> */}
        </div>
      </div>
    </div>
  );
};
