import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Image,
  Input,
  List,
  Modal,
  notification,
  Row,
  Space,
  Spin,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useUpdateGalleryFile } from '../hooks/useUpdateGalleryFile';
import { useGalleryFile } from '../hooks/useGalleryFile';
import { useDashboardModalsStore } from '@/store';
import { useDeleteGalleryFile } from '../hooks/useDeleteGalleryFile';
import { FileStatuses, IExtendGalleryFile, Role } from '@/types';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { DeleteConfirmationModal } from '@/components';
import { useWindowSize } from '@/common/hooks/useWindowResize';

type FormValues = {
  alt: string;
  status: FileStatuses;
};

export const GalleryFileInfoModal: FC = () => {
  const { isOpen, uploadId, setIsOpen, setUploadId } = useDashboardModalsStore(
    (state) => state.fileInfoModal
  );

  const { file, isLoading, isSuccess } = useGalleryFile(uploadId);
  const { data: me } = useMeQuery();

  const { updateGalleryFileMutateAsync, isUpdating } =
    useUpdateGalleryFile(uploadId);
  const { deleteGalleryFileMutateAsync } = useDeleteGalleryFile();

  const [selectedFile, setSelectedFile] = useState<IExtendGalleryFile | null>(
    null
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (file) {
      form.setFieldValue('alt', file?.alt);
      form.setFieldValue('status', file?.status.toLowerCase());
    }
    setSelectedFile(file as IExtendGalleryFile);
  }, [file]);

  const onCancel = () => {
    setIsOpen(false);
    setUploadId(null);
  };

  const onDeleteFile = () => {
    deleteGalleryFileMutateAsync(file?.uploadId, {
      onSuccess() {
        notification.success({
          message: 'File was deleted successfully',
          placement: 'bottomLeft',
        });
        setIsOpen(false);
        setUploadId(null);
      },
    });
  };

  const onSubmit = (values: FormValues) => {
    updateGalleryFileMutateAsync({
      alt: values.alt,
      status: values.status.toUpperCase(),
    }).then(() => {
      notification.success({
        message: 'File was updated successfully',
        placement: 'bottomLeft',
      });
    });
  };

  const isDisabled = GetDisabledStatus(
    file?.status as string,
    me?.role as Role
  );

  const { width } = useWindowSize();
  const isSmallWidth = width && width < 639;

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Modal
          open={isOpen}
          onCancel={onCancel}
          footer={null}
          title="File Info"
          destroyOnClose
          width={1000}
        >
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin size="large" />
            </div>
          )}

          {isSuccess && (
            <>
              {isSmallWidth ? (
                <Col span={24}>
                  <Image
                    src={file?.versions?.huge?.url}
                    preview={false}
                    style={{
                      display: 'block',
                      objectFit: 'cover',
                      borderRadius: '0.5vw',
                    }}
                    fallback={pictureBackup}
                  />

                  <Form form={form} layout="vertical" onFinish={onSubmit}>
                    <Space
                      direction="vertical"
                      size="large"
                      style={{ display: 'flex' }}
                    >
                      <Form.Item label="Alt" name="alt">
                        <Input placeholder="Alt" disabled={isDisabled} />
                      </Form.Item>

                      <Form.Item
                        label="Status"
                        name="status"
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Status" disabled />
                        {/* <Select> */}
                        {/*  <Option value={GalleryFileStatuses.DRAFT}>Draft</Option> */}
                        {/*  <Option value={GalleryFileStatuses.PENDING_REVIEW}> */}
                        {/*    Pending Review */}
                        {/*  </Option> */}
                        {/*  <Option value={GalleryFileStatuses.PUBLISHED}> */}
                        {/*    Published */}
                        {/*  </Option> */}
                        {/* </Select> */}
                      </Form.Item>

                      <List>
                        <List.Item draggable>
                          <span className="text-neutral-400">Type: &nbsp;</span>
                          {file?.typeFile}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">Mime: &nbsp;</span>
                          {file?.mime}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">
                            File Size: &nbsp;
                          </span>
                          {file?.versions?.huge?.fileSize}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">
                            Dimensions: &nbsp;
                          </span>
                          {file?.versions?.huge?.width} x{' '}
                          {file?.versions?.huge?.height}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">
                            Owner: &nbsp;
                          </span>
                          {file?.owner?.userName}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">
                            Created At: &nbsp;
                          </span>
                          {file?.createdAt}
                        </List.Item>

                        <List.Item draggable>
                          <span className="text-neutral-400">
                            {selectedFile?.usageInfo?.article?.id && (
                              <>
                                ArticleID:{' '}
                                {selectedFile?.usageInfo?.article?.id}
                                <br />
                                Title: {selectedFile?.usageInfo?.article?.title}
                                &nbsp;
                              </>
                            )}
                            {selectedFile?.usageInfo?.place?.id && (
                              <>
                                PlaceID: {selectedFile?.usageInfo?.place?.id}
                                <br />
                                Title: {selectedFile?.usageInfo?.place?.title}
                                &nbsp;
                              </>
                            )}
                            {selectedFile?.usageInfo?.person?.id && (
                              <>
                                PersonID: {selectedFile?.usageInfo?.person?.id}
                                <br />
                                Title: {selectedFile?.usageInfo?.person?.title}
                                &nbsp;
                              </>
                            )}
                          </span>
                        </List.Item>
                      </List>

                      <Space wrap>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isUpdating}
                          icon={<SaveOutlined />}
                          disabled={isDisabled}
                        >
                          Save
                        </Button>

                        <DeleteConfirmationModal<IExtendGalleryFile>
                          item={selectedFile}
                          onDelete={onDeleteFile}
                        />
                      </Space>
                    </Space>
                  </Form>
                </Col>
              ) : (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form form={form} layout="vertical" onFinish={onSubmit}>
                      <Space
                        direction="vertical"
                        size="large"
                        style={{ display: 'flex' }}
                      >
                        <Form.Item label="Alt" name="alt">
                          <Input placeholder="Alt" disabled={isDisabled} />
                        </Form.Item>

                        <Form.Item
                          label="Status"
                          name="status"
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Status" disabled />
                          {/* <Select> */}
                          {/*  <Option value={GalleryFileStatuses.DRAFT}>Draft</Option> */}
                          {/*  <Option value={GalleryFileStatuses.PENDING_REVIEW}> */}
                          {/*    Pending Review */}
                          {/*  </Option> */}
                          {/*  <Option value={GalleryFileStatuses.PUBLISHED}> */}
                          {/*    Published */}
                          {/*  </Option> */}
                          {/* </Select> */}
                        </Form.Item>

                        <List>
                          <List.Item draggable>
                            <span className="text-neutral-400">
                              Type: &nbsp;
                            </span>
                            {file?.typeFile}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              Mime: &nbsp;
                            </span>
                            {file?.mime}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              File Size: &nbsp;
                            </span>
                            {file?.versions?.huge?.fileSize}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              Dimensions: &nbsp;
                            </span>
                            {file?.versions?.huge?.width} x{' '}
                            {file?.versions?.huge?.height}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              Owner: &nbsp;
                            </span>
                            {file?.owner?.userName}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              Created At: &nbsp;
                            </span>
                            {file?.createdAt}
                          </List.Item>

                          <List.Item draggable>
                            <span className="text-neutral-400">
                              {selectedFile?.usageInfo?.article?.id && (
                                <>
                                  ArticleID:{' '}
                                  {selectedFile?.usageInfo?.article?.id}
                                  <br />
                                  Title:{' '}
                                  {selectedFile?.usageInfo?.article?.title}
                                  &nbsp;
                                </>
                              )}
                              {selectedFile?.usageInfo?.place?.id && (
                                <>
                                  PlaceID: {selectedFile?.usageInfo?.place?.id}
                                  <br />
                                  Title: {selectedFile?.usageInfo?.place?.title}
                                  &nbsp;
                                </>
                              )}
                              {selectedFile?.usageInfo?.person?.id && (
                                <>
                                  PersonID:{' '}
                                  {selectedFile?.usageInfo?.person?.id}
                                  <br />
                                  Title:{' '}
                                  {selectedFile?.usageInfo?.person?.title}
                                  &nbsp;
                                </>
                              )}
                            </span>
                          </List.Item>
                        </List>

                        <Space wrap>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={isUpdating}
                            icon={<SaveOutlined />}
                            disabled={isDisabled}
                          >
                            Save
                          </Button>

                          <DeleteConfirmationModal<IExtendGalleryFile>
                            item={selectedFile}
                            onDelete={onDeleteFile}
                          />
                        </Space>
                      </Space>
                    </Form>
                  </Col>

                  <Col
                    span={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={file?.versions?.huge?.url}
                      preview={false}
                      style={{
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '0.5vw',
                      }}
                      fallback={pictureBackup}
                    />
                  </Col>
                </Row>
              )}
            </>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};
