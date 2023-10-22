import { FC, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Image,
  Modal,
  notification,
  Pagination,
  Row,
  Space,
  Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useGallery } from '@/modules/gallery-module/hooks/useGallery';
import { UploadGalleryModal } from '@/modules/gallery-module/components/UploadGalleryModal';
import { GalleryItemChoose } from '@/modules/gallery-module/components/GalleryItemChoose';
import { IGalleryFile } from '@/types';
import styles from './ChooseGalleryFiles.module.scss';

interface ChooseGalleryFilesProps {
  onFilesSelected: (files: IGalleryFile[]) => void;
  maxFileLimit: number;
}

export const ChooseGalleryFiles: FC<ChooseGalleryFilesProps> = ({
  onFilesSelected,
  maxFileLimit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);

  const [isUploadGalleryOpen, setIsUploadGalleryOpen] = useState(false);

  const { gallery, isFetching, isSuccess, refetch } = useGallery(
    page,
    pageSize
  );

  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);

  const addFileToSelectedFiles = (file: IGalleryFile) => {
    if (selectedFiles.length < maxFileLimit) {
      setSelectedFiles((prev) => [...prev, file]);
    } else {
      notification.error({
        message: 'File Limit Exceeded',
        description: `You can select a maximum of ${maxFileLimit} files.`,
      });
    }
  };
  const removeFileFromSelectedFiles = (id: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.uploadId !== id));
  };

  const onPageChange = (_page: number) => {
    setPage(_page);
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onFilesSelected(selectedFiles);
  };

  return (
    <div>
      <Row justify="start" style={{ marginBottom: 12 }}>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<PlusOutlined />}
        >
          Choose
        </Button>
      </Row>

      <Card title="Selected Files">
        <Row gutter={[12, 12]}>
          {selectedFiles.map((file) => (
            <Col span={4} key={file.uploadId}>
              <Image
                src={file.versions.huge.url}
                alt={file.alt}
                preview={false}
                className={styles.selectedFile}
                onClick={() => removeFileFromSelectedFiles(file.uploadId)}
              />
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        open={isModalOpen}
        width={1000}
        title="Choose media"
        footer={null}
        onCancel={handleModalClose}
      >
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Flex justify="space-between" align="center" gap="middle">
            <div>
              <Button
                type="primary"
                onClick={() => setIsUploadGalleryOpen(true)}
              >
                Add File
              </Button>
            </div>

            <Space size="middle">
              <Pagination
                total={gallery?.totalCount || 1}
                current={page}
                onChange={onPageChange}
                defaultCurrent={1}
                defaultPageSize={18}
                pageSizeOptions={[18, 24, 36, 48, 96]}
                onShowSizeChange={onPageSizeChange}
                showLessItems
              />
            </Space>
          </Flex>

          <Spin spinning={isFetching} size="large">
            <Card>
              {isSuccess && !gallery?.items.length ? (
                <Empty />
              ) : (
                <Row gutter={[12, 12]}>
                  {gallery?.items.map((file) => (
                    <Col span={4} key={file.uploadId}>
                      <GalleryItemChoose
                        file={file}
                        isSelected={selectedFiles.includes(file)}
                        addFileToSelectedFiles={addFileToSelectedFiles}
                        removeFileFromSelectedFiles={
                          removeFileFromSelectedFiles
                        }
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          </Spin>
        </Space>

        <UploadGalleryModal
          isOpen={isUploadGalleryOpen}
          setIsOpen={setIsUploadGalleryOpen}
          refetch={refetch}
        />
      </Modal>
    </div>
  );
};
