import React, { FC, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { IPlace } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { usePlaces } from '@/modules/places-module/hooks/usePlaces';
import { columnsTablePlaces } from '@/modules/places-module/components/ColumnsTablePlaces';
import { routes } from '@/common/routing/routes';

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.places.index,
    title: 'Places',
  },
];

export const Places: FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 18,
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { places, isLoading } = usePlaces(
    pagination.page,
    pagination.pageSize,
    status,
    search,
    sorting
  );

  const onPageChange = (_page: number) => {
    setPagination({ ...pagination, page: _page });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPagination({ ...pagination, page: 1, pageSize: size });
  };

  const onStatusChange = (value: { value: string; label: React.ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setStatus(value.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IPlace> | any
  ) => {
    if (sorter && sorter.columnKey) {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSorting({ field: sorter.columnKey, order: orderBy });
    } else {
      setSorting({ field: null, order: null });
    }
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Flex
          justify="space-between"
          align="center"
          gap="middle"
          style={{ marginBottom: '15px' }}
        >
          <div>
            <Button
              type="primary"
              onClick={() => router.push(routes.dashboard.places.create)}
            >
              Add Place
            </Button>
          </div>
          <Input
            placeholder="Search by name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />
          <div>
            <SelectInput
              defaultValue={{ value: 'all', label: 'All' }}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Draft', value: 'draft' },
                { label: 'PendingReview', value: 'pendingReview' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ]}
              onChange={onStatusChange}
            />
          </div>
        </Flex>
        <Table
          bordered
          size="small"
          columns={columnsTablePlaces}
          dataSource={places?.items}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            total: places?.totalCount || 1,
            current: pagination.page,
            onChange: onPageChange,
            defaultCurrent: 1,
            defaultPageSize: 18,
            pageSizeOptions: [10, 20, 30, 50, 100],
            onShowSizeChange: onPageSizeChange,
          }}
          scroll={{ x: 1000 }}
          onChange={handleTableChange}
        />
      </Space>
    </Flex>
  );
};
