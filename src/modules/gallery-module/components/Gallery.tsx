import { FC, useState } from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useGallery } from '../hooks/useGallery';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${
      typeof window !== 'undefined' ? localStorage?.getItem('accessToken') : ''
    }`,
  },
};

export const Gallery: FC = () => {
  const [page, setPage] = useState(1);

  const { gallery, isLoading } = useGallery(page);

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </>
  );
};
