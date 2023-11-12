import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { HomePage } from '@/modules/home-module';
import map from '@/assets/images/home/map.jpg';
import church from '@/assets/images/home/church.jpg';
import candle from '@/assets/images/home/candle.jpg';
import cemetery from '@/assets/images/home/cemetery.jpg';
import { getSiteLayout } from '@/components/layouts/SiteLayout';
import { routes } from '@/common/routing/routes';

export function Home() {
  return (
    <>
      <div className="bg-dark-900 py-36">
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-[1fr_1fr]">
              <div className="relative aspect-[631/269]">
                <Image src={map} alt="" className="object-cover" fill />
              </div>

              <div className="relative aspect-[631/269]">
                <Image src={church} alt="" className="object-cover" fill />
              </div>

              <div className="relative aspect-[631/269]">
                <Image src={candle} alt="" className="object-cover" fill />
              </div>

              <div className="relative aspect-[631/269]">
                <Image src={cemetery} alt="" className="object-cover" fill />
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

      <HomePage />
    </>
  );
  // return null;
  // return <HomePage />;
}

Home.getLayout = getSiteLayout;

export default Home;
