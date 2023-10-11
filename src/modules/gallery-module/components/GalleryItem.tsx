import { FC, useState } from 'react';
import { Dropdown, Image, Menu, message, Modal, Select } from 'antd';
import { BsEyeSlashFill, BsEyeFill, BsEye } from 'react-icons/bs';
import { GalleryFile } from '@/modules/gallery-module/api/gallery-api';
import { useDashboardModalsStore } from '@/store';

const { Option } = Select;

interface Props {
  file: GalleryFile;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return <BsEyeFill color="green" size={32} />;
    case 'DRAFT':
      return <BsEyeSlashFill color="red" size={32} />;
    case 'PENDING_REVIEW':
      return <BsEye color="orange" size={32} />;
    default:
      return null;
  }
};

export const GalleryItem: FC<Props> = ({ file }) => {
  const { setIsOpen, setUploadId } = useDashboardModalsStore(
    (state) => state.fileInfoModal
  );

  const onViewClick = () => {
    setUploadId(file.uploadId);
    setIsOpen(true);
  };

  const [isStatusMenuVisible, setStatusMenuVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(file.status);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);

  const statusIcon = getStatusIcon(file.status);

  const handleStatusMenuVisibleChange = (visible: boolean) => {
    setStatusMenuVisible(visible);
  };
  const showUpdateModal = () => {
    setUpdateModalVisible(true);
    setStatusMenuOpen(false);
  };
  const hideUpdateModal = () => {
    setUpdateModalVisible(false);
  };
  const showDeleteModal = () => {
    setDeleteModalVisible(true);
    setStatusMenuOpen(false);
  };
  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key === 'update') {
      // Handle the "Update status" action
      showUpdateModal();
    } else if (key === 'delete') {
      // Handle the "Delete image" action
      showDeleteModal();
    }
  };
  const confirmDelete = () => {
    // Handle the delete action here
    message.info(`Deleting image with ID ${file.uploadId}`);
    hideDeleteModal();
  };
  const handleUpdate = () => {
    // Handle the update status action here
    message.info(`Updating status to ${newStatus} for ${file.uploadId}`);
    hideUpdateModal();
  };

  const statusMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="update">Update status</Menu.Item>
      <Menu.Item key="delete">Delete…</Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1/1',
        display: 'flex',
        cursor: 'pointer',
      }}
    >
      <Image
        src={file.versions?.large?.url}
        preview={false}
        fallback="data:image/png;base64,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"
        style={{
          display: 'block',
          objectFit: 'cover',
          borderRadius: '0.5vw',
          width: '100%',
          height: '100%',
          aspectRatio: '1/1',
        }}
        onClick={onViewClick}
      />
      <div
        style={{
          display: 'flex',
          // backgroundColor: 'white rgba(0, 0, 0, 0.4)',
          // borderRadius: '50%',
          // padding: '2px',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          filter: 'drop-shadow(4px 1px 2px rgb(0 0 0 / 0.4))',
          top: '1vw',
          right: '1vw',
          zIndex: 1,
        }}
      >
        <Dropdown
          overlay={statusMenu}
          trigger={['click']}
          open={isStatusMenuOpen}
          onVisibleChange={setStatusMenuOpen}
        >
          {statusIcon}
        </Dropdown>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Modal
          title="Update Status"
          visible={isUpdateModalVisible}
          onOk={handleUpdate}
          onCancel={hideUpdateModal}
        >
          <p>Select a new status:</p>
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: '100%' }}
          >
            <Option value="DRAFT">Draft</Option>
            <Option value="PENDING_REVIEW">Pending Review</Option>
            <Option value="REJECTED">Rejected</Option>
            <Option value="PUBLISHED">Published</Option>
            <Option value="ARCHIVED">Archived</Option>
            <Option value="DELETED">Deleted</Option>
          </Select>
        </Modal>
        <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onOk={confirmDelete}
          onCancel={hideDeleteModal}
        >
          <p>Are you sure you want to delete this image?</p>
        </Modal>
      </div>
    </div>
  );
};
