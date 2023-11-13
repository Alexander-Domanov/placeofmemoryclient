import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import homeHero from '@/assets/images/home-hero.jpg';
import homeMap from '@/assets/images/home-map.png';
import { getSiteLayout } from '@/components/layouts/SiteLayout';
import { routes } from '@/common/routing/routes';
import { getArticlesPublic } from '@/modules/articles-module/api/articles-api';
import { IGetArticlesResponse } from '@/types/articles/get-articles-response.type';

interface Props {
  posts: IGetArticlesResponse;
  time: string;
}

const Home = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="bg-dark-900 h-[calc(100vh-65px)] min-h-[600px] relative">
        <Image
          src={homeHero}
          alt="hero"
          fill
          quality={85}
          className="object-cover object-[0_-200px] lg:object-top"
        />

        <div className="container relative h-full w-full flex flex-col justify-center">
          <div className="grid grid-cols-[530px_1fr] lg:grid-cols-[400px_1fr]">
            <div>
              <div className="pt-[32px] pl-[40px] pb-[40px] bg-dark-900/80 rounded-[20px] lg:py-4 lg:px-6">
                <div>
                  <div className="uppercase text-[72px] font-light leading-none -tracking-[2px] lg:text-6xl">
                    МОГІЛКІ
                  </div>
                  <div className="mt-1 text-[60px] font-bold leading-none tracking-[2px] lg:text-5xl">
                    Архіў
                  </div>
                </div>
              </div>

              <div className="mt-1 bg-dark-900/95 rounded-[20px] py-5 px-8 text-sm font-light lg:py-4 lg:px-7">
                Могілкі - гэта спецыяльны партал для людзей, якія цікавяцца
                гісторыяй і архіўнымі дадзенымі. На сайце ёсць інтэрактыўная
                мапа, дзе вы знойдзеце пахавання беларусаў на тэрыторыі
                Рэспублікі Польшчы.
              </div>
            </div>

            <div>
              <div>
                <Link
                  href={routes.places.index}
                  className="mt-[120px] ml-[140px] uppercase tracking-[1.6px] inline-flex relative h-[72px] bg-white items-center px-10 text-dark-200 font-bold rounded-[100px] before:absolute before:-left-[140px] lg:before:-left-[80px] before:top-1/2 before:h-[1px] before:w-[140px] lg:before:w-[80px] before:bg-dark-900 lg:mt-[80px] lg:ml-[80px] lg:h-14 lg:px-8"
                >
                  падрабязней
                  <FaArrowRightLong className="ml-4" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                sm:relative sm:right-0 sm:top-0 sm:translate-y-0 sm:h-11 sm:text-xs sm:px-6 sm:mt-6 sm:ml-auto"
              >
                чытаць усе
                <FaArrowRightLong className="ml-4" size={24} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="pt-[140px] pb-[70px] lg:py-16">
        <div className="container ">
          <div className="grid grid-cols-2 sm:grid-cols-1 sm:gap-8">
            <div className="pr-8">
              <div className="text-dark-200 text-[64px] leading-none font-light lg:text-4xl">
                Інтэрактыўная
              </div>

              <div className="text-dark-200 text-[64px] leading-none font-bold lg:text-4xl">
                Мапа
              </div>

              <div className="mt-8 text-xl leading-6 font-light text-dark-200">
                <span className="block font-bold">Каардынаты могілак</span>
                Можна адзначыць могілку самастойна
              </div>

              <div className="mt-[112px] lg:mt-12">
                <a
                  href={routes.map.index}
                  className="inline-flex items-center px-10 uppercase tracking-[1.6px] font-bold text-white h-[72px] bg-dark-200 rounded-[100px] shadow-button lg:h-14 lg:px-8"
                >
                  чытаць усе
                  <FaArrowRightLong className="ml-4" size={20} />
                </a>

                <div className="mt-4 ml-9 font-light text-dark-200/50">
                  працуе на ўсіх дэвайсах
                </div>
              </div>
            </div>

            <div>
              <Image src={homeMap} alt="map" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts } = await getArticlesPublic();

  return {
    props: {
      posts,
      time: Date.now(),
    },
    revalidate: 30,
  };
};

Home.getLayout = getSiteLayout;

export default Home;
