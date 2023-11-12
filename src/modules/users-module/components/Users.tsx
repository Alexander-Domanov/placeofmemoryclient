import { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useUsers } from '@/modules/users-module/hooks/useUsers';
import {
  IUserWithShortExtensions,
  UserRolesForSelect,
  UserStatusesForSelect,
} from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { columnsTableUsers } from '@/modules/users-module/components/ColumnsTableUsers';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { routes } from '@/common/routing/routes';
import { userStatusOptions } from '@/modules/users-module/components/helpers/options-user-statuses-select-input';
import { userRolesOptions } from '@/modules/users-module/components/helpers/options-user-roles-select-input';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({
    key: routes.dashboard.index,
    text: 'Dashboard',
  }),
  CreateBreadcrumb({
    key: routes.dashboard.users.index,
    text: 'Users',
    withLink: false,
  }),
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

  const [status, setStatus] = useState(UserStatusesForSelect.ALL.toLowerCase());
  const [role, setRole] = useState(UserRolesForSelect.ALL.toLowerCase());

  const search = useDebounce(pagination.searchTerm, 500);

  const { users, isFetching } = useUsers(
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

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setStatus(value.value);
  };
  const onRoleChange = (value: { value: string; label: ReactNode }) => {
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

      <Flex align="center" justify="end" gap="middle" wrap="wrap">
        <Input
          placeholder="Search by name"
          allowClear
          onChange={(e) =>
            setPagination({ ...pagination, searchTerm: e.target.value })
          }
          style={{ width: 200 }}
        />

        <SelectInput
          defaultValue={{ value: UserStatusesForSelect.ALL, label: 'All' }}
          options={userStatusOptions}
          onChange={onStatusChange}
        />

        <SelectInput
          defaultValue={{ value: UserRolesForSelect.ALL, label: 'All' }}
          options={userRolesOptions}
          onChange={onRoleChange}
        />
      </Flex>

      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={columnsTableUsers}
        dataSource={users?.items}
        loading={isFetching}
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
    </Flex>
  );
};
