import { FC } from 'react';
import { Image, Tooltip } from 'antd';
import { BsEye, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useDashboardModalsStore } from '@/store';
import { IGalleryFile, Statuses } from '@/types';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';

interface Props {
  file: IGalleryFile;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case Statuses.PUBLISHED:
      return (
        <Tooltip title={`${status}`} placement="leftBottom" color="#1087f6">
          <BsEyeFill color="green" size={24} />
        </Tooltip>
      );
    case Statuses.DRAFT:
      return (
        <Tooltip title={`${status}`} placement="leftBottom" color="#1087f6">
          <BsEyeSlashFill color="red" size={24} />
        </Tooltip>
      );
    case Statuses.PENDING_REVIEW:
      return (
        <Tooltip title={`${status}`} placement="leftBottom" color="#1087f6">
          <BsEye color="orange" size={24} />
        </Tooltip>
      );
    case Statuses.ARCHIVED:
      return (
        <Tooltip title={`${status}`} placement="leftBottom" color="#1087f6">
          <BsEyeSlashFill color="lightgrey" size={24} />
        </Tooltip>
      );
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

  const statusIcon = getStatusIcon(file.status);

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
        fallback={pictureBackup}
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
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          filter: 'drop-shadow(4px 1px 2px rgb(0 0 0 / 0.4))',
          top: '10px',
          right: '10px',
          zIndex: 1,
        }}
      >
        {statusIcon}
      </div>
    </div>
  );
};
