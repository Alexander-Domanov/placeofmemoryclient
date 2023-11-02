import React, { FC } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Flex,
  Form,
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
import { useUser } from '@/modules/users-module/hooks/useUser';
import { routes } from '@/common/routing/routes';
import { columnsTablePersons } from '@/modules/persons-module/components/ColumnsTablePersons';
import { columnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
import { columnsTablePlaces } from '@/modules/places-module';
import DeleteUserModal from '@/modules/users-module/components/DeleteUserModal';
import UpdateUserStatusAndRoleComponent from '@/modules/users-module/components/UpdateUserStatusAndRole';

const cardStyle: React.CSSProperties = {
  width: 200,
  borderRadius: 5,
};

const COLORS = ['#0088FE', '#74c782', '#FFBB28', '#FF8042'];
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

  const [form] = Form.useForm();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items = [
    {
      label: 'Places',
      key: '1',
      children: (
        <Table
          bordered
          size="small"
          rowKey={(record) => record.id}
          columns={columnsTablePlaces}
          dataSource={user?.places || []}
          loading={isLoading}
          scroll={{ x: 1000 }}
        />
      ),
    },
    {
      label: 'Persons',
      key: '2',
      children: (
        <Table
          bordered
          size="small"
          rowKey={(record) => record.id}
          columns={columnsTablePersons}
          dataSource={user?.persons || []}
          loading={isLoading}
          scroll={{ x: 1300 }}
        />
      ),
    },
    {
      label: 'Articles',
      key: '3',
      children: (
        <Table
          bordered
          size="small"
          rowKey={(record) => record.id}
          columns={columnsTableArticles}
          dataSource={user?.articles || []}
          loading={isLoading}
          scroll={{ x: 900 }}
        />
      ),
    },
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(`${user?.userName}`)} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]}>
            <Col span={14}>
              <Flex vertical gap={16}>
                <Card
                  extra={
                    <Space direction="vertical">
                      <Row>
                        <DescriptionItem title="ID" />
                        {user?.id}
                      </Row>
                    </Space>
                  }
                >
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <List split={false}>
                        {/* <ListItems title="Name" content={user?.userName} /> */}

                        {/* <ListItems title="Email" content={user?.email} /> */}

                        {/* <ListItems title="Role" content={user?.role} /> */}

                        {/* <ListItems title="Status" content={user?.status} /> */}
                      </List>
                    </Col>
                  </Row>
                </Card>
              </Flex>
            </Col>

            <Col span={10}>
              <Flex vertical gap={16}>
                <Card
                  extra={
                    <Space direction="vertical">
                      <Row>
                        <DescriptionItem title="ID" />
                        {user?.id}
                      </Row>
                    </Space>
                  }
                >
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <List split={false}>
                        <ListItems title="Name" content={user?.userName} />

                        <ListItems title="Email" content={user?.email} />

                        {/* <ListItems title="Role" content={user?.role} /> */}

                        {/* <ListItems title="Status" content={user?.status} /> */}
                      </List>
                    </Col>

                    <Col span={8}>
                      {RenderImage(user?.avatars?.medium.url, 100, true)}
                    </Col>
                  </Row>

                  <Row justify="start">
                    <UpdateUserStatusAndRoleComponent user={user || null} />
                    <DeleteUserModal user={user || null} showButton />
                  </Row>
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
