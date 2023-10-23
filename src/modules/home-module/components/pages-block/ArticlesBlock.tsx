import { ImageComponent } from '@/ui/image/ImageComponent';
import map from '@/assets/images/home/map.jpg';
import church from '@/assets/images/home/church.jpg';
import candle from '@/assets/images/home/candle.jpg';
import cemetery from '@/assets/images/home/cemetery.jpg';

export const ArticlesBlock = () => {
  return (
    <div className="flex flex-col justify-center bg-dark-900  h-screen">
      <div className="flex relative">
        <ImageComponent alt="Map picture" width={600} height={268} src={map} />
        <ImageComponent
          alt="Church picture"
          width={600}
          height={268}
          src={church}
        />
        <div className="absolute w-[391px] flex justify-center items-center font-light text-[64px] h-[114px] text-light-300 bg-dark-900 leading-[64px] top-0">
          <span>Артыкулы</span>
        </div>
      </div>
      <div className="flex">
        <ImageComponent
          alt="Candle picture"
          width={730}
          height={268}
          src={candle}
        />
        <ImageComponent
          alt="Cemetery picture"
          width={487}
          height={268}
          src={cemetery}
        />
      </div>
    </div>
  );
};
