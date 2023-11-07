import React, { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Flex } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { usePersonsForMap } from '@/modules/dashboard-module/hooks/usePersonsForMap';
import MapWithClusterMarkers from '@/modules/maps/components/MapWithClusterMarkers';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { routes } from '@/common/routing/routes';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({
    key: routes.dashboard.index,
    text: 'Dashboard',
    withLink: false,
  }),
];

export const Dashboard: FC = () => {
  const [pagination, setPagination] = useState({
    searchTerm: '',
  });

  const [status, setStatus] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { persons, isFetching } = usePersonsForMap(search);

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPagination({ ...pagination });
    setStatus(value.value);
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* <Flex justify="space-between" align="center" gap="middle" wrap="wrap"> */}
      {/*  <Flex align="center"> */}
      {/*    <Input */}
      {/*      placeholder="Search by name" */}
      {/*      allowClear */}
      {/*      onChange={(e) => */}
      {/*        setPagination({ ...pagination, searchTerm: e.target.value }) */}
      {/*      } */}
      {/*      style={{ width: 200 }} */}
      {/*    /> */}

      {/*    <SelectInput */}
      {/*      defaultValue={{ value: 'all', label: 'All' }} */}
      {/*      options={[ */}
      {/*        { label: 'All', value: 'all' }, */}
      {/*        { label: 'Draft', value: 'draft' }, */}
      {/*        { label: 'PendingReview', value: 'pendingReview' }, */}
      {/*        { label: 'Published', value: 'published' }, */}
      {/*        { label: 'Archived', value: 'archived' }, */}
      {/*      ]} */}
      {/*      onChange={onStatusChange} */}
      {/*    /> */}
      {/*  </Flex> */}
      {/* </Flex> */}

      <Flex gap="large" vertical>
        <MapWithClusterMarkers
          center={{
            lat: 52.069167,
            lng: 19.480556,
          }}
          locations={persons?.items || []}
        />
      </Flex>
    </Flex>
  );
};
