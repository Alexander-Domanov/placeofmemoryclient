import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import homeHero from '@/assets/images/home-hero.jpg';
import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';

export const HomeHero: FC = () => {
  const { t } = useTranslation();
  const { linkButton, description, graveTitle, archiveTitle } =
    t.home.page.homeHero;
  return (
    <div className="bg-dark-900 h-[calc(100vh-65px)] min-h-[575px] relative">
      <Image
        src={homeHero}
        alt="hero"
        fill
        quality={85}
        className="object-cover object-[0_-200px] lg:object-top"
        loading="eager"
      />

      <div className="container relative h-full w-full flex flex-col justify-center">
        <div className="grid grid-cols-[530px_1fr] lg:grid-cols-[400px_1fr] sm:grid-cols-1">
          <div>
            <div className="pt-[32px] pl-[40px] pb-[40px] bg-dark-900/80 rounded-[20px] lg:py-4 lg:px-6">
              <div>
                <div className="uppercase text-[72px] font-light leading-none -tracking-[2px] lg:text-6xl sm:text-5xl">
                  {graveTitle}
                </div>
                <div className="mt-1 text-[60px] font-bold leading-none tracking-[2px] lg:text-5xl sm:text-4xl">
                  {archiveTitle}
                </div>
              </div>
            </div>

            <div className="mt-1 bg-dark-900/95 rounded-[20px] py-5 px-8 text-sm font-light lg:py-4 lg:px-6">
              {description}
            </div>
          </div>

          <div>
            <div className="sm:text-center">
              <Link
                href={routes.places.page(String(1))}
                className="mt-[120px] ml-[140px] uppercase tracking-[1.6px] inline-flex relative h-[72px] bg-white items-center px-10 text-dark-200 font-bold rounded-[100px]
                before:absolute before:-left-[140px] lg:before:-left-[80px] before:top-1/2 before:h-[1px] before:w-[140px]
                lg:before:w-[80px] before:bg-dark-900 lg:mt-[80px] lg:ml-[80px] lg:h-14 lg:px-8
                sm:mt-16 sm:before:hidden sm:ml-0 sm:h-11 sm:px-6 sm:text-sm hover:shadow-iconHover shadow-lg transition-all duration-300"
              >
                {linkButton}
                <FaArrowRightLong className="ml-4" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
