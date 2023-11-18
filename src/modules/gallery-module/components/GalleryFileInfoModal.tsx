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
import { FormInstance } from 'antd/es/form/hooks/useForm';
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

const GalleryImage: FC<{ url: string }> = ({ url }) => {
  return (
    <Image
      src={url}
      preview={false}
      style={{
        display: 'block',
        objectFit: 'cover',
        borderRadius: '0.5vw',
      }}
      fallback={pictureBackup}
    />
  );
};

const GalleryFileDetails: FC<{ file: IExtendGalleryFile }> = ({ file }) => {
  return (
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
        <span className="text-neutral-400">File Size: &nbsp;</span>
        {file?.versions?.huge?.fileSize}
      </List.Item>

      <List.Item draggable>
        <span className="text-neutral-400">Dimensions: &nbsp;</span>
        {file?.versions?.huge?.width} x {file?.versions?.huge?.height}
      </List.Item>

      <List.Item draggable>
        <span className="text-neutral-400">Owner: &nbsp;</span>
        {file?.owner?.userName}
      </List.Item>

      <List.Item draggable>
        <span className="text-neutral-400">Created At: &nbsp;</span>
        {file?.createdAt}
      </List.Item>

      <List.Item draggable>
        <span className="text-neutral-400">
          {file?.usageInfo?.article?.id && (
            <>
              ArticleID: {file?.usageInfo?.article?.id}
              <br />
              Title: {file?.usageInfo?.article?.title}
              &nbsp;
            </>
          )}
          {file?.usageInfo?.place?.id && (
            <>
              PlaceID: {file?.usageInfo?.place?.id}
              <br />
              Title: {file?.usageInfo?.place?.title}
              &nbsp;
            </>
          )}
          {file?.usageInfo?.person?.id && (
            <>
              PersonID: {file?.usageInfo?.person?.id}
              <br />
              Title: {file?.usageInfo?.person?.title}
              &nbsp;
            </>
          )}
        </span>
      </List.Item>
    </List>
  );
};

const GalleryForm: FC<{
  form: FormInstance<FormValues>;
  selectedFile: IExtendGalleryFile | null;
  isDisabled: boolean;
  isUpdating: boolean;
  onSubmit: (values: FormValues) => void;
  onDeleteFile: () => void;
}> = ({
  form,
  selectedFile,
  isDisabled,
  isUpdating,
  onSubmit,
  onDeleteFile,
}) => {
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form.Item label="Alt" name="alt">
        <Input placeholder="Alt" disabled={isDisabled} />
      </Form.Item>

      <Form.Item label="Status" name="status" style={{ marginBottom: 0 }}>
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

      <GalleryFileDetails file={selectedFile as IExtendGalleryFile} />

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
  );
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

  const GalleryFormComponent = (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <GalleryForm
        form={form}
        selectedFile={selectedFile}
        isDisabled={isDisabled}
        isUpdating={isUpdating}
        onSubmit={onSubmit}
        onDeleteFile={onDeleteFile}
      />
    </Form>
  );

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
                  <GalleryImage url={file?.versions?.huge?.url as string} />

                  {GalleryFormComponent}
                </Col>
              ) : (
                <Row gutter={16}>
                  <Col span={12}>{GalleryFormComponent}</Col>

                  <Col
                    span={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <GalleryImage url={file?.versions?.huge?.url as string} />
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
