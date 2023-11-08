import Link from 'next/link';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { ImageComponent } from '@/ui/image/ImageComponent';

import { useGetPlacesMain } from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';

export const PlacesMain = () => {
  const { dataPlaces } = useGetPlacesMain();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-7">
          {dataPlaces?.items.map((place) =>
            place.photos.map((photo) => (
              <div
                className="flex relative items-center bg-dark-900 justify-center w-[170px] h-[210px]"
                key={place.id}
              >
                <Link
                  href={{
                    pathname: routes.places.getPlace(place.slug),
                  }}
                >
                  <ImageComponent
                    className="object-cover"
                    alt={photo.alt}
                    width={170}
                    height={210}
                    src={photo.versions.large.url}
                  />
                  <span className="absolute flex items-center justify-center text-light-300 leading-3 text-xs font-medium left-0 bottom-0 bg-dark-300 w-full h-7">
                    {place.nameCemetery}
                  </span>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex align-middle mt-[82px] justify-between">
        <AiOutlineLeftCircle
          size={56}
          fill="#bdc1c7"
          aria-label="prevPageLabel"
        />
        <div className="font-normal text-xl leading-6 text-light-100">
          <span>01/</span>
          <span className="text-dark-100">05</span>
        </div>
        <AiOutlineRightCircle
          aria-label="nextPageLabel"
          size={56}
          fill="#bdc1c7"
        />
      </div>
    </div>
  );
};
