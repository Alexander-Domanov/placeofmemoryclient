import React, { FC, ReactNode, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Empty,
  Flex,
  Pagination,
  Row,
  Space,
  Spin,
} from 'antd';
import { useGallery } from '../hooks/useGallery';
import { UploadGalleryModal } from './UploadGalleryModal';
import { GalleryItem } from './GalleryItem';
import { CustomSelectInput } from '@/components';
import { routes } from '@/common/routing/routes';
import { FileStatuses, ImageResourceType, Role } from '@/types';
import {
  FileStatusOptions,
  TypeFileOptions,
} from '@/common-dashboard/helpers/options-file-statuses-select-input';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

export const Gallery: FC = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [status, setStatus] = useState<string>(FileStatuses.ALL.toLowerCase());
  const [type, setImageType] = useState<string>(
    ImageResourceType.ALL.toLowerCase()
  );

  const { gallery, isFetching, isSuccess, refetch, me } = useGallery(
    page,
    pageSize,
    status,
    type
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

  const onTypeChange = (value: { value: string; label: ReactNode }) => {
    setPage(1);
    setImageType(value.value);
  };

  const fileStatuses = FileStatusOptions(t);

  const selectInputOptions =
    me?.role === Role.ADMIN
      ? [
          ...fileStatuses,
          {
            label: t.dashboard.selectStatus.archived,
            value: FileStatuses.ARCHIVED,
          },
        ]
      : fileStatuses;

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.gallery.index,
      text: t.dashboard.gallery.title,
      withLink: false,
    }),
  ];
  const typeFileOptions = TypeFileOptions(t);

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        {/* <Space justify="end" align="center" gap="middle"> */}
        {/* <div> */}
        {/*  <Button */}
        {/*    type="primary" */}
        {/*    onClick={() => setIsUploadGalleryOpen(true)} */}
        {/*    disabled */}
        {/*  > */}
        {/*    Add File */}
        {/*  </Button> */}
        {/* </div> */}

        <Flex justify="end" align="center" gap="middle" wrap="wrap">
          {(me?.role === Role.ADMIN ||
            me?.role === Role.AUTHOR ||
            me?.role === Role.EDITOR) && (
            <CustomSelectInput
              defaultValue={{
                value: ImageResourceType.ALL,
                label: t.dashboard.selectFileType.all,
              }}
              options={typeFileOptions}
              onChange={onTypeChange}
            />
          )}

          <CustomSelectInput
            defaultValue={{
              value: FileStatuses.ALL,
              label: t.dashboard.selectStatus.all,
            }}
            options={selectInputOptions}
            onChange={onStatusChange}
          />

          {/* <Flex justify="end"> */}
          {/* <Pagination */}
          {/*  size="small" */}
          {/*  total={gallery?.totalCount || 1} */}
          {/*  current={page} */}
          {/*  onChange={onPageChange} */}
          {/*  defaultCurrent={1} */}
          {/*  defaultPageSize={18} */}
          {/*  pageSizeOptions={[18, 24, 36, 48, 96]} */}
          {/*  onShowSizeChange={onPageSizeChange} */}
          {/*  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`} */}
          {/*  simple */}
          {/*  showSizeChanger */}
          {/* /> */}
          {/* </Flex> */}
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
      </Space>

      <Flex justify="center" align="center" gap="middle" wrap="wrap">
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
      </Flex>

      <UploadGalleryModal
        isOpen={isUploadGalleryOpen}
        setIsOpen={setIsUploadGalleryOpen}
        refetch={refetch}
      />
    </Flex>
  );
};
