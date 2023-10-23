import React, { FC, useState } from 'react';
import { Button, Flex, Input, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import Link from 'next/link';
import { IPlace } from '@/types';
import SelectInput from '@/modules/users-modules/components/helpers/SelectInput';
import { usePlaces } from '@/modules/places-modules/hooks/usePlaces';
import { columnsTablePlaces } from '@/modules/places-modules/components/ColumnsTablePlaces';

export const Places: FC = () => {
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

  const { places, isLoading, refetch } = usePlaces(
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
    <div>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Flex
          justify="space-between"
          align="center"
          gap="middle"
          style={{ marginBottom: '15px' }}
        >
          <div>
            <Link
              href={{
                pathname: '/dashboard/places/create',
              }}
            >
              <Button type="primary">Add Place</Button>
            </Link>
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
          scroll={{ x: 1200 }}
          onChange={handleTableChange}
        />
      </Space>
    </div>
  );
};
