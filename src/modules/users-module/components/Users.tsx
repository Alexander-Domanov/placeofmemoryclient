import React, { FC, useState } from 'react';
import { Breadcrumb, Flex, Input, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useUsers } from '@/modules/users-module/hooks/useUsers';
import { IUserWithShortExtensions } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { columnsTableUsers } from '@/modules/users-module/components/ColumnsTableUsers';
import { routes } from '@/common/routing/routes';

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.users.index,
    title: <Link href={routes.dashboard.users.index}>Users</Link>,
  },
];

export const Users: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 11,
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { users, isLoading } = useUsers(
    pagination.page,
    pagination.pageSize,
    status,
    role,
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
  const onRoleChange = (value: { value: string; label: React.ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setRole(value.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUserWithShortExtensions> | any
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
          justify="end"
          align="center"
          gap="middle"
          style={{ marginBottom: '15px' }}
        >
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
                { label: 'Active', value: 'active' },
                { label: 'Banned', value: 'banned' },
                { label: 'Pending', value: 'pending' },
              ]}
              onChange={onStatusChange}
            />
          </div>

          <div>
            <SelectInput
              defaultValue={{ value: 'all', label: 'All' }}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Editor', value: 'EDITOR' },
                { label: 'Author', value: 'AUTHOR' },
                { label: 'User', value: 'USER' },
              ]}
              onChange={onRoleChange}
            />
          </div>
        </Flex>

        <Table
          bordered
          size="small"
          rowKey={(record) => record.id}
          columns={columnsTableUsers}
          dataSource={users?.items}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            total: users?.totalCount || 1,
            current: pagination.page,
            onChange: onPageChange,
            defaultCurrent: 1,
            defaultPageSize: 11,
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
