import { notification, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useDeleteGalleryFile } from '@/modules/gallery-module/hooks/useDeleteGalleryFile';
import { IGalleryFile } from '@/types';
import { IMAGE_FORMATS, MAX_FILE_SIZE } from '@/common/constants';
import { useTranslation } from '@/components/internationalization';

export const useUpload = (
  setFileList: (fileList: UploadFile[]) => void,
  typeFile: string,
  multiple = false,
  maxCount = 1
) => {
  const { deleteGalleryFileMutateAsync } = useDeleteGalleryFile();
  const { t } = useTranslation();

  const onAllFilesUploaded = () => {
    notification.success({
      message: t.dashboard.gallery.image.notifications.upload.success.title,
      description:
        t.dashboard.gallery.image.notifications.upload.success.description,
      placement: 'bottomLeft',
    });

    // refetch();
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture',
    multiple,
    action: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery?img=${typeFile}`,
    beforeUpload(file) {
      const isImage = IMAGE_FORMATS.includes(file.type);
      const isLT10MB = file.size <= MAX_FILE_SIZE;

      if (!isImage) {
        notification.error({
          message:
            t.dashboard.gallery.image.notifications.upload.errorType.title,
          description:
            t.dashboard.gallery.image.notifications.upload.errorType
              .description,
          placement: 'bottomLeft',
        });
      }

      if (!isLT10MB) {
        notification.error({
          message:
            t.dashboard.gallery.image.notifications.upload.errorSize.title,
          description:
            t.dashboard.gallery.image.notifications.upload.errorSize
              .description,
          placement: 'bottomLeft',
        });
      }

      return (isImage && isLT10MB) || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;

      setFileList(info.fileList);

      if (status === 'done') {
        if (info.fileList.every((f) => f.status === 'done')) {
          onAllFilesUploaded();
        }
      }

      if (status === 'removed') {
        notification.success({
          message: t.dashboard.gallery.image.notifications.upload.remove.title,
          description:
            t.dashboard.gallery.image.notifications.upload.remove.description,
          placement: 'bottomLeft',
        });
      }

      if (status === 'error') {
        notification.error({
          message: t.dashboard.gallery.image.notifications.upload.failed.title,
          description:
            t.dashboard.gallery.image.notifications.upload.failed.description,
          placement: 'bottomLeft',
        });
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
    maxCount,
  };

  return { uploadProps };
};
