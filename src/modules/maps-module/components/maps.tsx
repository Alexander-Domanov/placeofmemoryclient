import React, { FC } from 'react';
import { Flex, Spin } from 'antd';
import { usePersonsForMap } from '@/modules/dashboard-module/hooks/usePersonsForMap';
import { routes } from '@/common/routing/routes';
import MapMainWithClusterMarkers from '@/modules/maps-module/components/MapMainWithClusterMarkers';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({
    key: routes.dashboard.index,
    text: 'Dashboard',
    withLink: false,
  }),
];

export const MapsMain: FC = () => {
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
