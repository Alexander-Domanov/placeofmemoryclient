import React, { FC, ReactNode, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Empty,
  Flex,
  Pagination,
  Row,
  Select,
  Spin,
} from 'antd';
import { useGallery } from '../hooks/useGallery';
import { UploadGalleryModal } from './UploadGalleryModal';
import { GalleryItem } from './GalleryItem';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { routes } from '@/common/routing/routes';
import { FileStatuses, Role } from '@/types';
import { fileStatusOptions } from '@/common-dashboard/options-file-statuses-select-input';
import SelectInput from '@/common-dashboard/helpers/SelectInput';

const { Option } = Select;

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.gallery,
    text: 'Gallery',
    withLink: false,
  }),
];

export const Gallery: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [status, setStatus] = useState<string>(FileStatuses.ALL.toLowerCase());

  const { gallery, isFetching, isSuccess, refetch, me } = useGallery(
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

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPage(1);
    setStatus(value.value);
  };

  const selectInputOptions =
    me?.role === Role.ADMIN
      ? [
          ...fileStatusOptions,
          {
            label: 'Archived',
            value: FileStatuses.ARCHIVED,
          },
        ]
      : fileStatusOptions;

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div>
          {/* <Flex justify="end" align="center" gap="middle" wrap="wrap"> */}
          {/* <div> */}
          {/*  <Button */}
          {/*    type="primary" */}
          {/*    onClick={() => setIsUploadGalleryOpen(true)} */}
          {/*    disabled */}
          {/*  > */}
          {/*    Add File */}
          {/*  </Button> */}
          {/* </div> */}
        </div>

        <Flex align="center" gap="middle" wrap="wrap">
          <SelectInput
            defaultValue={{ value: FileStatuses.ALL, label: 'All' }}
            options={selectInputOptions}
            onChange={onStatusChange}
          />

          <Pagination
            size="small"
            total={gallery?.totalCount || 1}
            current={page}
            onChange={onPageChange}
            defaultCurrent={1}
            defaultPageSize={18}
            pageSizeOptions={[18, 24, 36, 48, 96]}
            onShowSizeChange={onPageSizeChange}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
            simple
            showSizeChanger
          />
          {/* </Flex> */}
        </Flex>

        <Spin spinning={isFetching} size="large">
          <Card>
            {isSuccess && !gallery?.items.length ? (
              <Empty />
            ) : (
              <Row gutter={[16, 16]}>
                {gallery?.items.map((item) => (
                  <Col
                    span={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={4}
                    key={item.uploadId}
                  >
                    <GalleryItem file={item} />
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Spin>
      </Flex>

      <UploadGalleryModal
        isOpen={isUploadGalleryOpen}
        setIsOpen={setIsUploadGalleryOpen}
        refetch={refetch}
      />
    </Flex>
  );
};
