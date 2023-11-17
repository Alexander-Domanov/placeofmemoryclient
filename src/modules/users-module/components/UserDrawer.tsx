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
            more…
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
                  title="User Name"
                  content={selectedUser?.userName}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 4 }}>
              <Col span={30}>
                <DescriptionItem
                  title="First Name"
                  content={selectedUser?.firstName || 'N/A'}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 4 }}>
              <Col span={30}>
                <DescriptionItem title="Email" content={selectedUser?.email} />
              </Col>
            </Row>
          </Space>
        </Space>

        <Divider orientation="left">User Information</Divider>

        <Row>
          <Col span={10}>
            <DescriptionItem
              title="Role"
              content={ColorRoleTag(selectedUser?.role as string)}
            />
          </Col>

          <Col span={10}>
            <DescriptionItem
              title="Status"
              content={ColorStatusUserTag(selectedUser?.status as string, true)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Divider orientation="right">Places</Divider>

            <DescriptionItem
              title="Draft"
              content={selectedUser?.places?.drafts?.length || 0}
            />

            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.places?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title="Published"
              content={selectedUser?.places?.publications?.length || 0}
            />
          </Col>

          <Col span={12}>
            <Divider orientation="right">Persons</Divider>
            <DescriptionItem
              title="Draft"
              content={selectedUser?.persons?.drafts?.length || 0}
            />

            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.persons?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title="Published"
              content={selectedUser?.persons?.publications?.length || 0}
            />
          </Col>

          <Col span={12}>
            <Divider orientation="right">Articles</Divider>

            <DescriptionItem
              title="Draft"
              content={selectedUser?.articles?.drafts?.length || 0}
            />

            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.articles?.pendingReview?.length || 0}
            />

            <DescriptionItem
              title="Published"
              content={selectedUser?.articles?.publications?.length || 0}
            />
          </Col>
        </Row>

        <Divider orientation="left">Other Information</Divider>

        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Added"
              content={convertDateToFormat(selectedUser?.createdAt)}
            />
          </Col>

          <Col span={12}>
            <DescriptionItem
              title="Last Updated"
              content={convertDateToFormat(selectedUser?.updatedAt)}
            />
          </Col>
        </Row>
        <Divider />
      </Drawer>
    </Flex>
  );
};
