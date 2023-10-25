import React, { FC, useState } from 'react';
import { Button, Col, Divider, Drawer, List, Row, Space } from 'antd';
import { IUserWithShortExtensions } from '@/types';
import { RenderImage } from '@/common-dashboard/helpers/RenderImage';
import { ColorRoleTag } from '@/modules/users-module/components/helpers/ColorRoleTag';
import { ColorStatusUserTag } from '@/modules/users-module/components/helpers/ColorStatusUserTag';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <span className="font-normal text-neutral-400">{title}: </span>
    <span className="font-normal text-start">{content}</span>
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
    <>
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
        <Space
          direction="horizontal"
          size="large"
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {RenderImage(selectedUser?.avatars?.medium.url, 120, true)}
          </Space>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
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
              content={selectedUser?.places?.drafts.length}
            />
            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.places?.pendingReview.length}
            />
            <DescriptionItem
              title="Published"
              content={selectedUser?.places?.publications.length}
            />
          </Col>
          <Col span={12}>
            <Divider orientation="right">Persons</Divider>
            <DescriptionItem
              title="Draft"
              content={selectedUser?.persons?.drafts.length}
            />
            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.persons?.pendingReview.length}
            />
            <DescriptionItem
              title="Published"
              content={selectedUser?.persons?.publications.length}
            />
          </Col>
          <Col span={12}>
            <Divider orientation="right">Articles</Divider>
            <DescriptionItem
              title="Draft"
              content={selectedUser?.articles?.drafts.length}
            />
            <DescriptionItem
              title="Pending to review"
              content={selectedUser?.articles?.pendingReview.length}
            />
            <DescriptionItem
              title="Published"
              content={selectedUser?.articles?.publications.length}
            />
          </Col>
        </Row>
        <Divider orientation="left">Other Information</Divider>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Added" content={selectedUser?.createdAt} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Last Updated"
              content={selectedUser?.updatedAt}
            />
          </Col>
        </Row>
        <Divider />
      </Drawer>
    </>
  );
};