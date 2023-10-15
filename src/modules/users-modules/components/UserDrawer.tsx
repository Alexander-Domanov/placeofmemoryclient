import { FC } from 'react';
import { Col, Divider, Drawer, Row, Space } from 'antd';
import { IUserWithShortExtensions } from '@/types';
import { RoleDropdown } from '@/modules/users-modules/components/RoleDropdown';
import { renderAvatarImage } from '@/modules/users-modules/components/RenderAvatar';
import { StatusDropdown } from '@/modules/users-modules/components/StatusDropdown';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <span className="font-normal text-neutral-400">{title}: </span>
    <span className="font-bold text-base">{content}</span>
  </div>
);

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedUser: IUserWithShortExtensions | null;
}

export const UserDrawer: FC<UserDrawerProps> = ({
  open,
  onClose,
  selectedUser,
}) => {
  return (
    <Drawer
      width={540}
      placement="right"
      onClose={onClose}
      open={open}
      style={{ position: 'absolute' }}
    >
      <Space
        direction="horizontal"
        size="large"
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {renderAvatarImage(
            selectedUser?.avatars?.medium.url,
            120,
            selectedUser,
            true
          )}
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
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Row style={{ marginBottom: 4 }}>
            <Col span={30}>
              <div
                style={{
                  textAlign: 'right',
                  position: 'fixed',
                  top: '20px',
                  right: '30px',
                }}
              >
                <DescriptionItem title="ID" content={selectedUser?.id} />
              </div>
            </Col>
          </Row>
        </Space>
      </Space>

      <Divider />
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Role"
            content={<RoleDropdown {...selectedUser} />}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Status"
            content={<StatusDropdown {...selectedUser} />}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginTop: 16 }}>
        <Col span={12}>
          <b className="site-description-item-profile-p">Places:</b>
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
          <b className="site-description-item-profile-p">Persons:</b>
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
        <Col span={12} style={{ marginTop: 16 }}>
          <b className="site-description-item-profile-p">Articles:</b>
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
      <Divider />
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
  );
};
