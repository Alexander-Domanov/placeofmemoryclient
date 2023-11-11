import React, { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { IPerson } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { routes } from '@/common/routing/routes';
import { usePersons } from '@/modules/persons-module/hooks/usePersons';
import { columnsTablePersons } from '@/modules/persons-module/components/ColumnsTablePersons';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.persons.index,
    text: 'Persons',
    withLink: false,
  }),
];
const defaultPageSize = 10;

export const Persons: FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { persons, isFetching } = usePersons(
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

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setStatus(value.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IPerson> | any
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

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.persons.create)}
          >
            Add Person
          </Button>
        </div>

        <Flex align="center">
          <Input
            placeholder="Search by name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

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
        </Flex>
      </Flex>

      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={columnsTablePersons}
        dataSource={persons?.items}
        loading={isFetching}
        pagination={{
          position: ['bottomCenter'],
          total: persons?.totalCount || 1,
          current: pagination.page,
          onChange: onPageChange,
          defaultCurrent: 1,
          defaultPageSize,
          pageSizeOptions: [10, 20, 30, 50, 100],
          onShowSizeChange: onPageSizeChange,
        }}
        scroll={{ x: 1300 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
