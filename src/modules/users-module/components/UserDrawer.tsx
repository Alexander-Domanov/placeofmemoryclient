import React, { FC, useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Flex,
  List,
  Row,
  Space,
  Typography,
} from 'antd';
import { IUserWithShortExtensions } from '@/types';
import { RenderImage } from '@/components';
import { ColorRoleTag } from '@/modules/users-module/components/helpers/ColorRoleTag';
import { ColorStatusUserTag } from '@/modules/users-module/components/helpers/ColorStatusUserTag';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { useTranslation } from '@/components/internationalization';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div>
    <span className="text-neutral-400">{title}: &nbsp;</span>
    <Typography.Text>{content}</Typography.Text>
  </div>
);

interface UserDrawerProps {
  onUserSelected: IUserWithShortExtensions | null;
}

export const UserDrawer: FC<UserDrawerProps> = ({ onUserSelected }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<IUserWithShortExtensions | null>(null);

  const showDrawer = (user: IUserWithShortExtensions) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Flex gap="large" vertical>
      <List.Item
        actions={[
          <Button
            key={0}
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() =>
              showDrawer(onUserSelected as IUserWithShortExtensions)
            }
            ghost
          >
            {t.dashboard.users.drawer.more}
          </Button>,
        ]}
      />

      <Drawer
        width={510}
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space direction="vertical">
            <Row>
              <Col>
                <DescriptionItem title="ID" content={selectedUser?.id} />
              </Col>
            </Row>
          </Space>
        }
      >
        <Space direction="horizontal" size="large">
          <Space direction="vertical" size="middle">
            {RenderImage(selectedUser?.avatars?.medium.url, 120, true)}
          </Space>

          <Space direction="vertical" size="middle">
            <Row style={{ marginBottom: 4 }}>
              <Col span={30}>
                <DescriptionItem
                  title={t.dashboard.users.drawer.name}
                  content={selectedUser?.userName}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 4 }}>
              <Col span={30}>
                <DescriptionItem
                  title={t.dashboard.users.drawer.lastName}
                  content={
                    selectedUser?.firstName || t.dashboard.users.drawer.na
                  }
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 4 }}>
              <Col span={30}>
                <DescriptionItem
                  title={t.dashboard.users.drawer.email}
                  content={selectedUser?.email}
                />
              </Col>
            </Row>
          </Space>
        </Space>

        <Divider orientation="left">
          {t.dashboard.users.drawer.userInformation}
        </Divider>

        <Row>
          <Col span={10}>
            <DescriptionItem
              title={t.dashboard.users.drawer.role}
              content={ColorRoleTag(selectedUser?.role as string)}
            />
          </Col>

          <Col span={10}>
            <DescriptionItem
              title={t.dashboard.users.drawer.status}
              content={ColorStatusUserTag(selectedUser?.status as string, true)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Divider orientation="right">
              {t.dashboard.users.drawer.places}
            </Divider>

            <DescriptionItem
              title={t.dashboard.users.drawer.drafts}
              content={selectedUser?.places?.drafts?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.pending}
              content={selectedUser?.places?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.published}
              content={selectedUser?.places?.publications?.length || 0}
            />
          </Col>

          <Col span={12}>
            <Divider orientation="right">
              {t.dashboard.users.drawer.persons}
            </Divider>
            <DescriptionItem
              title={t.dashboard.users.drawer.drafts}
              content={selectedUser?.persons?.drafts?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.pending}
              content={selectedUser?.persons?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.published}
              content={selectedUser?.persons?.publications?.length || 0}
            />
          </Col>

          <Col span={12}>
            <Divider orientation="right">
              {t.dashboard.users.drawer.articles}
            </Divider>

            <DescriptionItem
              title={t.dashboard.users.drawer.drafts}
              content={selectedUser?.articles?.drafts?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.pending}
              content={selectedUser?.articles?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title={t.dashboard.users.drawer.published}
              content={selectedUser?.articles?.publications?.length || 0}
            />
          </Col>
        </Row>

        <Divider orientation="left">
          {t.dashboard.users.drawer.otherInformation}
        </Divider>

        <Row>
          <Col span={12}>
            <DescriptionItem
              title={t.dashboard.users.drawer.added}
              content={convertDateToFormat(selectedUser?.createdAt)}
            />
          </Col>

          <Col span={12}>
            <DescriptionItem
              title={t.dashboard.users.drawer.updated}
              content={convertDateToFormat(selectedUser?.updatedAt)}
            />
          </Col>
        </Row>
        <Divider />
      </Drawer>
    </Flex>
  );
};
