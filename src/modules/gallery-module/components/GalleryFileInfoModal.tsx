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
import { FileStatuses, IExtendGalleryFile, Role, StatusUser } from '@/types';
import { useMeQuery } from '@/services';
import { GetDisabledStatus } from '@/common-dashboard';
import { pictureBackup } from '@/common-dashboard/constants/picture-backup';
import { DeleteConfirmationModal } from '@/components';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { useTranslation } from '@/components/internationalization';

type FormValues = {
  alt: string;
  status: FileStatuses;
};

const GalleryImage: FC<{ url: string }> = ({ url }) => {
  return (
    <Spin spinning={!url}>
      <Image
        src={url}
        preview={false}
        style={{
          display: 'block',
          objectFit: 'cover',
          borderRadius: '1vw',
        }}
        fallback={pictureBackup}
      />
    </Spin>
  );
};

const GalleryFileDetails: FC<{ file: IExtendGalleryFile }> = ({ file }) => {
  const { t } = useTranslation();
  return (
    <List>
      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.type}: &nbsp;
        </span>
        {file?.typeFile}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.mime}: &nbsp;
        </span>
        {file?.mime}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.fileSize}: &nbsp;
        </span>
        {file?.versions?.huge?.fileSize}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.demensions}: &nbsp;
        </span>
        {file?.versions?.huge?.width} x {file?.versions?.huge?.height}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.owner}: &nbsp;
        </span>
        {file?.owner?.userName}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {t.dashboard.gallery.image.createdAt}: &nbsp;
        </span>
        {convertDateToFormat(file?.createdAt)}
      </List.Item>

      <List.Item>
        <span className="text-neutral-400">
          {file?.usageInfo?.article?.id && (
            <>
              {t.dashboard.gallery.image.relations.article.id}:{' '}
              {file?.usageInfo?.article?.id}
              <br />
              {t.dashboard.gallery.image.relations.article.title}:{' '}
              {file?.usageInfo?.article?.title}
              &nbsp;
            </>
          )}
          {file?.usageInfo?.place?.id && (
            <>
              {t.dashboard.gallery.image.relations.place.id}:{' '}
              {file?.usageInfo?.place?.id}
              <br />
              {t.dashboard.gallery.image.relations.place.title}:{' '}
              {file?.usageInfo?.place?.title}
              &nbsp;
            </>
          )}
          {file?.usageInfo?.person?.id && (
            <>
              {t.dashboard.gallery.image.relations.person.id}:{' '}
              {file?.usageInfo?.person?.id}
              <br />
              {t.dashboard.gallery.image.relations.person.title}:{' '}
              {file?.usageInfo?.person?.title}
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
  showAlt: boolean;
  onSubmit: (values: FormValues) => void;
  onDeleteFile: () => void;
}> = ({
  form,
  selectedFile,
  isDisabled,
  isUpdating,
  showAlt,
  onSubmit,
  onDeleteFile,
}) => {
  const { t } = useTranslation();
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      {showAlt && (
        <Form.Item label={t.dashboard.gallery.image.alt} name="alt">
          <Input
            placeholder={t.dashboard.gallery.image.alt}
            disabled={isDisabled}
          />
        </Form.Item>
      )}

      {/* <Form.Item */}
      {/*  label={t.dashboard.gallery.image.status} */}
      {/*  name="status" */}
      {/*  style={{ marginBottom: 0 }} */}
      {/* > */}
      {/*  <Input placeholder={t.dashboard.gallery.image.status} disabled /> */}
      {/*  /!* <Select> *!/ */}
      {/*  /!*  <Option value={GalleryFileStatuses.DRAFT}>Draft</Option> *!/ */}
      {/*  /!*  <Option value={GalleryFileStatuses.PENDING_REVIEW}> *!/ */}
      {/*  /!*    Pending Review *!/ */}
      {/*  /!*  </Option> *!/ */}
      {/*  /!*  <Option value={GalleryFileStatuses.PUBLISHED}> *!/ */}
      {/*  /!*    Published *!/ */}
      {/*  /!*  </Option> *!/ */}
      {/*  /!* </Select> *!/ */}
      {/* </Form.Item> */}

      <GalleryFileDetails file={selectedFile as IExtendGalleryFile} />

      <Space wrap>
        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdating}
          icon={<SaveOutlined />}
          disabled={isDisabled}
        >
          {t.dashboard.save}
        </Button>

        <DeleteConfirmationModal<IExtendGalleryFile>
          item={selectedFile}
          onDelete={onDeleteFile}
          disabled={isDisabled}
        />
      </Space>
    </Space>
  );
};

export const GalleryFileInfoModal: FC = () => {
  const { t } = useTranslation();

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
  const [isDisabled, setIsDisabled] = useState(false);

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
          message: t.dashboard.gallery.image.notifications.upload.remove.title,
          description:
            t.dashboard.gallery.image.notifications.success.description,
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
        message: t.dashboard.gallery.image.notifications.update.title,
        placement: 'bottomLeft',
      });
    });
  };

  useEffect(() => {
    if (
      me?.status === StatusUser.BANNED ||
      GetDisabledStatus(file?.status as string, me?.role as Role)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status, file?.status]);

  const isAdministrator = me?.role === Role.ADMIN || me?.role === Role.EDITOR;

  const { width } = useWindowSize();
  const isSmallWidth = width && width < 639;

  const GalleryFormComponent = (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <GalleryForm
        form={form}
        selectedFile={selectedFile}
        isDisabled={isDisabled}
        isUpdating={isUpdating}
        showAlt={isAdministrator}
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
          title={t.dashboard.gallery.image.title}
          destroyOnClose
          width={1000}
          // className="smooth-transition"
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
