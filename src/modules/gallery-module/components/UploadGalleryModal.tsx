import { FC } from 'react';
import { message, Modal, notification, Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDeleteGalleryFile } from '@/modules/gallery-module/hooks/useDeleteGalleryFile';
import { IGalleryFile } from '@/types';
import { IMAGE_FORMATS, MAX_FILE_SIZE } from '@/common/constants';
import { useTranslation } from '@/components/internationalization';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  refetch: () => void;
}

const MAX_UPLOAD_FILES = 5;

const { Dragger } = Upload;

export const UploadGalleryModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  refetch,
}) => {
  const { deleteGalleryFileMutateAsync } = useDeleteGalleryFile();
  const { t } = useTranslation();

  const onAllFilesUploaded = () => {
    notification.success({
      message: t.dashboard.gallery.image.notifications.upload.success.title,
      description:
        t.dashboard.gallery.image.notifications.upload.success.description,
    });

    refetch();
  };

  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery?img=common`,
    beforeUpload(file) {
      const isImage = IMAGE_FORMATS.includes(file.type);
      const isLT10MB = file.size <= MAX_FILE_SIZE;

      if (!isImage) {
        message.error(
          t.dashboard.gallery.image.notifications.upload.errorType.title
        );
      }

      if (!isLT10MB) {
        message.error(
          t.dashboard.gallery.image.notifications.upload.errorSize.title
        );
      }

      return (isImage && isLT10MB) || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;

      if (status === 'done') {
        message.success(t.dashboard.gallery.image.notifications.success.title);

        if (info.fileList.every((f) => f.status === 'done')) {
          onAllFilesUploaded();
        }
      }

      if (status === 'removed') {
        message.success(
          t.dashboard.gallery.image.notifications.upload.remove.title
        );
      }

      if (status === 'error') {
        message.error(
          t.dashboard.gallery.image.notifications.upload.failed.title
        );
      }
    },
    async onRemove(file) {
      if (file.status !== 'error') {
        const response = file.response as IGalleryFile;
        await deleteGalleryFileMutateAsync(response.uploadId);
      }
    },
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${
        typeof window !== 'undefined'
          ? localStorage?.getItem('accessToken')
          : ''
      }`,
    },
    maxCount: MAX_UPLOAD_FILES,
  };

  return (
    <>
      <Modal
        open={isOpen}
        width={1000}
        title="Upload Media"
        onCancel={() => setIsOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files. Max {MAX_UPLOAD_FILES}{' '}
            files. Only images & {`<10MB`}
          </p>
        </Dragger>
      </Modal>
    </>
  );
};
