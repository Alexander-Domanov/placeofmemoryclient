import React, { FC, useMemo, useState } from 'react';
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
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { routes } from '@/common/routing/routes';
import 'react-quill/dist/quill.snow.css';
import { IFieldData, IGalleryFile } from '@/types';
import { useCreateArticle } from '../hooks/useCreateArticle';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import {
  DashboardSelectLanguage,
  GetCharacterCount,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { ArticleFormRules } from '@/modules/articles-module';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

interface ArticleForm {
  title: string;
  description: string;
  content: string;
  photo: UploadFile<IGalleryFile>[];
}

export const ArticleCreate: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [fields, setFields] = useState<IFieldData[]>([]);

  const { mutate, isCreating } = useCreateArticle();
  const [contentText, setContentText] = useState<string>('');

  const characterCount = GetCharacterCount(contentText);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'article');

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = (values: ArticleForm) => {
    const form = {
      title: values.title,
      description: values.description,
      content: values.content,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };

    mutate(form, {
      onSuccess: (data) => {
        notification.success({
          message: t.dashboard.articles.create.notification.success.title,
          description:
            t.dashboard.articles.create.notification.success.description,
          placement: 'bottomLeft',
        });

        if (data.data.id) {
          router.push(routes.dashboard.articles.article(data.data.id));
        }
      },
    });
  };

  const articleFormRules = ArticleFormRules(t);

  const exceeded = isCharacterCountExceeded(
    characterCount,
    articleFormRules.content.maxCharacters
  );
  const quillStyle = getQuillStyle(exceeded);

  const validateContent = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: articleFormRules.content.maxCharacters,
      message: t.dashboard.articles.form.content.label,
      value,
      callback,
      t,
    });
  };

  const breadcrumbs = [
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
      key: routes.dashboard.articles.create,
      text: t.dashboard.articles.create.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs} />

        <DashboardSelectLanguage />
      </Flex>

      <Form
        layout="vertical"
        fields={fields}
        form={form}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
        onFinish={onSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} lg={16}>
            <Card>
              <Form.Item
                label={t.dashboard.articles.form.title.label}
                name="title"
                rules={articleFormRules.title}
                validateFirst
                hasFeedback
                tooltip={<span>{t.dashboard.articles.form.title.tooltip}</span>}
              >
                <Input.TextArea
                  placeholder={t.dashboard.articles.form.title.placeholder}
                  count={{
                    show: true,
                    max: articleFormRules.title[1].max,
                  }}
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

          <Col span={24} lg={8}>
            <Flex vertical gap="middle">
              <Card>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={isCreating}
                >
                  {t.dashboard.articles.create.button.save}
                </Button>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.articles.form.photo.label}
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={articleFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      {t.dashboard.articles.form.photo.tooltip}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      {t.dashboard.articles.create.button.photo} (Max:{' '}
                      {articleFormRules.photo.maxCount})
                    </Button>
                  </Upload>
                </Form.Item>
              </Card>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
};
