import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useDebounce } from 'usehooks-ts';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImageComponent } from '@/ui/image/ImageComponent';

import { useGetPlacesMain } from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';
import { Input } from '@/ui';
import PaginationCustom from '@/components/pagination/PaginationCustom';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useTranslation } from '@/components/internationalization';
import { IPlacesMainResponse } from '@/types';

interface IProps {
  places: IPlacesMainResponse;
}
export const PlacesMain = ({ places }: IProps) => {
  const { push, query } = useRouter();
  const { t } = useTranslation();
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const vName = useDebounce(name, 1000);
  const vCountry = useDebounce(country, 1000);
  const vCity = useDebounce(city, 1000);
  const pageParams = query.page as string;
  const { width } = useWindowSize();
  const { dataPlaces, isLoading, isFetchingPlaces } = useGetPlacesMain({
    name: vName,
    city: vCity,
    country: vCountry,
    places,
  });
  const onPageChange = (newPage: number) => {
    if (dataPlaces && newPage >= 1 && newPage <= dataPlaces.pagesCount) {
      push(routes.places.page(String(newPage)));
    }
  };
  const {
    name: nameT,
    place: placeT,
    country: countryT,
    archive: archiveT,
    city: cityT,
    title: titleT,
    noData: noDataT,
  } = t.places.page;
  return (
    <div className="bg-dark-700 pt-[120px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
            <Link href={routes.main} className="cursor-pointer">
              <AiOutlineHome size={22} />
            </Link>

            <div>/</div>

            <span className="text-accent-100">{titleT}</span>
          </div>

          <div className="flex pt-4 justify-between md:justify-center md:flex-wrap gap-4">
            <h2 className="text-light-300 text-5xl sm:text-3xl">
              {archiveT}
              <span className="text-dark-100 font-light ">{placeT}</span>
            </h2>
          </div>

          <div className="mt-6 h-[1px] bg-dark-300" />
          <div className="flex mt-10 md:justify-center flex-wrap gap-4">
            <div>
              <Input
                label={nameT}
                className="w-[166px] h-[36px]"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div>
              <Input
                label={countryT}
                className="w-[166px] h-[36px]"
                onChange={(e) => setCountry(e.currentTarget.value)}
              />
            </div>
            <div>
              <Input
                label={cityT}
                className="w-[166px] h-[36px]"
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </div>
          </div>
          {dataPlaces && dataPlaces.items.length > 0 ? (
            dataPlaces.items.map((place) => (
              <div
                className="flex w-full align-middle lg:flex-col md:justify-center items-center lg:gap-8 gap-16"
                key={place.id}
              >
                {place.photos.map((photo) => (
                  <div
                    className="flex md:relative mt-12  bg-dark-900 justify-center  w-[540px] h-[240px]"
                    key={place.id}
                  >
                    <Link
                      href={{
                        pathname: routes.places.place(place.slug),
                      }}
                    >
                      <ImageComponent
                        className="md:absolute md:left-0 object-cover"
                        alt={photo.alt}
                        width={width && width <= 767 ? 300 : 540}
                        height={width && width <= 767 ? 100 : 240}
                        src={photo.versions.huge.url}
                      />
                      {width && width <= 767 && (
                        <div className="absolute px-3 py-3 bg-opacity-70 bg-[#292929] h-full tran left-0 flex justify-center align-middle gap-2 flex-col break-words">
                          <h2 className="text-4xl lg:text-3xl">
                            <Link href={routes.articles.getArticle(place.slug)}>
                              {place.nameCemetery}
                            </Link>
                          </h2>

                          <div className="mt-8 text-base lg:mt-4">
                            {place.shortDescription}
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
                {width && width > 767 && (
                  <div className="flex gap-10 flex-col break-words">
                    <h2 className="text-4xl lg:text-3xl">
                      <Link href={routes.articles.getArticle(place.slug)}>
                        {place.nameCemetery}
                      </Link>
                    </h2>

                    <div className="mt-8 text-base lg:mt-4">
                      {place.shortDescription}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-lg first-letter:uppercase mt-10 text-center">
              {noDataT}
            </div>
          )}
          {dataPlaces && dataPlaces.items.length > 0 && (
            <PaginationCustom
              onPageChange={onPageChange}
              page={Number(pageParams) || 1}
              pageCount={dataPlaces ? dataPlaces.pagesCount : 1}
            />
          )}
        </div>
      </div>
    </div>
  );
};
