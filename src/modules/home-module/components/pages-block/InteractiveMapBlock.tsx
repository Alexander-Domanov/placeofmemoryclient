import { GrLinkNext } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { Button } from '@/ui';
import { routes } from '@/common/routing/routes';
import { ImageComponent } from '@/ui/image/ImageComponent';
import googleMap from '@/assets/images/home/googleMap.jpg';

export const InteractiveMapBlock = () => {
  const { push } = useRouter();
  return (
    <div className="flex h-[579px] items-center gap-[152px] justify-center text-dark-300">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <span className="text-dark-200 text-[64px] leading-[64px] font-light">
            Інтэрактыўная
          </span>
          <span className="font-semibold text-dark-200 text-[64px] leading-[64px]">
            Мапа
          </span>
          <div className="flex mt-7 flex-col">
            <span className="text-lg font-semibold text-dark-200">
              Каардынаты могілак
            </span>
            <span className="text-base font-light text-dark-200">
              Можна адзначыць могілку самастойна
            </span>
          </div>
        </div>
        <div className="mt-[138px] flex flex-col gap-8">
          <span className="text-base font-light text-dark-200">
            sampleemail@gmail.com
          </span>
          <Button
            variant="dark"
            className="w-[200px] flex gap-4"
            onClick={() => push(routes.map.index)}
          >
            Падрабязней
            <GrLinkNext size={17} />
          </Button>
        </div>
      </div>
      <div className="bg-red-400 ">
        <ImageComponent
          alt="Interactive google map"
          src={googleMap}
          height={579}
          width={768}
        />
      </div>
    </div>
  );
};
