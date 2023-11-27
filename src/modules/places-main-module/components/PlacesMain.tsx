import Link from 'next/link';
import { useDebounce } from 'usehooks-ts';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetPlacesMain } from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';
import { Input } from '@/ui';
import { useTranslation } from '@/components/internationalization';
import { IGetPlacesResponse } from '@/types';
import AntPagination from '@/components/pagination/AntPagination';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';

interface IProps {
  places: IGetPlacesResponse;
}

const CityTooltip: FC<{ city: string; country: string }> = ({
  city,
  country,
}) => (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 rounded-lg">
    <div className="text-lg font-bold break-after-all text-center">
      {country} ({city})
    </div>
  </div>
);

export const PlacesMain = ({ places }: IProps) => {
  const { push, query } = useRouter();
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const vName = useDebounce(name, 1500);
  const vCountry = useDebounce(country, 1500);
  const vCity = useDebounce(city, 1500);
  const pageParams = query.page as string;
  const { dataPlaces, isLoading } = useGetPlacesMain({
    pageNumber: Number(pageParams),
    name: vName,
    city: vCity,
    country: vCountry,
    places,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

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

          <div className="mt-10">
            <div className="grid grid-cols-[200px_200px_200px] gap-3 justify-end sm:grid-cols-2 sm:gap-0">
              <div className="sm:order-1 sm:col-span-2">
                <Input
                  type="text"
                  id="name"
                  value={name}
                  label={nameT}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>

              <div className="sm:order-2 sm:col-span-2">
                <Input
                  type="text"
                  id="country"
                  value={country}
                  label={countryT}
                  onChange={(e) => setCountry(e.currentTarget.value)}
                />
              </div>

              <div className="sm:order-3 sm:col-span-2">
                <Input
                  type="text"
                  id="city"
                  value={city}
                  label={cityT}
                  onChange={(e) => setCity(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="mt-10">
              <div style={{ minHeight: loading ? '200px' : '0' }}>
                {loading && (
                  <div className="flex justify-center mt-10 text-2xl text-dark-100">
                    Loading...
                  </div>
                )}
              </div>

              {!isLoading && (
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
                          onMouseEnter={() => setHoveredItem(place.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <Image
                            src={place.photos[0]?.versions.huge.url}
                            alt={place.nameCemetery}
                            fill
                            className="object-cover rounded-lg hover:shadow-iconHover shadow-lg"
                          />

                          {hoveredItem === place.id && (
                            <CityTooltip
                              city={place.city}
                              country={place.country}
                            />
                          )}
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
              )}

              {dataPlaces?.items.length === 0 ? (
                <div className="flex justify-center mt-40 text-2xl text-dark-100 mb-40">
                  {noDataT}
                </div>
              ) : (
                <div className="mt-20 md:mt-10">
                  <AntPagination
                    page={Number(pageParams) || 1}
                    pageSize={dataPlaces.pageSize}
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
