import { FC, useState } from 'react';
import { Input, List, Select, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useUsers } from '@/modules/users-modules/hooks/useUsers';
import { IUser } from '@/types';
import { tagRender } from '@/modules/users-modules/components/TagRender';
import { renderAvatar } from '@/modules/users-modules/components/RenderAvatar';
import SelectInput from '@/modules/users-modules/components/SelectInput';
import { UserDrawer } from '@/modules/users-modules/components/UserDrawer';
import { RoleDropdown } from '@/modules/users-modules/components/RoleDropdown';
import { StatusDropdown } from '@/modules/users-modules/components/StatusDropdown';

export const Users: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });
  const [extensions, setExtensions] = useState<string[]>(['places', 'persons']);
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const showDrawer = (user: IUser) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const search = useDebounce(searchTerm, 500);

  const { users, isLoading } = useUsers(
    page,
    pageSize,
    status,
    role,
    search,
    sorting,
    extensions
  );

  const onPageChange = (_page: number) => {
    setPage(_page);
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const onStatusChange = (value: { value: string; label: React.ReactNode }) => {
    setPage(1);
    setStatus(value.value);
  };
  const onRoleChange = (value: { value: string; label: React.ReactNode }) => {
    setPage(1);
    setRole(value.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUser> | any
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

  const columns: ColumnsType<IUser> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Avatar',
      dataIndex: 'avatars',
      key: 'avatar',
      render: (avatars) => renderAvatar(avatars, 30),
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <Link
          href={{
            pathname: '/dashboard/users/[id]',
            query: { id: record.id },
          }}
        >
          {text}
        </Link>
      ),
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (text, record) => <StatusDropdown {...record} />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => <RoleDropdown {...record} />,
    },
    {
      title: 'View Profile',
      dataIndex: 'view profile',
      key: 'view profile',
      render: (text, record) => (
        <List.Item
          actions={[<a onClick={() => showDrawer(record)}>more…</a>]}
        />
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder="Search by name"
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <div>
            <Select
              mode="multiple"
              tagRender={tagRender}
              defaultValue={['places', 'persons']}
              style={{ width: '300px' }}
              options={[
                { value: 'places', label: 'Places' },
                { value: 'persons', label: 'Persons' },
              ]}
              onChange={handleExtensionsChange}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={users?.items}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            total: users?.totalCount || 1,
            current: page,
            onChange: onPageChange,
            defaultCurrent: 1,
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 30, 50, 100],
            onShowSizeChange: onPageSizeChange,
          }}
          scroll={{ y: 600 }}
          onChange={handleTableChange}
        />
        <UserDrawer open={open} onClose={onClose} selectedUser={selectedUser} />
      </Space>

      {/* <Modal */}
      {/*  title="User Details" */}
      {/*  open={isModalVisible} */}
      {/*  onOk={closeModal} */}
      {/*  onCancel={closeModal} */}
      {/*  width={700} */}
      {/*  style={{ top: 20 }} */}
      {/* > */}
      {/*  {selectedUser && <UserItem user={selectedUser} />} */}
      {/* </Modal> */}
      {/* <GalleryUserInfoModal /> */}
    </div>
  );
};
