import React, { FC } from 'react';
import { Breadcrumb, Flex, Spin } from 'antd';
import { usePersonsForMap } from '@/modules/dashboard-module/hooks/usePersonsForMap';
import MapWithClusterMarkers from '@/modules/maps/components/MapWithClusterMarkers';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

export const Dashboard: FC = () => {
  const { persons, isFetching } = usePersonsForMap();

  const { t } = useTranslation();

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.map.titleLink,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex gap="large" vertical>
        {isFetching ? (
          <Spin size="large" />
        ) : (
          <MapWithClusterMarkers
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
