import { FC } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/common/routing/routes';
import homeMap from '@/assets/images/map.png';
import { useTranslation } from '@/components/internationalization';

export const HomeMap: FC = () => {
  const { t } = useTranslation();
  const {
    titleSecondT,
    titleFirstT,
    descriptionFirstT,
    descriptionSecondT,
    descriptionEnd,
    linkT,
  } = t.home.page.homeMap;
  return (
    <div className="pt-[140px] pb-[70px] lg:py-16 bg-white">
      <div className="container ">
        <div className="grid grid-cols-2 sm:grid-cols-1 sm:gap-8">
          <div className="pr-8">
            <div className="text-dark-200 text-[64px] leading-none font-light lg:text-4xl">
              {titleFirstT}
            </div>

            <div className="text-dark-200 text-[64px] leading-none font-bold lg:text-4xl">
              {titleSecondT}
            </div>

            <div className="mt-8 text-xl leading-6 font-light text-dark-200">
              <span className="block font-bold">{descriptionFirstT}</span>
              {descriptionSecondT}
            </div>

            <div className="mt-[112px] lg:mt-12">
              <a
                href={routes.map.index}
                className="inline-flex items-center px-10 uppercase tracking-[1.6px] font-bold text-white h-[72px] bg-dark-200 rounded-[100px]
                lg:h-14 lg:px-8 sm:h-11 sm:px-6 sm:text-sm hover:shadow-iconHover shadow-lg transition-all duration-300"
              >
                {linkT}
                <FaArrowRightLong className="ml-4" size={20} />
              </a>

              <div className="mt-4 ml-9 font-light text-dark-200/50 sm:text-sm sm:ml-0">
                {descriptionEnd}
              </div>
            </div>
          </div>

          <div>
            <Link href={routes.map.index}>
              <Image
                src={homeMap}
                alt="map"
                className="rounded-tl-3xl rounded-bl-3xl hover:shadow-button shadow-lg transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
