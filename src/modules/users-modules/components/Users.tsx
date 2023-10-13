import { FC, useState } from 'react';
import { Avatar, Badge, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { useUsers } from '@/modules/users-modules/hooks/useUsers';
import { IUser } from '@/types';
import { UserItem } from '@/modules/users-modules/components/UserItem';

const { Option } = Select;

export const Users: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<{
    field: string | null;
    order: string | null;
  }>({ field: null, order: null });
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const search = useDebounce(searchTerm, 500);

  const { users, isLoading } = useUsers(
    page,
    pageSize,
    status,
    role,
    search,
    sorting
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

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey) {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSorting({ field: sorter.columnKey, order: orderBy });
    } else {
      setSorting({ field: null, order: null });
    }
  };

  const openModal = (user: IUser) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalVisible(false);
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
      render: (avatars, record) =>
        avatars ? (
          <Avatar
            src={avatars.thumbnail?.url}
            size={30}
            icon={<UserOutlined />}
            onClick={() => openModal(record)}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Avatar size={30} icon={<UserOutlined />} />
        ),
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
      render: (status) => {
        let tagProps = {
          color: 'default-color',
          text: 'Unknown Status',
          icon: <MinusCircleOutlined />,
        };
        if (!status)
          tagProps = {
            color: 'default-color',
            text: 'Unknown Status',
            icon: <MinusCircleOutlined />,
          };
        if (status === 'ACTIVE')
          tagProps = {
            color: 'green',
            text: 'Active',
            icon: <CheckCircleOutlined />,
          };
        if (status === 'BANNED')
          tagProps = {
            color: 'red',
            text: 'Banned',
            icon: <MinusCircleOutlined />,
          };
        if (status === 'PENDING')
          tagProps = {
            color: 'geekblue',
            text: 'Pending',
            icon: <SyncOutlined spin />,
          };

        return (
          <Tag color={tagProps.color}>
            {tagProps.icon} {tagProps.text}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusColor: Partial<PresetStatusColorType> = 'default';
        if (status === 'PENDING') statusColor = 'processing';
        if (status === 'ACTIVE') statusColor = 'success';
        if (status === 'BANNED') statusColor = 'error';
        return <Badge status={statusColor} text={status} />;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let tagProps = { color: 'default-color', text: 'Unknown Role' };
        if (!role) {
          tagProps = { color: 'default-color', text: 'Unknown Role' };
        }
        if (role === 'ADMIN') {
          tagProps = { color: 'gold', text: 'Admin' };
        }
        if (role === 'EDITOR') {
          tagProps = { color: 'geekblue', text: 'Editor' };
        }
        if (role === 'AUTHOR') {
          tagProps = { color: 'green', text: 'Author' };
        }
        if (role === 'USER') {
          tagProps = { color: 'lightgrey', text: 'User' };
        }
        return <Tag color={tagProps.color}>{tagProps.text}</Tag>;
      },
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
            <Select
              labelInValue
              defaultValue={{ value: 'all', label: 'All' }}
              style={{ width: 120 }}
              onChange={onStatusChange}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Banned', value: 'banned' },
                { label: 'Pending', value: 'pending' },
              ]}
            >
              <Option value="all">All</Option>
              <Option value="active">Active</Option>
              <Option value="banned">Banned</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </div>

          <div>
            <Select
              labelInValue
              defaultValue={{ value: 'all', label: 'All' }}
              style={{ width: 120 }}
              onChange={onRoleChange}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Editor', value: 'EDITOR' },
                { label: 'Author', value: 'AUTHOR' },
                { label: 'User', value: 'USER' },
              ]}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={users?.items}
          loading={isLoading}
          // sortDirections={['ascend', 'descend']}
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
      </Space>

      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        width={700}
        style={{ top: 20 }}
      >
        {selectedUser && <UserItem user={selectedUser} />}
      </Modal>
      {/* <GalleryUserInfoModal /> */}
    </div>
  );
};
