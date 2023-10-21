import React, { FC, useState } from 'react';
import { Input, Select, Space, Table, Tooltip, Typography } from 'antd';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useUsers } from '@/modules/users-modules/hooks/useUsers';
import { IUserWithShortExtensions } from '@/types';
import { tagRender } from '@/modules/users-modules/components/helpers/TagRender';
import SelectInput from '@/modules/users-modules/components/helpers/SelectInput';
import { UserDrawer } from '@/modules/users-modules/components/UserDrawer';
import { RenderAvatarImage } from '@/modules/users-modules/components/helpers/RenderAvatar';
import DeleteUserComponent from '@/modules/users-modules/components/DeleteUser';
import { ColorRoleTag } from '@/modules/users-modules/components/helpers/ColorRoleTag';
import { ColorStatusUserTag } from '@/modules/users-modules/components/helpers/ColorStatusUserTag';
import UpdateUserComponent from '@/modules/users-modules/components/UpdateUser';

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
  const [extensions, setExtensions] = useState<string[]>([
    'places',
    'persons',
    'articles',
  ]);

  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');

  const [selectedUser, setSelectedUser] =
    useState<IUserWithShortExtensions | null>(null);

  const search = useDebounce(pagination.searchTerm, 500);

  const { users, isLoading } = useUsers(
    pagination.page,
    pagination.pageSize,
    status,
    role,
    search,
    sorting,
    extensions
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
  const handleExtensionsChange = (value: string[]) => {
    setExtensions(value);
  };

  const columns: ColumnsType<IUserWithShortExtensions> = [
    {
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => (
        <Tooltip title={`ID: ${text}`} placement="leftBottom" color="#1087f6">
          <Typography.Text>
            {RenderAvatarImage(record.avatars?.thumbnail.url, 20, record)}
          </Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => (
        <Link
          href={{
            pathname: '/dashboard/users/[id]',
            query: { id: record.id },
          }}
        >
          <Typography.Text
            ellipsis
            style={{ cursor: 'pointer', color: '#1087f6' }}
          >
            {text}
          </Typography.Text>
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => ColorStatusUserTag(text),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => ColorRoleTag(text),
    },
    {
      title: 'View Profile',
      dataIndex: 'view profile',
      key: 'view profile',
      render: (text, record) => <UserDrawer onUserSelected={record} />,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => <UpdateUserComponent user={record} />,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => <DeleteUserComponent user={record} />,
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space direction="horizontal" align="end">
          <Input
            placeholder="Search by name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200, boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)` }}
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
          <div>
            <Select
              mode="multiple"
              tagRender={tagRender}
              defaultValue={['places', 'persons', 'articles']}
              style={{
                width: '300px',
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                borderRadius: '7px',
              }}
              options={[
                { value: 'places', label: 'Places' },
                { value: 'persons', label: 'Persons' },
                { value: 'articles', label: 'Articles' },
              ]}
              onChange={handleExtensionsChange}
            />
          </div>
        </Space>
        <Table
          // bordered
          size="small"
          columns={columns}
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
