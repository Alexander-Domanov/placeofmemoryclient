import { FC } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';
import { routes } from '@/common/routing/routes';
import homeMap from '@/assets/images/home-map.png';

export const HomeMap: FC = () => {
  return (
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
                className="inline-flex items-center px-10 uppercase tracking-[1.6px] font-bold text-white h-[72px] bg-dark-200 rounded-[100px] shadow-button
                lg:h-14 lg:px-8 sm:h-11 sm:px-6 sm:text-sm"
              >
                чытаць усе
                <FaArrowRightLong className="ml-4" size={20} />
              </a>

              <div className="mt-4 ml-9 font-light text-dark-200/50 sm:text-sm sm:ml-0">
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
  );
};
