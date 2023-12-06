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
  DashboardSelectLanguage,
  DeleteConfirmationModal,
  GetCharacterCount,
  MetaInfoForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { ArticleFormRules } from '@/modules/articles-module';
import { IArticle, Statuses, StatusUser } from '@/types';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';
import { LocaleType, useTranslation } from '@/components/internationalization';
import { useMeQuery } from '@/services';

const { Option } = Select;

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

function breadcrumbs(name: string, t: LocaleType) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.index,
      text: t.dashboard.articles.index,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.breadcrumbs(name),
      text: name,
      withLink: false,
    }),
  ];
}

export const ArticleEdit: FC = () => {
  const { t } = useTranslation();
  const { data: me } = useMeQuery();

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

  const [isDisabled, setIsDisabled] = useState(false);

  const { deleteArticleMutationAsync } = useDeleteArticle();

  const onStatusChange = (status: string) => {
    setStatus(status);

    updateStatusArticle(
      { id: +id, status },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.articles.edit.notification.update.title,
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
          message: t.dashboard.articles.edit.notification.delete.title,
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

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status, status]);

  const articleFormRules = ArticleFormRules(t);

  const exceeded = isCharacterCountExceeded(
    characterCount,
    articleFormRules.content.maxCharacters
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
          message: t.dashboard.articles.edit.notification.success.title,
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
      maxCharacters: articleFormRules.content.maxCharacters,
      message: t.dashboard.articles.form.content,
      value,
      callback,
    });
  };

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs(article?.title || '', t)} />

        <DashboardSelectLanguage />
      </Flex>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12} lg={16}>
              <Card>
                <Form.Item
                  label={t.dashboard.articles.form.title.label}
                  name="title"
                  rules={articleFormRules.title}
                  validateFirst
                  hasFeedback
                  tooltip={
                    <span>{t.dashboard.articles.form.title.tooltip} </span>
                  }
                >
                  <Input.TextArea
                    placeholder={t.dashboard.articles.form.title.placeholder}
                    count={{
                      show: true,
                      max: articleFormRules.title[1].max,
                    }}
                    disabled={isDisabled}
                  />
                </Form.Item>

                <Form.Item
                  label={t.dashboard.articles.form.description.label}
                  name="description"
                  rules={articleFormRules.description}
                  validateFirst
                  hasFeedback
                  tooltip={
                    <span>{t.dashboard.articles.form.description.tooltip}</span>
                  }
                >
                  <Input.TextArea
                    placeholder={
                      t.dashboard.articles.form.description.placeholder
                    }
                    count={{
                      show: true,
                      max: articleFormRules.description[1].max,
                    }}
                    disabled={isDisabled}
                  />
                </Form.Item>

                <Form.Item
                  label={t.dashboard.articles.form.content.label}
                  name="content"
                  validateFirst
                  rules={[
                    { validator: validateContent },
                    ...articleFormRules.content.rules,
                  ]}
                  hasFeedback
                  tooltip={
                    <span>{t.dashboard.articles.form.content.tooltip}</span>
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
                  maxCount={articleFormRules.content.maxCharacters}
                />
              </Card>
            </Col>

            <Col span={24} md={12} lg={8}>
              <Flex vertical gap={16}>
                <Card>
                  <Form.Item label={t.dashboard.updateStatus.label}>
                    <Select
                      value={status}
                      onChange={onStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating || isDisabled}
                    >
                      <Option value={Statuses.DRAFT}>
                        <EyeInvisibleOutlined />{' '}
                        {t.dashboard.updateStatus.draft}
                      </Option>
                      <Option value={Statuses.PENDING_REVIEW}>
                        <ClockCircleOutlined />{' '}
                        {t.dashboard.updateStatus.pending}
                      </Option>
                      <Option value={Statuses.PUBLISHED}>
                        <EyeOutlined /> {t.dashboard.updateStatus.published}
                      </Option>
                      <Option value={Statuses.ARCHIVED}>
                        <InboxOutlined /> {t.dashboard.updateStatus.archived}
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={t.dashboard.rules.slug.label}
                    name="slug"
                    rules={articleFormRules.slug}
                    hasFeedback
                    tooltip={t.dashboard.rules.slug.tooltip}
                  >
                    <Input.TextArea
                      placeholder={t.dashboard.rules.slug.placeholder}
                      count={{
                        show: true,
                        max: articleFormRules.slug[1].max,
                      }}
                      disabled={isDisabled}
                    />
                  </Form.Item>

                  <Form.Item>
                    <MetaInfoForm
                      slug={article?.slug}
                      status={article?.status}
                      path={routes.articles.article(article?.slug || '')}
                      owner={article?.owner}
                      createdAt={article?.createdAt}
                      updatedAt={article?.updatedAt}
                    />
                  </Form.Item>

                  <Space size="middle" wrap>
                    <Button
                      type="primary"
                      htmlType="submit"
                      title={t.dashboard.articles.edit.button.save}
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                      disabled={isUpdating || isDisabled}
                    >
                      {t.dashboard.articles.edit.button.save}
                    </Button>

                    <DeleteConfirmationModal<IArticle>
                      item={selectedArticle}
                      onDelete={onDeleteArticle}
                      disabled={isDisabled}
                    />
                  </Space>
                </Card>

                <Card>
                  <Form.Item
                    label={t.dashboard.articles.form.photo.label}
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={articleFormRules.photo.rules}
                    tooltip={
                      <span>
                        {t.dashboard.articles.form.photo.tooltip}{' '}
                        <SupportedImageFormatsTooltip />
                      </span>
                    }
                  >
                    <Upload {...uploadProps} disabled={isDisabled}>
                      <Button
                        icon={<UploadOutlined />}
                        disabled={fileList.length > 0 || isDisabled}
                      >
                        {t.dashboard.articles.edit.button.photo} (Max:{' '}
                        {articleFormRules.photo.maxCount})
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
