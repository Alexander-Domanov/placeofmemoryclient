import { FC, ReactNode, useEffect, useState } from 'react';
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
import { CustomSelectInput } from '@/components';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';
import { ColumnsTableUsers } from '@/modules/users-module/components/ColumnsTableUsers';
import { UserStatusOptions } from '@/modules/users-module/components/helpers/options-user-statuses-select-input';
import { UserRolesOptions } from '@/modules/users-module/components/helpers/options-user-roles-select-input';

const defaultPageSize = 10;

export const Users: FC = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const [status, setStatus] = useState(UserStatusesForSelect.ALL.toLowerCase());
  const [role, setRole] = useState(UserRolesForSelect.ALL.toLowerCase());

  const userName = useDebounce(pagination.searchTerm, 500);

  useEffect(() => {
    if (page === 1) {
      setPagination({ ...pagination });
    } else {
      setPage(1);
    }
  }, [userName]);

  const { users, isFetching } = useUsers({
    pageNumber: page,
    pageSize,
    status,
    role,
    userName,
    sorting,
  });

  const onPageChange = (_page: number) => {
    setPage(_page);
    setPagination({ ...pagination });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
    setPagination({ ...pagination });
  };

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPage(1);
    setPagination({ ...pagination });
    setStatus(value.value);
  };
  const onRoleChange = (value: { value: string; label: ReactNode }) => {
    setPage(1);
    setPagination({ ...pagination });
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
  const columnsTableUsers = ColumnsTableUsers(t);
  const userStatusOptions = UserStatusOptions(t);
  const userRolesOptions = UserRolesOptions(t);

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.users.index,
      text: t.dashboard.users.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex align="center" justify="end" gap="middle" wrap="wrap">
        <Input
          placeholder={t.dashboard.users.search.placeholder}
          title={t.dashboard.users.search.placeholder}
          allowClear
          onChange={(e) =>
            setPagination({ ...pagination, searchTerm: e.target.value })
          }
          style={{ width: 200 }}
        />

        <CustomSelectInput
          defaultValue={{
            value: UserStatusesForSelect.ALL,
            label: t.dashboard.users.selectStatus.all,
          }}
          options={userStatusOptions}
          onChange={onStatusChange}
        />

        <CustomSelectInput
          defaultValue={{
            value: UserRolesForSelect.ALL,
            label: t.dashboard.users.selectRole.all,
          }}
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
          total: users?.totalCount || 1,
          current: page,
          onChange: onPageChange,
          defaultCurrent: 1,
          defaultPageSize,
          pageSizeOptions: [10, 20, 30, 50, 100],
          onShowSizeChange: onPageSizeChange,
          simple: true,
          showSizeChanger: true,
          position: ['bottomCenter'],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
