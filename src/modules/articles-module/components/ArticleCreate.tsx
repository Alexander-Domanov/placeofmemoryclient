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
import { IGalleryFile } from '@/types';
import { useCreateArticle } from '../hooks/useCreateArticle';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

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

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const ArticleCreate: FC = () => {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>([]);

  const { mutate, isCreating } = useCreateArticle();
  const [contentText, setContentText] = useState<string>('');
  const [contentCount, setContentCount] = useState<number>(0);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

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
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item
                label="Short Description"
                name="description"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.TextArea autoSize placeholder="Short Description" />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true }]}
              >
                <ReactQuill
                  theme="snow"
                  value={contentText}
                  onChange={(value) => {
                    setContentText(value);
                    setContentCount(value.length);
                    form.setFieldValue('content', value);
                  }}
                />
                <span className="font-normal text-neutral-400">
                  Characters: {contentCount}
                </span>
              </Form.Item>
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
                  rules={[{ required: true }]}
                  shouldUpdate
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      Click to upload
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
