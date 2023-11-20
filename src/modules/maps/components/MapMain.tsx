import React, { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { routes } from '@/common/routing/routes';
import { IGerPersonsForMapResponse } from '@/types';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import MapMainWithClusterMarkers from '@/modules/maps/components/MapMainWithClusterMarkers';

interface Props {
  persons: IGerPersonsForMapResponse;
}
export const MapMain: FC<Props> = ({ persons }) => {
  const { width } = useWindowSize();

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[28px] pb-[60px] pl-[60px] pr-[60px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <div className="flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
          <Link href={routes.main} className="cursor-pointer">
            <AiOutlineHome
              className="text-dark-100"
              size={width && width > 639 ? 22 : 16}
            />
          </Link>

          <div>/</div>

          <span className="text-accent-100">Інтэрактыўная_Мапа</span>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">
            Інтэрактыўная Мапа
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
