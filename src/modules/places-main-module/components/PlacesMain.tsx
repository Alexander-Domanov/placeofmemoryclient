import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useDebounce } from 'usehooks-ts';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImageComponent } from '@/ui/image/ImageComponent';

import {
  IPlacesMainResponse,
  useGetPlacesMain,
} from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';
import { MarkupRenderer } from '@/common/helpers/MarkupRenderer';
import { Input } from '@/ui';
import PaginationCustom from '@/components/pagination/PaginationCustom';
import { useWindowSize } from '@/common/hooks/useWindowResize';

interface IProps {
  places: IPlacesMainResponse;
}
export const PlacesMain = ({ places }: IProps) => {
  const { push, query } = useRouter();
  const [page, setPage] = useState<number>();
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
      setPage(newPage);
      push(`${routes.places.index}/${newPage}`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
        <Link href={routes.main} className="cursor-pointer">
          <AiOutlineHome size={22} />
        </Link>

        <div>/</div>

        <span className="text-accent-100">Архіў_Месцаў</span>
      </div>

      <div className="flex pt-4 justify-between md:justify-center md:flex-wrap gap-4">
        <h2 className="text-light-300 text-5xl sm:text-3xl">
          Архіў
          <span className="text-dark-100 font-light ">_Месцаў</span>
        </h2>
      </div>

      <hr className="w-full mt-[28px] mb-8 transform bg-light-900" />

      <div className="flex md:justify-center flex-wrap gap-4">
        <div>
          <Input
            label="Назва"
            className="w-[166px] h-[36px]"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <Input
            label="Краіна"
            className="w-[166px] h-[36px]"
            onChange={(e) => setCountry(e.currentTarget.value)}
          />
        </div>
        <div>
          <Input
            label="Горад"
            className="w-[166px] h-[36px]"
            onChange={(e) => setCity(e.currentTarget.value)}
          />
        </div>
      </div>
      {dataPlaces && dataPlaces.items.length > 0 ? (
        dataPlaces.items.map((place) => (
          <div
            className="flex w-full md:justify-center items-center gap-16"
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
                      <h3 className="text-sm font-medium text-dark-100">
                        {place.nameCemetery}
                      </h3>
                      <section className="text-base text-light-300 break-words font-light">
                        {place.shortDescription}
                      </section>
                    </div>
                  )}
                </Link>
              </div>
            ))}
            {width && width > 767 && (
              <div className="flex gap-10 flex-col break-words">
                <h3 className="text-4xl font-light text-dark-100">
                  {place.nameCemetery}
                </h3>
                <section className="text-xl text-light-300 break-words font-light">
                  {place.shortDescription}
                </section>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No Places</div>
      )}
      {dataPlaces && dataPlaces.items.length > 0 && (
        <PaginationCustom
          onPageChange={onPageChange}
          page={Number(pageParams) || 1}
          pageCount={dataPlaces ? dataPlaces.pagesCount : 1}
        />
      )}
    </div>
  );
};
