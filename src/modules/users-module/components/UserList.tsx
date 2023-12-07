import React, { FC, useEffect, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Flex,
  Image,
  Input,
  List,
  notification,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { useDebounce } from 'usehooks-ts';
import { TablePaginationConfig } from 'antd/lib';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useUser } from '@/modules/users-module/hooks/useUser';
import { routes } from '@/common/routing/routes';
import { FileStatuses, IPlace, IUser, Role } from '@/types';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { ColumnsTablePersons } from '@/modules/persons-module';
import { ColumnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { ColumnsTablePlaces } from '@/modules/places-module';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { CustomSelectInput, DeleteConfirmationModal } from '@/components';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { LocaleType, useTranslation } from '@/components/internationalization';
import { useDeleteUser } from '@/modules/users-module/hooks/useDeleteUser';
import { FileStatusOptions } from '@/common-dashboard';
import { getColorRole } from '@/modules/users-module/components/helpers/ColorRoleTag';
import { getColorStatusUser } from '@/modules/users-module/components/helpers/ColorStatusUserTag';

interface DescriptionItemProps {
  title: string;
  content?: React.ReactNode;
}
const DescriptionItem = ({ title }: DescriptionItemProps) => (
  <span className="text-neutral-400">{title}: &nbsp;</span>
);

const ListItems = ({ title, content }: DescriptionItemProps) => (
  <List.Item>
    <Typography.Text>
      <DescriptionItem title={title} />
      {content}
    </Typography.Text>
  </List.Item>
);

function breadcrumbs(sectionName: string, t: LocaleType) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.users.index,
      text: t.dashboard.users.index,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.users.breadcrumbs(sectionName),
      text: sectionName,
      withLink: false,
    }),
  ];
}

const defaultPageSize = 10;

export const UserList: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [pagination, setPagination] = useState({
    searchTerm: '',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });
  const [status, setStatus] = useState('all');
  const [extensions, setExtensions] = useState<string[]>([]);

  const name = useDebounce(pagination.searchTerm.toLowerCase(), 500);

  useEffect(() => {
    if (page === 1) {
      setPagination({ ...pagination });
    } else {
      setPage(1);
    }
  }, [name]);

  useEffect(() => {
    if (page === 1) {
      setPagination({ ...pagination });
    } else {
      setPage(1);
    }
  }, [extensions]);

  const { user, isLoading, me } = useUser({
    id: userId,
    pageNumber: page,
    pageSize,
    status,
    name,
    sorting,
    extensions,
  });
  const { deleteUserMutation } = useDeleteUser();

  useEffect(() => {
    if (user) {
      setSelectedUser(user);
    }
  }, [user]);

  const onPageChange = (_page: number) => {
    setPage(_page);
    setPagination({ ...pagination });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
    setPagination({ ...pagination });
  };

  const onStatusChange = (value: { value: string; label: React.ReactNode }) => {
    setPage(1);
    setPagination({ ...pagination });
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

  const onDeletePlace = () => {
    deleteUserMutation(selectedUser?.id || null, {
      onSuccess() {
        notification.success({
          message: t.dashboard.users.notifications.delete.title,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.users.index);
      },
    });
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

  const columnsTableArticles = ColumnsTableArticles(t);
  const columnsTablePlaces = ColumnsTablePlaces(t);
  const columnsTablePersons = ColumnsTablePersons(t);
  const fileStatuses = FileStatusOptions(t);
  const selectInputOptions =
    me?.role === Role.ADMIN
      ? [
          ...fileStatuses,
          {
            label: t.dashboard.selectStatus.archived,
            value: FileStatuses.ARCHIVED,
          },
        ]
      : fileStatuses;

  const items = [
    {
      label: t.dashboard.users.list.items.info,
      key: 'info',
      children: (
        <Flex vertical gap="large">
          <Spin spinning={isLoading}>
            <Flex
              justify="space-between"
              align="center"
              gap="middle"
              wrap="wrap"
            >
              <Row gutter={[16, 16]}>
                <Col>
                  <Image
                    src={selectedUser?.avatars?.medium.url}
                    width={250}
                    preview
                    style={{ borderRadius: 4 }}
                    fallback={pictureBackup}
                  />
                </Col>

                <Col>
                  <List split={false} size="small">
                    <ListItems title="ID" content={selectedUser?.id} />

                    <ListItems
                      title={t.dashboard.users.list.name}
                      content={selectedUser?.userName}
                    />

                    <ListItems
                      title={t.dashboard.users.list.email}
                      content={selectedUser?.email}
                    />

                    <ListItems
                      title={t.dashboard.users.list.role}
                      content={getColorRole(selectedUser?.role || null, t).text}
                    />

                    <ListItems
                      title={t.dashboard.users.list.status}
                      content={
                        getColorStatusUser(selectedUser?.status || null, t).text
                      }
                    />

                    <ListItems
                      title={t.dashboard.users.list.createdAt}
                      content={convertDateToFormat(selectedUser?.createdAt)}
                    />

                    <ListItems
                      title={t.dashboard.users.list.updatedAt}
                      content={convertDateToFormat(selectedUser?.updatedAt)}
                    />
                  </List>
                </Col>

                <Col sm={24} xs={24}>
                  <Space size={16}>
                    <UpdateUserStatusAndRoleComponent
                      user={selectedUser}
                      showButton
                      showEditButton={false}
                    />

                    <DeleteConfirmationModal<IUser>
                      item={selectedUser}
                      onDelete={onDeletePlace}
                    />
                  </Space>
                </Col>
              </Row>
            </Flex>
          </Spin>
        </Flex>
      ),
    },
    {
      label: t.dashboard.users.list.items.places,
      key: 'places',
      children: (
        <Flex gap="large" vertical>
          <Flex justify="end" align="center" gap="middle" wrap="wrap">
            <Input
              placeholder={t.dashboard.places.search.city.placeholder}
              title={t.dashboard.places.search.city.title}
              allowClear
              onChange={(e) =>
                setPagination({ ...pagination, searchTerm: e.target.value })
              }
              style={{ width: 200 }}
            />

            <CustomSelectInput
              defaultValue={{
                value: FileStatuses.ALL,
                label: t.dashboard.selectStatus.all,
              }}
              options={selectInputOptions}
              onChange={onStatusChange}
            />
          </Flex>

          <Table
            bordered
            size="small"
            rowKey={(record) => record.id}
            columns={columnsTablePlaces}
            dataSource={selectedUser?.places.items}
            loading={isLoading}
            pagination={{
              total: user?.places?.totalCount || 1,
              current: page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
              simple: true,
              showSizeChanger: true,
              position: ['bottomCenter'],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
            }}
            scroll={{ x: 1300 }}
            onChange={handleTableChange}
          />
        </Flex>
      ),
    },
    {
      label: t.dashboard.users.list.items.persons,
      key: 'persons',
      children: (
        <Flex gap="large" vertical>
          <Flex justify="end" align="center" gap="middle" wrap="wrap">
            <Input
              placeholder={t.dashboard.persons.search.name.placeholder}
              title={t.dashboard.persons.search.name.title}
              allowClear
              onChange={(e) =>
                setPagination({ ...pagination, searchTerm: e.target.value })
              }
              style={{ width: 200 }}
            />

            <CustomSelectInput
              defaultValue={{
                value: FileStatuses.ALL,
                label: t.dashboard.selectStatus.all,
              }}
              options={selectInputOptions}
              onChange={onStatusChange}
            />
          </Flex>

          <Table
            bordered
            size="small"
            rowKey={(record) => record.id}
            columns={columnsTablePersons}
            dataSource={selectedUser?.persons.items}
            loading={isLoading}
            pagination={{
              total: selectedUser?.persons?.totalCount || 1,
              current: page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
              simple: true,
              showSizeChanger: true,
              position: ['bottomCenter'],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
            }}
            scroll={{ x: 1300 }}
            onChange={handleTableChange}
          />
        </Flex>
      ),
    },
    {
      label: t.dashboard.users.list.items.articles,
      key: 'articles',
      children: (
        <Flex gap="large" vertical>
          <Flex justify="end" align="center" gap="middle" wrap="wrap">
            <Input
              placeholder={t.dashboard.articles.search.placeholder}
              title={t.dashboard.articles.search.title}
              allowClear
              onChange={(e) =>
                setPagination({ ...pagination, searchTerm: e.target.value })
              }
              style={{ width: 200 }}
            />

            <CustomSelectInput
              defaultValue={{
                value: FileStatuses.ALL,
                label: t.dashboard.selectStatus.all,
              }}
              options={selectInputOptions}
              onChange={onStatusChange}
            />
          </Flex>

          <Table
            bordered
            size="small"
            columns={columnsTableArticles}
            dataSource={selectedUser?.articles.items}
            loading={isLoading}
            pagination={{
              total: selectedUser?.articles.totalCount || 1,
              current: page,
              onChange: onPageChange,
              defaultCurrent: 1,
              defaultPageSize,
              pageSizeOptions: [10, 20, 30, 50, 100],
              onShowSizeChange: onPageSizeChange,
              simple: true,
              showSizeChanger: true,
              position: ['bottomCenter'],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
            }}
            scroll={{ x: 900 }}
            onChange={handleTableChange}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(`${selectedUser?.userName}`, t)} />
      </div>

      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card>
            <Tabs onChange={onChangeExtensions} type="card" items={items} />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
