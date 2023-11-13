import { FC, useEffect } from 'react';
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
  Select,
  Space,
  Spin,
} from 'antd';
import { useUpdateGalleryFile } from '../hooks/useUpdateGalleryFile';
import { useGalleryFile } from '../hooks/useGalleryFile';
import { useDashboardModalsStore } from '@/store';
import { useDeleteGalleryFile } from '../hooks/useDeleteGalleryFile';
import { FileStatuses } from '@/types';

const { Option } = Select;

const { confirm } = Modal;

type FormValues = {
  alt: string;
  status: FileStatuses;
};

export const GalleryFileInfoModal: FC = () => {
  const { isOpen, uploadId, setIsOpen, setUploadId } = useDashboardModalsStore(
    (state) => state.fileInfoModal
  );

  const { file, isLoading, isSuccess } = useGalleryFile(uploadId);

  const { updateGalleryFileMutateAsync, isUpdating } =
    useUpdateGalleryFile(uploadId);
  const { deleteGalleryFileMutateAsync } = useDeleteGalleryFile();

  const [form] = Form.useForm();

  useEffect(() => {
    if (file) {
      form.setFieldValue('alt', file?.alt);
      form.setFieldValue('status', file?.status.toLowerCase());
    }
  }, [file]);

  const onCancel = () => {
    setIsOpen(false);
    setUploadId(null);
  };

  const onDelete = () => {
    confirm({
      title: 'Do you want to delete these image?',
      onOk() {
        return deleteGalleryFileMutateAsync(file?.uploadId, {
          onSuccess() {
            notification.success({
              message: 'File was deleted successfully',
              placement: 'topRight',
            });

            setIsOpen(false);
            setUploadId(null);
          },
        });
      },
      onCancel() {},
    });
  };

  const onSubmit = (values: FormValues) => {
    updateGalleryFileMutateAsync({
      alt: values.alt,
      status: values.status.toUpperCase(),
    }).then(() => {
      notification.success({
        message: 'File was updated successfully',
        placement: 'topRight',
      });
    });
  };

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
            <Row gutter={16}>
              <Col span={12}>
                <Form form={form} layout="vertical" onFinish={onSubmit}>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ display: 'flex' }}
                  >
                    <Form.Item label="Alt" name="alt">
                      <Input placeholder="Alt" />
                    </Form.Item>

                    {/* <Form.Item */}
                    {/*  label="Status" */}
                    {/*  name="status" */}
                    {/*  style={{ marginBottom: 0 }} */}
                    {/* > */}
                    {/*  <Select> */}
                    {/*    <Option value={GalleryFileStatuses.DRAFT}>Draft</Option> */}
                    {/*    <Option value={GalleryFileStatuses.PENDING_REVIEW}> */}
                    {/*      Pending Review */}
                    {/*    </Option> */}
                    {/*    <Option value={GalleryFileStatuses.PUBLISHED}> */}
                    {/*      Published */}
                    {/*    </Option> */}
                    {/*  </Select> */}
                    {/* </Form.Item> */}

                    <List>
                      <List.Item>Type: {file?.typeFile}</List.Item>

                      <List.Item>Mime: {file?.mime}</List.Item>

                      <List.Item>
                        File Size: {file?.versions?.huge?.fileSize}
                      </List.Item>

                      <List.Item>
                        Dimensions: {file?.versions?.huge?.width} x{' '}
                        {file?.versions?.huge?.height}
                      </List.Item>

                      <List.Item>Created: {file?.createdAt}</List.Item>
                    </List>

                    <Space wrap>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isUpdating}
                      >
                        Save
                      </Button>

                      <Button type="primary" danger onClick={onDelete}>
                        Delete
                      </Button>
                    </Space>
                  </Space>
                </Form>
              </Col>

              <Col span={12}>
                <Image
                  src={file?.versions?.huge?.url}
                  preview={false}
                  fallback="data:image/png;base64,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"
                />
              </Col>
            </Row>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};
