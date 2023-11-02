import React, { FC, useEffect, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Flex,
  Form,
  Image,
  List,
  Row,
  Space,
  Spin,
  Tabs,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useUser } from '@/modules/users-module/hooks/useUser';
import { routes } from '@/common/routing/routes';
import { IUser } from '@/types';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';
import DeleteUserModal from '@/modules/users-module/components/DeleteUserModal';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { Places } from '@/modules/places-module/components/Places';
import { Persons } from '@/modules/persons-module';
import { Articles } from '@/modules/articles-module';

const cardStyle: React.CSSProperties = {
  width: 200,
  borderRadius: 5,
};

// const COLORS = ['#0088FE', '#74c782', '#FFBB28', '#FF8042'];
interface DescriptionItemProps {
  title: string;
  content?: React.ReactNode;
}
const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
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
  const { user, isLoading } = useUser(userId);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      setSelectedUser(user);
    }
  }, [user]);

  const [form] = Form.useForm();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items = [
    {
      label: 'Places',
      key: '1',
      children: (
        <Places />
        // <Table
        //   bordered
        //   size="small"
        //   rowKey={(record) => record.id}
        //   columns={columnsTablePlaces}
        //   dataSource={selectedUser?.places || []}
        //   loading={isLoading}
        //   scroll={{ x: 1000 }}
        // />
      ),
    },
    {
      label: 'Persons',
      key: '2',
      children: (
        <Persons />
        // <Table
        //   bordered
        //   size="small"
        //   rowKey={(record) => record.id}
        //   columns={columnsTablePersons}
        //   dataSource={selectedUser?.persons || []}
        //   loading={isLoading}
        //   scroll={{ x: 1300 }}
        // />
      ),
    },
    {
      label: 'Articles',
      key: '3',
      children: (
        <Articles />
        // <Table
        //   bordered
        //   size="small"
        //   rowKey={(record) => record.id}
        //   columns={columnsTableArticles}
        //   dataSource={selectedUser?.articles || []}
        //   loading={isLoading}
        //   scroll={{ x: 900 }}
        // />
      ),
    },
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(`${selectedUser?.userName}`)} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form}>
          <Row gutter={[8, 8]}>
            <Col span={14}>
              <Flex vertical gap={16}>
                <Card />
              </Flex>
            </Col>

            <Col span={10}>
              <Flex vertical gap={6}>
                <Card
                  size="small"
                  extra={
                    <Row>
                      <DescriptionItem title="ID" />
                      {selectedUser?.id}
                    </Row>
                  }
                >
                  <Row>
                    <Col span={8}>
                      <Image
                        src={selectedUser?.avatars?.medium.url}
                        width={150}
                        preview
                        style={{ borderRadius: 4 }}
                        fallback={pictureBackup}
                      />
                    </Col>

                    <Col span={16}>
                      <List split={false} size="small">
                        <ListItems
                          title="Name"
                          content={selectedUser?.userName}
                        />

                        <ListItems
                          title="Email"
                          content={selectedUser?.email}
                        />

                        <ListItems title="Role" content={selectedUser?.role} />

                        <ListItems
                          title="Status"
                          content={selectedUser?.status}
                        />

                        <ListItems
                          title="Created At"
                          content={selectedUser?.createdAt}
                        />
                      </List>
                    </Col>
                  </Row>
                </Card>

                <Card>
                  <Space size={16}>
                    <UpdateUserStatusAndRoleComponent
                      user={selectedUser}
                      showButton
                    />

                    <DeleteUserModal user={selectedUser} showButton />
                  </Space>
                </Card>
              </Flex>
            </Col>

            <Col span={24}>
              <Card>
                <Tabs onChange={onChange} type="card" items={items} />
              </Card>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
