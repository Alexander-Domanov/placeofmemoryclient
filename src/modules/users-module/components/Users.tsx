import React, { FC, useState } from 'react';
import { Flex, Input, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useUsers } from '@/modules/users-module/hooks/useUsers';
import { IUserWithShortExtensions } from '@/types';
import SelectInput from '@/modules/users-module/components/helpers/SelectInput';
import { columnsTableUsers } from '@/modules/users-module/components/ColumnsTableUsers';

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
  // const [extensions, setExtensions] = useState<string[]>([
  //   'places',
  //   'persons',
  //   'articles',
  // ]);

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
    // extensions
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
  // const handleExtensionsChange = (value: string[]) => {
  //   setExtensions(value);
  // };

  return (
    <div>
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
          {/* <div> */}
          {/*  <Select */}
          {/*    mode="multiple" */}
          {/*    tagRender={tagRender} */}
          {/*    defaultValue={['places', 'persons', 'articles']} */}
          {/*    style={{ */}
          {/*      width: '300px', */}
          {/*      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`, */}
          {/*      borderRadius: '7px', */}
          {/*    }} */}
          {/*    options={[ */}
          {/*      { value: 'places', label: 'Places' }, */}
          {/*      { value: 'persons', label: 'Persons' }, */}
          {/*      { value: 'articles', label: 'Articles' }, */}
          {/*    ]} */}
          {/*    onChange={handleExtensionsChange} */}
          {/*  /> */}
          {/* </div> */}
        </Flex>
        <Table
          bordered
          size="small"
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
    </div>
  );
};
