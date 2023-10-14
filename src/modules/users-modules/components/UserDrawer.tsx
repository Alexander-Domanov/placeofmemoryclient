import { FC } from 'react';
import { Col, Divider, Drawer, Row, Space } from 'antd';
import { IUser } from '@/types';
import { RoleDropdown } from '@/modules/users-modules/components/RoleDropdown';
import { renderAvatar } from '@/modules/users-modules/components/RenderAvatar';
import { StatusDropdown } from '@/modules/users-modules/components/StatusDropdown';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <span className="font-normal">{title}: </span>
    <span className="font-bold text-base">{content}</span>
  </div>
);

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedUser: IUser | null;
}

export const UserDrawer: FC<UserDrawerProps> = ({
  open,
  onClose,
  selectedUser,
}) => {
  return (
    <Drawer
      width={680}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
    >
      <Space
        direction="horizontal"
        size="large"
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {renderAvatar(selectedUser?.avatars, 120)}
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
                  right: '60px',
                  padding: '4px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
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
      <p className="site-description-item-profile-p">Content</p>
      <Row style={{ marginTop: 16 }}>
        <Col span={12}>
          <DescriptionItem
            title="Places"
            content={selectedUser?.places.length}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Persons"
            content={selectedUser?.persons.length}
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Content</p>
    </Drawer>
  );
};
