import React, { FC } from 'react';
import { Flex, Spin } from 'antd';
import { usePersonsForMap } from '@/modules/dashboard-module/hooks/usePersonsForMap';
import MapMainWithClusterMarkers from '@/modules/maps/components/MapMainWithClusterMarkers';

export const MapMain: FC = () => {
  const { persons, isFetching } = usePersonsForMap();

  return (
    <Flex gap="large" vertical>
      <Flex gap="large" vertical>
        {isFetching ? (
          <Spin size="large" />
        ) : (
          <MapMainWithClusterMarkers
            center={{
              lat: 52.069167,
              lng: 19.480556,
            }}
            locations={persons?.items || []}
          />
        )}
      </Flex>
    </Flex>
  );
};
