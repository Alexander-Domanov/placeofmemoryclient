import React, { FC } from 'react';
import { IGerPersonsForMapResponse } from '@/types';
import MapMainWithClusterMarkers from '@/modules/maps/components/MapMainWithClusterMarkers';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';
import { useTranslation } from '@/components/internationalization';

interface Props {
  persons: IGerPersonsForMapResponse;
}
export const MapMain: FC<Props> = ({ persons }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <BreadcrumbMain items={[{ text: t.map.page.title }]} />

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            {t.map.page.header}
          </h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="flex items-center justify-center mt-10">
          <MapMainWithClusterMarkers
            center={{
              lat: 52.069167,
              lng: 19.480556,
            }}
            locations={persons?.items || []}
          />
        </div>
      </div>
    </div>
  );
};
