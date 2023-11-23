import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { useArticle } from '@/modules/articles-module/hooks/useArticle';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdateArticle } from '@/modules/articles-module/hooks/useUpdateArticle';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';
import {
  DeleteConfirmationModal,
  GetCharacterCount,
  MetaInfoForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { ArticleFormRules } from '@/modules/articles-module';
import { IArticle, Statuses } from '@/types';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';

const { Option } = Select;

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

function breadcrumbs(name: string) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.index,
      text: 'Articles',
    }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.breadcrumbs(name),
      text: name,
      withLink: false,
    }),
  ];
}

export const ArticleEdit: FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const router = useRouter();
  const id = router.query.id as string;

  const { article, isLoading } = useArticle(id);
  const { mutate, isUpdating } = useUpdateArticle(id);
  const { updateStatusArticle, isStatusUpdating } = useUpdateArticleStatus();

  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'article');

  const [form] = Form.useForm();
  const [status, setStatus] = useState('DRAFT');

  const [contentText, setContentText] = useState<string>('');
  const characterCount = GetCharacterCount(contentText);

  const { deleteArticleMutationAsync } = useDeleteArticle();

  const onStatusChange = (status: string) => {
    setStatus(status);

    updateStatusArticle(
      { id: +id, status },
      {
        onSuccess: () => {
          notification.success({
            message: 'Status updated successfully',
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const onDeleteArticle = () => {
    deleteArticleMutationAsync(selectedArticle?.id || null, {
      onSuccess() {
        notification.success({
          message: 'Article was deleted successfully',
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.articles.index);
      },
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (article) {
      form.setFieldsValue({
        title: article.title,
        slug: article.slug,
        description: article.description,
        content: article.content,
        photo: article.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.medium.url,
          response: { ...f },
        })),
      });
      setFileList(
        article.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.medium.url,
          response: { ...f },
        }))
      );
      setSelectedArticle(article);
      setContentText(article.content || '');
      setStatus(article.status);
    }
  }, [article]);

  const exceeded = isCharacterCountExceeded(
    characterCount,
    ArticleFormRules.content.maxCharacters
  );
  const quillStyle = getQuillStyle(exceeded);

  const onSubmit = (values: any) => {
    const data = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      content: values.content,
      ids: values.photo.map((f: any) => f.response.uploadId),
    };

    mutate(data, {
      onSuccess: () => {
        notification.success({
          message: 'Article updated successfully',
          placement: 'bottomLeft',
        });
      },
    });
  };

  const validateContent = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: ArticleFormRules.content.maxCharacters,
      message: ArticleFormRules.content.message,
      value,
      callback,
    });
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(article?.title || '')} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12} lg={16}>
              <Card>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={ArticleFormRules.title}
                  validateFirst
                  hasFeedback
                  tooltip={
                    <span>
                      You can write up to {ArticleFormRules.title[1].max}{' '}
                      characters. After writing, you should save the article.
                    </span>
                  }
                >
                  <Input.TextArea
                    placeholder="Title"
                    count={{
                      show: true,
                      max: ArticleFormRules.title[1].max,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Short Description"
                  name="description"
                  rules={ArticleFormRules.description}
                  validateFirst
                  hasFeedback
                  tooltip={
                    <span>
                      You can write up to {ArticleFormRules.description[1].max}{' '}
                      characters. After writing, you should save the article.
                    </span>
                  }
                >
                  <Input.TextArea
                    placeholder="Short Description"
                    count={{
                      show: true,
                      max: ArticleFormRules.description[1].max,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Content"
                  name="content"
                  validateFirst
                  rules={[
                    { validator: validateContent },
                    ...ArticleFormRules.content.rules,
                  ]}
                  hasFeedback
                  tooltip={
                    <span>
                      You can write up to{' '}
                      {ArticleFormRules.content.maxCharacters} characters. After
                      writing, you should save the article.
                    </span>
                  }
                >
                  <ReactQuill
                    theme="snow"
                    value={contentText}
                    onChange={(value) => {
                      setContentText(value);
                      form.setFieldValue('content', value);
                    }}
                    style={quillStyle}
                  />
                </Form.Item>

                <QuillCharacterCount
                  characterCount={characterCount}
                  maxCount={ArticleFormRules.content.maxCharacters}
                />
              </Card>
            </Col>

            <Col span={24} md={12} lg={8}>
              <Flex vertical gap={16}>
                <Card>
                  <Form.Item label="Status">
                    <Select
                      value={status}
                      onChange={onStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating}
                    >
                      <Option value={Statuses.DRAFT}>
                        <EyeInvisibleOutlined /> Draft
                      </Option>
                      <Option value={Statuses.PENDING_REVIEW}>
                        <ClockCircleOutlined /> Send for review
                      </Option>
                      <Option value={Statuses.PUBLISHED}>
                        <EyeOutlined /> Publish
                      </Option>
                      <Option value={Statuses.ARCHIVED}>
                        <InboxOutlined /> Archive
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={ArticleFormRules.slug}
                    hasFeedback
                    tooltip="You can change the slug of the article.
                    This field is for SEO, it must be unique and contain only letters, numbers and dashes.
                    Can't start or end with a dash."
                  >
                    <Input.TextArea
                      placeholder="Slug"
                      count={{
                        show: true,
                        max: ArticleFormRules.slug[1].max,
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <MetaInfoForm
                      slug={article?.slug}
                      status={article?.status}
                      path={routes.articles.getArticle(article?.slug || '')}
                      owner={article?.owner}
                      createdAt={article?.createdAt}
                      updatedAt={article?.updatedAt}
                    />
                  </Form.Item>

                  <Space size="middle" wrap>
                    <Button
                      type="primary"
                      htmlType="submit"
                      title="Save"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                    >
                      Save
                    </Button>

                    <DeleteConfirmationModal<IArticle>
                      item={selectedArticle}
                      onDelete={onDeleteArticle}
                    />
                  </Space>
                </Card>

                <Card>
                  <Form.Item
                    label="Photo"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={ArticleFormRules.photo.rules}
                    tooltip={
                      <span>
                        You can upload up to {ArticleFormRules.photo.maxCount}{' '}
                        photo. After uploading, you should save the article.{' '}
                        <SupportedImageFormatsTooltip />
                      </span>
                    }
                  >
                    <Upload {...uploadProps}>
                      <Button
                        icon={<UploadOutlined />}
                        disabled={fileList.length > 0}
                      >
                        + Upload (Max: {ArticleFormRules.photo.maxCount})
                      </Button>
                    </Upload>
                  </Form.Item>
                </Card>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
