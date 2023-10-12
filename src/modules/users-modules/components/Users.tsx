import { FC, useState } from 'react';
import { Input, Pagination, Select, Space, Table } from 'antd';
import { FaUserSecret } from 'react-icons/fa';
import { useDebounce } from 'usehooks-ts';
import { useUsers } from '@/modules/users-modules/hooks/useUsers';

const { Option } = Select;
const { Column } = Table;

export const Users: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);

  const { users, isLoading } = useUsers(page, pageSize, status, role, search);

  const onPageChange = (_page: number) => {
    setPage(_page);
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const onStatusChange = (value: string) => {
    setPage(1);
    setStatus(value);
  };
  const onRoleChange = (value: string) => {
    setPage(1);
    setRole(value);
  };

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
          {/* <div> */}
          {/*  <Select */}
          {/*    value={status} */}
          {/*    style={{ width: 120 }} */}
          {/*    onChange={onStatusChange} */}
          {/*  > */}
          {/*    <Option value="all">All</Option> */}
          {/*    <Option value="active">Active</Option> */}
          {/*    <Option value="banned">Banned</Option> */}
          {/*    <Option value="pending">Pending</Option> */}
          {/*  </Select> */}
          {/* </div> */}

          <div>
            <Select
              value={status}
              style={{ width: 120 }}
              onChange={onRoleChange}
            >
              <Option value="all">All</Option>
              <Option value="ADMIN">Admin</Option>
              <Option value="EDITOR">Editor</Option>
              <Option value="AUTHOR">Author</Option>
              <Option value="USER">User</Option>
            </Select>
          </div>

          <div>
            <Pagination
              total={users?.totalCount || 1}
              current={page}
              onChange={onPageChange}
              defaultCurrent={1}
              defaultPageSize={18}
              pageSizeOptions={[18, 24, 36, 48, 96]}
              onShowSizeChange={onPageSizeChange}
            />
          </div>
        </div>

        <Table dataSource={users?.items} loading={isLoading}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column
            title="Avatar"
            dataIndex="avatars"
            key="avatar"
            render={(avatars) =>
              avatars?.thumbnail ? (
                <img
                  src={avatars.thumbnail.url}
                  alt="Avatar"
                  style={{ width: 30, height: 30, borderRadius: '50%' }}
                />
              ) : (
                <FaUserSecret size={30} />
              )
            }
          />
          <Column title="Name" dataIndex="userName" key="userName" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Created At" dataIndex="createdAt" key="createdAt" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column title="Role" dataIndex="role" key="role" />
        </Table>
      </Space>
    </div>
  );
};
