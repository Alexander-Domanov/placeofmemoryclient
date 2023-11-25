import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import React, { useCallback, useRef, useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import {
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlassPlus,
} from 'react-icons/fa6';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgRotate from 'lightgallery/plugins/rotate';
import lgZoom from 'lightgallery/plugins/zoom';
import { InitDetail } from 'lightgallery/lg-events';
import { routes } from '@/common/routing/routes';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useTranslation } from '@/components/internationalization';
import { useGetPlaceMain } from '@/modules/places-main-module';
import { IPlace } from '@/types';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import MapMainWithMarkersComponent from '@/modules/maps/components/MapMainWithMarkers';

export const PlaceMain = ({ place }: { place: IPlace }) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const slug = query.slug as string;
  const { dataPlace, isLoading } = useGetPlaceMain({ slug, place });
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  const [mapVisible, setMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
  };

  const prevPageLabel = (
    <div className="flex mt-[50px]">
      <Link href={routes.places.page(String(1))}>
        <AiOutlineLeftCircle
          className="cursor-pointer"
          size={56}
          fill="#bdc1c7"
          aria-label="prevPageLabel"
        />
      </Link>
    </div>
  );

  const { map, notData, description, archive, grave, titleLink, location } =
    t.places.place.page;

  const lightGalleryRef = useRef<any>(null);

  const onLightGalleryInit = useCallback((detail: InitDetail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  }, []);

  const openLG = () => {
    lightGalleryRef?.current?.openGallery?.(0);
  };

  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        {dataPlace ? (
          <>
            <div className="overflow-hidden">
              <BreadcrumbMain
                items={[
                  {
                    text: titleLink,
                    link: routes.places.page(String(1)),
                  },
                  { text: dataPlace.nameCemetery },
                ]}
              />
            </div>

            <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
              <h2 className="text-light-300 text-5xl sm:text-3xl">
                {archive}
                <span className="text-dark-100 font-light">{grave}</span>
              </h2>
            </div>

            <div className="mt-6 h-[1px] bg-dark-300" />

            <div className="mt-10">
              <div className="grid grid-cols-[350px_1fr] gap-10 lg:grid-cols-1 md:gap-3">
                <div>
                  <div className="md:text-center">
                    <div className="text-4xl font-bold md:text-3xl">
                      {place.nameCemetery}
                    </div>

                    <div className="mt-10">
                      <div className="flex justify-center mx-auto aspect-w-1 aspect-h-1 max-w-[700px] max-h-[700px] relative">
                        <Image
                          src={place.photos[0]?.versions.huge.url}
                          alt={`${place.nameCemetery}`}
                          width={place.photos[0]?.versions.huge.width}
                          height={place.photos[0]?.versions.huge.height}
                          loading="eager"
                          className="object-cover rounded-lg shadow-icon cursor-pointer"
                          onClick={openLG}
                        />

                        <FaMagnifyingGlassPlus className="absolute top-4 right-4 text-white text-2xl pointer-events-none" />

                        <LightGallery
                          onInit={onLightGalleryInit}
                          elementClassNames="hidden"
                          plugins={[lgThumbnail, lgRotate, lgZoom]}
                          download={false}
                        >
                          {place.photos.map((photo) => (
                            <div
                              data-src={photo.versions.huge.url}
                              key={photo.versions.huge.url}
                            >
                              <img src={photo.versions.huge.url} alt="" />
                            </div>
                          ))}
                        </LightGallery>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-2xl text-dark-100">
                    {location}
                  </div>
                  <div className="mt-4">
                    {place.country}, {place.city}
                  </div>

                  <div className="mt-8 text-3xl sm:text-2xl text-dark-100">
                    {description}
                  </div>
                  <div
                    className="mt-4 wysiwyg sm:text-xs"
                    dangerouslySetInnerHTML={{ __html: place.description }}
                  />

                  <div className="mt-8 text-3xl sm:text-2xl text-dark-100">
                    <button
                      onClick={toggleMapVisibility}
                      className="flex items-center hover:underline focus:outline-none"
                    >
                      {mapVisible
                        ? t.places.place.page.map.hide
                        : t.places.place.page.map.show}
                      <span className="ml-2">
                        {mapVisible ? (
                          <FaChevronUp size={isMobile ? 20 : 24} />
                        ) : (
                          <FaChevronDown size={isMobile ? 20 : 24} />
                        )}
                      </span>
                    </button>
                  </div>

                  {mapVisible && (
                    <div className="mt-8  md:max-w-full md:max-h-full">
                      <MapMainWithMarkersComponent
                        center={{
                          lat: place?.location.lat || 0,
                          lng: place?.location?.lng || 0,
                        }}
                        locations={place.personsLocation}
                        markerIcon
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Link
              href={routes.places.page(String(1))}
              className="mt-16 inline-flex text-5xl sm:text-4xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
            >
              <BsArrowLeftCircleFill className="text-dark-300" />
              <span className="sr-only">Previous</span>
            </Link>
          </>
        ) : (
          <div className="text-lg first-letter:uppercase mt-10 text-center">
            {notData}
          </div>
        )}
      </div>
    </div>
  );
};
