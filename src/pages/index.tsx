import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import Head from 'next/head';
import Link from 'next/link';
import map from '@/assets/images/home/map.jpg';
import church from '@/assets/images/home/church.jpg';
import candle from '@/assets/images/home/candle.jpg';
import cemetery from '@/assets/images/home/cemetery.jpg';
import homeHero from '@/assets/images/home-hero.jpg';
import homeMap from '@/assets/images/home-map.png';
import { getSiteLayout } from '@/components/layouts/SiteLayout';
import { routes } from '@/common/routing/routes';

export function Home() {
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
          <div className="grid grid-cols-[530px_1fr]">
            <div>
              <div className="pt-[32px] pl-[40px] pb-[40px] bg-dark-900/80 rounded-[20px]">
                <div>
                  <div className="uppercase text-[72px] font-light leading-none -tracking-[2px]">
                    МОГІЛКІ
                  </div>
                  <div className="mt-1 text-[60px] font-bold leading-none tracking-[2px]">
                    Архіў
                  </div>
                </div>
              </div>

              <div className="mt-1 bg-dark-900/95 rounded-[20px] py-5 px-8 text-sm font-light">
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
                  className="mt-[120px] ml-[140px] uppercase tracking-[1.6px] inline-flex relative h-[72px] bg-white items-center pl-[30px] pr-[20px] text-dark-200 font-bold rounded-[100px] before:absolute before:-left-[140px] before:top-1/2 before:h-[1px] before:w-[140px] before:bg-dark-900"
                >
                  падрабязней
                  <FaArrowRightLong className="ml-5" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-900 py-36">
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-[1fr_1fr]">
              <div className="relative aspect-[631/269]">
                <Image
                  src={map}
                  alt=""
                  className="object-cover"
                  fill
                  quality={85}
                />
              </div>

              <div className="relative aspect-[631/269]">
                <Image
                  src={church}
                  alt=""
                  className="object-cover"
                  fill
                  quality={85}
                />
              </div>

              <div className="relative aspect-[631/269]">
                <Image
                  src={candle}
                  alt=""
                  className="object-cover"
                  fill
                  quality={85}
                />
              </div>

              <div className="relative aspect-[631/269]">
                <Image
                  src={cemetery}
                  alt=""
                  className="object-cover"
                  fill
                  quality={85}
                />
              </div>
            </div>

            <div className="absolute top-0 left-0 pt-3 pr-20 pb-10 pl-9 text-[56px] leading-[64px] bg-dark-700 rounded-ee-[20px]">
              Артыкулы
            </div>

            <a
              href={routes.articles.index}
              className="absolute top-1/2 -translate-y-1/2 right-[-80px] inline-flex items-center pl-8 pr-10 uppercase tracking-[2px] font-bold text-dark-700 h-[72px] bg-white rounded-[100px] shadow-button"
            >
              чытаць усе
              <FaArrowRightLong className="ml-8" size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-[140px] pb-[70px]">
        <div className="container ">
          <div className="grid grid-cols-2">
            <div className="pr-8">
              <div className="text-dark-200 text-[64px] leading-none font-light">
                Інтэрактыўная
              </div>

              <div className="text-dark-200 text-[64px] leading-none font-bold">
                Мапа
              </div>

              <div className="mt-8 text-xl leading-6 font-light text-dark-200">
                <span className="block font-bold">Каардынаты могілак</span>
                Можна адзначыць могілку самастойна
              </div>

              <div className="mt-[112px]">
                <a
                  href={routes.map.index}
                  className="inline-flex items-center pl-10 pr-10 uppercase tracking-[1.6px] font-bold text-white h-[72px] bg-dark-200 rounded-[100px] shadow-button"
                >
                  чытаць усе
                  <FaArrowRightLong className="ml-5" size={20} />
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
}

Home.getLayout = getSiteLayout;

export default Home;
