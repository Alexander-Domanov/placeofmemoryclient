import { FC } from 'react';
import { Button, Image } from 'antd';
import { clsx } from 'clsx';
import { FaXmark } from 'react-icons/fa6';
import { IGalleryFile } from '@/types';
import styles from './GalleryItem.module.scss';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';

interface Props {
  file: IGalleryFile;
  isSelected: boolean;
  addFileToSelectedFiles: (file: IGalleryFile) => void;
  removeFileFromSelectedFiles: (id: string) => void;
}

export const GalleryItemChoose: FC<Props> = ({
  file,
  isSelected,
  addFileToSelectedFiles,
  removeFileFromSelectedFiles,
}) => {
  const onDeleteClick = () => {
    removeFileFromSelectedFiles(file.uploadId);
  };

  return (
    <div className={clsx(styles.block, { [styles.imageSelected]: isSelected })}>
      <Image
        src={file.versions?.large?.url}
        preview={false}
        fallback={pictureBackup}
        className={styles.image}
        onClick={() => addFileToSelectedFiles(file)}
      />

      <div className={styles.actions}>
        {isSelected && (
          <Button
            type="primary"
            danger
            shape="circle"
            size="large"
            icon={<FaXmark />}
            onClick={onDeleteClick}
          />
        )}
      </div>
    </div>
  );
};
