import { FC, useState } from 'react';
import { Button, Card, Col, Empty, Pagination, Row, Select, Space } from 'antd';
import { useGallery } from '../hooks/useGallery';
import { UploadGalleryModal } from './UploadGalleryModal';
import { GalleryItem } from './GalleryItem';

const { Option } = Select;

export const Gallery: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [status, setStatus] = useState('all');
  const { gallery, isLoading } = useGallery(page, pageSize, status);

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Button type="primary" onClick={() => setIsUploadGalleryOpen(true)}>
              Add File
            </Button>
          </div>
          <div>
            <Select
              value={status}
              style={{ width: 120 }}
              onChange={onStatusChange}
            >
              <Option value="all">All</Option>
              <Option value="draft">Draft</Option>
              <Option value="pendingReview">Pending Review</Option>
              <Option value="published">Published</Option>
            </Select>
          </div>

          <div>
            <Pagination
              total={gallery?.totalCount || 1}
              current={page}
              onChange={onPageChange}
              defaultCurrent={1}
              defaultPageSize={18}
              pageSizeOptions={[18, 24, 36, 48, 96]}
              onShowSizeChange={onPageSizeChange}
            />
          </div>
        </div>

        <Card>
          {!gallery?.items.length ? (
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
      </Space>

      <UploadGalleryModal
        isOpen={isUploadGalleryOpen}
        setIsOpen={setIsUploadGalleryOpen}
      />
    </div>
  );
};
