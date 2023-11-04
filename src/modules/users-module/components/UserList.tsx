import React, { FC, useEffect, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Flex,
  Image,
  Input,
  List,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useDebounce } from 'usehooks-ts';
import { TablePaginationConfig } from 'antd/lib';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useUser } from '@/modules/users-module/hooks/useUser';
import { routes } from '@/common/routing/routes';
import { IPlace, IUser } from '@/types';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';
import DeleteUserModal from '@/modules/users-module/components/DeleteUserModal';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { Places } from '@/modules/places-module/components/Places';
import { columnsTablePersons, Persons } from '@/modules/persons-module';
import { Articles } from '@/modules/articles-module';
import { columnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { columnsTablePlaces } from '@/modules/places-module';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';

interface DescriptionItemProps {
  title: string;
  content?: React.ReactNode;
}
const DescriptionItem = ({ title }: DescriptionItemProps) => (
  <span className="font-normal text-neutral-400">{title}: &nbsp;</span>
);

const ListItems = ({ title, content }: DescriptionItemProps) => (
  <List.Item>
    <Typography.Text>
      <DescriptionItem title={title} />
      {content}
    </Typography.Text>
  </List.Item>
);

function breadcrumbs(
  name: string
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
  return [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.users.index,
      title: <Link href={routes.dashboard.users.index}>Users</Link>,
    },
    {
      key: routes.dashboard.users.breadcrumbs(name as string),
      title: `${name}`,
    },
  ];
}

export const UserList: FC = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
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
  const [extensions, setExtensions] = useState<string[]>([]);

  const search = useDebounce(pagination.searchTerm, 500);

  const { user, isLoading } = useUser(
    userId,
    pagination.page,
    pagination.pageSize,
    status,
    search,
    sorting,
    extensions
  );

  useEffect(() => {
    if (user) {
      setSelectedUser(user);
    }
  }, [user]);

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

  const onChangeExtensions = (key: string) => {
    if (key === 'places') {
      setExtensions(['places']);
    } else if (key === 'persons') {
      setExtensions(['persons']);
    } else if (key === 'articles') {
      setExtensions(['articles']);
    } else {
      setExtensions([]);
    }
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

  const items = [
    {
      label: 'Info',
      key: 'info',
      children: (
        <Flex vertical gap={6}>
          <Spin spinning={isLoading}>
            <Row gutter={[16, 16]}>
              <Col span={5} flex="auto">
                <Image
                  src={selectedUser?.avatars?.medium.url}
                  width={250}
                  preview
                  style={{ borderRadius: 4 }}
                  fallback={pictureBackup}
                />
              </Col>

              <Col span={14}>
                <List split={false} size="small">
                  <ListItems title="ID" content={selectedUser?.id} />

                  <ListItems title="Name" content={selectedUser?.userName} />

                  <ListItems title="Email" content={selectedUser?.email} />

                  <ListItems title="Role" content={selectedUser?.role} />

                  <ListItems title="Status" content={selectedUser?.status} />

                  <ListItems
                    title="Created At"
                    content={convertDateToFormat(selectedUser?.createdAt)}
                  />

                  <ListItems
                    title="Updated At"
                    content={convertDateToFormat(selectedUser?.updatedAt)}
                  />
                </List>
              </Col>

              <Col span={5}>
                <Space size={16}>
                  <UpdateUserStatusAndRoleComponent
                    user={selectedUser}
                    showButton
                  />
                  <DeleteUserModal user={selectedUser} showButton />
                </Space>
              </Col>
            </Row>
          </Spin>
        </Flex>
      ),
    },
    {
      label: 'Places',
      key: 'places',
      children: (
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
            rowKey={(record) => record.id}
            columns={columnsTablePlaces}
            dataSource={selectedUser?.places.items}
            loading={isLoading}
            pagination={{
              position: ['bottomCenter'],
              total: user?.places?.totalCount || 1,
              current: pagination.page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize: 18,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
            }}
            scroll={{ x: 1000 }}
            onChange={handleTableChange}
          />
        </Space>
      ),
    },
    {
      label: 'Persons',
      key: 'persons',
      children: (
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
            rowKey={(record) => record.id}
            columns={columnsTablePersons}
            dataSource={selectedUser?.persons.items}
            loading={isLoading}
            pagination={{
              position: ['bottomCenter'],
              total: selectedUser?.persons?.totalCount || 1,
              current: pagination.page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize: 18,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
            }}
            scroll={{ x: 1300 }}
            onChange={handleTableChange}
          />
        </Space>
      ),
    },
    {
      label: 'Articles',
      key: 'articles',
      children: (
        <Space direction="vertical" style={{ display: 'flex' }}>
          <Flex
            justify="end"
            align="center"
            gap="middle"
            style={{ marginBottom: '15px' }}
          >
            <Input
              placeholder="Search by title"
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
            columns={columnsTableArticles}
            dataSource={selectedUser?.articles.items}
            loading={isLoading}
            pagination={{
              position: ['bottomCenter'],
              total: selectedUser?.articles.totalCount || 1,
              current: pagination.page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize: 18,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
            }}
            scroll={{ x: 900 }}
            onChange={handleTableChange}
          />
        </Space>
      ),
    },
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(`${selectedUser?.userName}`)} />
      </div>

      <Spin spinning={isLoading}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card>
              <Tabs onChange={onChangeExtensions} type="card" items={items} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </Flex>
  );
};
