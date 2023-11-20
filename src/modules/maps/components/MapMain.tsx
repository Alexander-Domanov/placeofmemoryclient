import React, { FC } from 'react';
import { Flex } from 'antd';
import MapMainWithClusterMarkers from '@/modules/maps/components/MapMainWithClusterMarkers';
import { IGerPersonsForMapResponse } from '@/types';

interface Props {
  persons: IGerPersonsForMapResponse;
}
export const MapMain: FC<Props> = ({ persons }) => {
  // const { persons, isFetching } = usePersonsForMap();

  return (
    <Flex gap="large" vertical>
      <Flex gap="large" vertical>
        {/* {isFetching ? ( */}
        {/*  <Spin size="large" /> */}
        {/* ) : ( */}
        <MapMainWithClusterMarkers
          center={{
            lat: 52.069167,
            lng: 19.480556,
          }}
          locations={persons?.items || []}
        />
        {/* )} */}
      </Flex>
    </Flex>
  );
};
