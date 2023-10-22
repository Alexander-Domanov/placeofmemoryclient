import { FC, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';
import { useGallery } from '../hooks/useGallery';
import { UploadGalleryModal } from './UploadGalleryModal';
import { GalleryItem } from './GalleryItem';
import { GalleryFileStatuses } from '@/types/images/gallery-file-update.type';

const { Option } = Select;

export const Gallery: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [status, setStatus] = useState<string>(
    GalleryFileStatuses.ALL.toLowerCase()
  );
  const { gallery, isFetching, isSuccess, refetch } = useGallery(
    page,
    pageSize,
    status
  );

  const [isUploadGalleryOpen, setIsUploadGalleryOpen] = useState(false);

  const onPageChange = (_page: number) => {
    setPage(_page);
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const onStatusChange = (value: string) => {
    setPage(1);
    setStatus(value);
  };

  return (
    <div>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Flex justify="space-between" align="center" gap="middle">
          <div>
            <Button type="primary" onClick={() => setIsUploadGalleryOpen(true)}>
              Add File
            </Button>
          </div>

          <Space size="middle">
            <Select
              value={status}
              style={{ width: 150 }}
              onChange={onStatusChange}
            >
              <Option value={GalleryFileStatuses.ALL}>All</Option>
              <Option value={GalleryFileStatuses.DRAFT}>Draft</Option>
              <Option value={GalleryFileStatuses.PENDING_REVIEW}>
                Pending Review
              </Option>
              <Option value={GalleryFileStatuses.PUBLISHED}>Published</Option>
            </Select>

            <Pagination
              total={gallery?.totalCount || 1}
              current={page}
              onChange={onPageChange}
              defaultCurrent={1}
              defaultPageSize={18}
              pageSizeOptions={[18, 24, 36, 48, 96]}
              onShowSizeChange={onPageSizeChange}
            />
          </Space>
        </Flex>

        <Spin spinning={isFetching} size="large">
          <Card>
            {isSuccess && !gallery?.items.length ? (
              <Empty />
            ) : (
              <Row gutter={[16, 16]}>
                {gallery?.items.map((item) => (
                  <Col span={4} key={item.uploadId}>
                    <GalleryItem file={item} />
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
    </div>
  );
};
