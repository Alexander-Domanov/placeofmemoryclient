import React, { FC, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import {
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlassPlus,
} from 'react-icons/fa6';
import LightGallery from 'lightgallery/react';
import lgRotate from 'lightgallery/plugins/rotate';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { InitDetail } from 'lightgallery/lg-events';
import { routes } from '@/common/routing/routes';
import { IPerson } from '@/types';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import MapMainWithMarkersComponent from '@/modules/maps/components/MapMainWithMarkers';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { useTranslation } from '@/components/internationalization';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';

interface Props {
  person: IPerson;
}

export const PersonMain: FC<Props> = ({ person }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  const { t } = useTranslation();

  const [mapVisible, setMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
  };

  const lightGalleryRef = useRef<any>(null);

  const onLightGalleryInit = useCallback((detail: InitDetail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  }, []);

  const openLG = () => {
    lightGalleryRef?.current?.openGallery?.(0);
  };

  const {
    titleLink: titleT,
    archive: archiveT,
    grave: graveT,
    notData: noDataT,
    location: locationT,
    biography: biographyT,
    map: mapT,
    prev: prevT,
  } = t.people.person.page;

  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <div className="overflow-hidden">
          <BreadcrumbMain
            items={[
              { text: titleT, link: routes.persons.page(Number(1)) },
              { text: `${person.firstName} ${person.lastName}` },
            ]}
          />
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            {archiveT}
            <span className="text-dark-100 font-light">{graveT}</span>
          </h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="grid grid-cols-[350px_1fr] gap-10 md:grid-cols-1 md:gap-3">
            <div>
              <div className="md:text-center">
                <div className="text-4xl font-bold md:text-3xl">
                  {person.firstName} {person.lastName}
                </div>

                <div className="mt-2 text-dark-100 text-xl md:text-lg">
                  {person.birthDate ? person.birthDate : noDataT}
                  &nbsp;-&nbsp;
                  {person.deathDate ? person.deathDate : noDataT}
                </div>

                <div className="mt-10">
                  <div className="flex justify-center mx-auto aspect-w-1 aspect-h-1 max-w-[400px] max-h-[400px] relative">
                    <Image
                      src={person.photos[0]?.versions.huge.url || pictureBackup}
                      alt={
                        person.photos[0]?.alt ||
                        `${person.firstName} ${person.lastName}`
                      }
                      width={person.photos[0]?.versions.huge.width}
                      height={person.photos[0]?.versions.huge.height}
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
                      {person.photos.map((photo) => (
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
                {locationT}
              </div>
              <div className="mt-4">
                {person.country}, {person.city}
              </div>

              <div className="mt-8 text-3xl sm:text-2xl text-dark-100">
                {biographyT}
              </div>
              <div
                className="mt-4 wysiwyg sm:text-xs"
                dangerouslySetInnerHTML={{ __html: person.biography }}
              />

              <div className="mt-8 text-3xl sm:text-2xl text-dark-100">
                <button
                  onClick={toggleMapVisibility}
                  className="flex items-center hover:underline focus:outline-none"
                >
                  {mapVisible ? mapT.hide : mapT.show}
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
                      lat: person?.location.lat || 0,
                      lng: person?.location?.lng || 0,
                    }}
                    locations={[person]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Link
          href={routes.persons.page(Number(1))}
          className="mt-16 inline-flex text-5xl sm:text-4xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
        >
          <BsArrowLeftCircleFill className="text-dark-300 hover:text-dark-150" />
          <span className="sr-only">{prevT}</span>
        </Link>
      </div>
    </div>
  );
};
