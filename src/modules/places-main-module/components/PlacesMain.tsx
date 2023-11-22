import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useDebounce } from 'usehooks-ts';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ImageComponent } from '@/ui/image/ImageComponent';

import { useGetPlacesMain } from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';
import { Input } from '@/ui';
import PaginationCustom from '@/components/pagination/PaginationCustom';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useTranslation } from '@/components/internationalization';
import { IPlacesMainResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import { SITE_ARTICLES_PER_PAGE } from '@/modules/articles-module/articles-constants';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';

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
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <div className="flex flex-col">
          <BreadcrumbMain items={[{ text: titleT }]} />

          <div className="lex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
            <h2 className="text-light-300 text-5xl sm:text-3xl">
              {archiveT}
              <span className="text-dark-100 font-light ">{placeT}</span>
            </h2>
          </div>

          <div className="mt-6 h-[1px] bg-dark-300" />

          <div className="flex flex-col mt-10 ">
            <div className="flex md:justify-center justify-end flex-wrap gap-4">
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
            <div className="mt-10">
              <div>
                {dataPlaces?.items.map((place) => (
                  <div
                    key={place.id}
                    className="grid grid-cols-2 gap-8 mb-10 last:mb-0 lg:gap-5 lg:grid-cols-[4fr_6fr] sm:grid-cols-1 sm:gap-10"
                  >
                    <div>
                      <Link
                        href={routes.places.place(place.slug)}
                        className="relative aspect-[532/244] block"
                      >
                        <Image
                          src={place.photos[0]?.versions.huge.url}
                          alt={place.nameCemetery}
                          fill
                          className="object-cover rounded-lg hover:shadow-iconHover shadow-lg"
                        />
                      </Link>
                    </div>

                    <div>
                      <h2 className="text-3xl lg:text-xl">
                        <Link href={routes.articles.getArticle(place.slug)}>
                          {place.nameCemetery}
                        </Link>
                      </h2>

                      <div className="mt-8 text-base lg:mt-4 text-dark-100">
                        {place.shortDescription}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {dataPlaces?.items.length === 0 ? (
                <div className="flex justify-center mt-10 text-2xl text-dark-100">
                  {noDataT}
                </div>
              ) : (
                <div className="mt-10 md:mt-8">
                  <AntPagination
                    page={Number(pageParams) || 1}
                    pageSize={SITE_ARTICLES_PER_PAGE}
                    total={dataPlaces.totalCount}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
