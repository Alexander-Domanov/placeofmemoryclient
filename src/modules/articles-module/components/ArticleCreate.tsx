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
  CreateBreadcrumb,
  GetCharacterCount,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { ArticleFormRules } from '@/modules/articles-module';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({ key: routes.dashboard.articles.index, text: 'Articles' }),
  CreateBreadcrumb({
    key: routes.dashboard.articles.create,
    text: 'Create Article',
    withLink: false,
  }),
];

interface ArticleForm {
  title: string;
  description: string;
  content: string;
  photo: UploadFile<IGalleryFile>[];
}

export const ArticleCreate: FC = () => {
  const router = useRouter();

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
          message: 'Article created successfully',
          description: 'You will be redirected to the article page',
          placement: 'bottomLeft',
        });

        if (data.data.id) {
          router.push(routes.dashboard.articles.article(data.data.id));
        }
      },
    });
  };

  const exceeded = isCharacterCountExceeded(
    characterCount,
    ArticleFormRules.content[1].max as number
  );
  const quillStyle = getQuillStyle(exceeded);

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

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
          <Col span={16}>
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
                rules={ArticleFormRules.content}
                hasFeedback
                tooltip={
                  <span>
                    You can write up to {ArticleFormRules.content[1].max}{' '}
                    characters. After writing, you should save the article.
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
                maxCount={ArticleFormRules.content[1].max as number}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Flex vertical gap="middle">
              <Card>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={isCreating}
                >
                  Save
                </Button>
              </Card>

              <Card>
                <Form.Item
                  label="Photo"
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={ArticleFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      You can upload up to one photo. After uploading, you
                      should save the article. <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      + Upload (Max: {ArticleFormRules.photo.maxFileSize})
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
