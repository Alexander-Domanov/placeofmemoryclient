import { message, notification, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useDeleteGalleryFile } from '@/modules/gallery-module/hooks/useDeleteGalleryFile';
import { IGalleryFile } from '@/types';
import { IMAGE_FORMATS } from '@/common/constants';

export const useUpload = (
  setFileList: (fileList: UploadFile[]) => void,
  multiple = false,
  maxCount = 1
) => {
  const { deleteGalleryFileMutateAsync } = useDeleteGalleryFile();

  const onAllFilesUploaded = () => {
    notification.success({
      message: 'Файлы загружены',
      description: 'Все ваши файлы успешно загружены!',
    });

    // refetch();
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture',
    multiple,
    action: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
    beforeUpload(file) {
      const isImage = IMAGE_FORMATS.includes(file.type);
      const isLT10MB = file.size <= 10 * 1024 * 1024;

      if (!isImage) {
        message.error(`${file.name} is not a image`);
      }

      if (!isLT10MB) {
        message.error(`${file.name} is greater then 10MB`);
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
        message.success(`${info.file.name} file removed successfully.`);
      }

      if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    async onRemove(file) {
      // console.log('remove', file);

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
